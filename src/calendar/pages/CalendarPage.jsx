import React, { useEffect, useState } from 'react'

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEventCell, CalendarModal, FabAddNew, FabDelete } from '../'

import { localizer } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'
//import { localizer, getMessagesES } from '../../helpers'

export const CalendarPage = () => {

    const { user } = useAuthStore()
    const { openDateModal } = useUiStore()
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

        const style = {
            backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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

    useEffect(() => {
        startLoadingEvents()
    }, [])

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
            <FabAddNew />
            <FabDelete />

        </>
    )
}
