import { MongoClient, Db }  from 'mongodb';

let db: Db;

export async function getDb(): Promise <Db>
{
    if(!db) await connect();
    return db;
}

export async function connect()
{
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASS;
    const dbName = process.env.MONGO_DB;
    const url = `mongodb+srv://${user}:${password}@cluster0-d9sst.mongodb.net/${dbName}`;
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
    
    try
    {
        await client.connect();
        db = client.db(dbName);
    } 
    catch (err)
    {
        throw err;
    }

}