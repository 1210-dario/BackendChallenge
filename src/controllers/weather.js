const WeatherService = require('../services/weatherService')
const weatherService = new WeatherService()
const CityWeatherService = require('../services/cityWeatherService')
const cityWeatherService = new CityWeatherService()
const {getDelay} = require('../middlewares/weather')
const { setResponseWithOk, setResponseWithError } = require('../util/common-response')
const statusCodes = require('../constants/statusCodes')
const statusMessages = require('../constants/statusMessages')

const weatherByCity = async(req,res,next) =>{
    try{
        const city = req.params.city
        
        const weather = await weatherService.weatherByCityName(city)
        if(weather){
            const cityWeather = {name: city, ...weather}
    
            await cityWeatherService.createCityWeather(cityWeather)
            
            let delay = getDelay(req.header.requestArrivalDate)
            res.header({delay})
            return setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',cityWeather)
        }
        setResponseWithError(res,statusCodes.BAD_REQUEST,statusMessages.BAD_REQUEST,'error')
    }catch(err){
        next(err)
    }
}



module.exports = {
    weatherByCity
}