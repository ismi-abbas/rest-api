const express = require('express');
const router = express.Router();
const api = require('./function');

router.get('/top', async (req, res) => {
  let allPost = await api.getAllPost();
  let finalResult = [];
  for (const post of allPost) {
    let postId = post.userId;
    let comments = await api.getComments(postId);
    finalResult.push({
      postId: post.id,
      postTitle: post.title,
      body: post.body,
      comments: comments.length,
    });
  }
  res.status(200).send(finalResult);
});

router.post('/:id', async (req, res) => {
  let id = req.params.id;
  let result = await api.getSinglePost(id);
  res.status(200).send(result);
});

router.get('/comments/:postId', async (req, res) => {
  let postId = req.params.postId;
  let result = await api.getComments(postId);
  res.send(result);
});

router.get('/users/:userId', async (req, res) => {
  let userId = req.params.userId
  let result = await api.getUserPost(userId)
  if (result.length != 0) {
    res.status(200).send(result)
  } else {
    res.status(404).send('No data found')
  }
})

module.exports = router;
