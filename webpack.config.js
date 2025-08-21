const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(defaultConfig, {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            process: require.resolve('process/browser.js')
        },
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]
});
