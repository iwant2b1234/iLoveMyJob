// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// let user = process.env.VUE_APP_ID
// let envChannel=  process.env.VUE_APP_BASIC_TYPE
// let base = 'base'
// let defaultTemplate = process.env.VUE_APP_TEMPLATE || 'T000'
// let target = process.env.VUE_APP_ID
let version = JSON.stringify(require('./package.json').version).replace(/"/g,'')
const path = require('path');

// const nameStr = `${envChannel}-${user}-${defaultTemplate}-v${version}`

module.exports = {
    publicPath: './',
    // productionSourceMap:process.env.VUE_APP_BASIC_TYPE=='dev'?true:false,
    outputDir: 'docs',
    css: {
      loaderOptions: {
        // sass: {
        //   prependData: `
        //   @import "@/scss/common.scss";
        //   `
        // }
      }
    },
    configureWebpack: {
    plugins: [
      // new CopyWebpackPlugin({
      //   patterns: [
      //       // {
      //       //   from: './src/channelInfo.txt',
      //       //   to: `./${nameStr}.[ext]`,
      //       // },
      //       // {
      //       //   from: `./src/assets/${defaultTemplate}/image`,
      //       //   to: './images/',
      //       // },
      //       // {
      //       //   from: `./src/configs/groups/${envChannel || 'dev' }.js`,
      //       //   to: './myConfig.js',
      //       // },
      //       // {
      //       //   from: `./src/configs/channel/ch-${user|| 'zlcai' }.js`,
      //       //   to: './channelConfig.js',
      //       // },
      //     ],
      // }),
      ]
    }
}
