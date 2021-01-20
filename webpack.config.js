const path = require('path');
const { readdirSync } = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var rimraf = require('rimraf');


const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

let pages = getDirectories(path.join(__dirname, 'src', 'pages'));
let entryPrep = {};
pages.forEach(e => {
  entryPrep[e] = `${__dirname}/src/pages/${e}/${e}.ts`;
});
let htmlPlugins = pages.map(e => {
  return new HtmlWebpackPlugin({
    inject: true,
    chunks: [e],
    filename: `${e}.html`,
    template: `src/pages/${e}/${e}.ejs`
  });
});
rimraf(path.join(__dirname,'dist'), () => console.log('cleared dist'));

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: entryPrep,
  output: {
    path: path.join(__dirname,'dist'),
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({filename:'[name].[contenthash].css'}),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
          noErrorOnMissing: true,
          globOptions: { ignore: ['**/nc-*'] }
        }
      ]
    }),
    ...htmlPlugins
  ],
  module: {
    rules: [
      {
        test: /\.(ejs)$/,
        use: [{
          loader: 'render-template-loader',
          options: {
            engine: 'ejs',
            engineOptions: function (info) {
              return { filename: info.filename }
            }
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/img',
          publicPath: 'assets/img/'
        }
      },
      {
        test: /\.(woff2?)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
          publicPath: 'assets/fonts/'
        }
      },
      {
        test: /\.ts$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  watch: process.env.NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 600,
    ignored: [
      'dist/**',
      'node_modules/**',
      'package.json',
      'package-lock.json',
      'README.md',
      'webpack.config.js'
    ]
  }
};
