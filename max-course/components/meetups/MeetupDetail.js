import React from 'react'
import classes from './MeetupDetail.module.css'

export default function MeetupDetail(props) {
    return <session className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.title}</address>
        <p>The meetup description</p>
    </session>
}
