module.exports = [{
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	}, {
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel',
		query: {
			presets: ["es2015", "react"]
		}
	}
]