#### 函数的默认参数

```
function sum(a,b){
    return a+b
}

sum(1)  // NaN
// 如果只传入一个参数，那么参数undefined

以上的最佳处理办法
function sum(a,b){
    b = a || 0
    b = b || 0  
    // 等价于
    // if (b) {
    //  b = b
    // } else {
    //  b = 0
    // }
    return a+b
}

sum(1)  //   1

// 函数体内代码，a或者b不传参数的话，那么我们将看作是0作为默认值。如果传入参数那么就取传入的参数值。
```
但是用以上的方式设置默认参数的话，会很麻烦，需要在函数体内部一一设定他们的默认参数。这种情况下，es6做了很大的改善。如下：
```
function sum(a=0,b=0){
    return a+b
}
sum(3,5)  //  8
sum()  //  0

分析：如果你的a传入的是undefined，默认参数就设置为0。

// 等同于
function sum(a=0,b=0){
  if (b === undefined){
        b = 0
    }
    return a+b
}
sum(2,3)  //  5

```

#### 剩余参数

前置：声明一个函数，在无法获取参数数量的情况下，实现参数求和操作
```
// es5
function f(str){
  console.log(str)  //  '测试的结果是'
  let result = 0
  for (let i = 1;i< arguments.length;i++){
      result += arguments[i]
    }
  return str + result
}
f('测试的结果是',1,2,3,4,5,6)  //  "测试的结果是21"

// 参数可以当作是被分为了两个部分，第一部分也就是接受参数的形参str，接受调用函数时，传入的第一个参数，后面的参数通过arguments[1]一直往后获取。
在看es6
// es6

function f(str,...numbers){
  console.log(numbers)  //  [1, 2, 3, 4, 5, 6]
  // let result = 0
  // for (let i = 0;i< numbers.length;i++){
  //     result += numbers[i]
  //   }
  // numbers.reduce()
  return str + numbers.reduce((a,b) => a+b,0)
}
f('测试的结果是',1,2,3,4,5,6) 

解析：...numbers，就是str参数后面的所有参数。全部统一的放入numbers这个数组里面。



扩展写法：
function f(s) {
   // 方法1 let numbers = Array.prototype.slice.call(arguments)  
   // 方法2 let numbers = Array.from(arguments) 
   // 方法3 let numbers = [...arguments]
    return s + numbers.slice(1).reduce((a,b) => a+b,0)
  }
  f('结果是',12,34,5,6,1,2,1,5,10,5)
```

#### 解构赋值

示例1:
```
let a = 1
let b = 2;
[a,b] = [b,a]
console.log(a,b)  //  2 1 
两者之间互换值。方括号之前一定要有';'，否则就容易出现
let b = 2[a,b] = [b,a]
这样的话输出的结果并不是预期值。
```

示例2:
```
let [a,b,...numbers] = [10,20,30,40,50]
a // 10
b // 20
numbers // [30,40,50]
```

示例4:
```
let claus = {name:'claus',age:'18',sex:'man'}

let name = claus.name
let age = claus.age
let sex = claus.sex

// es6语法
let {name,age,sex} = claus
// 这句话是以上三句话的简写形式。name，age，sex 为三个变量，都是从claus这个对象中取对应的值。需要注意的是，如果用简写形式，变量名必须对呀对象中的属性名。

进阶版：
let claus = {name:'Claus',age:18,sex:'man',child:{name:'Tom',age:12,sex:'man'}}

let {name} = claus  
name // 'Claus'
let {child:{name}} = claus
name // Tom

并且可以通过这种方式更改对象里面的属性名。

let {sex:women} = claus
claus // {name:'Claus',age:18,women:'man',child:{name:'Tom',age:12,sex:'man'}}
```

示例5:
```
let [a=10,b=20] = [1]
// 本例需要与默认参数结合起来，才能看懂是什么意思

分析：
let [a,b] = [1,2]     a // 1     b // 2
let [a,b=20] = [1,/*undefined*/]  b // 20   默认参数

现在在回过头理解这个例子
let [a=10,b=20] = [1,/*undefined*/]
a // 1  b // 20

```

### 对象合并
```
let x = 1
let y = 2

let obj = {
    "x" : x,
    "y" : y
}

obj // {x: 1, y: 2}


// es6
let obj = {x,y}  //  {x: 1, y: 2}
```


#### 新版字符串

```
//es5 
var str = "zxohqwen"

var text = '我是一句话'
    var str = `
        <div>
            <p>${text}</p>
        <div></div>
    `
```
