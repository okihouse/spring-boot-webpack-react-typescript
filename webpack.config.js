/**
 * Created by okihouse16 on 2017. 12. 25..
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const productCss = new ExtractTextPlugin('[name].min.css');
const devCss = new ExtractTextPlugin('[name].css');

module.exports = function(env, argv) {
    const plugins = [
    ];

    if(argv.mode.production) {
        plugins.push(
            productCss,
            new CleanWebpackPlugin('./src/main/resources/dist'),
            new webpack.optimize.UglifyJsPlugin()
        );
    } else {
        plugins.push(
            devCss,
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        );
    }

    return {
        entry: {
            index: './src/main/resources/static/ts/index.tsx',
            
            //vendors: [
            //],

            style : [
                './src/main/resources/static/style/index.scss',
            ]
        },
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, '/src/main/resources/dist')
        },
        devtool: argv.mode.production ? 'source-map' : 'none',
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
                                        minimize: argv.mode.production,
                                        sourceMap: argv.mode.production ? true : false
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                        options: {
                                        sourceMap: argv.mode.production ? true : false
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
        plugins: plugins
    }
};