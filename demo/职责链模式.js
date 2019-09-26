var order500 = function(orderType,pay,stock){
    if(orderType ===1 && pay == true){
        console.log('500元定金预购，得到100优惠卷');
    }else{
        return 'nextSuccessor'
    }
}
var order200 = function(orderType,pay,stock){
    if(orderType ===2  && pay == true){
        console.log('200元定金预购，得到50优惠卷');
    }else{
        return 'nextSuccessor'
    }
}

var orderNoraml = function(orderType,pay,stock){
    if(stock>0){
        console.log('普通购买，无优惠劵');
    }else{
       console.log('手机库存不足')
    }
}
var Chain = function(fn){
    this.fn = fn;
    this.successor = null;
}
Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor;
}
Chain.prototype.passRequest = function(){
    var ret = this.fn.apply(this,arguments);
    if(ret = 'nextSuccessor'){
        return this.successor &&  this.successor.passRequest.apply(this.successor,arguments);
    }
}
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNoraml);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
chainOrder500.passRequest(1,true,500);
