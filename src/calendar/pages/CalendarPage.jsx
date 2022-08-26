import React from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar } from '../'

import { localizer } from '../../helpers'
//import { localizer, getMessagesES } from '../../helpers'


const events = [{
    title: 'birthday',
    notes: 'say hi',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'flportilla'
    }
}]

export const CalendarPage = () => {

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#232323',
            borderRadius: '5px',
            opacity: '0.8',
            color: 'white'
        }
        return {
            style
        }
    }

    return (
        <>
            <Navbar />

            <Calendar
                //culture='es'
                //messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
            />

        </>
    )
}
