import connect from "@/utils/connect";


export default async function handler(req, res) {

    const { db, client } = await connect();
    try {
        let query


        if (req.body) {
            query = { jobtitle: req.body }

        } else {
            query = {}
        }
        // Access the jobposts collection
        const collection = db.collection('jobposts');
        // Insert the new post document
        const result = await collection.find(query).toArray();
        console.log('====================================');
        console.log(result);
        console.log('====================================');
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create get' });
    } finally {

    }


}