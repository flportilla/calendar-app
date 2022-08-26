import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = [{
    _id: new Date().getTime(),
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

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: tempEvent,
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },
        onAddnewEvent: (state, { payload }) => {
            state.events.push(payload)
            state.activeEvent = null
        }
    },
});

export const { onSetActiveEvent, onAddnewEvent } = calendarSlice.actions;