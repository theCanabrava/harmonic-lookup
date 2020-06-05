import Naming from "../types/Naming";
import SnippetManager from "../SnippetManager";
import SnippetValidator from "../vallitation/SnippetValidator";

export default async function name(naming: Naming)
{
    if(SnippetValidator.isName(naming))
    {
        const snippets = await SnippetManager.shared.getSnippets({id: naming.id});
        const snippet = snippets[0]
        snippet.names.push({value: naming.name, score: 0});
        await SnippetManager.shared.update(snippet);
    }
    else throw SnippetValidator.generateError("Invalid name", 400);
}

export async function upvote(naming: Naming)
{
    if(SnippetValidator.isName(naming))
    {
        const snippets = await SnippetManager.shared.getSnippets({id: naming.id});
        const snippet = snippets[0]
        for(let i in snippet.names) if(snippet.names[i].value === naming.name)
        {
            snippet.names[i].score++;
            await SnippetManager.shared.update(snippet);
            return;
        }
        
        throw SnippetValidator.generateError("Unable to find name", 400);
    }
    else throw SnippetValidator.generateError("Invalid name", 400);
}

export async function downvote(naming: Naming)
{
    if(SnippetValidator.isName(naming))
    {
        const snippets = await SnippetManager.shared.getSnippets({id: naming.id});
        const snippet = snippets[0]
        for(let i in snippet.names) if(snippet.names[i].value === naming.name)
        {
            snippet.names[i].score--;
            await SnippetManager.shared.update(snippet);
            return;
        }
        throw SnippetValidator.generateError("Unable to find name", 400);
    }
    else throw SnippetValidator.generateError("Invalid name", 400);
}