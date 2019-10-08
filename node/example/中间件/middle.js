function Middle(){
    this.cache = [];
}
Middle.prototype.use = function(fn){
    if(typeof fn !=='function'){
        throw new Error('必须是函数');
    }
    this.cache.push(fn);
}
Middle.prototype.next = function(){
    if(this.middles.length == 0){
        return;
    }
    var fn = this.middles.shift();
    fn.call(this,this.next.bind(this));
}
Middle.prototype.commit = function(){
    this.middles = this.cache;
    this.next()
}
var middle = new Middle();
middle.use(function(next){
    console.log(1);
    next();
    console.log(3);
});
middle.use(function(next){
    console.log(2);
    next();
});
middle.commit();