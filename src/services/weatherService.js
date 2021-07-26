const axios = require('axios')
const config = require('../config')
const logger = require('../loaders/logger')

axios.interceptors.request.use(function (config) {
    logger.info(config)
    return config
}, function (error) {
    logger.info(error)
    return Promise.reject(error)
})


class WeatherRepository {

    constructor(){
        this.units = 'metric'
        this.lang = 'es'
        this.pathBase = config.openweathermap.pathBase
        this.appid = config.openweathermap.apikey
    }

    async weatherByCityName(city){
        
        const instance = axios.create({
            baseURL: `${this.pathBase}`,
            params: {
                'appid': this.appid,
                'units': this.units,
                'lang': this.lang,
                'q': city 
            },                
        })
        
        let randomNumber = Math.floor(Math.random() * 100)
        if(this.executeApiCall(randomNumber)){
                
            const response = await instance.get()
            if(response){
                return {
                    temperature: response.data.main.temp,
                    temperatureMin: response.data.main.temp_min,
                    temperatureMax: response.data.main.temp_max
                }
            }
            return undefined
        }else{
            throw new Error()
        }
    }
    executeApiCall (randomNumber,contador=0)  {
        if(randomNumber >= 0 && randomNumber < 15 && contador < 3){
            contador++
            randomNumber = Math.floor(Math.random() * 100)
            return this.executeApiCall(randomNumber,contador)
        }
        return randomNumber >= 15
    }
}

module.exports = WeatherRepository 