const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// require('vue-cli-plugin-style-resources-loader')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    productionSourceMap: false, // map文件
    // build: {
    //   // 生产环境根目录 - 服务器访问路径 - 绝对路径
    //   assetsPublicPath: '/aaa/'
    // },
    lintOnSave: false, // 关闭eslint
    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: 'localhost',    // 指定使用一个 host，默认是 localhost
        port: 8080,         // 端口地址
        proxy: {
            '/api': {
                target: 'https://gz.qcutc.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
        disableHostCheck: true,
    },
    outputDir: 'dist', // 打包目录
    publicPath: './', // 打包后引用的资源路径
    configureWebpack: (config) => { // webpack自定义配置
        // 生产环境打包分析体积
        if (process.env.NODE_ENV === 'production' && process.env.npm_config_report) {
            return {
                plugins: [
                    new BundleAnalyzerPlugin()
                ]
            }
        }
    },
    chainWebpack: config => { // CLI内部webpack配置
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
            // config.resolve.alias
            //     .set('@', resolve('src'))
            // },
    },
    // 解决Swiper 在 iOS 小于 11 时出现错误
    transpileDependencies: [
        "swiper",
        "dom7",
        "ssr-window"
    ]
}

// 全局样式 变量、函数
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                resolve('src/styles/variables.less'),
                resolve('src/styles/mixin.less'),
            ],
        })
}