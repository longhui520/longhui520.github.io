var g10 = function(n){
    if(n>10){
        console.log(`${n}>10`);
    }else{
        return 'next';
    }
}
var g5 = function(n){
    if(n>5){
        console.log(`${n}>5`);
    }else{
        return 'next';
    }
}
var g1 = function(n){
    if(n>1){
        console.log(`${n}>1`);
    }else{
        return 'next';
    }
}
Function.prototype.after = function(fn){
    var self = this;
    return function(){
        var ret = self.apply(this,arguments);
        if(ret == 'next'){
            return fn.apply(this,arguments);
        }
        return ret; 
    }
}
var g = g10.after(g5).after(g1);
g(3);
