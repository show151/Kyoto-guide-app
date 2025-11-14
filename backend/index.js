const express = require('express');
const cors = require('cors');
const spotsRouter = require('./routes/spots');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/spots', spotsRouter);

app.get("/", (req, res) => {
  res.send("Kyoto Tour Guide Backend API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});