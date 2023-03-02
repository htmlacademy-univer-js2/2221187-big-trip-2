const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
	clean: true
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "build" },
      ],
    }),
  ],
  loaders: [
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }
  ]
};

module.exports = config;