const Post = require('../models/Post');

const getPosts = async (req, res) => {
    const posts = await Post.find({ owner: req.user.userId });
    res.status(200).json(posts);
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, owner: req.user.userId });

    await newPost.save();
    res.status(201).json(newPost);
};

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Пост не знайдено" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};

const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post || post.owner.toString() !== req.user.userId)
        return res.status(403).json({ message: 'Немає доступу' });

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json(post);
};

const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post || post.owner.toString() !== req.user.userId)
        return res.status(403).json({ message: 'Немає доступу' });

    await post.deleteOne();
    res.status(200).json({ message: 'Пост видалено' });
};

module.exports = { getPosts, createPost, getPostById, updatePost, deletePost };