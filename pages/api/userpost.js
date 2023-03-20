



import connect from "@/utils/connect"



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const user = req.body
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const { db, client } = await connect()
    try {
      await db.collection('users').insertOne(user)
      res.status(201).json({ message: 'User added' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Something went wrong' })
    } finally {

    }
  } else {
    res.status(400).json({ message: 'Invalid request method!!!' })
  }
}
