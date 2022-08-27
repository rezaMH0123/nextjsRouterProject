import { MongoClient } from 'mongodb'

async function handler(req, res) {
  const eventId = req.query.eventId
  const client = await MongoClient.connect(
    'mongodb+srv://rezamh:Reza0123@cluster0.et41hsc.mongodb.net/newsletter?retryWrites=true&w=majority',
  )
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }
  if (req.method === 'POST') {
    const { email, text, name } = req.body
    const validateUserEmail = validateEmail(email)
    if (
      !validateUserEmail | !name.trim ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ massage: 'invalid input' })
      return
    }
    const newComment = {
      email,
      text,
      name,
      eventId,
    }
    const db = client.db()
    const respons = await db
      .collection('comments')
      .insertOne({ coments: newComment })

    newComment.id = respons.insertedId
    res.status(201).json({ massage: 'add comment!', Comment: newComment })
  }
  if (req.method === 'GET') {
    const db = client.db()
    const ducs = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray()
    const comment = ducs.map((item) => item)

    res.status(201).json({ massage: 'comment!s resivd', Comments: comment })
  }
  client.close()
}
export default handler
