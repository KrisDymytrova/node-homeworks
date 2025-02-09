const express = require('express');
const {
    addComment,
    getCommentsByPost,
    updateComment,
    deleteComment
} = require('../controllers/commentsController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addComment);
router.get("/:postId", authMiddleware, getCommentsByPost);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
