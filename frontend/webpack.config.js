const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/../backend/src/public',
        filename: './bundle.js'
    },
    devServer: {
        port: 4200,
        contentBase: '../backend/src/public',
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },
    resolve: {
        extensions: ['.js','.jsx'],
        alias: {
            modules: __dirname + '/node_modules',
            jquery: 'modules/jquery/dist/jquery.min.js',
            boostrap: 'modules/bootstrap/dist/js/bootstrap.min.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('bundle.css')
    ],
    module: {
        loaders: [{
            test: /js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['env', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: { 
                    loader: 'css-loader'
                }
            })
            
        }, {
            test: /\.woff|.jpg|.jpeg|.png|woff2|.ttf|.eot|.svg*.*$/,
            loader: 'file-loader'
        }]
    }
}