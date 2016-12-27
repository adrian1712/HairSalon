// NOTE: 16a connect to mongoose... See user model for notes
var mongoose = require ('mongoose');

// NOTE: 16b bring in the Schema by mongoose
var Schema = mongoose.Schema;

// NOTE: 16c creating the Schema for the obect
var appointmentSchema = new Schema ({
    username: String,
    date: String,
    time: String,
    color: String
})

// NOTE: 16d name the Schema
var Appointment = mongoose.model ('Appointment', appointmentSchema);
// NOTE: 16c exporting the Schema
module.exports = Appointment;
