import { MongoClient } from 'mongodb';
import { Link } from './app';

const url = 'mongodb://db/test_database';

export async function getConnection() {
    return await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export async function insertObject(collection: string, obj: Link) {
    const client = await getConnection();
    try {
        const db = client.db();
        db.collection(collection).insertOne(obj);
        console.log("Done, link was saved");
    }
    finally {
        client.close();
    }
}

export async function findObject(collection: string, filter: any): Promise<Link | null> {
    const client = await getConnection();
    try {
        const db = client.db();
        return db.collection(collection).findOne(filter);
    }
    finally {
        client.close();
    }
}
