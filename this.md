> `this`用在构造函数中，表示实例对象。`this`也可以用在其他场合，但是无论`this`出现在什么地方：总是代表一个对象。

 - this的指向具有可变性。

#### 全局环境

只要是在全局环境下运行的函数，this最终都是指向window。
```
function f(){
       return this === window
}

f() // true
可以理解为
window.fn() //  fn就是window下的一个方法。
```

#### 构造函数
在构造函数中，this就是指向的是实例对象。
```
var fn = function (obj){
    this.obj = obj
}

var a = new fn('object')
a.obj  // "object"
```
使用一个变量固定this的值，然后内层函数调用这个变量。这是最常见的this操作。

```
var obj = {
    f1 : function () {
        console.log(this)
        var _this = this
        var f2 = function () {
            console.log(_this);
        }()
    }
}
obj.f1()  
```

另外一种避免的方式是严格模式 `'use strict'`
```
var count = {
  num : 0,
  fn : function (){
    'use strict'
    this.num++
  }
}
var wd = count.fn()  
wd()  //  TypeError: Cannot read property 'count' of undefined

fn方法通过采用严格模式，this一旦指向window，就会报错。
```

### 绑定this的方法
javascript提供了三种方法用来绑定或者切换this的指向

#### call
函数实例的call方法，指定函数内部的this指向（函数执行时所在的作用域），然后在所指定的作用域，调用该函数。
```
var obj = {}

var fn = function (){
  return this;
}

fn() === window   // true
fn.call(obj) === window  // false
fn.call(obj) === obj  // true
```
> call方法可以改变this的指向，如同上面的例子，call方法将fn的this指向obj对象，然后在obj对象的作用域中，调用fn函数。

进一步加深对call方法的理解，了解call方法的参数。
- call方法的第一个参数object。如果第一个参数为空，null和undefined，默认传入全局对象。
```
var obj = { name : 'object' }
var name = 'windowObj'

function a(){
	return this.name
}

a.call()  //  'windowObj'
a.call(null)  // 'windowObj'
a.call(undefined)  //  'windowObj'
a.call(obj)  // 'object'
``` 
- call方法的后面多个参数，则是函数调用时所需要的参数
```
function fn(num1,num2){
  return num1 + num2
}
fm.call(this,1,2)  //  3
```

#### apply
> apply方法的第一个参数和call方法类似，也是改变this指向，然后在调用该函数。唯一的区别就是apply方法是接受一个数组作为函数执行的参数。

- apply的第一个参数与call方法基本无异，第二个参数则是一个数组，，该数组的成员依次作为参数，传入原函数。
```
function fn(num1,num2){
  return num1 + num2
}
fn.call(this,1,2)  //  3
fn.apply(this,[1,2])  // 3
```
#### bind
> bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。


##### 三者的区别,call和apply是直接调用函数，而bind则是返回一个新函数(并没有调用原来的函数)，这个新函数会call原来的函数，call的参数由你决定。

