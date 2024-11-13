const express = require('express');
const router = express.Router();

let vehicleData = [
    { id: 1, speed: 80, fuelConsumption: 5.2, safetyWarnings: 1 }
];

router.get('/data', (req, res) => {
    res.json(vehicleData);
});

router.get('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const entry = vehicleData.find((data) => data.id === id);

    if (entry) {
        res.json(entry);
    } else {
        res.status(404).json({error: 'Data entry not found'});
    }
});

router.post('/data', (req, res) => {
    const newData = req.body;
    newData.id = vehicleData.length + 1;
    vehicleData.push(newData);
    res.status(201).json(newData);
});

module.exports = router;