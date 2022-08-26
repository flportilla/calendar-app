import { useSelector, useDispatch } from 'react-redux'
import { onAddnewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store'

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            dispatch(onAddnewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }

    }

    const startDeletingEvent = async () => {
        dispatch(onDeleteEvent())
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
    }
}