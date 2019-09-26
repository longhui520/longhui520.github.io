var foo = {
    then:(resolve,reject)=>resolve('foo')
}
var resolved = Promise.resolve(foo);
var resolved = new Promise(resolve,reject=>{
    foo.then(resolve,reject);
});