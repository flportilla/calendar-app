import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import calendarApi from '../api/calendarApi'
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents'
import { onAddnewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store'

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {

                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                Swal.fire('Succed', 'Event updated', 'success')
                return
            }

            const { data } = await calendarApi.post('/events', calendarEvent)
            Swal.fire('Succed', 'Event created', 'success')
            dispatch(onAddnewEvent({ ...calendarEvent, id: data.savedEvent.id, user }))
        } catch (error) {

            console.log(error)
            const errorMsg = error.response.data?.msg
            Swal.fire('Error trying to save', errorMsg, 'error')

        }
    }

    const startDeletingEvent = async () => {

        try {

            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
            Swal.fire('Succed', 'Event deleted', 'success')

        } catch (error) {
            console.log(error)
            const errorMsg = error.response.data?.msg
            Swal.fire('Error trying to delete this event', errorMsg, 'error')
        }


    }

    const startLoadingEvents = async () => {

        try {

            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.events)
            dispatch(onLoadEvents(events))


        } catch (error) {
            console.log('error loading events')
            console.log(error)
        }

    }


    return {
        //*Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //*Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}