import Expression from "./Expression";
import Note from "./Note";

export default interface Melody extends Expression
{
    timeSignature: number[]
    notation: Note[]
}