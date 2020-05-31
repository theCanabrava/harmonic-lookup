import { expect } from 'chai';
import 'mocha';

import writeMelody from '../src/model/functions/writeMelody';
import search from '../src/model/functions/search';

import Melody from '../src/model/types/Melody';
import SnippetManager from '../src/model/SnippetManager';
import MockDatabase from './MockDatabase';

const melody: Melody = 
{
    type: 'melody',
    timeSignature: [4, 4],
    notation: 
    [
        {
            degree: 'C',
            duration: 2,
            tuplet: 2
        },
        {
            degree: 'E',
            duration: 2,
            tuplet: 2
        },
        {
            degree: 'G',
            duration: 2,
            tuplet: 2
        },
    ]
}

describe('Write Rythm', function()
{
    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('saves a rythm snippet', async function()
    {
        const id = await writeMelody(melody);
        const result = (await search({expression: melody}))[0];
        expect(result.id).to.equal(id);
    })
})