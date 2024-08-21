const express = require('express')
var cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const { apiV1 } = require('./routes/apiV1')

const PORT = process.env.PORT || 3000

const planetsRoute = require('./routes/planets/planets.router')
const {launchesRouter} = require('./routes/launches/launches.router')



const app = express()
app.use(cors({
    origin: "*"
}))
app.use(morgan('combined'))
app.use(express.json())
// We can have a base version like without V1 or stuff and for this we will have to move this 
// decleration outside into a new router and add it to this. 
// That file will be just like apiV1 but when you define it here it will be like 
// app.use('/', baseVersion)
app.use('/planets',planetsRoute)
app.use('/launches',launchesRouter)
app.use('/v1',apiV1)
app.use(express.static(path.join(__dirname , ".." ,"public")))
app.get('/*', (req,res) => {
    console.log('Hitting this end point')
    res.sendFile((path.join(__dirname , ".." ,"public", 'index.html')))
})



// app.listen(PORT, () => {
//     console.log(`Hello there ${PORT}`)
// })

module.exports = {
    app
}


