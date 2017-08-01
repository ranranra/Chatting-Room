const path=require("path")
const webpack=require("webpack")
const PATHS={
	app:path.join(__dirname,'client','src'),
	build:path.join(__dirname,'client','build')
}

const merge=require("webpack-merge")
const plugins=require('./webpack.plugins.js')

const hotMiddlewareSrcipt='webpack-hot-middleware/client?reload=true'

const common=merge(
	{
		entry:{
			index:['./client/src/js/pages/index.js',hotMiddlewareSrcipt]
		},
		devtool: 'source-map',
		output:{
			path:path.join(PATHS.build,'js'),
			filename:'[name].js',
			chunkFilename:'[chunkhash].js'
		},
		plugins:[
			new webpack.HotModuleReplacementPlugin()
		],
		devServer:{	
			contentBase:'./client/build/js',
			historyApiFallback:true,
			inline:true,
			hot:true
		}
	},
	plugins.copy(),
	plugins.extractCommon('common'),
	plugins.sass(),
	plugins.babel()
)

var config=null;
switch(process.env.npm_lifecycle_event){
	case 'build':
		config=merge(
			common,
			plugins.minify()
		);
		break;
	case 'dev':
	default:
		config=merge(
			common,
			{
				devtool:'source-map'
			}
		);
		break;
}

module.exports=config