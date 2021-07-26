const {check, validationResult} = require('express-validator')
const moment = require('moment')
const CityWeatherService = require('../../services/cityWeatherService')
const cityWeatherService = new CityWeatherService()
const statusCodes = require('../../constants/statusCodes')
const statusMessages = require('../../constants/statusMessages')
const {setResponseWithError, setResponseWithOk} = require('../../util/common-response')

const _cityIsString = check('city',statusMessages.CITY_IS_STRING).not().isNumeric()

const validResult = (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return setResponseWithError(res,statusCodes.BAD_REQUEST,statusMessages.VALIDATION_ERRORS,'error',errors.errors)      
    }   
    next()
}

const cityExist = async(req, res, next)=>{
    const cityFound = await cityWeatherService.findByCityName(req.params.city)
    if(cityFound){
        const {name,temperature,temperatureMin,temperatureMax} = cityFound
        const cityWeatherFound = {name, temperature, temperatureMin, temperatureMax}
        
        let delay = getDelay(req.header.requestArrivalDate)
        res.header({delay})
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',cityWeatherFound)
    }else{
        next()
    }
}

const delayInit = async(req,res,next)=>{
    req.header.requestArrivalDate = new Date()
    next()
}

const getDelay = (initialDate)=>{
    let delay = moment.duration(moment().diff(moment(initialDate)))
    return delay.as('milliseconds')
}

const getRequestValidations = [
    _cityIsString,
    validResult,
]

module.exports = {
    getRequestValidations,
    cityExist,
    delayInit,
    getDelay
}