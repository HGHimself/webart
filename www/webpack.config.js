const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    aesthetic: "./containers/Aesthetic.jsx",
    blog: "./containers/Blog.jsx",
    'radial-cartesian': "./containers/Circular.jsx",
    'color-plot': "./containers/ColorPlot.jsx",
    'color-study': "./containers/ColorStudy.jsx",
    'fourier': "./containers/Fourier.jsx",
    'oolisp': "./containers/Oolisp.jsx",
    'dada': "./containers/Dada.jsx",
    'music': "./containers/MusicBox.jsx",
    'home': "./containers/Home.jsx"
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
  experiments: {
    asyncWebAssembly: true,
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
    new HtmlWebpackPlugin({
      title: 'ColorPlot',
      env: process.env.NODE_ENV,
      chunks: ['color-plot'],
      filename: 'color-plot.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'ColorStudy',
      env: process.env.NODE_ENV,
      chunks: ['color-study'],
      filename: 'color-study.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Fourier',
      env: process.env.NODE_ENV,
      chunks: ['fourier'],
      filename: 'fourier.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Oolisp',
      env: process.env.NODE_ENV,
      chunks: ['oolisp'],
      filename: 'oolisp.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Dada',
      env: process.env.NODE_ENV,
      chunks: ['dada'],
      filename: 'dada.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Music',
      env: process.env.NODE_ENV,
      chunks: ['music'],
      filename: 'music.html',
      template: 'build/template.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      env: process.env.NODE_ENV,
      chunks: ['home'],
      filename: 'index.html',
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
