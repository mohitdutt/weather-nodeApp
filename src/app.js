const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./util/geoCode')
const foreCast = require('./util/foreCast')

const app = express();
const publicDirectoryPath = path.join(__dirname, '../src');
const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../partials');
// console.log(viewsPath)

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        created: 'mohit dutt',
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'No address Found' })
    }
    geoCode(req.query.address, (err, response) => {
            if (err) {
                return err
            }
            if (response) {
                foreCast(response.latitude, response.longitude, (err, response = {}) => {
                    if (err) {
                        return err
                    }

                    res.send({
                        TodayDate: new Date(response.current.dt).getDate() + '/' + new Date(response.current.dt).getMonth() + 1 + '/' + new Date(response.current.dt).getFullYear(),
                        Sunrise: new Date(response.current.sunrise).getDate() + '/' + new Date(response.current.sunrise).getMonth() + 1 + '/' + new Date(response.current.sunrise).getFullYear(),
                        Sunset: new Date(response.current.sunset).getDate() + '/' + new Date(response.current.sunset).getMonth() + 1 + '/' + new Date(response.current.sunset).getFullYear(),
                        Temperature: response.current.temp,
                        Weather: response.current.weather[0].main,
                        clouds: response.current.clouds,
                        Humidity: response.current.humidity,
                        Visibility: response.current.visibility,
                        WindSpeed: response.current.wind_speed,
                        Pressure: response.current.pressure
                    })
                })
            } else {
                res.send({ error: 'Please enter new valid location' })
            }
        })
        // res.render('index', {
        //     title: 'Weather App',
        //     created: 'mohit dutt',
        //     address: req.query.address
        // });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About...',
        created: 'mohit dutt',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help...',
        created: 'mohit dutt',
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404! Page not found.',
        created: 'mohit dutt',
    });
})

app.listen('3000', () => {
    console.log('Listening to port 3000')
})