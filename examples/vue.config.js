const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === "production";

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
};
// vue.config.js
const vueConfig = {
  publicPath: "./",
  runtimeCompiler: true,
  pages: {
    index: {
      entry: "./main.js",
      template: "../public/index.html",
      filename: "index.html",
      icon: "./assets/logo.png",
      title: "例子",
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
    config.resolve.alias.set("@$", resolve("."));
    config.module
      .rule("vue") // 修改或创建一个规则，规则名称为 'vue'
      .include.add(resolve("."))
      .end()
      .use("vue-loader") // 使用 vue-loader 来处理 .vue 文件
      .loader("vue-loader") // 明确指定 vue-loader
      .end(); // 结束该规则的链式配置

    config.module
      .rule("js")
      .include.add(resolve("."))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((option) => {
        return option;
      });
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });
    config.plugin("vue-loader").use(VueLoaderPlugin);
    if (isProd) {
      config
        .plugin("ignore")
        .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#0369FC",
          "border-radius-base": "2px", // 这里增加ant 自定义主题
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },

  devServer: {
    proxy: {
      "/api": {
        target: "http://10.32.4.59:8085",
        ws: false,
        pathRewrite: {
          // '^/api': '/', // 开发环境放开
        },
      },
    },
  },
  productionSourceMap: false,
  lintOnSave: undefined,
  transpileDependencies: [],
};

// if (process.env.VUE_APP_PREVIEW === 'true') {
//   vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
// }

module.exports = vueConfig;
