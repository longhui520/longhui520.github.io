// 借用数组方法
(function(){
    Array.prototype.push.call(arguments,4);
    console.log(arguments);
})(1,2,3);