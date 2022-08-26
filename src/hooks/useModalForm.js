import { useEffect, useMemo, useState } from 'react'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import { addHours, differenceInSeconds } from 'date-fns';
import { onSetActiveEvent } from '../store';
import { useCalendarStore } from './useCalendarStore';

const initialFormState = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
}

export const useModalForm = (initialState = {}) => {

    const { activeEvent } = useCalendarStore()

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formValues, setformValues] = useState(initialState)

    const titleClass = useMemo(() => {
        if (!formSubmitted) return ''

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setformValues({ ...activeEvent })
        }

    }, [activeEvent])


    const onInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing = '') => {
        setformValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (difference < 0 || isNaN(difference)) {
            Swal.fire('The dates are wrong',
                'Please check the date field')
            return
        };

        if (formValues.title.length <= 0) return
    }

    return {

        onDateChange,
        onInputChange,
        onSubmit,
        titleClass,
        formValues
    }
}