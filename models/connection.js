const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    name: {type: String, required: [true, 'event name is required']},
    topic: {type: String, required: [true, 'topic name is required']},
    details: {type: String, required: [true, 'detail is required'], minlength: [10, 'the details should have at least 10 characters']},
    start_time: {type: String, required: [true, 'start time is required']},
    end_time: {type: String, required: [true, 'end time is required']},
    host_name: {type: String, required: [true, 'hsot name is required']},
    location: {type: String, required: [true, 'location is required']},
    image: {type: String, required: [true, 'image url is required']}
},
{timestamps: true});

module.exports = mongoose.model('Connection', connectionSchema);
