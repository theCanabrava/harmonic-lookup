import { expect } from 'chai';
import 'mocha';

import write from '../src/model/functions/write';
import search from '../src/model/functions/search';

import Snippet from '../src/model/types/Snippet';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';

const snippet: Snippet = 
{
    names: [],
    expression: 
    {
        type: 'unit test',
        notation: []
    }
}

describe('Write', function()
{

    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('saves a snippet', async function()
    {
        const id = await write(snippet);
        const result = (await search({expressionType: 'unit test'}))[0];
        expect(result.id).to.equal(id);
    })
})