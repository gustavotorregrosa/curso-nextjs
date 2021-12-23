import { MongoClient, ObjectId } from 'mongodb'
import React, { Fragment } from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'


export default function index(props) {

    console.log({
        props
    })
    return <MeetupDetail {...props.meetupData} />
    // <Fragment>
    //     <img src='https://www.saopaulo.sp.gov.br/wp-content/uploads/2016/12/praca-se.jpg' alt='A first meetup' />
    //     <h1>A first meetup</h1>
    //     <address>Some street</address>
    //     <p>The meetup description</p>
    // </Fragment>
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId
    console.log({meetupId})


    const client = await MongoClient.connect('mongodb://root:example@localhost:27017')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    // const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})


    return {
        props: {
            meetupData: {
                ...selectedMeetup,
                _id: null,
                id: selectedMeetup._id.toString()
            }
            
            // {
            //     image:'https://www.saopaulo.sp.gov.br/wp-content/uploads/2016/12/praca-se.jpg',
            //     id: meetupId,
            //     title:'A first meetup',
            //     description: 'The meetup description'

            // }
        }
    }
}

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb://root:example@localhost:27017')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray()

    // const selectedMeetup = await meetupsCollection.findOne({_id: meetupId})

    client.close()

    return {
        fallback: true,
        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
        
        // [
        //     {
        //         params: {
        //             meetupId: '1'
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: '2'
        //         }
        //     }
        // ]
    }
}
