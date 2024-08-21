const mongoose = require('mongoose');

// Mongoose is the laer that helps Node.js to talk to talk to MongoDB

// We don't have a schema or strucuture in MongoDB unlike relationship DB
// hence we make use of scheme of mongoose to give some kind of structure to 
// to the data and to make sure it follows certain rules 
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [ String ],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Connects launchesSchema with the "launches" collection
/*
Model: A model is a compiled version of a schema and serves as an interface for interacting with the database. It provides methods for querying, inserting, updating, and deleting documents from the database.
In Mongoose, a model is created from a schema and is used to interact with the corresponding collection.
*/
const launchesModel = mongoose.model('Launch', launchesSchema);

  module.exports = {
    launchesModel
  }