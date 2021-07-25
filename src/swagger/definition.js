const { version } = require('../../package.json')


const options =  {  
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Proyecto Weather Challenge',
            version,
            description: 'API en Node.js para obtener el clima de una ciudad en OpenWeatherMap'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ],
    },
    apis: [`${__dirname}/documentations/*.yaml`],
}

module.exports = options