const request = require('supertest')
const {app} = require('../../app')

describe('Testing /launches Get', () => {
    test('Must Respond with status 200', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

describe('Testing Post /launches', () => {

    const launchDataWithCorrectDate = { 
        mission: "Test Mission",
        rocket: "Adnan Rocket",
        target: "Millionaire",
        launchDate: "12 October, 1993"
    }

    const launchDataWithInCorrectDate = {
        mission: "Test Mission",
        rocket: "Adnan Rocket",
        target: "Millionaire",
        launchDate: "Opps"
    }

    const launchDataWithMissingDate = {
        mission: "Test Mission",
        rocket: "Adnan Rocket",
        target: "Millionaire",
    }

    test('Testing correct data entry', async () => {
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithCorrectDate)
        .expect('Content-Type', /json/)
        .expect(201)

        // Need to do this date ka majra because the date in response 
        // to matching to the date I am sending so I am making both of the 
        // same time and then we will compare the other result alone
        const dateThatHasBeenSent = new Date(launchDataWithCorrectDate.launchDate).valueOf()
        const receivedLaunchDate = new Date(response.body.launchDate).valueOf()

        expect(dateThatHasBeenSent).toBe(receivedLaunchDate)

        expect(response.body).toMatchObject(launchDataWithMissingDate)
    })


 
    test('Catching error of missing data with error 400', async () => {
        const response = await request(app)
        .post('/launches')
        .send(launchDataWithMissingDate)
        .expect('Content-Type', /json/)
        .expect(400)


        expect(response.body).toStrictEqual({
            error: 'Data Fields Missing'
        })
    })


    test('Catching error of wrong date with error 400', async () => {

        const response = await request(app)
        .post('/launches')
        .send(launchDataWithInCorrectDate)
        .expect('Content-type', /json/)
        .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invalid Date'
        })
    })
})