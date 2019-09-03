/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, argv) => {
    const production = argv.mode === "production";

    const config = {
        mode: argv.mode,
        entry: {
            index: [
                "@babel/polyfill",
                "./src/main/resources/scripts/Index.tsx"
            ]
        },
        output: {
            path: path.join(__dirname, "/src/main/resources/dist"),
            filename: "[name].js?v=[hash]",
            publicPath: "/dist"
        },
        devtool: production ? "source-map" : "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: ["awesome-typescript-loader"],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        production ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, "src"),
            compress: true,
            publicPath: "/dist",
            port: 8000,
            historyApiFallback: true,
            hot: true,
            open: true,
            proxy: {
                "**": "http://localhost:3000"
            }
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", "scss"],
        },
        optimization: {
            mangleWasmImports: true,
            minimizer: [
                new TerserPlugin({
                    sourceMap: true
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    common: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        enforce: true
                    }
                }
            }
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new HtmlWebpackPlugin({
                filename: "index.hbs",
                template: "./src/main/resources/templates/index.hbs",
                minify: true
            }),
            new MiniCssExtractPlugin({
                filename: production ? "[name].[hash].css" : "[name].css",
                chunkFilename: production ? "[id].[hash].css" : "[id].css",
                ignoreOrder: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    };

    if (production) {
        config.plugins.push(new CleanWebpackPlugin());
    }

    return config;
};