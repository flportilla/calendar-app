import { fireEvent, render, screen } from '@testing-library/react'
import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { useCalendarStore } from '../../../src/hooks'

jest.mock('../../../src/hooks/useCalendarStore')

describe('tests on <FabDelete/> component', () => {

    const mockStartDeletingEvent = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should show the component correctly', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('delete-btn')

        expect(btn.classList).toContain("btn")
        expect(btn.classList).toContain("btn-danger")
        expect(btn.classList).toContain("fab-danger")
    })

    test('should call startDeletingEvent if there is an active event', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        })

        render(<FabDelete />)
        const btn = screen.getByLabelText('delete-btn')
        fireEvent.click(btn)

        expect(mockStartDeletingEvent).toHaveBeenCalled()
    })

})