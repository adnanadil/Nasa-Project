const express = require('express')
var cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const PORT = process.env.PORT || 3000

const planetsRoute = require('./routes/planets/planets.router')
const {launchesRouter} = require('./routes/launches/launches.router')



const app = express()
app.use(cors({
    origin: "*"
}))
app.use(morgan('combined'))
app.use(express.json())
app.use(planetsRoute)
app.use(launchesRouter)
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


