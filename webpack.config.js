module.exports = {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env', 'stage-0'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            },
        ],
    }
};
