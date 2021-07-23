const express = require('express');
const WeatherService = require('../services/weatherService');
const weatherService = new WeatherService();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const weatherByCityDb = async(req,res,next) =>{
    try{
        const city = req.params.city;
        const weather = await weatherService.weatherByCityName(city);
        res.json(weather); 
        
    }catch(err){
        next(err);
    }
}

module.exports = {
    weatherByCityDb
}