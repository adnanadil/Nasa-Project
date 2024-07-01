const mongoose = require('mongoose')
const { Schema } = mongoose;

const planet = new Schema({
    keplerName:{
        type: String,
        required: true
    },
    // We can also define simply like
    // kelperName: String
})

// Will connect this model to the planets collect in the db
const planetModel = mongoose.model('Planet', planet)

module.exports = {
    planetModel
}