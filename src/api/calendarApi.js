import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// Add a request interceptor
calendarApi.interceptors.request.use(
    config => {

        const token = localStorage.getItem('token')

        if (token) {
            config.headers['x-cabe'] = token
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export default calendarApi