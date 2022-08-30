import { calendarSlice, onAddnewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates"

describe('Tests on calendarSlice', () => {

    test('should return the default values', () => {

        const state = calendarSlice.getInitialState()

        expect(state).toEqual(initialState)
    })

    test('onSetActive event should activate the event', () => {

        const state = calendarSlice.reducer(
            calendarWithEventsState, onSetActiveEvent(events[0]))

        expect(state.activeEvent).toEqual(events[0])
    })

    test('onAddnewEvent should add an event', () => {

        const newEvent = {
            id: '3',
            start: new Date('2022-10-22 13:00:00'),
            end: new Date('2022-10-22 15:00:00'),
            title: 'new event',
            notes: 'new notes',
        }

        const state = calendarSlice.reducer(
            calendarWithEventsState, onAddnewEvent(newEvent)
        )
        // expect(state.events[0]).toEqual(newEvent)
        expect(state.events).toEqual([...events, newEvent])

    })

    test('onUpdateEvent should update an event', () => {

        const updatedEvent = {
            id: '1',
            start: new Date('2022-10-22 13:00:00'),
            end: new Date('2022-10-22 15:00:00'),
            title: 'updated event',
            notes: 'updated notes',
        }

        const state = calendarSlice.reducer(
            calendarWithEventsState, onUpdateEvent(updatedEvent)
        )
        // expect(state.events[0]).toEqual(updatedEvent)
        expect(state.events).toContain(updatedEvent)
    })

    test('onDeleteEvent should erase the active event', () => {

        const state = calendarSlice.reducer(
            calendarWithActiveEventState, onDeleteEvent()
        )
        // expect(state.events[0]).toEqual(updatedEvent)
        expect(state.events[0]).not.toContain(events[0])
        expect(state.activeEvent).toBe(null)


    })

    test('onLoadEvents should set the events', () => {

        const state = calendarSlice.reducer(
            initialState, onLoadEvents(events)
        )
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)

        const newState = calendarSlice.reducer(state, onLoadEvents(events))

        expect(newState.events.length).toBe(2)
    })

    test('onLogoutCalendar should clean the state', () => {

        const state = calendarSlice.reducer(
            calendarWithActiveEventState, onLogoutCalendar()
        )

        expect(state).toEqual(initialState)
    })


})