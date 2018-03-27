vaScript 语言的继承则是通过“原型对象”（prototype）。

参考如下例子：
```
function People(name, age){
  this.name = name
  this.age = age
  this.country = function (){
    console.log('china')
  }
}  

var man1 = new People('张三',14)  
var man2 = new People('李四',15)
man1.name // ‘张三’
man2.name // ‘李四’
man1.country === man2.country // false
```
##### 构造函数的缺点
以上面的例子为参考，People函数内部定义了name和age属性，man1和man2实例对象都会生成这两个属性。但是缺点就是，同一个构造函数的多个实例之间，无法共享属性。prototype 就可以解决构造函数带来的缺陷。

#### prototype
在javascript中，所有的函数都有一个默认的属性`prototype`，指向一个对象。

```
function fn(){}
typeof fn.prototype  // 'object'
```
> 对于构造函数来说，该属性会自动生成为实例对象的原型。
如果你在原型对象上添加属性或方法，那么通过这个构造函数所生成的实例对象都共享该属性和方法。

参考如下：
```
function People(name){
	this.name = name
}
People.prototype.xx = function (){
	console.log('I\'m ' + this.name)
}
var man1 = new People('claus')
man1.xx()   // I'm claus
var man2 = new People('jim')
man2.xx() // i'm jim

man1.xx === man2.xx  // true
```
上面代码中，构造函数`People`的prototype属性，也就是man1和man2的原型对象，上有一个`xx`的方法，结果man1和man2也都共享了该方法。

原型对象的属性或方法不是实例对象自身具有的。只要从原型对象上修改了该属性或者方法，那么所有的实例对象的属性或者方法就会发生改变。

```
People.prototype.xx = function (){
	console.log('my name is ' + this.name)
}

man1.xx() // my name is claus
man2.xx() // my name is jim
```
原型对象上的xx方法发生变动反映在了所有的实例对象上。
> 说明：当实例对象本身没有某个属性或者方法的时候，它会到原型对象上去找该属性或者方法。

但是如果实例对象自身有某个属性或者方法，它就不会再去原型对象上去找这个属性或方法。
```
man1.xx = function (){
  console.log(this.name)
}
man1.xx() // claus
man2.xx() // my name is jim
```

###### 总结：原型对象的作用，就是通过prototpe属性定义所有实例对象共有的属性或者方法。实例对象也可被视作从原型对象衍生出的子对象。

### 原型链

1. 所有对象都有自己的原型对象。
2. 原型对象也是对象，它也会有自己的原型。

根据上面两个特性，那么就根据原型形成了一个“原型链”，对象的原型到原型的原型。
但是所有的对象原型，最终都会找到`Object.prototype`，`Object`构造函数的`prototype`属性。所有的对象也就都继承了`Object.prototype`属性。

> `Object.prototype`对象的原型是`null`。说明原型链的根源是`null`。

在读取某个对象的属性时，通常会先从自身开始查找，如果没有就从原型上找，如此逐级往上，直到最顶层的`Obejct.prototype`。如果`Object.prototype`没有，最终返回`undefined`。如果对象的自身和原型上有相同的属性或方法，那么优先于自身属性和方法。

看一个例子:
```
function F(){}
var f = new F()

f.__proto__ === F.prototype  // true
F.__proto__ === Function.prototype  // true
F.prototype.__proto__ === Object.prototype  // true
```

通过以上例子，get如下：
>  1. 当new一个函数的时候创建一个对象，那么函数的`prototype` 等于 被创建对象的`__proto__`属性，如上例所示中 `f.__proto__ === F.prototype`。
> 2. 一切函数都是由`Function`这个函数创建的，所以`被创建的函数.__proto__ === Function.prototype` => `F.__proto__ === Function.prototype`
> 3. 一切函数的原型对象都是由`Object`函数创建的。 => `F.prototype.__proto__ === Object.prototype`


在继续看一个例子：
```
Function.prototype === Function.__proto__  //  true
Function.prototype === Object.__proto__  //  true
Function.prototype.__proto__ === Object.prototype  //  true
```
￼![来，感受一下](https://upload-images.jianshu.io/upload_images/5030047-1a9f03ca25aab4f2.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##### constructor
`prototype`对象有一个`constructor`属性，默认指向`prototype`对象所在的构造函数。 
```
function Gz(){}
let z = new Gz()

z.constructor === Gz.prototype.constructor  // true

```
- `constructor`属性定义在`prototype`对象上，意味着可以被实例对象所继承。

- `constructor`属性还可以知道某个实例对象的原型。

```
function F(){}
var f = new F()

f.constructor === F  // true
```
因为`constructor`其实指向的是构造函数的原型。所以:我们可以通过实例对象的`constructor`属性，来新建另一个实例对象。

```
function F() {}
var f = new Constr();

var cc = new f.constructor();
cc instanceof F // true
```

`constructor`属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性的指向，防止引用的时候出错。

