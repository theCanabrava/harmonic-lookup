import Snippet from "../types/Snippet";
import SnippetManager from "../SnippetManager";

export default async function store(snippet: Snippet): Promise<string>
{
    return await SnippetManager.shared.store(snippet);
}