const mongoose = require('mongoose')

// I had to add this here because the test was not able to .env files
require('dotenv').config()


// We have used dotenv package and are placing the secret in the .env folder
const uri = process.env.MONGO_URL
//const uri = "mongodb+srv://adnanadil529:dG2kBtFqcxuRE39u@cluster0.wobemjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connection.on('connected', () => {
    console.log('Connected to Mongoose DB')
})
mongoose.connection.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
});

async function connectToMongoDB() {
    await mongoose.connect(uri)
}

async function disconnectToMongoDB() {
    await mongoose.disconnect(uri)
}

module.exports = {
    connectToMongoDB,
    disconnectToMongoDB
}