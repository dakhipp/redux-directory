var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  plugins: [
    new DashboardPlugin()
  ],
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: ['transform-decorators-legacy' ]
      }
    },
      { test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
