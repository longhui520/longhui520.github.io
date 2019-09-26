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
var Chain = function(fn){
    this.fn = fn;
    this.nextNode = null;
}
Chain.prototype.addNextNode = function(node){
    this.nextNode = node;
    return this;
}
Chain.prototype.computed = function(){
    var ret = this.fn.apply(this,arguments);
    if(ret == 'next'){
        this.nextNode && this.nextNode.computed.apply(this.nextNode,arguments);
    }
}
gc10 = new Chain(g10);
gc5 = new Chain(g5);
gc1 = new Chain(g1);
gc10.addNextNode(gc5).addNextNode(gc1);
gc10.computed(2);