const express = require('express')

const {getAllPlanets} = require('./planets.controller')

const planetsRoute = express.Router()

planetsRoute.get('/planets', getAllPlanets)

module.exports = planetsRoute