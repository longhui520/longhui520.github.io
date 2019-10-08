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