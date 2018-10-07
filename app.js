const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');


const argv = yargs
.options({
    address : {
        alias : 'a',
        describe: 'Address of the place',
        string : true
    }
})
.help()
.alias('help','h')
.argv;
const address = argv.address || 'SMVDU';

geocode.fetchCoords(address, (error,result) => {
    if(error){
        console.log(error);
    }
    else {
        console.log(result.formatted_address);
        var lat = result.coord.lat;
        var lng = result.coord.lng;

        var weatherUrl = `https://api.darksky.net/forecast/6e2c6503cdefa6a9beed649727ed1c92/${lat},${lng}`;
        
        weather.fetchWeather(weatherUrl, (error, result) => {
            if(error){
                console.log(error);
            }
            else {
                console.log(`It is ${result.temperature} but feels like ${result.apparentTemperature}`);
            }
        });      
    }
});
