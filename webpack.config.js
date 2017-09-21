const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    test: './client/test.js'
  },
  output: {
    path: path.resolve('./', 'public/dist/'),
    publicPath: '/assets/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
      },
      // {
      //   test: /\.scss$/,
      //   use: [{
      //     loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //     loader: "css-loader", // translates CSS into CommonJS
      //     options: {
      //       modules: true,
      //     }
      //   }, {
      //     loader: "sass-loader" // compiles Sass to CSS
      //   }]
      // },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};
