import Melody from "../types/Melody";
import Snippet from "../types/Snippet";

import write from "./write";
import SnippetValidator from "../vallitation/SnippetValidator";

export default async function writeMelody(melody: Melody): Promise<string>
{
    if(SnippetValidator.isMelody(melody))
    {
        if(await SnippetValidator.isUnique(melody))
        {
            const snippet: Snippet =
            {
                names: [],
                expression: melody
            };

            return await write(snippet);
        }
        else throw SnippetValidator.generateError("Snippet already exists", 400);
    }
    else throw SnippetValidator.generateError("Snippet is not melody", 400);
}