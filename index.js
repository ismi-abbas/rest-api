const express = require('express');
const PORT = 8080;
const { engine } = require('express-handlebars');
const router = require('./router');
// const post = require('./members')

const app = express();
app.use('/post', router);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT} 🚀🚀🚀`);
});

const post = [
	{
		postTitle: 'test',
		body: 'test               asdadasd ad ad asd',
		comments: 100,
	},
];

app.get('/', (req, res) => {
	res.render('index', {
		appTitle: '========= Post App =========',
		post,
	});
});
