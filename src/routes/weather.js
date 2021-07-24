const express = require('express')
const router = express.Router()
const { weatherByCity } = require('../controllers/weather')
const { getRequestValidations , cityExist, delayInit } = require('../middlewares/weather')

/* GET a City Weather temperature, min and max */
router.get('/:city',delayInit, getRequestValidations,cityExist, weatherByCity)

module.exports = router
