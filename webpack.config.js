const path = require("path");
// resolve path, no need to explicitly download, comes through node already
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TerserPlugin = require("terser-webpack-plugin");
// minify Js, by default true
// but if any other minimizer(for eg CSS minimizer) used
// then value is overwritten and then we need to call it explicitly
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// when using contentHash in names, after each new build, name of file changes
// this leads to multiple unused and waste copies in build
// this plugin clears those extra copies, and keeps only meaningful files
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// extract css to its separate file
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// optimize css
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var HtmlWebpackPlugin = require("html-webpack-plugin");
// rewrite html dynamically with all new scripts and links(eg for stylesheets) into dist based on a template
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.[contentHash].js",
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
        filename: "index.[hash].html",
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "index.[contentHash].css" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          //loader-order matters
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "./assets/img",
          },
        },
      },
    ],
  },
};
