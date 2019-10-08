//添加函数的前置函数
Function.prototype.before = function(beforefn,context){
    var _self = this;
    return function (){
        beforefn.apply(context||this,arguments);
        return  _self.apply(context||this,arguments);
    }
}
//添加函数的后置函数
Function.prototype.after = function(afterfn,context){
    var _self = this;
    return function (){
       var ret = _self.apply(context||this,arguments);
       afterfn.apply(context||this,arguments);
       return  ret;
    }
}
//添加函数的非卷积
Function.prototype.uncurrying = function(){
    var _self = this;
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return _self.apply(obj,arguments);
    }
}
Function.prototype.uncurrying2 = function(){
    var _self = this;
    return function(){
        return Function.prototype.call.apply(_self,arguments);
    }
}
function aop(fn,options){
    if(options === void 0){options = {}}
    var after = options.after;
    var before = options.before;
    return function(){
        var args = Array.prototype.slice.call(arguments);
        var self = this;
        if(before){
            before.call.apply(before,[self].concat(args));
        }
        var ret = fn.call.apply(fn,[self].concat(args));
        if(after){
            after.call.apply(after,[self].concat(args,[ret]));
        }
        return ret;
    }
}
var fn = aop(function(){
    console.log(arguments);
    return 1;
},{
    before:function(){
        console.log(arguments);
    },
    after:function(){
        console.log(arguments);
    }
}
);
fn(1,2,3,4);