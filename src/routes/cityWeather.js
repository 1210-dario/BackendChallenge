const express = require('express');
const router = express.Router();
const { getWeatherCityDb } = require('../controllers/cityWeather');

/* GET users listing. */
router.get('/:city', getWeatherCityDb);


module.exports = router;