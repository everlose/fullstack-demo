let mongoose = require('mongoose');

let user = require('../models/user');

module.exports = {
	getUser (req, res, next) {
        user.fetch(function(err, collection) {
            if (err) {
                console.log(err);
            }
            res.json({
                title: 'test',
                collection: collection
            })
        });
        // user.findById('5655a697d3db88a0bdf726b7', function(err, collection) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     res.json({
        //         title: 'test',
        //         collection: collection
        //     })
        // });
	}
}
