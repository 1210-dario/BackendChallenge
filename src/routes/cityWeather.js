const express = require('express');
const router = express.Router();
const { weatherByCityDb } = require('../controllers/cityWeather');

/* GET users listing. */
router.get('/:city', weatherByCityDb);


module.exports = router;