import { MongoClient } from 'mongodb'
import React, {useEffect, useState} from 'react'
import MeetupList from '../components/meetups/MeetupList'


const dummyMeetups = [
    {
        id: '1',
        title: 'First meetup',
        image: 'https://www.saopaulo.sp.gov.br/wp-content/uploads/2016/12/praca-se.jpg',
        address: 'Sao Paulo, marco zero'
    }
]

export default function index(props) {

    // const [loadedMeetups, setLoadedMeetups] = useState([])

    // useEffect(() => {
    //     setLoadedMeetups(dummyMeetups)
    // }, [])
 
    return <MeetupList meetups={props.meetups} />
}

// export async function getServerSideProps(context){
//     // const req = context.req
//     // const res = context.res

//     return {
//         props:{
//             meetups: dummyMeetups
//         }
//     }
// }

export async function getStaticProps(){

    const client = await MongoClient.connect('mongodb://root:example@localhost:27017')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()
    client.close()


    // fetch('/api/meetups')

    return {
        props: {
            meetups: meetups.map(meetup => ({
                ...meetup,
                _id:null,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}
