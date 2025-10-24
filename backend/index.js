const express = require('express');
const cors = require('cors');
const spotsRouter = require('./routes/spots');

const app = express();
app.use(cors());
app.use('/api/spots', spotsRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
