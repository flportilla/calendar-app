import React from 'react'

export const CalendarEventCell = ({ event }) => {

    const { title, user } = event

    return (
        <>
            <strong>{title}</strong>
            <span>- {user.name}</span>
        </>
    )
}
