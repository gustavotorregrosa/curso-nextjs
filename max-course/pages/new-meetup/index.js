import React from 'react'
import {useRouter} from 'next/router'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

export default function index() {
    const router = useRouter()

    const addMeetupHandler = async enteredMeetupData => {
        console.log({enteredMeetupData})
        const response = await fetch('/api/new-meetup', {
            method: 'post',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log({data})

        router.push('/')


    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}
