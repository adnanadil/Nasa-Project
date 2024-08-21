// What we will do is that we will have a route for version here 
// that is version v1 will point to specific controllers and then if we 
// v2 .... 10 we can make them point to various controllers

// so for this to work you have to define your routes in the fashion were we 
// decide on its initial path while using app.use() like below


const express = require('express')

const apiV1 = express.Router()

const planetsRoute = require('./planets/planets.router')
const {launchesRouter} = require('./launches/launches.router')

// So we start with the base router localhost + v1/planets + anything after will be handled by the
// respective planets of lauches routes
apiV1.use('/planets', planetsRoute)
apiV1.use('/launches', launchesRouter)


module.exports = {
    apiV1
}