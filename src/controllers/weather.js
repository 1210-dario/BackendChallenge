const express = require('express');
const WeatherService = require('../services/weatherService');
const weatherService = new WeatherService();
const CityWeatherService = require('../services/cityWeatherService');
const cityWeatherService = new CityWeatherService();

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const weatherByCity = async(req,res,next) =>{
    try{
        const city = req.params.city;
        const weather = await weatherService.weatherByCityName(city);
        console.log(weather);

        const cityWeather = {name: city,temperature: weather.temperature, temperatureMin: weather.temperatureMin, temperatureMax : weather.temperatureMax};
        console.log(cityWeather);

        const cityCreated = await cityWeatherService.createCityWeather(cityWeather);

        console.log(cityCreated);

        res.json(weather); 
        
    }catch(err){
        next(err);
    }
}



module.exports = {
    weatherByCity
}