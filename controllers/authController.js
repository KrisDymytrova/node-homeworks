const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/config');
const RefreshToken = require('../models/RefreshToken');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (userId) => {
    await RefreshToken.deleteMany({ user: userId });

    const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

    const newRefreshToken = new RefreshToken({
        token: refreshToken,
        user: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await newRefreshToken.save();
    return refreshToken;
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email вже використовується' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Користувач створений успішно' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Невірний email або пароль' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Невірний email або пароль' });

        const accessToken = generateAccessToken(user._id);

        await RefreshToken.deleteMany({ user: user._id });

        const refreshToken = await generateRefreshToken(user._id);

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ message: 'Refresh token обов’язковий' });

        const storedToken = await RefreshToken.findOne({ token });
        if (!storedToken) return res.status(403).json({ message: 'Недійсний refresh token' });

        const decoded = jwt.verify(token, JWT_SECRET);

        await RefreshToken.findOneAndDelete({ token });

        const newAccessToken = generateAccessToken(decoded.userId);
        const newRefreshToken = await generateRefreshToken(decoded.userId);

        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.body.token || req.headers.authorization?.split(" ")[1];

        if (!token) return res.status(400).json({ message: 'Refresh token обов’язковий' });

        await RefreshToken.findOneAndDelete({ token });
        res.status(200).json({ message: 'Вихід успішний' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

module.exports = { register, login, refreshToken, logout };