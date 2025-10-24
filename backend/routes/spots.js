const express = require('express');
const router = express.Router();
const { db } = require('../utils/firebase');

router.get('/', async (req, res) => {
  const snapshot = await db.ref('spots').once('value');
  res.json(snapshot.val());
});

module.exports = router;