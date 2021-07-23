const mongoose = require('mongoose');
const { Schema } = mongoose;

const cityWeatherSchema = new Schema({
    name: String,
    temperature:   Number,
    temperatureMin:   Number,
    temperatureMax:   Number,
},
{timestamps: true}
);

module.exports = mongoose.model('cityWeather',cityWeatherSchema);