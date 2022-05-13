const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: {
        cartesian: path.resolve(__dirname, 'src', 'containers', 'Cartesian', 'index.jsx'),
        vector: path.resolve(__dirname, 'src', 'containers', 'Vector', 'index.jsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webart/[name].js',
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    experiments: {
        asyncWebAssembly: true,
    },
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin(['public/']),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Descartes',
            chunks: ['cartesian'],
            filename: 'webart/cartesian.html',
            template: path.resolve(__dirname, 'src', 'build', 'template.html'),
        }),
        new HtmlWebpackPlugin({
            title: 'Barcelona Doors',
            chunks: ['vector'],
            filename: 'webart/barcelona-doors.html',
            template: path.resolve(__dirname, 'src', 'build', 'template.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
}
