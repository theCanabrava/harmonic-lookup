import Snippet from "../types/Snippet";
import Query from "../types/Query";

export default interface DatabaseInterface
{
    write(snippet: Snippet): Promise<string>;
    query(query: Query): Promise<Snippet[]>;
}