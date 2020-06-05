import Naming from "../model/types/Naming";
import name, { upvote, downvote } from "../model/functions/name";

export async function addName(req: any, res: any, next: any)
{
    try
    {
        const naming: Naming =
        {
            id: req.body.id,
            name: req.body.name
        }

        await name(naming);
        res.status(200).json({naming});
    }
    catch (err)
    {
        if(err.statusCode) res.status(err.statusCode).json({message: err.message});
        else next(err);
    }
}

export async function upvoteName(req: any, res: any, next: any)
{
    try
    {
        const naming: Naming =
        {
            id: req.body.id,
            name: req.body.name
        }

        await upvote(naming);
        res.status(200).json({naming});
    }
    catch (err)
    {
        if(err.statusCode) res.status(err.statusCode).json({message: err.message});
        else next(err);
    }
}

export async function downvoteName(req: any, res: any, next: any)
{
    try
    {
        const naming: Naming =
        {
            id: req.body.id,
            name: req.body.name
        }

        await downvote(naming);
        res.status(200).json({naming});
    }
    catch (err)
    {
        if(err.statusCode) res.status(err.statusCode).json({message: err.message});
        else next(err);
    }
}