'use strict';

const express = require('express');

let router = express.Router();

router.use('/users', require('./users'));
router.use('/scrapes', require('./scrapes'))

module.exports = router;
