const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// USE YOUR NEW USER AND PASS IN THE .ENV FILE
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gciks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// COPY THIS EXACTLY FROM YOUR PREVIOUS WORKING PROJECT
const client = new MongoClient(uri, {
    tls: true,
    serverSelectionTimeoutMS: 3000,
    autoSelectFamily: false, // This is the key setting for your Wi-Fi!
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("📦 Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("zapShiftDB"); 
    const parcelCollection = db.collection("parcels");

    // --- YOUR NEW PARCEL ROUTES ---
    app.get('/api/parcels', async (req, res) => {
        const result = await parcelCollection.find().toArray();
        res.send(result);
    });

    app.post('/api/parcels', async (req, res) => {
        const result = await parcelCollection.insertOne(req.body);
        res.send(result);
    });

  } catch (error) {
    console.error("❌ Connection Error:", error.message);
  }
}

run().catch(console.dir);

app.get('/', (req, res) => res.send('Zap-Shift Server is Running!'));

app.listen(PORT, () => {
    console.log(`🚀 Server flying at http://localhost:${PORT}`);
});