import searchSnippet from '../model/functions/search';
import ValidationError from '../model/types/ValidationError';

export async function search(req: any, res: any, next: any)
{
    try
    {
        const snippets = await searchSnippet(req.body.query!);
        res.status(200).json({snippets});
    }
    catch (err)
    {
        if(err.statusCode) res.status(err.statusCode).json({message: err.message});
        else next(err);
    }
}