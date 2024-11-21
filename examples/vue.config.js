const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: 'Vue',
    // 'vue-router': 'VueRouter',
    // vuex: 'Vuex',
    // axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    // '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    // '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    // '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    // '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ],
}
// vue.config.js
const vueConfig = {
  publicPath: './',
  runtimeCompiler: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      icon: 'logo.png',
      title: '消息中心',
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 依赖大小分析工具
      // isProd ? new BundleAnalyzerPlugin() : {}
    ],
    externals: isProd ? assetsCDN.externals : {},
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))
    config.resolve.alias.set('components', resolve('src/components'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })
    if (isProd) {
      config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0369FC',
          'border-radius-base': '2px', // 这里增加ant 自定义主题
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },

  devServer: {
    proxy: {
      '/msg-center-admin-api': {
        // target: 'http://10.159.5.77',
        target: 'http://msg-center-admin-api.nhdc.cloud',
        // target: 'http://10.32.4.59:8085',
        ws: false,
        pathRewrite: {
          '^/msg-center-admin-api': '/', // 开发环境放开
        },
      },
    },
  },
  productionSourceMap: false,
  lintOnSave: undefined,
  transpileDependencies: [],
}

// if (process.env.VUE_APP_PREVIEW === 'true') {
//   vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
// }

module.exports = vueConfig
