const express = require('express');
const router = express.Router();
const multer = require ("../middleware/multer-config");

const postController = require ('../controllers/comment.js')

const auth = require('../middleware/auth');


router.get('/', postController.getAllComment);
router.post('/', auth, multer, postController.createComment);
router.get('/:id', postController.getOneComment);
router.put('/:id', postController.modifyComment);
router.delete('/:id', postController.deleteComment);
router.post('/:id/like', postController.likeComment);

module.exports = router;