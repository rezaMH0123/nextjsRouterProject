import { MongoClient } from 'mongodb'
export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://rezamh:Reza0123@cluster0.et41hsc.mongodb.net/newsletter?retryWrites=true&w=majority',
  )
  return client
}

export async function insertDatabase(client, collection, ducuments) {
  const db = client.db()
  const result = await db.collection(collection).insertOne(ducuments)

  return result
}
