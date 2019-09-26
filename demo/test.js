function getImageInfo(filePath){
    return new Promise(function(resolve,reject){
        getFileInfo(filePath).then(function(event){
            var options = {
                src:filePath,
                success:function(event2){
                    event2.size = event.size;
                    resolve(event2);
                },
                fail:function(event){
                    reject(event);
                }
            };
            plus.io.getImageInfo(options);    
        }).catch(function(event){
            reject(event);
        });
    });
}
function getFileInfo(filePath){
    return new Promise(function(resolve,reject){
        var options = {
            filePath:filePath,
            digestAlgorithm:'md5',
            success:function(event){
                resolve(event);
            },
            fail:function(event){
                reject(event);
            }
        };
        plus.io.getFileInfo(options);
    });
}
function getVideoInfo(filePath){
    return new Promise(function(resolve,reject){
        var options = {
            filePath:filePath,
            success:function(event){
                resolve(event);
            },
            fail:function(event){
                reject(event);
            }
        };
        plus.io.getVideoInfo(options);
    });
}