const express = require('express');
const router = express.Router();

let vehicleData = [
    { speed: 80, fuelConsumption: 5.2, safetyWarnings: 1 }
];

router.get('/data', (req, res) => {
    res.json(vehicleData);
});

router.post('/data', (req, res) => {
    const newData = req.body;
    vehicleData.push(newData);
    res.status(201).json(newData);
});

module.exports = router;