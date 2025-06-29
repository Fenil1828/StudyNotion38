const webpack = require('webpack');

module.exports = {
  // ...other config
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      util: require.resolve('util/'),
      // add more fallbacks as needed
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
