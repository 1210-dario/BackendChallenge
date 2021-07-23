const express = require('express');
const CityWeatherService = require('../services/cityWeatherService');
const cityWeatherService = new CityWeatherService();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const getWeatherCityDb = async(req,res,next) =>{
    try{
        const city = req.params.city;
        const cityWeather = await cityWeatherService.findByCityName(city);
        res.json(cityWeather); 
        
    }catch(err){
        next(err);
    }
}

module.exports = {
    getWeatherCityDb
}