const CopyWebpackPlugin = require("copy-webpack-plugin");
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
    new HtmlWebpackPlugin({
      title: 'Aesthetic',
      env: process.env.NODE_ENV,
      chunks: ['aesthetic'],
      filename: 'aesthetic.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Blog',
      env: process.env.NODE_ENV,
      chunks: ['blog'],
      filename: 'blog.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Radial Cartesian',
      env: process.env.NODE_ENV,
      chunks: ['radial-cartesian'],
      filename: 'radial-cartesian.html',
      template: 'build/template.html'
    }),
    new CopyWebpackPlugin(['public/']),
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
