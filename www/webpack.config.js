const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    cartesian: path.resolve(
      __dirname,
      "src",
      "containers",
      "Cartesian",
      "index.jsx"
    ),
    nouveau: path.resolve(__dirname, "src", "containers", "NouveauDoors.jsx"),
    dada: path.resolve(__dirname, "src", "containers", "Dada", "index.jsx"),
    oolisp: path.resolve(__dirname, "src", "containers", "Oolisp", "index.jsx"),
    circular: path.resolve(
      __dirname,
      "src",
      "containers",
      "ColorPlot",
      "index.jsx"
    ),
    descartes: path.resolve(__dirname, "src", "containers", "Descartes.jsx"),
    spectrum: path.resolve(__dirname, "src", "containers", "Spectrum.jsx"),
    zinc: path.resolve(__dirname, "src", "containers", "Zinc.jsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webart/[name].js",
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
  mode: "development",
  plugins: [
    new CopyWebpackPlugin(["public/"]),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Descartes",
      chunks: ["cartesian"],
      filename: "webart/cartesian.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Barcelona Doors",
      chunks: ["nouveau"],
      filename: "webart/barcelona-doors.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Dada",
      chunks: ["dada"],
      filename: "webart/dada.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Oolisp",
      chunks: ["oolisp"],
      filename: "webart/oolisp.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Circular",
      chunks: ["circular"],
      filename: "webart/circular.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Descartes",
      chunks: ["descartes"],
      filename: "webart/descartes.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Spectrum",
      chunks: ["spectrum"],
      filename: "webart/spectrum.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Zinc",
      chunks: ["zinc"],
      filename: "webart/zinc.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
