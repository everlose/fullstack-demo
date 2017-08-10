var express = require('express');
var request = require('request');
var router = express.Router();
let controller = require('../controllers/index');

router.get('/getExample', controller.getExample);

module.exports = router;

