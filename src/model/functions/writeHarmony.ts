import Harmony from "../types/Harmony";
import Snippet from "../types/Snippet";

import write from "./write";
import SnippetValidator from "../vallitation/SnippetValidator";

export default async function writeHarmony(harmony: Harmony): Promise<string>
{
    if(SnippetValidator.isHarmony(harmony))
    {
        if(await SnippetValidator.isUnique(harmony))
        {
            const snippet: Snippet =
            {
                names: [],
                expression: harmony
            };

            return await write(snippet);
        }
        else throw SnippetValidator.generateError("Snippet already exists", 400);
    }
    else throw SnippetValidator.generateError("Snippet is not harmony", 400);
}