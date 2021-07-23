const axios = require('axios');
const config = require('../config');
const logger = require('../loaders/logger');

axios.interceptors.request.use(function (config) {
    logger.info(config);
    return config;
}, function (error) {
    logger.info(error);
    return Promise.reject(error);
});


class WeatherRepository {

    constructor(){
        this.units = 'metric';
        this.lang = 'es';
        this.pathBase = config.openweathermap.pathBase;
        this.appid = config.openweathermap.apikey;
    }

    async weatherByCityName(city){
        try{
            const instance = axios.create({
                baseURL: `${this.pathBase}`,
                params: {
                    'appid': this.appid,
                    'units': this.units,
                    'lang': this.lang,
                    'q': city 
                },                
              }); 
              
              const response = await instance.get();


              return {
                  temperature: response.data.main.temp,
                  temperatureMin: response.data.main.temp_min,
                  temperatureMax: response.data.main.temp_max
              }

        }catch(err){
            throw err;
        }
    }
}

module.exports = WeatherRepository ;