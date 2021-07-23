const express = require('express');
const WeatherService = require('../services/weatherService');
const weatherService = new WeatherService();
const CityWeatherService = require('../services/cityWeatherService');
const cityWeatherService = new CityWeatherService();
const {getDelay} = require('../middlewares/weather');
const { setResponseWithOk, setResponseWithError } = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const weatherByCity = async(req,res,next) =>{
    try{
        const city = req.params.city;
        const weather = await weatherService.weatherByCityName(city);
        if(weather){
            const cityWeather = {name: city,temperature: weather.temperature, temperatureMin: weather.temperatureMin, temperatureMax : weather.temperatureMax};
    
            await cityWeatherService.createCityWeather(cityWeather);
    
            let delay = getDelay(req.header.requestArrivalDate);
            res.header({delay});
            setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',cityWeather); 
        }
        setResponseWithError(res,statusCodes.BAD_REQUEST,statusMessages.BAD_REQUEST,'error',weather);
        
    }catch(err){
        next(err);
    }
}



module.exports = {
    weatherByCity
}