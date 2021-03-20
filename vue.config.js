const path = require("path")

module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, "src/assets/icons")

    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(dir).end()   //只包含icons目录
      .use("svg-sprite-loader").loader("svg-sprite-loader").options({extract: false}).end()
      .use("svgo-loader").loader("svgo-loader")
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: "fill"}}]})).end()

    config.plugin("svg-sprite").use(require("svg-sprite-loader/plugin"), [{plainSprite: true}])
    config.module.rule("svg").exclude.add(dir)//其它svg-loader排除icons目录
    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    config.plugin('html').tap(args => {
      args[0].title = '多多记账'
      return args
    })
  }
}
