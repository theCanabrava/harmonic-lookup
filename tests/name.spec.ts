import { expect } from 'chai';
import 'mocha';

import name, {upvote, downvote} from '../src/model/functions/name';
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
        ['1', '3', '6']
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

    it('Upvotes a name', async function()
    {
        const snippet = (await search({name: 'Re-named'}))[0];
        const naming = 
        {
            id: snippet.id!,
            name: 'Re-named'
        };
        await upvote(naming);
        const result = (await search({name: 'Re-named'}))[0];
        expect(result.names[0].score).to.equal(1);
    })

    it('Downvotes a name', async function()
    {
        const snippet = (await search({name: 'Re-named'}))[0];
        const naming = 
        {
            id: snippet.id!,
            name: 'Re-named'
        };
        await downvote(naming);
        const result = (await search({name: 'Re-named'}))[0];
        expect(result.names[0].score).to.equal(0);
    })
})