const {planets} = require('../../models/planets.model')
const {getAllPlanetsFromDB} = require('../../models/planets.model')

async function getAllPlanets (req,res) {
    // We have return to make sure that only there is on res in the function.
    // This was sending from planets object
    //return res.status(200).send(planets)

    // Now we will send res from db value
    return res.status(200).send(await getAllPlanetsFromDB())
}

module.exports = {
    getAllPlanets
}