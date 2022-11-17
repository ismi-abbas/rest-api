const express = require('express');
const router = express.Router();
const api = require('./function');
const post = require('./post');

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
		if (post.userId === 2) {
			break;
		}
	}
	if (finalResult.length !== 0) {
		res.render('posts', { finalResult });
	} else {
		res.send(404).send('Not found');
	}
});

router.post('/:id', async (req, res) => {
	let id = req.params.id;
	let result = await api.getSinglePost(id);
	if (result.length !== 0) {
		res.status(200).send(result);
	} else {
		res.send(404).send('Not found');
	}
});

router.get('/comments/:postId', async (req, res) => {
	let postId = req.params.postId;
	let result = await api.getComments(postId);
	if (result.length !== 0) {
		res.status(200).render('comments', {
			comments: result,
		});
	} else {
		res.send(404).send('Not found');
	}
});

router.get('/users/:userId', async (req, res) => {
	let userId = req.params.userId;
	let result = await api.getUserPost(userId);
	if (result.length !== 0) {
		res.status(200).send(result);
	} else {
		res.status(404).send('No data found');
	}
});

module.exports = router;
