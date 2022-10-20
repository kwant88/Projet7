const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const postController = require("../controllers/comment.js");

const auth = require("../middleware/auth");

router.get("/", auth, postController.getAllComment);
router.post("/", auth, multer, postController.createComment);
router.get("/:id", auth, postController.getOneComment);
router.put("/:id", auth, multer, postController.modifyComment);
router.delete("/:id", auth, postController.deleteComment);
router.post("/:id/like", auth, postController.likeComment);

module.exports = router;
