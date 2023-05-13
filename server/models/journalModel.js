const mongoose = require('mongoose')
const moment = require('moment-timezone');
const dateManila = moment.tz(Date.now(), "Asia/Manila");

console.log(dateManila);

const Schema = mongoose.Schema

const journalSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    createdAt: { type: Date }
})

journalSchema.pre('save', function(next) {
    let myModel = this;
    if (!myModel.createdAt) {
        myModel.createdAt = moment().tz("Asia/Manila").toDate();
    }
    next();
});

module.exports = mongoose.model('Journal', journalSchema)