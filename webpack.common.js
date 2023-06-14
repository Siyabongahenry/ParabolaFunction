const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SvgChunkWebpackPlugin = require('svg-chunk-webpack-plugin');

module.exports = {
    entry: './src/javascript/index.js',
    plugins:[
       new HtmlWebpackPlugin({
         title:'Parabola',
         template:'index.html'
       }),
        new MiniCssExtractPlugin({
            filename:'bundle.css'
        }),
        new SvgChunkWebpackPlugin()
    ],
    output:{
        path: path.resolve(__dirname,'dist'),
        publicPath:'',
        filename:"[name].[contenthash].js",
        clean:true
    }
    ,
    optimization:{
        moduleIds:'deterministic',
        runtimeChunk:'single',
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendors',
                    chunks:'all',
                }
            }
        }
    },

    module:{
        rules:[
            {
                test: /\.js$/,
                include:path.resolve(__dirname,'src'),
                exclude:/(node_modules)/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    {
                        loader:'css-loader',
                    },
                    {
                        loader:'postcss-loader'
                    },
                    {
                        loader:'sass-loader',
                       // options:{
                        //    options:{
                               // implementation:require('sass')
                          //  }
                        //}
                    }
                ]
            },
            {
                test:/\.(png|jpe?g|gif|svg)$/i,
                type:'asset/resource'
            },
            {
                test:/\.(woff|woff2|ttf|otf|eot)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            outputPath:'fonts'
                        }
                    }
                ]
            },
            {
                test:/\.svg$/,
                use:[
                    {
                        loader: SvgChunkWebpackPlugin.loader
                    }
                ]
            }
        ]
    }
};