const path = require('path');

module.exports = {
    mode: 'development', // use 'production' if necessary
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
};
