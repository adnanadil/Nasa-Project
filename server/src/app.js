const express = require('express')
const PORT = process.env.PORT || 3000

const planetRoute = require('./routes/planets/planets.router')


const app = express()
app.use(planetRoute)

// app.listen(PORT, () => {
//     console.log(`Hello there ${PORT}`)
// })

module.exports = {
    app
}