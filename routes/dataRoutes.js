const express = require('express');
const router = express.Router();
const VehicleData = require('../models/VehicleData');

let vehicleData = [
    { id: 1, speed: 80, fuelConsumption: 5.2, safetyWarnings: 1 }
];

router.get('/data', async(req, res) => {
    try {
        const data = await VehicleData.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve data'});
    }
});

router.post('/data', async(req, res) => {
    const { speed, fuelConsumption, safetyWarnings } = req.body;
    try {
        const newData = new VehicleData({ speed, fuelConsumption, safetyWarnings });
        await newData.save();
        res.status(201).json(newData);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

module.exports = router;