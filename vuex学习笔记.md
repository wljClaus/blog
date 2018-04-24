vuex是一个专门为vue.js设计的集中式状态管理架构。什么是状态？可以理解为在data中的属性需要共享给其他vue组件使用的部分，就叫状态。简单的说就是data中需要共有的属性。


## axios：vue中与后端交互增删改查访问数据库等等操作。



### 引入vuex
1. 利用npm包管理工具，进行安装vuex。
> npm install vuex --save

![image.png](https://upload-images.jianshu.io/upload_images/5030047-47f66f68dd5c61c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. 在文件中引入vue和vuex，然后在利用vue.use进行引用。
![如图操作](https://upload-images.jianshu.io/upload_images/5030047-286392dfbdd5be19.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在引入的vue和vuex文件中依次加入下面代码：
![image.png](https://upload-images.jianshu.io/upload_images/5030047-d382054158a3ac67.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 新建一个vue模版。内容如下：
![image.png](https://upload-images.jianshu.io/upload_images/5030047-dac7b1519321d8d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

完成上面几步操作，还是不行，必须要配置路由啊！！！


### state访问状态对象

之前写过的常量state状态访问对象，就是SPA（单页应用程序）中的共享值。
如何将状态对象赋值给内部对象？
###### 一、通过computed的计算属性直接赋值
computed可以在输出结果之前，对data中的值进行改变。
![image.png](https://upload-images.jianshu.io/upload_images/5030047-5bce6c3ae4fea1ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###### 二、通过mapState的对象来赋值

1. 首先引入mapState
```
import {mapState} from 'vuex'
```

2. 然后写入如下代码：
![image.png](https://upload-images.jianshu.io/upload_images/5030047-609906f618c15085.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
或者是 通过mapState的数组来赋值
```
computed:mapState(['count'])
```
这是最简单的写法。

### Mutations修改状态

mutations存在的意义就是写一个方法用来修改状态。

1. $store.commit()
vuex提供了commit方法来修改状态如下：
```
<button @click="$store.commit('add')">加</button>
<button @click="$store.commit('reduce')">减</button>


// store文件代码
const mutations = {
    add(state){
      state.count ++
    },
    reduce(state){
      state.count --
    }
  }
```

传值：根据上面的代码，需要实现传值，通过传递的值进行加减操作。
如下：
```
<button @click="$store.commit('add',2)">加</button>
<button @click="$store.commit('reduce',2)">减</button>


// store文件修改如下
const mutations = {
    add(state,n){
      state.count += n
    },
    reduce(state,n){
      state.count -= n
    }
  }
```

2. 模版获取mutations方法

简化上面的操作：
- 在模版中引入mapMutations
` import {mapState,mapMutations} from 'vuex'`

- 在模版的script标签中添加methods属性：
`methods:mapMutations(['add','reduce'])`

通过上面的两行代码，可以在模版中直接使用add和reduce方法了。

```
<button @click="add">加</button>
<button @click="reduce">减</button>
```

### getters计算过滤操作

类似于computed计算属性。

getters基本用法：

首先需要用const声明getters属性。
```
const getters = {
    count:state => state.count +=10
}
```

然后需要在模版页中对computed进行配置。在vue构造器中只能有一个computed属性，如果是两个，后者覆盖前者。
```
computed:{
    ...mapState(['count']),
    ...mapGetters(['count'])
},
```
上面的mapGetters是需要引入才可以使用的：
`import {mapState,mapMutations,mapGetters} from 'vuex'`

每一次count的值发生变化时，都会先执行一次这个过滤器，(count值+10)的操作！

### actions异步修改状态
actions和上面的mutations是差不多的，只不过唯一的区别就是：
- actions是异步的改变state状态。
- mutations是同步的改变状态。
```
const mutations = {
    add(state,n){
      state.count +=n
    },
    reduce(state,n){
      state.count --
    }
  }


const actions ={
    addAction(context){
        context.commit('add',10)
    },
    reduceAction({commit}){
        commit('reduce')
    }
}
```
actions属性中写入了addAction和reduceAction两个方法，在方法里，都使用了commit调用了Mutations里边的方法。在actions里方法中传递的参数也不一样。
- context：上下文对象，这里可以理解为是store文件本身。
- {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。 {commit} === context.commit

模版中使用方法：
```
<div>
        <button @click="addAction">+</button>
        <button @click="reduceAction">-</button>
</div>
```
改造methods方法，利用扩展运算符方法：
```
// 前提是引入maoActions
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

methods:{
    ...mapMutations(['add','reduce']),
    ...mapActions(['addAction','reduceAction'])
        },
```
为了更好的证明异步检验的真实性，加入如下代码。
![image.png](https://upload-images.jianshu.io/upload_images/5030047-ad232b8dfbc2702c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


