const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(defaultConfig, {
    resolve: {
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/')
        }
    },
    // entry: {
    //     sailscallsWorker: path.resolve(__dirname, 'src/common/sailscallsWorker.worker.ts')
    // },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]
});
