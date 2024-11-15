const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

//------------------------------------------------------------------------
// получить переменную командной строки
const arg=(name)=>process.argv.find((a) => ((a === name) || (a === (`--${name}`)))) !== undefined;
//------------------------------------------------------------------------
// генерация ключа (для CSS)
const genHash=(count)=>{
    let res = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < count; i++) res += possible.charAt(Math.floor(Math.random() * possible.length));
    return res;
}
//------------------------------------------------------------------------
let  mode = arg('prod') ?'production':'development';



let outputPath = path.resolve(__dirname,'dist');
let hash = genHash(20);


const copyList = [
    { from: `./app/media/favicon.ico` },
];



module.exports = {
    entry:{
        main:'./app/index.js',
        //style:'./app/style.scss'
    }, 
    output:{
        path:outputPath,
        filename:'[name].[fullhash].js',
        chunkFilename: 'lazy/[id].[chunkhash].js',
    },
    resolve: {
        alias: {
            //COMPONENTS: path.resolve(__dirname, app_client+'components/'),
            REDUX:path.resolve(__dirname, 'app/redux/'),
        },
    },
    mode,
    devtool: (mode === 'development'  ? 'inline-source-map' : undefined),
    plugins: [
        //new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),        
        new webpack.DefinePlugin({
           WEBPACK_MODE:JSON.stringify(mode),
        }),        
        new HtmlWebPackPlugin({
            template: `./app/index.html`,
            filename: './index.html',
        }),
        new CopyWebpackPlugin({patterns:copyList}),
        //new webpack.HotModuleReplace`mentPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader', // inject CSS to page
                    'css-loader', // translates CSS into CommonJS modules
                    'sass-loader' // compiles SASS to CSS
                ]
            },            
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            //{
            //    test: /\.css$/,
            //    use: [MiniCssExtractPlugin.loader, 'css-loader'],
            //},
        ],
    },
    optimization: {
        minimizer:(mode==='production')?[
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          `...`,
          new CssMinimizerPlugin(),
          
        ]:[],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port:3000,
        //liveReload: true,
    },
        

};