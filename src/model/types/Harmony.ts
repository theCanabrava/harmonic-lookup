import Expression from "./Expression";
import Chord from './Chord';

export default interface Harmony extends Expression
{
    scale: string
    notation: string[][]
}