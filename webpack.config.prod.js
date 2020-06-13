const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = {
	entry: {
		main: './src/main.js',
		vendor: Object.keys(package.dependencies),
		movie: './src/movie-page.js',
	},
	mode: 'development',
	devServer: {
		proxy: {
			'/.netlify': {
				target: 'http://localhost:9000',
				pathRewrite: { '^/.netlify/functions': '' },
			},
		},
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				test: /\.js(\?.*)?$/i,
				include: /\/dist/,
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
		],
	},
	plugins: [
		// new HtmlWebpackplugin({
		//   inject: true,
		//   template: path.resolve("./index.html")
		// })
		new HtmlWebpackPlugin({
			hash: true,
			title: 'Flowflix Movies Search',
			myPageHeader: 'Hello World',
			template: './index.html',
			chunks: ['vendor', 'main'],
			filename: './dist/index.html', //relative to root of the application
		}),
		new HtmlWebpackPlugin({
			hash: true,
			title: 'Flow Flix - Movie page',
			myPageHeader: 'Settings',
			template: './movie-page.html',
			chunks: ['vendor', 'movie'],
			filename: './dist/movie-page.html',
		}),
	],
};
