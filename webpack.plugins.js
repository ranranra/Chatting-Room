const webpack =require("webpack")

exports.minify=function(){
	return {
		plugins:[
			new webpack.optimize.UglifyJsPlugin({
				beautify:false,
				comments:false,
				compress:{
					warnings:false,
					drop_console:true
				}
			})
		]
	}
}

exports.clean=function(path){
	const CleanWebpackPlugin=require("clean-webpack-plugin")
	return {
		plugins:[
			new CleanWebpackPlugin([path],{
				root:process.cwd()
			})
		]
	}
}

exports.extractCommon=function(name){
	return {
		plugins:[
			new webpack.optimize.CommonsChunkPlugin(name)
		]
	}
}

exports.copy=function(){
	const path=require("path")
	const PATHS={
		app:path.join(__dirname,'src'),
		build:path.join(__dirname,'build')
	}
	const CopyWebpackPlugin=require("copy-webpack-plugin")

	return {
		plugins:[
			new CopyWebpackPlugin([
					{
						from:path.join(PATHS.app,'html'),
						to:path.join(PATHS.build,'html')
					}
				],{
					ignore:[],
					copyUnmodified:true
				}
			)
		]
	}
}

exports.hot=function(){
	return {
		plugins:[
			new webpack.HotModuleReplacementPlugin()
		]
	}
}

exports.sass=function(){
	return {
		module:{
			loaders:[
				{
					test:/\.scss$/,
					exclude:/node_modules/,
					loader:'style-loader!css-loader!sass-loader'
				}
			]
		}
	}
}

exports.babel=function(){
	return {
		module:{
			loaders:[
				{
					test:/\.js$/,
					exclude:/node_modules/,
					loader:'babel-loader',
					query:{
						presets:['es2015','react'],
						plugins:['transform-object-rest-spread']
					}
				}
			]
		}
	}
}