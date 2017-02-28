const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    },
                }],
            }, {
                test: /\.css$/,
                /*use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ]*/
                loader:  ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1',
                }),
            }, {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
    }
};