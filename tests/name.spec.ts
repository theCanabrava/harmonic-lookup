import { expect } from 'chai';
import 'mocha';

import name from '../src/model/functions/name';
import search from '../src/model/functions/search';
import writeHarmony from '../src/model/functions/writeHarmony';


import Harmony from '../src/model/types/Harmony';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';

const harmony: Harmony = 
{
    type: 'harmony',
    scale: 'major',
    notation: 
    [
        ['1', '3', '5']
    ]
}

describe('Name', function()
{
    SnippetManager.shared = new SnippetManager(new MockDatabase());

    it('Names a snippet', async function()
    {
        const id = await writeHarmony(harmony);
        await name({id: id, name: 'Re-named'});
        const result = (await search({id: id}))[0];
        expect(result.names[0].value).to.equal('Re-named');
    })
})