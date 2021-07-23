const express = require('express');
const router = express.Router();
const { weatherByCity } = require('../controllers/weather');
const { getRequestValidations , cityExist, delayInit } = require('../middlewares/weather');

/* GET users listing. */
router.get('/:city',delayInit, getRequestValidations,cityExist, weatherByCity);

router.post('/');

module.exports = router;
