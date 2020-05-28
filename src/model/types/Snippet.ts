import Expression from "./Expression";
import Name from "./Name";

export default interface Snippet
{
    id?: string;
    names: Name[];
    expression: Expression;
}