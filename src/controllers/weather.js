const express = require('express');
const WeatherService = require('../services/weatherService');
const weatherService = new WeatherService();
const config = require('../config');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const weatherByCity = async(req,res,next) =>{
    try{
        const city = req.params.city;
        const weather = await weatherService.weatherByCityName(city);
        res.json(weather); 
        
    }catch(err){
        next(err);
    }
}

module.exports = {weatherByCity}