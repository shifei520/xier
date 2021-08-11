module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        assets: '@/assets',
        views: '@/views',
        network: '@/network',
      },
    },
  },
  devServer: {
    // 此处为设置代理
    proxy: {
      '/api': {
        // 你的真实的api地址,即真实接口地址
        target: 'https://www.cei.net.cn',
        // 代理websocket
        // ws: true,
        changeOrigin: true,
        // 重写路径
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
