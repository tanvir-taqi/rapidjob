import connect from "@/utils/connect";


export default async function handler(req, res) {

    const { db, client } = await connect();
    try {
        const query = {}


       
        // Access the jobposts collection
        const collection = db.collection('jobposts');
        // Insert the new post document
        const results = await collection.find(query).toArray();
        res.status(200).send(results);
        // if(req.query.searchValue == ''){

        //     res.status(200).send(results);
        // }else{
        //     const filteredResult =  results.filter(result => result.jobtitle.includes(req.query.searchValue) || result.details.includes(req.query.searchValue) || result.responsibilities.includes(req.query.searchValue)|| result.requirements.includes(req.query.searchValue) )
        //     res.status(200).send(filteredResult);
        // }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not create get' });
    } finally {

    }


}