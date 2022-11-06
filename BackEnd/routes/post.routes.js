const router = require("express").Router();
const postController = require("../controllers/post.controller");
const attachmentUpload = require("../middleware/attachment");

router.get("/", postController.readPost);
router.post("/", attachmentUpload, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.post("/like-post/:id", postController.likePost);
router.post("/unlike-post/:id", postController.unlikePost);

// comments
router.patch("/comment-post/:id", postController.commentPost);
router.patch("/edit-comment-post/:id", postController.editCommentPost);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
