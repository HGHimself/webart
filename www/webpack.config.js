// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    aesthetic: "./containers/Aesthetic.jsx",
    blog: "./containers/Blog.jsx",
    'radial-cartesian': "./containers/Circular.jsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: "development",
  plugins: [
    // new CopyWebpackPlugin(['public/']),
    new HtmlWebpackPlugin({
      title: 'Aesthetic',
      chunks: ['aesthetic'],
      filename: 'aesthetic.html',
      template: 'template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Blog',
      chunks: ['blog'],
      filename: 'blog.html',
      template: 'template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Radial Cartesian',
      chunks: ['radial-cartesian'],
      filename: 'radial-cartesian.html',
      template: 'template.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};
