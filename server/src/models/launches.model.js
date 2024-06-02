// Here we will create a map 

const launches = new Map()
let latestFlightNumber = 100;

// This is the default launch
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    destination: "Kepler-442 b",
    customer: ["ZTM","NASA"],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
    return Array.from(launches.values())
}

// Adding a new entry to the Map
function addNewLaunch(newLaunch) {
    // We are assigning the flight number server side.
    latestFlightNumber++

    // Now we have to make sure that the data in newLanch as 
    // well as additional set by us locally in this server is 
    // add to the new lauch. 
    launches.set(latestFlightNumber, Object.assign(newLaunch, {
        success: true,
        upcoming: true,
        customer: ["ZTM","NASA"],
        flightNumber: latestFlightNumber,
    }))
}


// Export the function like below but when you use it 
// you have to make use of the () .. only while using not when
// importing it. In this case in the controller. 
module.exports = {
    getAllLaunches,
    addNewLaunch
}