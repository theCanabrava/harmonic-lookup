import { expect } from 'chai';
import 'mocha';

import search from '../src/model/functions/search';
import Snippet from '../src/model/types/Snippet';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';

describe('Search', function()
{
    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('Finds a snippet', async function()
    {
        const snippet: Snippet = (await search({name: 'Unit test snippet'}))[0];
        expect(snippet.id).to.equal('0');
    })
})