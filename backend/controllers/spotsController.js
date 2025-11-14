const {db} = require('../utils/firebase');

async function getSpots(req, res) {
    try {
        const snapshot = await db.ref('spots').once('value');
        const data = snapshot.val();

        const spotsArray = Object.values(data || {});

        res.json(spotsArray);
    } catch (error) {
        console.error('Error fetching spots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getSpots };