const path = require("path");
const UglifyJsPlugin = require("uglify-template-string-loader");

module.exports = {
  entry: "./src/renderGallery.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
  mode: "development",
  watch: true,
  //   devServer: {
  //     static: {
  //       directory: path.join(__dirname, "./"),
  //     },
  //     compress: true,
  //     port: 9000,
  //   },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "uglify-template-string-loader"],
      },
    ],
  },
};

// const path = require("path");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "main.js",
//     path: path.resolve(__dirname, "build"),
//   },
// };
