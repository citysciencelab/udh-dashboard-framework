// vue.config.js
module.exports = {
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