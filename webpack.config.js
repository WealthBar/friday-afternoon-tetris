const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  entry: "./src/tetris.ts",
  resolve: {
    extensions: [".ts", ".js", ".vue"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: path.resolve(
            __dirname,
            "assets",
            "img/[name].[hash:7].[ext]",
          ),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: path.resolve(
            __dirname,
            "assets",
            "fonts/[name].[hash:7].[ext]",
          ),
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
  devtool: "#eval-source-map",
  output: {
    path: path.resolve(
      __dirname,
      "./public",
    ),
    filename: "[name].[chunkhash].js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{ from: "static" }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};

