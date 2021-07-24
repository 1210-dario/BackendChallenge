const CityWeather = require('../models/cityWeather');

class CityWeatherService {

    constructor(){
        
    }

    async findByCityName(name){
        return await CityWeather.findOne({name});
    }

    async createCityWeather(cityWeather){
        return await CityWeather.create(cityWeather);
    }
}

module.exports = CityWeatherService;