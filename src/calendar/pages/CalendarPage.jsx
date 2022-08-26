import React, { useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar, CalendarEventCell } from '../'

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

    const [lastView, setLastView] = useState(localStorage.getItem('lastView' || 'week'))

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

    const onDoubleClick = (event) => {
        console.log({ doubleClick: event })
    }
    const onSelect = (event) => {
        console.log({ click: event })
    }
    const onViewChange = (event) => {
        localStorage.setItem('lastView', event)
        setLastView(event)
    }

    return (
        <>
            <Navbar />

            <Calendar
                //culture='es'
                //messages={getMessagesES()}
                defaultView={lastView}
                eventPropGetter={eventStyleGetter}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                components={{
                    event: CalendarEventCell
                }}
            />

        </>
    )
}
