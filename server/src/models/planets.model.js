// We will be converting this code into fs capler thing to get the planets from the csv file. 

// Step 1: Was to save the CSV file in my project directory 
// Step 2: I have to read the CSV file but there is a catch, I remember we had to use pip 
// to take the read data which is a stream of byte and the pipe to make sense of it. 
// So we will use Node.js to first read the file 

// Basically we use the file system of node to read the file and this in the form of bytes 
// then pipe this stream so that we can convert the byte into data that makes and for that 
// we need csv parser

const fs = require('fs')
const {parse} = require('csv-parse')
const path = require('path')
const { error } = require('console')

// We do this make sure that we able to get the path of the file regardless of the os the code is 
// running in.
const filePath = path.join(__dirname, '..' , '..', 'data', 'kepler_data.csv') 

console.log(filePath)

// Now we have to read this file and csv parse it 
fs.createReadStream(filePath)
.pipe(parse({
    comment: '#',
    columns: true,
}))
.on('data', (data) => console.log(data))
.on('error', () =>{
    console.log(`We got an error: ${error}`)
})


console.log(filePath)

const planets = [1]

module.exports = planets
