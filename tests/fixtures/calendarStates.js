export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'first event',
        notes: 'notes 1',
    },
    {
        id: '2',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
        title: 'second event',
        notes: 'notes 2',
    },
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: null
}
export const calendarWithActiveEventState = {
    isLoadingEvents: true,
    events: [...events],
    activeEvent: { ...events[0] }
}

