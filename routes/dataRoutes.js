const express = require('express');
const router = express.Router();
const VehicleData = require('../models/VehicleData');
const logger = require('../utils/logger');

let vehicleData = [
    { id: 1, speed: 80, fuelConsumption: 5.2, safetyWarnings: 1 }
];

router.get('/data', async(req, res, next) => {
    try {
        const data = await VehicleData.find();
        res.json(data);
    }
    catch (error) {
        logger.error(`Error fetching data: ${error.message}`);
        next(error);
    }
});

router.post('/data', async(req, res, next) => {
    const { speed, fuelConsumption, safetyWarnings } = req.body;
    try {
        const newData = new VehicleData({ speed, fuelConsumption, safetyWarnings });
        await newData.save();
        res.status(201).json(newData);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;