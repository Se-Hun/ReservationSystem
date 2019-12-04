const mongoose = require('mongoose');
const {Schema} = mongoose;

const trainRouteSchema = new Schema(
    {
        trainInfo: {type: String, required: true},
        departure: {type: String, required: true},
        arrival: {type: String, required: true},
        date: {type: String, required: true},
        time: {type: String, required: true},
        laststop: {type: String, required: true},
        stopstation: {type: String, required: true},
        deptime: {type: String, required: true},
        arrtime: {type: String, required: true}
    },
    {
        collection: 'trainRoute',
        versionKey: false
    }
);

// trainRouteSchema.statics.addRoute = function(trainInfo, departure, arrival, date, time, laststop, stopstation, deptime, arrtime) {
//     var newRoute = new this(trainInfo, departure, arrival, date, time, laststop, stopstation, deptime, arrtime);
//     return newRoute.save();
// }

trainRouteSchema.statics.addRoute = function(data) {
    var newRoute = new this(data);
    return newRoute.save();
}

trainRouteSchema.statics.searchPath = function(departure, arrival, date, time) {
    return this.findOne(
        {
             "departure": departure,
             "arrival": arrival,
             "date": date,
             "time": time
        }
    );
}

trainRouteSchema.statics.newContent = function(data) {
    var newContent = new this(data)
    return newContent.save();
}

module.exports = mongoose.model('trainRoute', trainRouteSchema);
