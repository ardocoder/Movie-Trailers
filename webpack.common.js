const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            /* style and css loader */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            /* file loader */
            {
                test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif|mp3)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
            filename: "index.html"
        })
    ]
}