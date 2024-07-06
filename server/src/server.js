const http = require('http')

const { app } = require('./app')
const {connectToMongoDB} = require('./services/mongo')
const {getPlanetsPromise, getAllPlanetsFromDB} = require('./models/planets.model')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)


async function getPlanetsAddStartServer () {
    await connectToMongoDB()
    //mongoose.connect(uri).then(() => console.log('Connected to MongoDB!'))
    await getPlanetsPromise
    await getAllPlanetsFromDB
    server.listen(PORT, () => {
        console.log(`HTTP server on Port ${PORT}`)
    })
}

getPlanetsAddStartServer()
