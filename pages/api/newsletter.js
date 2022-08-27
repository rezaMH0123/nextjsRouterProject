import { MongoClient } from 'mongodb'
import { connectDatabase, insertDatabase } from '../../helpers/db-utils'
// async function connectDatabase() {
//   const client = await MongoClient.connect(
//     'mongodb+srv://rezamh:Reza0123@cluster0.et41hsc.mongodb.net/newsletter?retryWrites=true&w=majority',
//   )
//   return client
// }
// async function insertDatabase(client, ducuments) {
//   const db = client.db()
//   await db.collection('email').insertOne(ducuments)
// }

async function handler(req, res) {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }
  if (req.method === 'POST') {
    const userEmail = req.body.email
    const validateUserEmail = validateEmail(userEmail)
    if (!userEmail || !validateUserEmail) {
      res.status(442).json({ massage: 'Invalid email addres!' })
      return
    }
    let client
    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ massage: 'connecting to dataBAse is faild!' })
      return
    }
    try {
      await insertDatabase(client, 'email', { email: userEmail })
      res.status(201).json({ massage: 'sign up!' })
      client.close()
    } catch (error) {
      res.status(500).json({ massage: 'inserting email is faild!' })
    }
  }
}
export default handler
