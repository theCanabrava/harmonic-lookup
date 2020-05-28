import Query from "../types/Query";
import Harmony from "../types/Harmony";
import SnippetManager from "../SnippetManager";
import Naming from "../types/Naming";
import ValidationError from "../types/ValidationError";

export default class SnippetValidator 
{
    static isQuery(query: Query): boolean
    {
        if(query.id) return true;
        if(query.name) return true;
        if(query.expressionType) return true;
        if(query.expression)
        {
            if(query.expression.notation) return true;
        }
        return false;
    }

    static isHarmony(harmony: Harmony): boolean
    {
        if(harmony.type !== 'harmony') return false;
        if(!harmony.scale) return false;
        if(harmony.notation.length <= 0) return false;
        return true;
    }

    static async isUnique(harmony: Harmony): Promise<boolean>
    {
        const duplicates = await SnippetManager.shared.getSnippets({expression: harmony});
        if(duplicates.length > 0) return false;
        return true;
    }

    static isName(naming: Naming): boolean
    {
        if(naming.name.length > 0) return true;
        return false;
    }

    static generateError(message: string, statusCode: number): ValidationError
    {
        const error = new ValidationError(message);
        error.statusCode = statusCode;
        throw error;
    }
}