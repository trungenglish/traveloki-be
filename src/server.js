require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connection = require('./config/mongodb');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 10000;
const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? '0.0.0.0' : 'localhost';

const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', require('./routes'));

(async() => {
    try {
        await connection();
        app.listen(port, host, () => {
            console.log(`Backend traveloki app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to db: ", error);
    }
})()