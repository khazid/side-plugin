const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  context: __dirname,
  entry: {
    scripts: './scripts.js',
    style: './style.scss'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  externals: {
    jquery: 'jQuery',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
        {
            enforce: 'pre',
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                        emitWarning: true,
                    },
                },
            ],
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                {
                    loader: 'babel-loader',
                },
            ],
        },
        {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        },
        {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader', 
                {
                    loader: "sass-loader",
                    options: {
                    sourceMap: true,
                    },
                }
            ]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                        name: '[name].[ext]',
                    },
                },
            ],
        },
        {
            test: /\.(otf|woff(2)?|ttf|eot)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts',
                        name: '[name]-[hash:8].[ext]',
                    },
                },
            ],
        },
        {
            test: /\.(svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'svgs',
                        name: '[name].[ext]',
                    },
                },
                {
                    loader: 'svgo-loader',
                },
            ],
        }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue' ],
    alias: {
        'vue': '@vue/runtime-dom'
    }
},
};