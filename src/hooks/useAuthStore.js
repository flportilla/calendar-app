import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi'
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice'

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const startLogin = async ({ email = '', password = '' }) => {
        dispatch(onChecking())
        try {

            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)

            dispatch(
                onLogin({
                    name: data.name,
                    uid: data.uid
                })
            )

        } catch (error) {

            dispatch(onLogout('Wrong credentials'))
            setTimeout(() => dispatch(clearErrorMessage()), 10)
        }
    }
    const startRegister = async ({ email = '', password = '', name = '' }) => {

        dispatch(onChecking())

        console.log(email, password, name)

        try {

            const { data } = await calendarApi.post('/auth/new', {
                name, email, password
            })
            console.log(data)
            localStorage.setItem('token', data.token)

            dispatch(
                onLogin({
                    name: data.name,
                    uid: data.uid
                })
            )

        } catch (error) {

            const errorMsg = error.response.data.errors[0]?.msg
            setTimeout(() => dispatch(clearErrorMessage()), 10)
            dispatch(onLogout(errorMsg))
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token')

        if (!token) return dispatch(onLogout())

        try {

            const { data } = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)

            dispatch(
                onLogin({
                    name: data.name,
                    uid: data.uid
                })
            )

        } catch (error) {
            dispatch(onLogout())
            localStorage.clear()
        }

    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogout())
    }

    return {
        //* Properties

        status,
        user,
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}