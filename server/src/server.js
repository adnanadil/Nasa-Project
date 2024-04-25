const http = require('http')

const { app } = require('./app')
const {getPlanetsPromise} = require('./models/planets.model')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

async function getPlanetsAddStartServer () {
    await getPlanetsPromise
    server.listen(PORT, () => {
        console.log(`HTTP server on Port ${PORT}`)
    })
}

getPlanetsAddStartServer()
