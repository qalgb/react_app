const path = require('path')
const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  style: {
    postcss: {
      plugins: [
        pxtoviewport({
          viewportWidth: 375
        })
      ]
    }
  },
  webpack: {
    alias: {
      '@redux': path.resolve(__dirname, './src/redux'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api')
    }
  }
}