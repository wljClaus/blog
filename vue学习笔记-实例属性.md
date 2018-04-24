### vue和jquery的结合使用。

![image.png](https://upload-images.jianshu.io/upload_images/5030047-5d7b729e3f4bc631.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### vue 中的实例方法

1. $mount方法

$mount方法是用来挂载扩展的。

```
let Claus = Vue.extend({
    template:`<h2>{{mount}}</h2>`,
    data:function(){
      return {
        mount:'$mount方法'
    }
  }
})

new Claus().$mount('#app')
以上就是利用vue实例扩展方法extend。

然后将扩展的方法用`$mount`挂载到app上。

```

2. $destroy() 卸载方法

vue中的生命周期钩子函数`destroyed`是挂载元素被销毁时触发的。

![卸载方法](https://upload-images.jianshu.io/upload_images/5030047-76cac98e85bbe7ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

$destroy()一定要带括号，没有括号是无用的。

3. $forceUpdate() 更新方法

![image.png](https://upload-images.jianshu.io/upload_images/5030047-affa751207ac3876.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. $nextTick() 数据修改方法

当Vue构造器里的data值被修改完成后会调用这个方法，也相当于一个钩子函数吧，和构造器里的updated生命周期很像。

```
function refresh() {
      remove.mount='update message info'
      remove.$nextTick(function () {
        console.log('mount更新完后，我就执行')
      })
    }
```

### 实例事件

> 实例事件就是在构造器的外部写一个调用构造器内部的方法，这样写的好处就是可以通过这种写法在构造器外部调用构造器内部的数据。

1. $on在构造器外部添加事件。
$on接受两个参数，第一个参数是调用时的名称，第二个参数是一个匿名的方法。

作用域外部调用作用域内部，可以利用$emit来执行。

![$on](https://upload-images.jianshu.io/upload_images/5030047-38ee1121f0502c4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. $once方法只允许调用一次，仅此一次。调用时还是需要用$emit进行调用。

3. $off方法关闭事件

```
  function off(){
      app.$off('reduce')
  }
```

### 内置组件 -slot

> slot是标签的内容扩展，也就是说可以用slot就可以在自定义组件时传递给组件内容，组件接受内容并输出。

slot的使用需要两步：
1. 在HTML的组件中用slot属性传递值。

![传递](https://upload-images.jianshu.io/upload_images/5030047-dfe6fe9c1b183ec7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 在组件模版中用slot标签接收值。

![接收](https://upload-images.jianshu.io/upload_images/5030047-9e36360e98a128d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![全部代码示例](https://upload-images.jianshu.io/upload_images/5030047-0363acf81fbc4ff3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
