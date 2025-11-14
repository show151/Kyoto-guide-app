const express = require('express');
const router = express.Router();
const { getSpots, getSpotById } = require('../controllers/spotsController');

router.get('/', getSpots);

router.get('/:id', getSpotById);

module.exports = router;