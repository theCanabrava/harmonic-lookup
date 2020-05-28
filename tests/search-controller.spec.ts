import { expect } from 'chai';
import 'mocha';
import { search } from '../src/controllers/searchController';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';
import Snippet from '../src/model/types/Snippet';

describe('Search controller', function()
{
    SnippetManager.shared = new SnippetManager(new MockDatabase());

    it('Gets an array of snippets', async function()
    {
        const res = 
        {
            statusCode: 500,
            snippets: [],
            status: function(code: number)
            {
                this.statusCode = code;
                return this;
            },
            json: function(data: any)
            {
                this.snippets = data!.snippets;
            }
        }
        const req = {body:{query:{name: 'Unit test snippet'}}};
        await search(req, res, () => {});
        const snippet = res.snippets[0] as Snippet;
        expect(res.statusCode).to.equal(200);
        expect(snippet.id).to.equal('0');
    })
})