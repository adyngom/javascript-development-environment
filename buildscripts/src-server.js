import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 9000;
const app = express();
const compiler = webpack(config);

app.use(
	require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
	})
);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

// app.get('/users', (req, res) => {

// })

app.listen(port, (error) => {
	if (error) {
		console.log(error);
	} else {
		open(`http://localhost:${port}`);
	}
});
