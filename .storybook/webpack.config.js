module.exports = {
	module: {
		loaders: [
			{
				test: /.scss$/,
				loaders: ["style", "css", "sass"],
				exclude: /(node_modules|bower_components)/,
			}
		]
	}
}
