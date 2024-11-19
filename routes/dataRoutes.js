const express = require('express');
const router = express.Router();
const vehicleData = [
    {id: 1, speed: 80, fuelConsumption: 5.2, safetyWarnings: 1 }
];
const logger = require('../utils/logger');



router.get('/data', async(req, res, next) => {
    try {
        const data = await vehicleData.find();
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
        const newData = new vehicleData({ speed, fuelConsumption, safetyWarnings });
        await newData.save();
        logger.info('Saved new vehicle data succesfully');
        res.status(201).json(newData);
    }
    catch (error) {
        logger.error(`Error saving data: ${error.message}`);
        next(error);
    }
});

router.get('/data', async (req, res) => {
    const { speed } = req.query;

    try {
        const data = await vehicleData.find({ speed: speed });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;