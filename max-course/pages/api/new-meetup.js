import {MongoClient} from 'mongodb'

export default async function handler(req, res){

    console.log('chegou aqui')
    
    if(req.method == 'POST'){
        const data = req.body
        const {title, image, address, description} = data
        const client = await MongoClient.connect('mongodb://root:example@localhost:27017')
        const db = client.db()
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data)
        console.log({result})
        client.close()

        res.status(201).json({message: 'Meetup inserted'})
    }

}