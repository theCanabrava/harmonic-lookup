import Harmony from "../model/types/Harmony";
import writeHarmony from "../model/functions/writeHarmony";
import name from "../model/functions/name";
import ValidationError from "../model/types/ValidationError";
import SnippetValidator from "../model/vallitation/SnippetValidator";

export async function addHarmony(req: any, res: any, next: any)
{
    try
    {
        if(SnippetValidator.isName({id: "", name: req.body.name}))
        {
            const harmony: Harmony =
            {
                type: 'harmony',
                scale: req.body.scale!,
                notation: req.body.notation!
            }
            const id = await writeHarmony(harmony);
            await name({id: id, name: req.body.name});
            res.status(200).json({id});
        }
        else throw SnippetValidator.generateError("Invalid name", 400);
    }
    catch (err)
    {
        if(err.statusCode) res.status(err.statusCode).json({message: err.message});
        else next(err);
    }
}