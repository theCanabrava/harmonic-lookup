import Rythm from "../types/Rythm";
import Snippet from "../types/Snippet";

import write from "./write";
import SnippetValidator from "../vallitation/SnippetValidator";

export default async function writeRythm(rythm: Rythm): Promise<string>
{
    if(SnippetValidator.isRythm(rythm))
    {
        if(await SnippetValidator.isUnique(rythm))
        {
            const snippet: Snippet =
            {
                names: [],
                expression: rythm
            };

            return await write(snippet);
        }
        else throw SnippetValidator.generateError("Snippet already exists", 400);
    }
    else throw SnippetValidator.generateError("Snippet is not rythm", 400);
}