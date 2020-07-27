// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
    // 部署生产环境和开发环境下的URL。
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

    productionSourceMap: false,

    // 它支持webPack-dev-server的所有选项
    devServer: {
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            "/api": {
                target: "http://localhost:3000/api",
                ws: true, 
                changeOrigin: true, 
                pathRewrite: {
                    '^/api': '' 
                }
            }
        }
    }
};