import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { response } from 'express';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/data')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            <h1>Vehicle Dashboard</h1>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        Speed: {item.speed}, Fuel Consumption: {item.fuelConsumption}, Safety Warnings: {item.safetyWarnings}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;