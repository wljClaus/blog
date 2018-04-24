### computed Option 计算选项

> computed的作用主要就是对原数据进行改造输出。改造输出：包括格式的编辑，大小写的转换，顺序的重排，添加符号等等。

![参考代码](https://upload-images.jianshu.io/upload_images/5030047-dcb401909199c4b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

computed属性是非常有用的，在输出数据前可以轻松的改变数据。


### methods Option

> methods 就是在构造器中，比如各种事件的响应方法，

1. methods中参数的传递
使用方法和正常的函数传递参数的方法一样，分为两部分：
1、在methods的方法中进行声明，然后在用javascript中的原生方法。
![参数传值](https://upload-images.jianshu.io/upload_images/5030047-25be2f21120ece9e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2、 在调用methods选项内部的方法时，直接在调用方法时传值。

2. methods选项中的$event参数

传递的$event参数都是关于用户操作鼠标的一些事件和属性。
![参考图](https://upload-images.jianshu.io/upload_images/5030047-cff0e52bb3b0cb86.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. native 给组件绑定构造器里原生事件

![native](https://upload-images.jianshu.io/upload_images/5030047-02f72c56581a01d2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. 从外部调用vue构造器里的原始方法。

在外部触发鼠标点击事件就是`onclick`方法。
![外部调用](https://upload-images.jianshu.io/upload_images/5030047-dafd8e3323c5d8de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### propsData Options
propsData不是和属性相关，他用在全局扩展时进行传递数据。

![看图说话](https://upload-images.jianshu.io/upload_images/5030047-d32369b16ff58c74.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### watch 选项 监控数据

![watch用法](https://upload-images.jianshu.io/upload_images/5030047-d27ab73949c79cdc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上图实例中，是在构造器的内部使用watch属性。有时候我们也可以用实例属性的形式来写watch监控。也就是把构造器内部的watch属性放在构造器外部使用，这样的好处就是，降低我们的程序耦合度，使程序变的灵活。

![构造器外部watch的使用](https://upload-images.jianshu.io/upload_images/5030047-07bca8bb72135e20.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### mixins 混入选项

> mixin混入的用途： 如果你已经写好了构造器，需要增加方法或者临时的活动使用方法，这时使用混入会减少源代码的污染。很多地方都会用到公用的方法，用混入的方法可以减少代码量，实现代码重用。

![mixins的混入](https://upload-images.jianshu.io/upload_images/5030047-cf2764e37688667d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- mixins的调用顺序，从执行的先后顺序来说，vue中都是混入的先执行，然后构造器里的在执行，需要注意的是，这并不是方法的覆盖，而是会被执行两次。

![执行顺序](https://upload-images.jianshu.io/upload_images/5030047-f3d6731678fa12e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 全局API混入

 > 全局API的混入执行顺序要优先于混入和构造器里的方法。

![全局API的混入](https://upload-images.jianshu.io/upload_images/5030047-e9b1909128538960.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### extends 扩展选项

extends扩展方法和mixins方法很像。
但是extends扩展方法后面跟的是一个对象，而并不是数组，如果扩展是数组，那么就会报错。也就是说只能有一个扩展。

![image.png](https://upload-images.jianshu.io/upload_images/5030047-b12a8d1d43cd6401.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)






