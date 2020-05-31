import { expect } from 'chai';
import 'mocha';

import { addHarmony, addRythm, addMelody } from '../src/controllers/addControler';

import MockDatabase from './MockDatabase';
import SnippetManager from '../src/model/SnippetManager';

import Harmony from '../src/model/types/Harmony';
import Melody from '../src/model/types/Melody';
import Rythm from '../src/model/types/Rythm';

const harmony: Harmony = 
{
    type: 'harmony',
    scale: 'major',
    notation: 
    [
        ['1', '3', '5']
    ]
}

const rythm: Rythm = 
{
    type: 'rythm',
    timeSignature: [4, 4],
    notation: 
    [
        [4],
        [4],
        [4],
        [4]
    ]
}

const melody: Melody = 
{
    type: 'melody',
    timeSignature: [4, 4],
    notation: 
    [
        {
            degree: 'A',
            duration: 2,
            tuplet: 2
        },
        {
            degree: 'B',
            duration: 2,
            tuplet: 2
        }
    ]
}

describe('Add controller', function()
{

    SnippetManager.shared = new SnippetManager(new MockDatabase());
    
    it('Creates a harmony snippet', async function()
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

    it('Creates a rythm snippet', async function()
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
        const req = {body:{name: 'Four on the floor', timeSignature: rythm.timeSignature, notation: rythm.notation}};
        await addRythm(req, res, () => {})

        expect(res.statusCode).to.equal(200);
        const rythmStored = MockDatabase.snippets[2].expression as Rythm;
        expect(MockDatabase.snippets[2].id!).to.equal('2');
        expect(MockDatabase.snippets[2].names[0].value).to.equal('Four on the floor');
        expect(rythmStored.type).to.equal(rythm.type);
        expect(rythmStored.timeSignature).to.equal(rythm.timeSignature);
        for(let noteIndex in rythm.notation)
        {
            expect(rythm.notation[noteIndex][0]).to.equal(rythmStored.notation[noteIndex][0]);
        }
    })

    it('Creates a melody snippet', async function()
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
        const req = {body:{name: 'Whole Step', timeSignature: melody.timeSignature, notation: melody.notation}};
        await addMelody(req, res, () => {})

        expect(res.statusCode).to.equal(200);
        const melodyStored = MockDatabase.snippets[3].expression as Melody;
        expect(MockDatabase.snippets[3].id!).to.equal('3');
        expect(MockDatabase.snippets[3].names[0].value).to.equal('Whole Step');
        expect(melodyStored.type).to.equal(melody.type);
        expect(melodyStored.timeSignature).to.equal(melody.timeSignature);
        expect(melodyStored.notation.length).to.equal(melody.notation.length);
        for(let noteIndex in melody.notation)
        {
            expect(melody.notation[noteIndex].degree).to.equal(melodyStored.notation[noteIndex].degree);
            expect(melody.notation[noteIndex].duration).to.equal(melodyStored.notation[noteIndex].duration);
            expect(melody.notation[noteIndex].tuplet).to.equal(melodyStored.notation[noteIndex].tuplet);
        }
    })
})