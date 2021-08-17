module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/yys-tool/'
    : '/',
  devServer: {
    port: 8888
    //   proxy: {}
  }
}
