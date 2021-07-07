const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          { loader: 'css-loader', options: { sourceMap: true } },
          // Compiles Sass to CSS
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});
