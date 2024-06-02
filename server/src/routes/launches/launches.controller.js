const {getAllLaunches, addNewLaunch} = require('../../models/launches.model')

function httpGetAllLaunches (req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunches(req, res) {
    const newLaunch = req.body

    // Since our date is coming in the form of string as we are not able to 
    // send data as JSON does not allow to pass date objects. 
    
    newLaunch.launchDate = new Date(newLaunch.launchDate)

    addNewLaunch(newLaunch)
    
    // Return is in place to make sure that there is no other res after this 
    // this is mostly used in express as safety as we cannot have two res.send in 
    // a function.
    return res.status(201).send(newLaunch)
}

module.exports= {
    httpGetAllLaunches,
    httpAddNewLaunches
}