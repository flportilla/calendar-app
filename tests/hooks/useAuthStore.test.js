import { useAuthStore } from "../../src/hooks/useAuthStore"
import { renderHook, act, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "../../src/store/auth/authSlice"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"
import calendarApi from "../../src/api/calendarApi"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Tests on useAuthStore', () => {

    beforeEach(() => localStorage.clear())

    test('should return default values', () => {

        const mockStore = getMockStore({ ...initialState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            checkAuthToken: expect.any(Function),
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
            status: 'checking',
            user: {},
        })
    })

    test('startLogin should login succesfully', async () => {


        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        await act(async () => {
            await result.current.startLogin(testUserCredentials)
        })

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'test user', uid: '630e31961b2c0b3650b4b76a' }
        })

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
    })

    test('startLogin should fail authentication', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        await act(async () => {
            await result.current.startLogin(
                {
                    email: 'nonexistingemail@false.com',
                    password: 'wrongpassword'
                })
        })

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
        })
        expect(localStorage.getItem('token')).toBeFalsy()

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        )
    })

    test('startRegister should create an user', async () => {

        const newUser2 = {
            email: 'test2user@test2.com',
            password: '123456',
            name: 'test user 2'
        }

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>{children}</Provider>
        })

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                name: 'any name',
                uid: 'any id',
                token: 'any token',
            }
        })

        await act(async () => {
            await result.current.startRegister(newUser2)
        })

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'any name', uid: 'any id' }
        })

        spy.mockRestore()
    })

    test('startRegister should fail the creation', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children}</Provider>
        })

        await act(async () => {
            await result.current.startRegister(testUserCredentials)
        })

        const { errorMessage, user, status } = result.current

        expect({ errorMessage, user, status }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: expect.any(String)
        })
    })

    test('checkAuthToken should fail if there is no token', async () => {
        const mockStore = getMockStore({ ...initialState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children}</Provider>
        })

        await act(async () => {
            await result.current.checkAuthToken()
        })

        const { errorMessage, user, status } = result.current

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {},
        })

    })
    test('checkAuthToken should authenticate the user if there is a token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials)

        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({ ...initialState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}> {children}</Provider>
        })

        await act(async () => {
            await result.current.checkAuthToken()
        })

        const { errorMessage, user, status } = result.current

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            user: { name: 'test user', uid: '630e31961b2c0b3650b4b76a' },
            status: 'authenticated'
        })

    })
})