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
        logger.info('Fetched vehicle data successfully');
        res.json(data);
    }
    catch (error) {
        logger.error(`Error fetching data: ${error.message}`);
        res.status(500).json({ error: 'Failed to retrieve data' });
        next(error);
    }
});

router.post('/data', async(req, res, next) => {
    const { speed, fuelConsumption, safetyWarnings } = req.body;
    if (speed === undefined || fuelConsumption === undefined || safetyWarnings === undefined) {
        return res.status(400).json({ error: 'Missing required failed: spped, fuelConsumption, or safetyWarnings'});
    }
    try {
        const newData = new VehicleData({ speed, fuelConsumption, safetyWarnings });
        await newData.save();
        logger.info('Saved new vehicle data succesfully');
        res.status(201).json(newData);
    }
    catch (error) {
        logger.error(`Error saving data: ${error.message}`);
        next(error);
    }
});

module.exports = router;