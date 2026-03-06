const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Simple Route for Parcels
app.get('/api/parcels', (req, res) => {
    res.json([
        { id: '101', status: 'In Transit', location: 'New York' },
        { id: '102', status: 'Delivered', location: 'Los Angeles' }
    ]);
});


app.get('/', (req, res) => {
    res.send('Parcel Server is Running!');
});

app.listen(PORT, () => {
    console.log(`Server is speeding along at http://localhost:${PORT}`);
});