const express = require('express')
var cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 3000

const planetsRoute = require('./routes/planets/planets.router')


const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(planetsRoute)
app.use(express.static(path.join(__dirname , ".." ,"public")))



// app.listen(PORT, () => {
//     console.log(`Hello there ${PORT}`)
// })

module.exports = {
    app
}