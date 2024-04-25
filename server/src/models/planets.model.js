// We will be converting this code into fs capler thing to get the planets from the csv file. 

// Step 1: Was to save the CSV file in my project directory 
// Step 2: I have to read the CSV file but there is a catch, I remember we had to use pip 
// to take the read data which is a stream of byte and the pipe to make sense of it. 
// So we will use Node.js to first read the file 

// Basically we use the file system of node to read the file and this in the form of bytes 
// then pipe this stream so that we can convert the byte into data that makes and for that 
// we need csv parser.

const fs = require('fs')
const {parse} = require('csv-parse')
const path = require('path')
const { error } = require('console')

// We do this make sure that we able to get the path of the file regardless of the os the code is 
// running in.
const filePath = path.join(__dirname, '..' , '..', 'data', 'kepler_data.csv') 

const habitualPlanets = []

const checkHabitualPlanets = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

// NOTE: THE ABOVE LOGIC IS ASYNC THAT IS PLANETS EXPORTED AS AN EMPTY ARRAY 
// EVEN BEFORE THE ARRAY IS POPULATED FROM THE DATA FROM THE FILE AS THE FILE STREAM
// IS AN ASYNC PROCESS.... 

// Solution: We have to make use of promises in JS 
// An idea of promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Another like you can use: https://www.w3schools.com/js/js_promise.asp
// Note if you confused with fetch in that case fetch itself is promsie. 
// So now !!! : We will decleare the fs.createReadStream as a promise, export it in app.js 
// only when it is resolved we will make the server listen for request by putting the listen 
// code after the async await of this is completed. 

/*
// Example of promises with .then() and async await. 
const getPlanetsPromise = new Promise ((resolve, reject) => {

    resolve("I am done")
})

getPlanetsPromise.then((result) => console.log(`Yooooo: ${result}`))

async function waitForPlanets() {
    const result = await getPlanetsPromise
    console.log(`Result from asyn await: ${result}`)
}

waitForPlanets()
*/

// Now we have to read the file which will come as stream and csv parse it to get 
// it in the form of data that JS can read  

const getPlanetsPromise = new Promise ((resolve, reject) => {

    fs.createReadStream(filePath)
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        // Here we will filter the data and add only specific planets
        if (checkHabitualPlanets(data)){
            // Add the planet to the list 
            habitualPlanets.push(data)
        }
    })
    .on('error', (error) =>{
        reject(error)
    })
    .on('end', () => resolve(habitualPlanets))

})
// Now the above code (Promise) will be exported and we will import it in the server.js
// which is the start of the app and there we will implement then async fuciton.  


// Tips to export: https://www.tutorialsteacher.com/nodejs/nodejs-module-exports
module.exports = {
    planets: habitualPlanets,
    getPlanetsPromise: getPlanetsPromise
}
