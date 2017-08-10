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
    },
    getExample (req, res, next) {
        res.json({
            success: true,
            msg: '',
            data: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }
            ],
            code: 200
        });
    }
}
