const {getAllLaunches, addNewLaunch, doesLaunchExist, abortMission} = require('../../models/launches.model')

function httpGetAllLaunches (req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunches(req, res) {
    const newLaunch = req.body

    // Since our date is coming in the form of string as we are not able to 
    // send data as JSON does not allow to pass date objects. 
    
    if (!newLaunch.mission || !newLaunch.rocket || !newLaunch.target || !newLaunch.launchDate){
        // return res.status('400').send('Data Fields Missing')
        return res.status('400').json({
            error: 'Data Fields Missing'
          })
    }

    newLaunch.launchDate = new Date(newLaunch.launchDate)
    if (isNaN(newLaunch.launchDate)){
        return res.status('400').json({
          error: 'Invalid Date'
        })
    }
    
    newLaunch.launchDate = new Date(newLaunch.launchDate)

    addNewLaunch(newLaunch)
    
    // Return is in place to make sure that there is no other res after this 
    // this is mostly used in express as safety as we cannot have two res.send in 
    // a function.
    return res.status(201).send(newLaunch)
}

function httpAbortLaunch(req,res) {
    // Convert the string to number as flightNumber is a string hence +
    const id = +req.params.id

    if(!doesLaunchExist(id)){
        return res.status(400).send({
            message: "Launch Not Found"
        })
    }

    const abortedLaunch = abortMission(id)
    return res.status(201).json({
        abortedLaunch
    })

}

module.exports= {
    httpGetAllLaunches,
    httpAddNewLaunches,
    httpAbortLaunch
}