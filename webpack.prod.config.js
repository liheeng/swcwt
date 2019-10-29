const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    context: resolve(__dirname, 'src/swcwt'),
    entry: './index.ts',
    output: {
        filename: 'swcwt.js',
        path: resolve(__dirname, 'dist'),
    },
    // devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [            
            { 
                test: /\.(ts|tsx)?$/, 
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.pro.json',
                            transpileOnly: true,
                            compilerOptions: {
                              module: 'es2015'
                            }
                        },
                    }, 
                ] 
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
    ],
};