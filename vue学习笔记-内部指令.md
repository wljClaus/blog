
> vue的内部指令

#### v-if & v-else & v-show

- v-if:是vue的一个内部指令，指令用在我们的html 中。
v-if用来判断是否加载html的DOM，true加载！false不加载。比如我们模拟一个用户登录的状态，在用户登录后实现用户的名称。

- v-else：常于v-if连用。来达到js中的if——else语法。

- v-show：与v-if差不多，但是v-if表示的是，判断是否加载，如果是false 那么页面是不会加载的。v-show其实就是与css中的dispaly属性一样，当v-show为true，那么页面显示该元素，如果为false那么页面隐藏该元素。类似于display：block和none！

###### v-if 和 v-show的区别

1. v-if：判断是否页面是否加载，可以减轻服务器的压力。

2. v-show：调整css display属性，可以使客户端操作更加流畅。

#### v-for

例如：
![v-for循环示例](https://upload-images.jianshu.io/upload_images/5030047-efe7b7845db226d0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

data中就是存放需要循环的循环主体 items，然后v-for语句放在需要循环的对象上 ` li 元素`，并且 使用 “`item in items`” 也就是说，把items 里的每一个值赋予给item，然后用模版{{}} 将item包裹起来即可。

> v-for指令是循环渲染一组data中的`「数组!,数组!,数组!」`，v-for 指令需要以 item in items 形式的特殊语法，items 是源数据数组并且item是数组元素迭代的别名。


###### computed
在输出data里的内容之前进行的一种计算。

注意：
![箭头函数中的this](https://upload-images.jianshu.io/upload_images/5030047-4427d33875f1ebac.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


⚠️：一定需要知道computed中，定义的方法一定要return。否则你就是个智障！

![论return的重要性](https://upload-images.jianshu.io/upload_images/5030047-b0f1e1c8f33f2cb8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 一定要注意vue的版本不同也会造成data里的属性名和computed中的属性名相同的话那么就会报错！

------

#### v-text & v-html

- v-text：在html中，输入data中的值，并且用{{}}模版包裹住data内部的值，就可以在页面中加载了。但是v-text的出现目的就是解决，当网速非常的慢或者是javascript出错时，那么页面中就会暴露出{{xxx}}的模版块。

![看清楚两者的区别](https://upload-images.jianshu.io/upload_images/5030047-b04584cfdcffa060.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![看清楚两者的区别](https://upload-images.jianshu.io/upload_images/5030047-e397243fbc13b666.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- v-html 

![认准咯](https://upload-images.jianshu.io/upload_images/5030047-56963e963a76d3c8.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![与之对应](https://upload-images.jianshu.io/upload_images/5030047-3fc8e7b4c400c127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

>  必须注意，v-html能不用就不用，会引起xss攻击。在生产环境中动态渲染HTML是非常危险的，因为容易导致XSS攻击。所以只能在可信的内容上使用v-html，永远不要在用户提交和可操作的网页上使用。



- {{}} 双大括号会将数据解释为纯文本，而非html标签。


#### v-on

v-on 就是事件监听，可以用v-on指令监听DOM事件来触发一些javascript代码。

装逼典范：`v-on`可以使用简单的写法，@代替。
示例：
![实例演示](https://upload-images.jianshu.io/upload_images/5030047-a4e0401c5b91eb63.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![参考](https://upload-images.jianshu.io/upload_images/5030047-263b0589f50090f3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### v-model

> 就是绑定数据源！

实现双向数据绑定。

意味把数据绑定在特定的表单元素上，实现双向数据绑定。

![最简单的双向数据绑定](https://upload-images.jianshu.io/upload_images/5030047-d9ae330fe7c4f055.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

v-model修饰符：

1. lazy
该属性的一个很直观的特点就是，如果我们在`v-model`后面在跟上`lazy`修饰符，我们在文本框里面输入内容页面不会立刻就发生改变，而是当文本框的失去焦点时，页面才会发生改变。事实上还是有双向绑定，只不过延缓了加载的时机，必须等到在文本框编辑完，离开文本框的时候才会触发这个`lazy`。
![v-model.lazy](https://upload-images.jianshu.io/upload_images/5030047-b0df1a8ecaa002f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. number
number修饰符，顾名思义跟数字相关，如果在v-model后面跟这时number修饰符， 那么当用户在文本输入框中输入的时候，message必须是数字。如果最开始输入的是字符串，那么number就没有效果了。如果输入的是数字，那么在输入其他的字符串时，页面是不会渲染的。

3.trim
去除空格，目前经过测试，如果带有trim修饰符，那么字符串开头和结尾无论有没有空格，他都会默认清除空格，并且空格不会渲染到页面上。但是，如果是字符串内部加入空格，trim就没有办法清除该空格了。

 
###### v-model 双向绑定表单数据，其实就是绑定表单元素中的value值。 

#### v-bind

> 绑定标签上的元素，属性。

例如：`<img />`可以绑定`<img />`上的`src`属性进行动态的赋值。


![v-bind 可以用 : 代替](https://upload-images.jianshu.io/upload_images/5030047-0b491b4e55da1be8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
    <!--    完整语法    -->
    <a v-bind:href="url"></a>
    <!--    缩写语法    -->
    <a :href="url"></a>
```

> v-bind最常用的还是绑定css的class属性等等。

![示例](https://upload-images.jianshu.io/upload_images/5030047-120ffaa6b362932d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


添加两个calss属性时，需要将两个calss属性写入一个数组里，并且在data数据源中声明。

> 利用v-bind绑定css样式：

在绑定css样式时，绑定的值必须在vue中的data属性里进行声明。

1. 直接绑定class样式
`<div :class="className">1、绑定classA</div>`

2. 绑定class属性，进行判断。
`<div :class="{className:judgeDemo}">1、绑定classA</div>`

3. 绑定多个class属性。
`<div :class="[classA,classB]">以数组的形式进行绑定</div>`

4. 绑定calss中可以使用三元运算符判断。
	
<div :class="isTrue?classA:classB"></div>

5. 绑定style内联样式

`<div :style="{color:red,fontSize:size}">5、绑定style</div>`
注意的是，这里面的red和size是在vue中的data属性里面声明过的，否则会报错。

6. 利用对象绑定style样式
`<div :style="styleObject">6、用对象绑定style样式</div>`
styleObject也是在data属性中声明过的，并且是以对象的形式编辑参数。参考如下:

![参考图](https://upload-images.jianshu.io/upload_images/5030047-5c0064d59f5d9643.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### vue的其他内部指令。(v-pre & v-cloak & v-once)

1. v-pre 
在模版中跳过vue的编译，直接输出原始数据。意思就是说，在标签中加入v-pre就不会输出vue中的data内部声明的值了。参考如图：
![跳过vue的渲染](https://upload-images.jianshu.io/upload_images/5030047-18b759f5fc5dcfbe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. v-cloack

在vue渲染完指定的整个DOM后才进行显示，被vue隐藏的内容。该指令必须和css样式一起使用。

```
[v-cloak]  {
  display:none;
}

<div v-cloak>
    {{message}}
</div>
```

3. v-once
在第一次DOM时进行渲染，渲染完成之后视为静态内容，跳出以后的动态渲染过程。
举个例子:

![v-once只渲染一次](https://upload-images.jianshu.io/upload_images/5030047-a70d0d4939531173.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
