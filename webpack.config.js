const path = require("path")
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin")

module.exports = {
    entry: "./src/public/scripts/addGame.ts",
    // entry: {
    //     "public/js/scripts" : ["./src/public/scripts/addGame.ts"]
    // },
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                loader: "ts-loader",
                exclude: /node_modules/,
                // options: {
                //     transpileOnly: true,
                // },
            },
            // {
            //     test: /\.(css|sass|scss)$/i,
            //     use: ["css-loader", "sass-loader"],
            // },
            // {
            //     test: /\.(ico|png|jpe?g|webp|svg)$/i,
            //     type: "asset/resource",
            //     generator: {
            //         filename: "img/[name].[hash:8][ext][query]",
            //     },
            // },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        // extensionAlias: {
        //     ".js": [".js", ".ts"],
        // },
    },
    devtool: "inline-source-map",
    // plugins: [
    //     new HtmlBundlerPlugin({
    //         entry: "./src/views/",
    //         preprocessor: "ejs",
    //     }),
    // ],
}

// new HtmlBundlerPlugin({
//     entry: {
//         index: "src/views/game.ejs",
//     },
//     preprocessor: "ejs",
//     sources: [{ tag: "img", attributes: ["data-src", "data-srcset"] }]