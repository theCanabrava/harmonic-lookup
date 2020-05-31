import { expect } from 'chai';
import 'mocha';

import writeHarmony from '../src/model/functions/writeHarmony';
import search from '../src/model/functions/search';

import Harmony from '../src/model/types/Harmony';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';

const harmony: Harmony = 
{
    type: 'harmony',
    scale: 'major',
    notation: 
    [
        ['1', '4', '6'],
        ['5', '7', '2'],
        ['1', '3', '5']
    ]
}

describe('Write Hamony', function()
{
    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('saves a harmony snippet', async function()
    {
        const id = await writeHarmony(harmony);
        const result = (await search({expression: harmony}))[0];
        expect(result.id).to.equal(id);
    })
})