const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 那些文件自动引入，使用绝对路径
      // 需要使用path.join来凭借完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  configureWebpack: {
    // module: {
    //   rules: [
    //     {
    //       test: /\.(png|svg|jpg|jpeg|gif)$/,
    //       type: 'javascript/auto',
    //       use: [
    //         {
    //           loader: 'url-loader',
    //           options: {
    //             limit: 10000
    //           }
    //         }
    //       ]
    //     }
    //   ]
    // }
    devServer: {
      historyApiFallback: true,
      allowedHosts: 'all'
    },
    externals: {
      qc: 'QC'
    }
  }
})
