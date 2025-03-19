var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");
const GlobEntries = require("webpack-glob-entries");

module.exports = {
  mode: "production",
  entry: GlobEntries("./src/*.test.js"), // Generates multiple entry for each test
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        // by default, it resolves `node_modules`
      },
    ],
  },
  stats: {
    colors: true,
  },
  plugins: [new CleanWebpackPlugin(), new webpack.ProvidePlugin({
    process: "process/browser",
    Buffer: ["buffer", "Buffer"],
  })],
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  resolve: {
    fallback: {
      "net": false,  // Mailosaur is not designed to run in the browser, so disabling these.
      "tls": false,
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "process": require.resolve("process/")
    }
  },
};