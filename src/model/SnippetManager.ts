import Snippet from "./types/Snippet";
import UpdateSnippet from "./types/UpdateSnippet";
import DatabaseInterface from "./interfaces/DatabaseInterface";
import Query from "./types/Query";

export default class SnippetManager 
{
    private database: DatabaseInterface;

    public static shared: SnippetManager;

    constructor(database: DatabaseInterface)
    {
        this.database = database;
    }

    async getSnippets(query: Query): Promise<Snippet[]>
    {
        const snippets: Snippet[] = await this.database.query(query);
        return snippets;
    }

    async store(snippet: Snippet): Promise<string>
    {
        return await this.database.write(snippet);
    }

    async update(snippet: Snippet): Promise<string>
    {
        return await this.database.write(snippet);
    }
}