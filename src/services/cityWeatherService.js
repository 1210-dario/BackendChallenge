const CityWeather = require('../models/cityWeather');

class CityWeatherService {

    constructor(){
        
    }

    async findById(id){
        return await CityWeather.findById(id);
    }

    async findByName(name){
        return await CityWeather.findOne({name});
    }

    async createCityWeather(cityWeather){
        return await CityWeather.create(cityWeather);
    }
}

module.exports = CityWeatherService;