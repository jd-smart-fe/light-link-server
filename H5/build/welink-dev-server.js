require('./check-versions')()
var config = require('../config')

// var opn = require('opn')
var path = require('path')
var webpack = require('webpack')

var koaStatic = require('koa-static');

var { app } = require('welink-devtool');

var webpackConfig = require('./webpack.dev.conf')

var port = process.env.PORT || config.dev.port

var koaWebpack = require('koa-webpack');



var compiler = webpack(webpackConfig);


// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

app.use(koaStatic(staticPath))

var uri = `http://localhost:${port}/index.html`;



koaWebpack({ compiler })
 .then((middleware) => {
  app.use(middleware);
  middleware.devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
  });
});


console.log('> Starting dev server...')

var server = app.listen(port);

