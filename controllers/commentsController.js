const Comment = require('../models/Comment');
const Post = require('../models/Post');

const addComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.user.userId;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Пост не знайдено' });
        }

        const newComment = new Comment({
            content,
            owner: userId,
            post: postId,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId }).populate('owner', 'username email');

        if (comments.length === 0) {
            return res.status(404).json({ message: 'Коментарі не знайдено' });
        }

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};


const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.userId;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Коментар не знайдено' });
        }

        if (comment.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Ви не можете редагувати цей коментар' });
        }

        comment.content = content;
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Коментар не знайдено' });
        }

        if (comment.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Ви не можете видалити цей коментар' });
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Коментар видалено' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
};

module.exports = { addComment, getCommentsByPost, updateComment, deleteComment };