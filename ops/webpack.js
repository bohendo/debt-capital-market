const path = require('path')

module.exports = { 
    target: 'node',

    mode: 'development',

    externals: ['electron'],

    entry: ['babel-polyfill', './src/entry.js'],

    output: {
        path: path.join(__dirname, '../build'),
        filename: 'dharma-api.js',
    },

    resolve: {
        extensions: ['.js', '.json'],
        alias: { 'scrypt.js' : 'scryptsy' },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
        ],
    },
}
