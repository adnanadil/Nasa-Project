// Import the mongoose Model 
const {launchesModel} = require('./launches.mongoose')
const {planetModel} = require('./planets.mongoose')

const axios = require('axios')
const SpaceX_API_Link = "https://api.spacexdata.com/v4/launches/query"

const DEFAULT_FLIGHT_NUMBER = 100;

// Here we will create a map 
const launches = new Map()
let latestFlightNumber = 100;

// This is the default launch
// const launch = {
//     flightNumber: 100,
//     mission: "Kepler Exploration X",
//     rocket: "Explorer IS1",
//     launchDate: new Date('December 27, 2030'),
//     target: "Kepler-442 b",
//     customer: ["ZTM","NASA"],
//     upcoming: true,
//     success: true
// }

// launches.set(launch.flightNumber, launch)

// saveLauch(launch)

async function saveLauch(lauchData) {

    await launchesModel.findOneAndUpdate(
        {flightNumber: lauchData.flightNumber},
        lauchData,
        {
            upsert: true
        }
    )
}

async function getLaunchesFromAPI() {
    
    const firstLauch = await findLauch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    })

    if (!firstLauch) {
        console.log('We have the lauches from the API in our DB')
    }
    else{
        populateLauches()
    }
}

async function populateLauches() {
    const SpaceX_lauches = await axios.post(SpaceX_API_Link, {
        query: {},
        options: {
            pagination: false,
            populate : [
                {
                    path: "rocket",
                    select :{
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers : 1
                    }
                }
            ]
        }
    });


    const lauchDocs = SpaceX_lauches.data.docs
    for (const launchData of lauchDocs){
        const rawCustomers = launchData["payloads"]
        const customerArray = rawCustomers.flatMap((rawCustomer) => {
            return rawCustomer["customers"]
        })
        // console.log(launchData)
        const eachLauchData = {
            flightNumber : launchData["flight_number"],
            mission:launchData["name"],
            rocket: launchData["rocket"]["name"],
            launcheDate: launchData["date_local"],
            upcoming: launchData["upcoming"],
            success: launchData["success"],
            customers: customerArray, 
        }

        // console.log(eachLauchData)
        await saveLauch(eachLauchData)

    }
}



async function getAllLaunches(skip, limit) {
    // return Array.from(launches.values())
    return await launchesModel
    .find(
        {},
        {'id': 0, '__v':0}
    )
    .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit)
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

    // check if the planet data is present in the db 
    const lauchData = newLanch

    const planet = await planetModel.findOne({
        keplerName: lauchData.target
    })

    if(!planet) {
        throw new Error("No Such planet, So where are you going ??")
        // return "No Such planet, So where are you going ??"
    }

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

async function findLauch(filer) {
    return await launchesModel.find(filer)
}


async function doesLaunchExist(launchID) {
    return await findLauch({flightNumber: launchID})

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
    getLaunchesFromAPI,
    getAllLaunches,
    // addNewLaunch,
    doesLaunchExist,
    abortMission,
    scheduleNewLauch,
}