const request = require('request');

var fetchCoords = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);

    request({
        url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAaKGSSBkG2cpZ03L0Jix1LQu6dTHlS9yg`,
        json : true } , (error, response, body) => {
        if(error){
            callback('Couldn\'t connect to the server');
        }
        else if(response.statusCode !== 200){
            callback('This url doesn\'t exist on the server')
        }
        else if(body.status === 'ZERO_RESULTS') {
            callback('No place could be found for that address');
        }
        else {
            callback(null,{formatted_address : body.results[0].formatted_address, coord : body.results[0].geometry.location} );
        }
    });
};

module.exports = {
    fetchCoords
}
