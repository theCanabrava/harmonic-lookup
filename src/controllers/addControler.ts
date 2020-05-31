import Harmony from "../model/types/Harmony";
import writeHarmony from "../model/functions/writeHarmony";
import name from "../model/functions/name";
import SnippetValidator from "../model/vallitation/SnippetValidator";
import Rythm from "../model/types/Rythm";
import writeRythm from "../model/functions/writeRythm";
import Melody from "../model/types/Melody";
import writeMelody from "../model/functions/writeMelody";

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

export async function addRythm(req: any, res: any, next: any)
{
    try
    {
        if(SnippetValidator.isName({id: "", name: req.body.name}))
        {
            const rythm: Rythm =
            {
                type: 'rythm',
                timeSignature: req.body.timeSignature!,
                notation: req.body.notation!
            }
            const id = await writeRythm(rythm);
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


export async function addMelody(req: any, res: any, next: any)
{
    try
    {
        if(SnippetValidator.isName({id: "", name: req.body.name}))
        {
            const melody: Melody =
            {
                type: 'melody',
                timeSignature: req.body.timeSignature!,
                notation: req.body.notation!
            }
            const id = await writeMelody(melody);
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