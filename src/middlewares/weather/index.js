const {check, validationResult} = require('express-validator');
const CityWeatherService = require('../../services/cityWeatherService');
const cityWeatherService = new CityWeatherService();
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');

const _cityRequired = check('city').not().isEmpty();
const cityExist = async(req, res, next)=>{
    const cityFound = await cityWeatherService.findByCityName(req.params.city);
    if(cityFound){
        res.json(cityFound);
    }else{
        next()
    }
}

const validResult = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new Error(statusMessages.VALIDATION_ERRORS, statusCodes.BAD_REQUEST, errors.errors);        
    }   
    next();
};

const getRequestValidations = [
    _cityRequired,
    validResult
]

module.exports = {
    getRequestValidations,
    cityExist
}