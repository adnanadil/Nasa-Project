const {planets} = require('../../models/planets.model')

function getAllPlanets (req,res) {
    // We have return to make sure that only there is on res in the function.
    return res.status(200).send(planets)
}

module.exports = {
    getAllPlanets
}