var path = require('path');

module.exports = {
    entry   : './main.jsx',
    output  : {
        path: path.resolve( __dirname, '' ),
        filename: 'transpiled.js',
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-2'
                    ]
                }
            }
        ]
    }
};
