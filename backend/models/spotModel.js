const { db } = require('../utils/firebase');

async function fetchAllspots() {
    const snapshot = await db.ref('spots').once('value');
    return snapshot.val() || {};
}

async function fetchSpotById(id) {
    const snapshot = await db.ref(`spots/${id}`).once('value');
    return snapshot.val() || null;
}

module.exports = { fetchAllspots, fetchSpotById };