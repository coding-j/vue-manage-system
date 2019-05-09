module.exports = {
    baseUrl: './',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/project':{
                target:'http://localhost:8088/project',
                changeOrigin:true,
                pathRewrite:{
                    '/project':''
                }
            },
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/ms':{
                target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
                changeOrigin: true
            }
        }
    }
}
