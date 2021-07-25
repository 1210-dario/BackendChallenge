const axios = require('axios')
const { weatherByCity } = require('../controllers/weather')
const CityWeather = require('../models/cityWeather')

jest.mock('axios')
jest.mock('../models/cityWeather.js')

describe('test del controller',()=>{
    test('it should call the controller function and return the mocked result from the external API ',async()=>{
        const req = {params:{city:'madrid'},header:{requestArrivalDate: new Date}}
        const res = {header:(delay)=>{return {delay}},status:(status)=>status,send: (respuesta)=>{return {respuesta}}}
        const next = (err)=>{console.log(err)}
        const resp = {data:{main:{temp:9,temp_min:5,temp_max:11}}}
        CityWeather.create.mockResolvedValue(resp)
        axios.create.mockReturnValue({get:()=>resp})  
        await weatherByCity(req,res,next)
        expect(axios.create).toHaveBeenCalledTimes(1)
        expect(CityWeather.create).toHaveBeenCalledTimes(1)
    })
    test('it should call the controller function and simulate an error from the external API ',async()=>{
        const req = {params:{city:'madrid'},header:{requestArrivalDate: new Date}}
        const res = {header:(delay)=>{return {delay}},status:(status)=>status,send: (respuesta)=>{return {respuesta}}}
        const next = (err)=>{console.log(err)}
        const resp = {data:{main:{temp:9,temp_min:5,temp_max:11}}}
        CityWeather.create.mockResolvedValue(resp)
        axios.create.mockReturnValue({get:()=>undefined})  
        await weatherByCity(req,res,next)
        expect(axios.create).toHaveBeenCalledTimes(2)
        expect(CityWeather.create).toHaveBeenCalledTimes(1)
    })
})