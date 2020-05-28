import Expression from "./Expression";

export default interface Query
{
    id?: string,
    name?: string,
    expression?: Expression,
    expressionType?: string;
}