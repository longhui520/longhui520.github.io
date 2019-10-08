var net = require('net');
var charServer = net.createServer();
var clientList = [];
charServer.on('connection',function(client){
    client.write('Hi!\n');
    clientList.push(client);
    client.on('data',function(data){
        console.log(data);
        for(var i = 0;i<clientList.length;i++){
            clientList[i].write(data);
        }
    });
});
charServer.listen(9000);