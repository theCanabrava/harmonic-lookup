import { expect } from 'chai';
import 'mocha';

import SnippetManager from '../src/model/SnippetManager';

import Snippet from '../src/model/types/Snippet';
import MockDatabase from './MockDatabase';

describe('Snippet manager', function()
{
    it('fetches from database', async function()
    {
        const manager = new SnippetManager(new MockDatabase());
        const snippet: Snippet = (await manager.getSnippets({name: 'Unit test snippet'}))[0];
        expect(snippet.id).to.equal('0');
    });

    it('writes a new snippet', async function()
    {
        const snippetName = 'New snippet';
        const manager = new SnippetManager(new MockDatabase());
        const snippet: Snippet = {names: [{value: snippetName, score: 0}], expression:{type: 'harmonic', notation: []}};
        const id = await manager.store(snippet);

        const result = (await manager.getSnippets({name: snippetName}))[0];
        expect(result.id).to.equal(id);
    });

    it('updates a snippet', async function()
    {
        const snippetName = 'New snippet';
        const updatedName = 'Updated name';

        const manager = new SnippetManager(new MockDatabase());
        const snippet = (await manager.getSnippets({name: snippetName}))[0];
        snippet.names[0].value = updatedName;
        await manager.update(snippet);

        const result = (await manager.getSnippets({name: updatedName}))[0];
        expect(result.names[0].value).to.equal('Updated name');
    })
})