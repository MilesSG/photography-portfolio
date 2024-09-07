const { defineConfig } = require('@vue/cli-service')

// 本地调试用下面这个
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/photography-portfolio/' : process.env.VUE_APP_PUBLIC_PATH
})

