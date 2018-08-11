const path = require('path')

module.exports = { 
    target: 'node',

    externals: ['electron'],

    entry: { 
        entry: './src/entry.js',
    },

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