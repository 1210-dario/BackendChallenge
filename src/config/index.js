const dotenv = require('dotenv');

const envFound = dotenv.config();

if(!envFound){
    throw new Error("Couldn't find .env file.");
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development' ;

module.exports = {
    openweathermap:{
        pathBase: 'https://api.openweathermap.org/data/2.5/weather',
        apikey: process.env.OPENWEATHERMAP_API_KEY
    },
    log:{
        level: process.env.LOG_LEVEL
    },
    databaseURL: process.env.DATABASE_URL
};