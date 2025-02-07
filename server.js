const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, MONGO_URI } = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postsRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB підключено'))
    .catch(err => console.error('❌ MongoDB помилка:', err));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log(`🚀 Сервер працює на http://localhost:${PORT}`));
