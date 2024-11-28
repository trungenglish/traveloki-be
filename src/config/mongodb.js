require('dotenv').config();

const mongoose = require('mongoose');

const dbState = [
    { value: 0, label: "disconnected" },
    { value: 1, label: "connected" },
    { value: 2, label: "connecting" },
    { value: 3, label: "disconnecting" }
];

const connection = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const state = mongoose.connection.readyState;

    console.log(dbState.find(f => f.value === state)?.label || 'Unknown state', "to database");
};

module.exports = connection;
