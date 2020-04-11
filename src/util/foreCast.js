const request = require('requests');

const foreCastCode = (latitude, longitude, callback) => {
    const Url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=52460679b510fa9c3302197ab0a937ec';

    request(Url).on('data', (response) => {
        let parsedResponse = JSON.parse(response)
        callback(undefined, parsedResponse)
    }).on('error', (err) => {
        if (err)
            callback('Unable to connect to location service!', undefined)
    })
}
module.exports = foreCastCode;