const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  entry: {
    cartesian: path.resolve(__dirname, "src", "containers", "Cartesian.jsx"),
    nouveau: path.resolve(__dirname, "src", "containers", "NouveauDoors.jsx"),
    aesthetic: path.resolve(__dirname, "src", "containers", "Aesthetic.jsx"),
    dada: path.resolve(__dirname, "src", "containers", "Dada", "index.jsx"),
    oolisp: path.resolve(__dirname, "src", "containers", "Oolisp", "index.jsx"),
    circular: path.resolve(__dirname, "src", "containers", "ColorPlot.jsx"),
    descartes: path.resolve(__dirname, "src", "containers", "Descartes.jsx"),
    spectrum: path.resolve(__dirname, "src", "containers", "Spectrum.jsx"),
    zinc: path.resolve(__dirname, "src", "containers", "Zinc.jsx"),
    clock: path.resolve(__dirname, "src", "containers", "Clock.jsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "studies/[name].js",
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
      filename: "studies/cartesian.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Barcelona Doors",
      chunks: ["nouveau"],
      filename: "studies/barcelona-doors.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Dada",
      chunks: ["dada"],
      filename: "studies/dada.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Oolisp",
      chunks: ["oolisp"],
      filename: "studies/oolisp.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Circular",
      chunks: ["circular"],
      filename: "studies/circular.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Aesthetic",
      chunks: ["aesthetic"],
      filename: "studies/aesthetic.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Descartes",
      chunks: ["descartes"],
      filename: "studies/descartes.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Spectrum",
      chunks: ["spectrum"],
      filename: "studies/spectrum.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Zinc",
      chunks: ["zinc"],
      filename: "studies/zinc.html",
      template: path.resolve(__dirname, "src", "build", "template.html"),
    }),
    new HtmlWebpackPlugin({
      title: "Clock",
      chunks: ["clock"],
      filename: "studies/clock.html",
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
