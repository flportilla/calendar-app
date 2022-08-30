import { fireEvent, render, screen } from '@testing-library/react'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { AppRouter } from '../../src/router/AppRouter'
import { MemoryRouter } from 'react-router-dom'

jest.mock('../../src/hooks/useAuthStore')

describe('Tests on <AppRouter /> component', () => {

    const mockCheckAuthToken = jest.fn()

    test('should show component with default values', () => {

        //checking, authenticated, not-authenticated
        useAuthStore.mockReturnValue({ status: 'checking', checkAuthToken: mockCheckAuthToken })

        render(<AppRouter />)

        expect(screen.getByText('Loading...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled()

    })

})