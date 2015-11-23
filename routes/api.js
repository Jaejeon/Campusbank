var express = require('express');
var router = express.Router();
var users_router = require('./route_modules/users.js');
var loancards_router = require('./route_modules/loancards.js');
var schools_router = require('./route_modules/schools.js');

router.use('/users', users_router);
router.use('/loancards', loancards_router);
router.use('/schools', schools_router);

module.exports = router;