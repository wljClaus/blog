> vue中的全局API并不是在构造器里，而是先声明全局变量或者直接在vue上定义一些新的功能，vue内置了一些全局API。说的简单一些就是，在构造器的外部用vue提供给我们的API函数来定义新的功能。

### Vue.directive自定义指令

我们可以通过全局API来自定义指令！

![自定义指令](https://upload-images.jianshu.io/upload_images/5030047-633b0edce1bccb00.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 自定义指令中传递的三个参数，(图示中只传入了两个参数)

1. el：指令所绑定的元素，可以直接用来操作DOM。

2.binding：一个对象，包含自定义指令的所有信息。
![binding参数的信息](https://upload-images.jianshu.io/upload_images/5030047-f486fc425a8a31e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. vnode：Vue编译生成的虚拟节点。

>  Vue.directive自定义指令的生命周期

自定义指令有五个生命周期（也被叫做钩子函数），分别是:
1. bind：只调用一次，指令第一次绑定到元素时调用，利用这个钩子函数可以定义一个绑定时执行一次的初始化动作。

2. inserted：被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）「已经插入完了才进行调用」

3. update：被绑定于元素所在的模版更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模版更新。（更新时调用）

4. componentUpdated：被绑定元素所在模版完成一次更新周期时调用。（更新完成时调用）



![对象参数](https://upload-images.jianshu.io/upload_images/5030047-591f23e736be2047.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5. unbind：只调用一次，指令与元素解绑时调用。 
![解绑操作](https://upload-images.jianshu.io/upload_images/5030047-e09aa8a00e89d209.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### Vue.extend构造器延伸

Q1: 什么是构造器的延伸？

vue构造器，生成vue的实例对象所写的一种方法。那么`Vue.extend`是在构造器的外部扩展当前的构造器，经常和组件一起结合使用。



![图示代码](https://upload-images.jianshu.io/upload_images/5030047-464d8bf87e6af720.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> Vue.extend返回的是一个‘扩展实例构造器’，也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来生成组件，可以简单理解为当在模版中遇到该组件名称作为标签的自定义元素时，会自动调节‘扩展实例构造器’，来生产组件实例，并挂载到自定义元素上。

### Vue.set全局操作

Vue.set的作用就是在构造器外部操作构造器内部的数据、属性或者方法。

知识点：

1. 引用构造器外部数据：不再Vue构造器里的data属性中声明，而是在构造器外部进行声明，然后利用data属性进行引用就可以了。外部数据的加入让程序更加灵活，我们可以在外部获取任何想要的数据形式，然后用data引用。

![示例代码](https://upload-images.jianshu.io/upload_images/5030047-cbfc39e1f53f7d3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2. 在外部改变数据的三种方法。

- 用Vue.set改变。
- 用Vue对象的方法添加。
- 直接操作外部数据。


![注意点牢记！](https://upload-images.jianshu.io/upload_images/5030047-d9aebba1c59c4516.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注释：示例图中横线标记处解析。

由于javascript的限制，Vue不能自动检测以下变动的数组。
- 当你利用索引直接设置一个项时，vue不会为我们自动更新。
- 当你修改数组的长度时，vue不会为我们自动更新。


### vue的生命周期（钩子函数）

钩子函数：每一个程序发生的开始、进行时、结束时等节点，那么就可以利用vue的钩子函数来做一些事情。

vue的十个生命周期：

![如图](https://upload-images.jianshu.io/upload_images/5030047-2a6202ecf9f0d2f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Component 组件

> 所谓的组件，其实就是自定义的标签。这些标签在HTML中是不存在的。

1. 全局化注册组件

全局化注册组件就是在构造器的外部用`Vue.conponent`来注册。然后在HMTL中调用它。这就是最简单的一个组件编写方法。

![注意细节](https://upload-images.jianshu.io/upload_images/5030047-172b78dba0e8c14f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 注意：component组件生成之后，必须在vue的构造器作用域里，否则它也不会生效。

2. 局部定义

![示例](https://upload-images.jianshu.io/upload_images/5030047-0ecbad8f8c4a9e35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 组件和指令的区别：组件注册的是一个标签，比如`<claus></claus>`（并且自定义标签也是可以添加属性的），而`Vue.directive`指令注册的是已有标签里的一个属性`v-claus`（类似于这种）。在实际开发中使用的组件比较多，指令用的比较少。


##### Component组件props属性设置

1. 定义属性并获取属性值
定义属性需要用props选项，加上数组形式的属性名称，例如：`props:['city']`。在组件的模版里读取属性值只需要用插值的形式，例如：`{{city}}`

![示例](https://upload-images.jianshu.io/upload_images/5030047-ea0a7de266a6d6dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. vue是如何处理属性中带‘-’的！ 
上图的示例中自定义标签元素带有一个属性`from-city`，但是在局部自定义组件里，props选项中获取的该属性名必须以驼峰的形式写入。

3. 在构造器里向组件传值

一般来说在实际开发过程中，数据都只会在data中获取所有从后台返回的数据，所以把构造器中的data的值传递给组件，只需要对当前的自定义组件标签或者html标签进行绑定就可以。


### Component父子组件关系。

1. 在构造器外部声明一个局部组件


![示例](https://upload-images.jianshu.io/upload_images/5030047-98318f8e19b0912d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 好处就是如果组件的代码量很大，会影响构造器的可读性，造成拖拉和错误。那么就可以把组件编写的代码放在构造器的外部或者是写成单独的文件进行引入。使得代码简介明了。

2. 父子组件的嵌套

![嵌套](https://upload-images.jianshu.io/upload_images/5030047-96625763c032d240.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Component 标签

> 用法：动态的根据data属性中的值，来显示我们声明的不同组件。

参考如下：

1. 在构造器外部定义三个不同的组件

![定义组件](https://upload-images.jianshu.io/upload_images/5030047-c290d399c39f0498.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 在构造器的components选项中挂载三个自定义组件

![挂载组件](https://upload-images.jianshu.io/upload_images/5030047-c0963084e82b8d98.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 在html中插入component标签，并绑定data中的引用数据。根据绑定不同的引用数据，调用不同功能的组件。

![引用](https://upload-images.jianshu.io/upload_images/5030047-2543d737c0e50ea7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![四连击](https://upload-images.jianshu.io/upload_images/5030047-f854d93b17893ce8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

