import { MongoClient } from 'mongodb'

const uri = process.env.NEXT_PUBLIC_DB_CONNECT

async function connect() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // if (!client.isConnected()) {
  // await client.connect()
  // }
  const connection = await client.connect()
  if (connection) {
    const db = client.db('rapidjob')
    return { db, client }
  }
  else {
    return
  }
}

export default connect
