import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useUiStore } from '../../src/hooks/useUiStore'
import { uiSlice } from '../../src/store/ui/uiSlice'

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Tests on useUiStore', () => {

    test('should return the default values', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        })

    })


    test('openDateModal should place true in the isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: false })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        act(() => {
            result.current.openDateModal()
        })

        expect(result.current.isDateModalOpen).toBeTruthy()
    })

    test('closeDateModal should place false in the isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: true })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })


        act(() => {
            result.current.closeDateModal()
        })

        expect(result.current.isDateModalOpen).toBeFalsy()
    })

    test('toggleDateModal should toggle the isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: true })

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        act(() => {
            result.current.toggleDateModal()
        })
        expect(result.current.isDateModalOpen).toBeFalsy()

        act(() => {
            result.current.toggleDateModal()
        })
        expect(result.current.isDateModalOpen).toBeTruthy()

    })
})