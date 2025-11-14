const express = require('express');
const router = express.Router();
const { db } = require('../controllers/spotsController');

router.get('/', getSpots);

module.exports = router;