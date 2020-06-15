const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const deps= require('./package.json');

module.exports = {
	devtool: 'source-map',
	entry: [path.resolve(__dirname, 'src/index')],
	output: {
		filename: 'bundle.js',
		publicPath: '/',
		path: path.resolve(__dirname, 'build'),
	},
	mode: 'development',
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
	plugins: [],
};
