var fs = require('fs');
fs.writeFile('./测试.md','这是测试文件写入',function(error){
   if(error == null){
       console.log('文件写入成功');
   }else{
       console.log(error);
   }
});
fs.readFile('./测试.md',function(error,data){
    if(error){
        console.log('读取文件失败');
    }else{
        console.log(data.toString());
    }
});