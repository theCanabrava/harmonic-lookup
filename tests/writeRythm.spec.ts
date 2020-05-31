import { expect } from 'chai';
import 'mocha';

import writeRythm from '../src/model/functions/writeRythm';
import search from '../src/model/functions/search';

import Rythm from '../src/model/types/Rythm';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';

const rythm: Rythm = 
{
    type: 'rythm',
    timeSignature: [9, 8],
    notation: 
    [
        [4],
        [4],
        [4],
        [8]
    ]
}

describe('Write Rythm', function()
{
    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('saves a rythm snippet', async function()
    {
        const id = await writeRythm(rythm);
        const result = (await search({expression: rythm}))[0];
        expect(result.id).to.equal(id);
    })
})