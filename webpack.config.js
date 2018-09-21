/**
 * Created by okihouse16 on 2017. 12. 25..
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = function(env, argv) {
    const isProduction = argv.mode == 'production';

    const cssAssetName = isProduction ? '[name].min.css?v=[hash]' : '[name].css?v=[hash]';
    const plugins = [
        new ExtractTextPlugin(cssAssetName),
        new ManifestPlugin({
            publicPath: '/dist/'
        })
    ];

    if(isProduction) {
        plugins.push(
            new CleanWebpackPlugin('./src/main/resources/dist')
        );
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        );
    }

    return {
        mode: isProduction ? 'production' : 'development',
        entry: {
            index: './src/main/resources/static/ts/index.tsx',
            style : [
                './src/main/resources/static/style/index.scss',
            ]
        },
        output: {
            filename: isProduction ? '[name].min.js?v=[hash]' : '[name].js?v=[hash]',
            path: path.join(__dirname, '/src/main/resources/dist')
        },
        devtool: isProduction ? 'none' : 'source-map',
        devServer: {
            historyApiFallback: true,
            contentBase: path.join(__dirname, 'src'),
            publicPath: '/dist/',
            compress: true,
            port: 8000,
            proxy: {
                "**": "http://localhost:3000"
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        ignoreDiagnostics: [
                            2686,
                            2339,
                            2304
                        ],
                    },
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        url: false,
                                        minimize: isProduction,
                                        sourceMap: !isProduction
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                        options: {
                                        sourceMap: !isProduction
                                    }
                                }
                            ]
                        }))
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss"]
        },
        plugins: plugins,
        optimization: {
            minimizer: [new UglifyJsPlugin({
                uglifyOptions: {
                    compress: isProduction,
                    mangle: true,
                    keep_fnames: isProduction,
                    output: {
                        beautify: !isProduction,
                        comments: false
                    }
                }
            })]
        },
        externals : {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }
};