// Import the mongoose Model 
const {launchesModel} = require('./launches.mongoose')
const {planetModel} = require('./planets.mongoose')

const DEFAULT_FLIGHT_NUMBER = 100;

// Here we will create a map 
const launches = new Map()
let latestFlightNumber = 100;

// This is the default launch
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "Kepler-442 b",
    customer: ["ZTM","NASA"],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch)

// saveLauch(launch)

async function saveLauch(lauchData) {

    //const lauchData = launch
    // check if the planet data is present in the db 

    const planet = await planetModel.findOne({
        keplerName: lauchData.target
    })

    if(!planet) {
        throw new Error("No Such planet, So where are you going ??")
        // return "No Such planet, So where are you going ??"
    }

    await launchesModel.updateOne(
        {flightNumber: lauchData.flightNumber},
        lauchData,
        {
            upsert: true
        }
    )
}

async function getAllLaunches() {
    // return Array.from(launches.values())
    return await launchesModel.find({})
}

//We will schedule a new lauch but we have to make sure that 
// the flight number is udated 

async function scheduleNewLauch(newLanch) {
    // Get the latest Flight Number if there is no flight number i.e
    // new entry then we will use the default number of 100

    // so we will arrange the documetns in descending order and get the 
    // first item. 

    // Now we will process the NewLauch to be added and send to the saveLauch()
    // Function. 

    await getLatestFlightNumber()

    const newLanuchToAdd = Object.assign(
        newLanch,{
            flightNumber: latestFlightNumber++,
            customers: ['Zero To Mastery', 'NASA'],
            success: true,
            upcoming: true
        }
    )

    await saveLauch(newLanuchToAdd)

}

async function getLatestFlightNumber() {
    const latestFlightNumber = await launchesModel
        .findOne()
        .sort('-flightNumber')

    if (!latestFlightNumber){
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestFlightNumber.flightNumber
}


async function doesLaunchExist(launchID) {
    return await launchesModel.findOne({flightNumber: launchID})

}

async function abortMission(launchID) {
    var aborted = await launchesModel.updateOne({flightNumber:launchID},{
        success: false,
        upcoming:false
    })

    return aborted.modifiedCount == 1
}


// Export the function like below but when you use it 
// you have to make use of the () .. only while using not when
// importing it. In this case in the controller. 
module.exports = {
    getAllLaunches,
    // addNewLaunch,
    doesLaunchExist,
    abortMission,
    scheduleNewLauch,
}