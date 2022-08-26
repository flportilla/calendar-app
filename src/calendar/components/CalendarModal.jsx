import React from 'react'

import Modal from 'react-modal'
import './CalendarModal.css'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { addHours } from 'date-fns'

import { useModalForm, useUiStore } from '../../hooks'

//import es from 'date-fns/locale/es'
//registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        rigth: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const initialFormState = {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
}

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()

    const {
        onDateChange,
        onInputChange,
        onSubmit,
        titleClass,
        formValues } = useModalForm(initialFormState)

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> New event </h1>
            <hr />
            <form
                className="container"
                onSubmit={onSubmit}
            >

                <div className="form-group mb-2">
                    <label>Start date and time</label>
                    < DatePicker

                        selected={formValues.start}
                        onChange={(event) => onDateChange(event, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                    //locale="es"
                    //timeCaption="hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>End date and time</label>
                    < DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => onDateChange(event, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                    //locale="es"
                    //timeCaption="hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Event title"
                        name="title"
                        value={formValues.title}
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Short description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows={5}
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Additional info</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>
            </form>
        </Modal>
    )
};
