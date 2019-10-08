function compose(...args){
    return function(x){
        return args.reduceRight(function(value,item){
            return item(value);
        },x)
    }
}
function f(x){
    return x*5;
}
function g(x){
    return x+5;
}
console.log(compose(f,g)(5))