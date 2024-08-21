const http = require('http')

require('dotenv').config()

const { app } = require('./app')
const {connectToMongoDB} = require('./services/mongo')
const {getPlanetsPromise, getAllPlanetsFromDB} = require('./models/planets.model')
const {getLaunchesFromAPI} = require('./models/launches.model')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)


async function getPlanetsAddStartServer () {
    await connectToMongoDB()
    await getLaunchesFromAPI()
    // This is a promise so it's like this
    await getPlanetsPromise
    await getAllPlanetsFromDB
    server.listen(PORT, () => {
        console.log(`HTTP server on Port ${PORT}`)
    })
}

getPlanetsAddStartServer()
