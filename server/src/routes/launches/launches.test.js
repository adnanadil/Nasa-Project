// Let me give an explanation of this. So we have the Jest library which helps us to 
// have the test runner, test fixtures, assertions and mocking data all in one library

// However we are making use of the Supertest library to call our own API which is this app
// describe helps us to add many tests under it.

// in the first part we make use of the "expect" of the supertest library which is to test get

// For post we make use of the combination of both. 
// We use the JEST expect to compare the data that we get we get back.

// Always remember response.body will give you the data that has been sent back. 

// Here we test the get end point and then we check the post, were we test the posting part 
// and make sure that the data and the date sent correctly gives us the correct response.

// Then we test the error cases where a field is missing or the data that is sent is not corect


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