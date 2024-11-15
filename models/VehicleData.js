
const mongoose = require('mongoose');

const VehicleDataSchema = new mongoose.Schema({
    speed: { type: Number, require: true },
    fuelConsumption: { type: Number, require: true },
    safetyWarnings: { type: Number, require: true},
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('VehicleData', VehicleDataSchema);