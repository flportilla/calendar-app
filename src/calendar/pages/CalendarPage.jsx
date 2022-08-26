import React, { useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar, CalendarEventCell, CalendarModal } from '../'

import { localizer } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'
//import { localizer, getMessagesES } from '../../helpers'

export const CalendarPage = () => {

    const { openDateModal } = useUiStore()
    const { events, setActiveEvent } = useCalendarStore()

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

    const onDoubleClick = () => {
        openDateModal()
    }
    const onSelect = (event) => {
        setActiveEvent(event)
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

            <CalendarModal />

        </>
    )
}
