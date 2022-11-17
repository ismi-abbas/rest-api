const axios = require('axios');

const getSinglePost = (postId) => {
	let result = axios
		.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
		.then((res) => {
			return res.data;
		});
	return result;
};

const getAllPost = () => {
	let result = axios
		.get('https://jsonplaceholder.typicode.com/posts')
		.then((response) => {
			return response.data;
		});
	return result;
};

const getComments = async (postId) => {
	let data = [];
	await axios
		.get('https://jsonplaceholder.typicode.com/comments')
		.then((response) => {
			res = response.data;
			let filtered = res.filter((comment) => comment.postId == postId);
			data = filtered;
		});
	return data;
};

const getUserPost = async (userId) => {
	let posts = await getAllPost();
	let filtered = posts.filter((post) => post.userId == userId);
	return filtered;
};

module.exports = {
	getSinglePost: getSinglePost,
	getAllPost: getAllPost,
	getComments: getComments,
	getUserPost: getUserPost,
};
