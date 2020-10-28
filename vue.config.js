// vue.config.js
const baseUrl = '/';

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? baseUrl : '/',
    configureWebpack: {
        module: {
            rules: [
              {
                test: /\.node$/,
                use: 'node-loader'
              }
            ]
          }
      }
  }