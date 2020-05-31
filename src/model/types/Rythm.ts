import Expression from "./Expression";

export default interface Rythm extends Expression
{
    timeSignature: number[]
    notation: number[][]
}