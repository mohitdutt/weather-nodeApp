const request = require('requests');

const geoCode = (address, callback) => {
    const Url = 'https://pro.openweathermap.org/data/2.5/climate/month?q=' + address + '&appid=b1b15e88fa797225412429c1c50c122a1';

    request(Url).on('data', (response) => {

        if (JSON.parse(response).cod == 404) {
            callback(undefined, response.message)
        } else {
            let parsedResponse = JSON.parse(response);
            let data = {
                location: parsedResponse.city.name,
                longitude: parsedResponse.city.coord.lon,
                latitude: parsedResponse.city.coord.lat
            }
            callback(undefined, data)
        }
    }).on('error', (err) => {
        if (err) {
            console.log('err', err);
        }
        callback('Unable to connect to location service!', undefined)
    })
}
module.exports = geoCode;