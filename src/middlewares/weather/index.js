const {check, validationResult} = require('express-validator');
const moment = require('moment');
const CityWeatherService = require('../../services/cityWeatherService');
const cityWeatherService = new CityWeatherService();
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');
const {setResponseWithError, setResponseWithOk} = require('../../util/common-response');

const _cityRequired = check('city', statusMessages.CITY_REQUIRED).not().isEmpty();
const _cityIsString = check('city',statusMessages.CITY_IS_STRING).isString();

const cityExist = async(req, res, next)=>{

    const cityFound = await cityWeatherService.findByCityName(req.params.city);

    if(cityFound){
        let delay = getDelay(req.header.requestArrivalDate);
        res.header({delay});
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',cityFound);
    }else{
        next()
    }
};

const validResult = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return setResponseWithError(res,statusCodes.BAD_REQUEST,statusMessages.VALIDATION_ERRORS,'error',errors.errors);        
    }   
    next();
};

const delayInit = async(req,res,next)=>{
    req.header.requestArrivalDate = new Date();
    next();
};

const getDelay = (initialDate)=>{
    let delay = moment.duration(moment().diff(moment(initialDate)));
    return delay.as('milliseconds');
};

const getRequestValidations = [
    _cityRequired,
    _cityIsString,
    validResult,
]

module.exports = {
    getRequestValidations,
    cityExist,
    delayInit,
    getDelay
}