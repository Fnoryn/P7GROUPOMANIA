const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const log = require("../utils/winston");
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const sharp = require("sharp");

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
    .sort({ createdAt: -1 })
    .populate("posterId", "pseudo email");
};

module.exports.createPost = async (req, res) => {
  let newPost;
  if (req.files && req.files.length > 0) {
    newPost = new PostModel({
      ...req.body,
      posterId: req.body.posterId,
      picture: req.files[0].filename,
      likers: [],
      comments: [],
    });
    // sans l'img
  } else {
    newPost = new PostModel({
      ...req.body,
      posterId: req.body.posterId,
      likers: [],
      comments: [],
    });
  }
  const post = newPost.save();
  res.json(post);
  
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.likePost = async (req, res) => {
  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown : " + req.params.id);

  // try {
  //   await PostModel.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $addToSet: { likers: req.body.id },
  //     },
  //     { new: true }
  //   )
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(500).send({ message: err }));

  //   await UserModel.findByIdAndUpdate(
  //     req.body.id,
  //     {
  //       $addToSet: { likes: req.params.id },
  //     },
  //     { new: true }
  //   )
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(500).send({ message: err }));
  //   log.error(`erreur like : ${err}`);
  // } catch (err) {
  //   return res.status(400).send(err);
  // }
  const post = await PostModel.findById(req.params.id);
  const user = await UserModel.findById(req.body.id);

  // if (!post) {
  //     return next(new ErrorHandler("Post Not Found", 404));
  // }
  // console.log(!user.likes.includes(req.params.id));
  if (
    !post.likers.includes(req.body.id) &&
    !user.likes.includes(req.params.id)
  ) {
    post.likers.push(req.body.id);
    user.likes.push(req.params.id);

    await post.save();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Post Liked",
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Post already Liked",
    });
  }
};

module.exports.unlikePost = async (req, res) => {
  // if (!ObjectID.isValid(req.params.id))
  //   return res.status(400).send("ID unknown : " + req.params.id);

  // try {
  //   await PostModel.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $pull: { likers: req.body.id },
  //     },
  //     { new: true }
  //   )
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(500).send({ message: err }));

  //   await UserModel.findByIdAndUpdate(
  //     req.body.id,
  //     {
  //       $pull: { likes: req.params.id },
  //     },
  //     { new: true }
  //   )
  //     .then((data) => res.send(data))
  //     .catch((err) => res.status(500).send({ message: err }));
  // } catch (err) {
  //   return res.status(400).send(err);
  // }

  const post = await PostModel.findById(req.params.id);
  const user = await UserModel.findById(req.body.id);

  // if (!post) {
  //     return next(new ErrorHandler("Post Not Found", 404));
  // }

  if (post.likers.includes(req.body.id) && user.likes.includes(req.params.id)) {
    const index = post.likers.indexOf(req.body.id);
    const index2 = user.likes.indexOf(req.params.id);

    post.likers.splice(index, 1);
    user.likes.splice(index2, 1);
    await post.save();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Post Unliked",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Post unLiked already",
    });
  }
};

module.exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};
