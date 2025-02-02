require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

console.log('Mongo URI:', process.env.MONGO_URI);
connectDB();

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Product API!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
