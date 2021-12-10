const mongoose = require('mongoose');

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    arrival: Date
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        min: 10,
        required: true,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            return Date.now() + 365*24*60*60*1000;
        },
        min: () => Date.now()
    },
    destinations: [destinationSchema]
}, {
    timestamps: true
  });

// Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema)