



import connect from "@/utils/connect"



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const application = req.body
  
    const { db, client } = await connect()
    try {
      await db.collection('applications').insertOne(application)
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
