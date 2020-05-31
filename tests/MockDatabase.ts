import Snippet from '../src/model/types/Snippet';
import Query from '../src/model/types/Query';

import DatabaseInterface from '../src/model/interfaces/DatabaseInterface';

export default class MockDatabase implements DatabaseInterface
{
    static snippets: Snippet[] =
    [{
        id: '0',
        names: 
        [
            {
                value: 'Unit test snippet',
                score: 0
            }
        ],
        expression:
        {
            type: 'harmony',
            notation: [['1', '2', '3']],
        }
    }]



    async write(snippet: Snippet): Promise<string>
    {
        if(snippet.id) return this.updateSnippet(snippet);
        else return this.createSnippet(snippet);
    }

    private updateSnippet(snippet: Snippet): string
    {
        MockDatabase.snippets[Number(snippet.id)] = snippet;
        return snippet.id!
    }

    private createSnippet(snippet: Snippet)
    {
        snippet.id = MockDatabase.snippets.length.toString();
        MockDatabase.snippets.push(snippet);
        return snippet.id!
    }

    async query(query: Query): Promise<Snippet[]>
    {
        const results: Snippet[] = [];
        if(query.id) this.searchId(results, query);
        if(query.name) this.searchName(results, query);
        if(query.expression) this.searchExpression(results, query);
        if(query.expressionType) this.searchExpressionType(results, query);
        return results;
    }

    private searchId(results: Snippet[], query: Query)
    {
        for(let snippet of MockDatabase.snippets)
        {
            if(snippet.id! === query.id!) results.push(snippet);
        }
    }

    private searchName(results: Snippet[], query: Query)
    {
        for(let snippet of MockDatabase.snippets)
        {
            for(let name of snippet.names)
            {
                if(name.value === query.name)  
                {
                    results.push(snippet);
                }
            }
        }
    }

    private searchExpression(results: Snippet[], query: Query)
    {
        for(let snippet of MockDatabase.snippets)
        {
            if(query.expression!.type === snippet.expression.type)
            {
                if(snippet.expression.type === 'harmony' || snippet.expression.type === 'rythm')
                {
                    let push = true;
                    for(let chordIndex in snippet.expression.notation)
                    {
                        for(let noteIndex in snippet.expression.notation[chordIndex])
                        {
                            if(snippet.expression.notation[chordIndex][noteIndex]!==query.expression!.notation[chordIndex][noteIndex])
                            {
                                push = false
                            };
                        }
                    }
                    if(push) results.push(snippet);
                }
                if(snippet.expression.type === 'melody')
                {
                    if(snippet.expression.notation.length === query.expression!.notation.length)
                    {
                        results.push(snippet);
                    }
                } 
            }
        }
    }

    private searchExpressionType(results: Snippet[], query: Query)
    {
        for(let snippet of MockDatabase.snippets)
        {
            if(query.expressionType === snippet.expression.type) 
            {
                results.push(snippet);
            }
        }
    }
}