const mongoose = require('mongoose');

var Schema = mongoose.Schema 

var taskSchema = new Schema({
    title : {
        type:String,
        required:true
    },

    description : {
        type:String,
        required:true
    },

    duedate : {
        type:Date,
        required:false
    },

    status : {
        type:String,
        default:false
    }
}) 

const Task = mongoose.model("task",taskSchema)

module.exports = Task