const path = require('path');

module.exports = {
    entry: ['./index.js', './db.json'], // Your entry point
    output: {
        filename: 'bundle.js', // Output bundle file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // Set the mode to development or production
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader',
                type: 'javascript/auto' // Required for Webpack 2+
            }
        ]
    }
};