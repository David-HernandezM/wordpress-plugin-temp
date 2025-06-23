const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        varaGearGlobalData: path.resolve(__dirname, 'src/common/varaGearGlobalData.ts')
    },
    output: {
        path: path.resolve(__dirname, 'build/common'),
        filename: '[name].js',
        library: 'varaGearGlobalData',
        libraryTarget: 'window',
        clean: true
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.sailscalls.json' 
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util/')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ]
};
