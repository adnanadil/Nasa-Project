const http = require('http')
const mongoose = require('mongoose')

const { app } = require('./app')
const {getPlanetsPromise} = require('./models/planets.model')

const PORT = process.env.PORT || 3000
const uri = "mongodb+srv://adnanadil529:dG2kBtFqcxuRE39u@cluster0.wobemjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const server = http.createServer(app)
mongoose.connection.on('connected', () => {
    console.log('Connected to Mongoose DB')
})
mongoose.connection.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
  });

async function getPlanetsAddStartServer () {
    mongoose.connect(uri)
    //mongoose.connect(uri).then(() => console.log('Connected to MongoDB!'))
    await getPlanetsPromise
    server.listen(PORT, () => {
        console.log(`HTTP server on Port ${PORT}`)
    })
}

getPlanetsAddStartServer()
