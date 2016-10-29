const webpack = require('webpack');
const path = require('path');

const postCSSNext = require('postcss-cssnext');
const postCSSNested = require('postcss-nested');
const precss = require('precss');

const postCSSPlugins = [
  postCSSNested,
  precss(),
  postCSSNext(),
];

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './client'),
  entry: {
    js: './index.jsx',
    vendor: ['react'],
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: isProd ? '[hash:base64:10]' : '[local]---[hash:base64:10]',
            },
          },
          {
            loader: 'postcss-loader',
            // options: {
            //   postcss: {
            //     plugins: postCSSPlugins,
            //   },
            // },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('./client'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: {
          plugins: postCSSPlugins,
        },
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
  devServer: {
    contentBase: './client',
    // hot: true
  },
};
