# DOM 元素
1. property 与 attribute 区别
   property 是js 对象包括了标签固有的所有属性 
   attribute 是 标签的所有的特性(包括自定义特性)
   property 中的 attribute是包含所有的attribute
   jquery 中的  attr 和 prop
   attr 获取所有标签上定义的特性
   当未获取到特性时返回undefined
   当获取到时固有特性返回特性值，其他返回特性名
   prop 只能获取固有属性
   prop 为获取到时返回undefined
   获取到固有特性时返回特性值，布尔值的特性返回布尔值