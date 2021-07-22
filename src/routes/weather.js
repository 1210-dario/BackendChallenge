const express = require('express');
const router = express.Router();
const { weatherByCity } = require('../controllers/weather');

/* GET users listing. */
router.get('/:city', weatherByCity);

module.exports = router;
