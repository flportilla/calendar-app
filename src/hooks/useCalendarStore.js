import { useSelector, useDispatch } from 'react-redux'
import { onAddnewEvent, onSetActiveEvent } from '../store'

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            // actualizando
        } else {
            dispatch(onAddnewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }

    }


    return {
        //*Properties
        events,
        activeEvent,

        //*Methods
        setActiveEvent,
        startSavingEvent,
    }
}