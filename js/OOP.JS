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