let mongoose = require('mongoose');
let config = {
	ip: 'localhost',
	port: 27017,
    mongodb: 'mongodb://localhost/easy-mock'
}

module.exports = function () {
    mongoose.Promise = Promise;
	mongoose.connect(config.mongodb);
}
