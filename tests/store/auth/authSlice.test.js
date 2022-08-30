import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser"

describe('Tests on authSlice', () => {

    test('should return default values', () => {

        expect(authSlice.getInitialState()).toEqual(initialState)

    })

    test('should login', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials))

        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    })

    test('should logout without error message', () => {

        const state = authSlice.reducer(authenticatedState, onLogout())

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })

    })

    test('should logout with error message', () => {

        const errorMessage = 'some random error'

        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        })
    })

    test('should clean the error message', () => {
        const errorMessage = 'some random error'

        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer(state, clearErrorMessage())

        expect(newState.errorMessage).toBe(undefined)

    })

    test('should change the status to checking', () => {

        const state = authSlice.reducer(authenticatedState, onChecking())

        expect(state).toEqual(initialState)

    })
})