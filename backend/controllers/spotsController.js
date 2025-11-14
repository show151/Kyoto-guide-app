const { fetchAllspots, fetchSpotById } = require('../models/spotModel');

async function getSpots(req, res) {
    try {
        const data = await fetchAllspots();

        const spotsArray = Object.values(data).map((spot) => ({
            id: spot.id,
            name: spot.name,
            lat: spot.lat,
            lng: spot.lng,
            category: spot.category || null,
            description: spot.description || "",
            audioFile: spot.audioFile,
            updatedAt: spot.updatedAt || null
        }));

        res.json(spotsArray);
    } catch (error) {
        console.error('Error fetching spots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getSpotById(req, res) {
    try {
        const { id } = req.params;
        const spot = await fetchSpotById(id);

        if (!spot) {
            return res.status(404).json({ error: 'Spot not found' });
        }

        res.json(spot);
    } catch (error) {
        console.error('Error fetching spot by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getSpots, getSpotById };