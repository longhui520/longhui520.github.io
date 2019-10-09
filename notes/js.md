# 前端工程师的自检清单知识
## 一 、javaScript基础
### 变量和类型
- 1. JavaScript 规定的几种语言类型
  - 基本类型
    - Number 类型(IEEE 754 标准的双精度64位二进制格式,数字,Infinity,NaN)
    - String 类型
    - Boolean 类型
    - null 类型
    - undefined 类型
   - 引用类型
    - Object 类型
    - Function 类型
    - Array 类型
    - RegExp 类型
    - Date 类型
  - es6 新引入类型
    - Symbol 类型
    - Set 类型
    - Map 类型
- 2. JavaScript对象的底层数据结构是什么
    - 基本类型的数据存放在
    - 引用类型Object 存在堆中
    - [js底层数据结构](https://www.rrfed.com/2017/04/04/chrome-object/)
- 3. Symbol 类型在实际开发中的运用，可手动实现一个简单的Symbol
    - 一般用于避免重复键，可用于消除魔术字符串
    - Symbol 的特点
        1. typeof Symbol() == 'symbol'
        2. 不能使用 new Symbol 因为Symbol 是基本类型
        3. Symbol() instanceOf Symbol 为false
        4. Symbol('foo') 传入已Symbol 描述
        5. 如果传入的参数是个对象 ，对象会先调用toString方法后传入
        6. Symbol 的描述只是描述，2个Symbol函数传入相同值，也会不相等
        7. Symbol 值不能与其他值运算
        8. Symbol 可调用toString
        9. Symbol 作为属性名 不会被 for in for of 遍历,Obejct.keys(),           Object.getOwnPropertyNames(),JSON.stringify()返回
        10. Object.getOwnPropertySymbols()可返回指定对象的Symbol属性名
        11. Symbol.for('name') 可以使用同一个Symbol,
        12. Symbol.keyFor('name') 返回一个已登记了的Symbol name   
        [参考](https://segmentfault.com/a/1190000015262174)
        ```javascript
            (function(){
                var root = this;
                var generateName = (function(){
                    var postfix = 0;
                    return function(descString){
                        postfix ++;
                        return descString + '_'+postfix
                    }
                })()
                var SymbolPolyfill = function Symbol(descString){
                    if(this instacneof SymbolPolyfill){
                        throw new TypeError('Symbol is not constructor');
                    }
                    var descString = descString === undefined ? undefined : String(descStirng);
                    var symbol = Object.create({
                        toString:function(){
                            return this.__Name__;
                        },
                        valueOf:function(){
                            return this;
                        }
                    });
                    Object.defineProperties(symbol,{
                        '__Description__':{
                            value:descString,
                            writable:false,
                            enumerable:false,
                            configurable:false
                        },
                        '__Name__':{
                            value:generateName(descString),
                            writable:false,
                            enumerable:false,
                            configurable:false
                        }                   
                    });
                    var forMap = {};
                    Object.definedProperties(SymbolPolyfill){
                        'for':{
                            value:function(description){
                                var descString = descString === undefined ? undefined : String(descStirng);
                                return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
                            },
                            writable:true,
                            enumerable:false,
                            configurable:true
                        },
                        'keyFor':{
                            value:function(symbol){
                                for(key in forMap){
                                    if(forMap[key]){
                                        return key;
                                    }
                                },
                                writable:true,
                                enumerable:false,
                                configurable:true
                            }
                        }
                    }

                })
                root.SymbolPolyfill = SymbolPolyfill;  
            })();

        ```
- 4. JavaScript中的变量在内存中的具体存储形式
  基本类型存放在栈中，引用类型存放在堆中
- 5. 基本类型对应的内置对象，以及他们之间的装箱拆箱操作
  数字 Number 字符串 Stirng 布尔 Boolean，
  - 装箱 在需要转换的时候不隐式的将数据包装成相应类型的对象，使用后销毁
  - 拆箱 在需要的时候将对象转化为对应的基本数据类型或者字符串
    转化的时候除了String()转化的时候先执行toString ，否则先执行valueOf
  - [参考](https://www.jianshu.com/p/d66cf6f711a1)
- 6. 理解值类型和引用类型
    - 值类型：直接存放值
    - 引用类型：存放的是指向值的指针(堆地址)
    - [参考](https://www.cnblogs.com/amy2011/archive/2013/05/22/3091401.html)
- 7. null和undefined的区别
   - null 将变量设置为空值
   - undefined 变量未申明或者未赋值
- 8. 至少可以说出三种判断JavaScript数据类型的方式，以及他们的优缺点，如何准确的判断数组类型
  - typeof 无法精确判断 object array null,无法判断自定义的对象
  - instanceof 同样无法分辩有继承关系的对象
  - Object.prototype.toString.call 无法判断自定义的对象
- 9. 可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用
  - 比较运算符 if条件中 ！ 转化规则时数字与其他比较 其他转数字 字符串与其他比较时 转字符串 ，布尔值与其他比较时转布尔值
  - 算术运算符时
  - 可以自己显示转换
- 10. 出现小数精度丢失的原因，JavaScript可以存储的最大数字、最大安全数字，JavaScript处理大数字的方法、避免精度丢失的方法
  - 小数转二进制时出现循环或者超出了精度范围的表达位数
  - Number.MAX_VALUE Number.MIN_VALUE,Number.MAX_SAFE_INTEGER
  - 引入bigNumber库处理
  - 小数转整数后运算
### 原型和原型链
- 1. 理解原型设计模式以及JavaScript中的原型规则
    任何对象(除了null)都是有原型对象
    原型对象也有原型对象这样就形成了原型链
    - prototype 是构造函数特有的属性
    - __proto__ 是构造函数生成的实例时指向函数的prototype
- 2. instanceof的底层实现原理，手动实现一个instanceof
    - 判断实例对象的__propto__ 对象是否与 右边的prototype相等，如果不相等，在原型链上继续查找，直到原型对象为null
    ```javascript
        function instance_f(L,R){
            var O = R.prototype;
            var L = L.__prototype;
            while(true){
                if(L === null){
                    return false;
                }
                if(L === O){
                    return true;
                }
                L = L.__proto__;
            }
        }
    ```
- 3.  实现继承的几种方式
    - 借用构造函数继承
    ```javascript
    function classA(color){
        this.color = color;
    }
    function classB(color,name){
        this.superClass = classA;
        this.superClass(color);
        delete this.superClass;
        this.name = name;
    }
    function classC(color,name){
        classA.call(this,color);
        this.name = name;
    }
    ```
    这种方式只能继承超类的实例属性，不能继承其原型属性
    - 原型链继承
    ``` javascript
    function classA(){

    }
    classA.prototype.name = "小红"

    function classB(){

    }
    classB.prototype = new classB();
    ```
    这种方式多个超类的实例属性是共享的
- 组合继承：结合上面2种的继承
    ```javascript
    function classA(color){
        this.color = color;
    }
    classA.prototype.say = function(){
        console.log(this.color);
    }
    function classB(color,name){
        classA.call(this,color)
        this.name = name;
    }
    classB.prototype = new ClassA(color);
    classB.prototyp.construct = classB;
    classB.prototype.go = function(){
        console.log(this.name)
    }
    ```
    缺点是在原型链上有多余的实例属性
- 原型式继承
  ```javascript
    function object(obj){
        function F(){}
        F.prototype = obj;
        return new F();
    }
  ```
  缺点是继承多个实例时，引用类型会共享，无法传参数
- 寄生式继承
  ```javascript
     function createAnother(original){
         var clone = object(origianl);
         clone.say = function(){console.log(this)};
         return clone;
     }
  ```
    缺点同上，优点是增强了对象
- 寄生组合式继承
  ```javascript
    function inheritPrototype(subType,superType){
        var prototype = Object.create(superType.prototype);
        prototype.construct = subType;
        subType.prototype = prototype;
    }
    function superType(color){
        this.color = color;
    }
    superType.prototype.say = function(){console.log(this)}
    function subType(color,name){
        superType.call(this,color);
        this.name =name;
    }
    inheritPrototype(subtype,supertype);

  ```
- es6 extends 继承
    ```javascript
        class A{}
        calss B extends A{
            constructor(){
                super();
                 this.name = name;
            }
            
        }
    ```
- 4. 至少说出一种开源项目(如Node)中应用原型继承的案例
    使用了继承组合式继承

- 5. 可以描述new一个对象的详细过程，手动实现一个new操作符
    1. 创建一个新对象并且指向this
    2. 给this 绑定实例属性
    3. 返回this(当返回是对象时则返回这个对象，否则返回this);
   ```javascript
     function new2(fn,...args){
         var obj = new Object();
         fn.call(obj,...args);
         return obj;
     }
   ```
- 6. 理解es6 class构造以及继承的底层实现原理
- [参考](https://blog.csdn.net/qq_34149805/article/details/86105123)   
### 作用域和闭包
- 1. 理解词法作用域和动态作用域
    - js 函数的函数变量作用域是定义时决定是静态作用域(词法作用域);
    - bash 函数式动态作用域,函数中的变量取决于执行的地方;
- 2. 理解JavaScript的作用域和作用域链
    - 函数的上下文是函数定义的地方的上下文
    - 嵌套函数会继承外层函数的上下文，形成作用域链，
    - 获取变量是由低到高查询，直到全局
- 3. 理解JavaScript的执行上下文栈，可以应用堆栈信息快速定位问题
    - 函数执行时会压进一个栈中，知道完全执行完后，从栈中退出；
- 4. this的原理以及几种不同使用场景的取值
    - 作为对象的方法时，this指向这个方法
    - 最为普通函数时，指向顶级变量window global 或undefiend
    - 
    - 箭头函数指向上层函数的this
    - call bind apply 等函数可以改变this的指向
- 5. 闭包的实现原理和作用，可以列举几个开发中闭包的实际应用
    - 内层函数用到了外层函数的变量时，并且外层函数执行完时，内层函数被引用时形成
    - 使得函数有状态的变量用于 单例模式 ， 绑定一些特殊变量， 计时器，防抖等
- 6. 理解堆栈溢出和内存泄漏的原理，如何防止
    - 死循环，循环引用，等导致快速用于内存，
    - 避免死循环和循环引用，即使置null，闭包函数使用完清理掉
- 7. 如何处理循环的异步操作
    - promise.all
    - async await
- 8. 理解模块化解决的实际问题，可列举几个模块化方案并理解其中原理
    - 解决js代码复用，按需引用，
    - commonjs amd cmd es6
    - [参考](https://juejin.im/post/5c17ad756fb9a049ff4e0a62)
### 执行机制
- 1. 为何try里面放return，finally还会执行，理解其内部机制
    - 会在return之前保存值，执行完finally后返回保存的值，如果finally有return 则直接返回此时的值
- 2. JavaScript如何实现异步编程，可以详细描述EventLoop机制
    - 回调和promise
    - 代码解析执行脚本，执行同步代码 再执行宏任务，再执行微任务，执行宏任务，如此循环(js代码块也是宏任务);
- 3. 宏任务和微任务分别有哪些
    - 宏任务 3种定时器，整体代码script
    - 微任务 promsie proccess.nextTrick MutationObserver 
- 4. 可以快速分析一个复杂的异步嵌套逻辑，并掌握分析方法
    - 通过打断点，观察执行栈
- 5. 使用Promise实现串行
    - 
- 6. Node与浏览器EventLoop的差异