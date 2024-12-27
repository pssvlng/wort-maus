const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    content: './src/content.js',
    popup: './src/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' }, 
        { from: 'icon_16.png', to: 'icon_16.png' },
        { from: 'src/popup.html', to: 'popup.html' }
      ]
    })
  ],
  mode: 'development',
  devtool: 'source-map'
};
