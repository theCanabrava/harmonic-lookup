import Query from "../types/Query";
import Snippet from "../types/Snippet";
import SnippetManager from "../SnippetManager";
import SnippetValidator from "../vallitation/SnippetValidator";

export default async function search(query: Query): Promise<Snippet[]>
{
    if(SnippetValidator.isQuery(query))
    {
        const snippets = await SnippetManager.shared.getSnippets(query);
        return snippets;
    }
    else throw SnippetValidator.generateError("Invalid query", 400);
}