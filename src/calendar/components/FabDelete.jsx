import React from 'react'
import { useCalendarStore } from '../../hooks'


export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected, activeEvent } = useCalendarStore()

    const handleDelete = async () => {

        await startDeletingEvent()
    }

    if (!hasEventSelected || activeEvent?.title === '') return <></>

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
        // style={{
        //     display: `${hasEventSelected} ? 'none' : '' `
        // }}
        >
            <i className='fas fa-trash-alt' />
        </button>
    )

}