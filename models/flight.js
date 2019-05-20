var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    arrival: {
        type: Date,
    }
}, {
    timestamps: true
});

var flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    flightNum: {
        type: Number,
        min: 10,
        max:9999
    },
    departs: {
        type: Date,
        default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA'],
        default: 'SEA'
    },
    destinations: {
        type: [destinationSchema]
    },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);