import calendarApi from "../../src/api/calendarApi"

describe('tests on calendarApi', () => {

    test('should have the default setup', () => {

        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('should have x-cabe token in all requests', async () => {

        const token = 'abc-123-123-123'
        localStorage.setItem('token', token)

        const res = await calendarApi.get('/auth')

        expect(res.config.headers['x-cabe']).toBe(token)

    })
})