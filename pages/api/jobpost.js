
import connect from "@/utils/connect"



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { db, client } = await connect();
        try {
          // Access the jobposts collection
          const collection = db.collection('jobposts');
          // Insert the new post document
          const result = await collection.insertOne(req.body);
          res.status(201).json({ message: 'Post created', id: result.insertedId });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Could not create post' });
        } finally {
         
        }
    }

    
  
  }
  