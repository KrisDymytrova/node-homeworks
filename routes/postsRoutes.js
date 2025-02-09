const express = require('express');
const {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/postsController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getPosts);
router.post('/', authMiddleware, createPost);
router.get("/:id", authMiddleware, getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;