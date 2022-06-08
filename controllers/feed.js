const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/duck.jpeg",
        creator: {
          name: "Solomon",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, entered data is incorrect.",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/dock.jpeg",
    creator: {
      name: "Solomon",
    },
  });
  post
    .save()
    .then((result) => {
      // Create post in db
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => console.log(err));
};