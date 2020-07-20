const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename:'bundle.js',
        path: path.join(__dirname,"dist")
    },
    devServer: {
        inline: true,
        port: 8080
        },
        
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ["es2015", "react"],
                plugins: ["babel-plugin-transform-class-properties"]
            }
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader?limit=100000' 
        }
        ]
    }
};