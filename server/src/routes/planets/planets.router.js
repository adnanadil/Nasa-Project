const express = require('express')

const getPlanets = require('./planets.controller')

const planetRoute = express.Router()

planetRoute.get('/', getPlanets)

module.exports = planetRoute