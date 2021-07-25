const { delayInit, getDelay, cityExist } = require('../middlewares/weather')
const CityWeather = require('../models/cityWeather')

jest.mock('../models/cityWeather.js')




describe('test de las funciones del middleware', ()=>{
    test('it should call delayInit and return a Date in req.header',()=>{
        const req = {header:{}}
        const res = {}
        const next = ()=>{}
        delayInit(req,res,next)
        expect(req.header).toHaveProperty('requestArrivalDate')
        expect(typeof(req.header.requestArrivalDate)).toBe('object')
    })
    test('it should call the getDelay function and return delay in milliseconds',()=>{
        const fechaActual = new Date
        expect(getDelay(fechaActual)).toBeLessThan(3)
    })
    test('getDelay without parameters expected to be less than 1',()=>{
        expect(getDelay()).toBeLessThan(1)
    })
    test('it should call cityExist function and return the mocked mongoDB result',async()=>{
        const req = {params:{city:'madrid'},header:{requestArrivalDate: new Date}}
        const res = {header:(delay)=>{return {delay}},status:(status)=>status,send: (respuesta)=>{return {respuesta}}}
        const next = (err)=>{console.log(err)}
        const resp = {name:'cityMock',temperature:9,temperatureMin:5,temperatureMax:11}
        CityWeather.findOne.mockResolvedValue(resp)
        await cityExist(req,res,next)
        expect(CityWeather.findOne).toHaveBeenCalledTimes(1)
        expect(CityWeather.findOne).toHaveBeenCalledWith({name:'madrid'})
    })
})

