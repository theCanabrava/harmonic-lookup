import { expect } from 'chai';
import 'mocha';

import { addHarmony } from '../src/controllers/addControler';

import MockDatabase from './MockDatabase';
import SnippetManager from '../src/model/SnippetManager';

import Harmony from '../src/model/types/Harmony';

const harmony: Harmony = 
{
    type: 'harmony',
    scale: 'major',
    notation: 
    [
        ['1', '3', '5']
    ]
}


describe('Add controller', function()
{

    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('Creates a snippet', async function()
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
                return;
            }
        }
        const req = {body:{name: 'Jazz cadence', scale: harmony.scale, notation: harmony.notation}};
        await addHarmony(req, res, () => {})

        expect(res.statusCode).to.equal(200);
        const harmonyStored = MockDatabase.snippets[1].expression as Harmony;
        expect(MockDatabase.snippets[1].id!).to.equal('1');
        expect(MockDatabase.snippets[1].names[0].value).to.equal('Jazz cadence');
        expect(harmonyStored.type).to.equal(harmony.type);
        expect(harmonyStored.scale).to.equal(harmony.scale);
        for(let chordIndex in harmony.notation)
        {
            for(let noteIndex in harmony.notation[chordIndex])
            {
                expect(harmony.notation[chordIndex][noteIndex]).to.equal(harmonyStored.notation[chordIndex][noteIndex]);
            }
        }
    })
})