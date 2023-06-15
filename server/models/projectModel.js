const mongoose = require('mongoose')

// creating new schema 
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
     type: String,
     required: true 
    },
    description:{
        type: String,
        required: true,
    },
    devSpec:{
        type: String,
        required: true,
    },
    details:{
        type: String ,
        required: true 
    },
    budget:{
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
      }

},{timestamps: true })

module.exports = mongoose.model('Project',projectSchema)