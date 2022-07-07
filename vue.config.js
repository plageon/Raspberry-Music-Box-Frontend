const fs = require('fs')

module.exports = {
  devServer:{
      port: 8080,
      allowedHosts:[
          '.plageon.cn',
      ],
      proxy:{
          '^/api':{
              target:'http://192.168.191.32:5050/',
              changeOrigin:true,
              logLevel:'debug',
              https: true,
          },
      },
      https: {
          key: fs.readFileSync('./src/ssl/plageon.cn.key'),
          cert: fs.readFileSync('./src/ssl/plageon.cn.pem'),
      },
  }
}
