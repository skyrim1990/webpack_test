var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/js/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/js')
	},
	plugins:[
		/*
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,	
			},
		}),	
		*/
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'	
		})
	],
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style', 'css']
		},{
			test: /\.html$/,
			loader: "raw-loader"
		}]	
	},
	devServer: {
		contentBase: './dist',
		hot: true
	}
};
