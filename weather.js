const request = require('request');

var fetchWeather = (url , callback) => {

    request({
        url , json : true
    }
    , (error, response, body) => {
        
        if(error) {
            callback('Connection to server couldn\'t be established');
        }
        else if(response.statusCode !== 200){
            callback('That url wasn\'t found');
        } else {
            callback(null,body.currently);
        }
    })
};

module.exports = {
    fetchWeather
}