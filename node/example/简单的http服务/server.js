var  http = require('http');
var server = http.createServer();
server.on('request',function(){
    console.log('收到请求');
});
server.listen('3000',function(){
    console.log('开启了服务');
});