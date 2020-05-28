import DatabaseInterface from "../model/interfaces/DatabaseInterface";
import Snippet from "../model/types/Snippet";

import { getDb } from './connect';
import { ObjectID } from "mongodb";
import Query from "../model/types/Query";

const SNIPPET = 'snippet';

export default class Database implements DatabaseInterface
{
    async write(snippet: Snippet): Promise <string>
    {
        if(snippet.id) return this.update(snippet);
        else return this.create(snippet);
    }

    async update(snippet: Snippet): Promise<string>
    {
        const db = await getDb();
        const id = snippet.id!;
        delete snippet.id;
        await db.collection(SNIPPET).replaceOne({_id: new ObjectID(id)}, snippet);
        return id;
    }

    async create(snippet: Snippet): Promise<string>
    {
        const db = await getDb();
        const result = await db.collection(SNIPPET).insertOne(snippet);
        return result.insertedId.toString();
    }
    
    async query(query: Query): Promise<Snippet[]>
    {
        const results: Snippet[] = [];
        if(query.id) await this.findById(query, results);
        if(query.name) await this.findByName(query, results);
        if(query.expressionType) await this.findByExpressionType(query, results);
        if(query.expression) await this.findByExpression(query, results);
        return results;
    }

    async findById(query: Query, result: Snippet[])
    {
        const db = await getDb();
        const found = await db.collection(SNIPPET).find({_id: new ObjectID(query.id)}).toArray();
        for(let index in found) result.push(this.convertToSnippet(found[index]));
    }

    async findByName(query: Query, result: Snippet[])
    {
        const db = await getDb();
        const found = await db.collection(SNIPPET).find({"names.value": query.name}).toArray();
        for(let index in found) result.push(this.convertToSnippet(found[index]));
    }

    async findByExpressionType(query: Query, result: Snippet[])
    {
        const db = await getDb();
        const found = await db.collection(SNIPPET).find({"expression.type": query.expressionType}).toArray();
        for(let index in found) result.push(this.convertToSnippet(found[index]));
    }

    async findByExpression(query: Query, result: Snippet[])
    {
        const db = await getDb();
        const found = await db.collection(SNIPPET).find({"expression.notation": query.expression!.notation}).toArray();
        for(let index in found) result.push(this.convertToSnippet(found[index]));
    }

    convertToSnippet(dbObject: any): Snippet
    {
        dbObject.id = dbObject._id;
        delete dbObject._id;
        return {...dbObject}
    }

 
}