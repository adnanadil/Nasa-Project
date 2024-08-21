const express = require('express')

const {getAllPlanets} = require('./planets.controller')

const planetsRoute = express.Router()

planetsRoute.get('/', getAllPlanets)

module.exports = planetsRoute