let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')


let indexRouter = require('./src/routes/index')
let weatherRouter = require('./src/routes/weather')

let app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/weather', weatherRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// new error handler
app.use(function (err, req, res,) {
    const status = err.status || 500
    const body = {
        code: 'error',
        message: err.message,
        data: err.data    
    }
    res.status(status).json(body)
})

module.exports = app
