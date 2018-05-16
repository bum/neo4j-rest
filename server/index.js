const app = require('express')();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//enable CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});

//api custom middlewares:
app.use(require('./neo4j/dbutils').cleanSession);

//api routes
app.use('/friend', require('./routes/friend.routes'));

//api error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
})
.use(function (err, req, res, next) {
	if (err && err.status) {
		res.status(error.status || status || 400).json({
			error: {
				message: err.message
			}
		});
	}
	else next(err);
});

// app start
const port = require('./config').port;
app.listen(port, () => {
	console.log(`Web server listening on: http://localhost:${port}`);
});