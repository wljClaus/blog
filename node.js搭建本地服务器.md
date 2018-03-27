
先了解localhost。
#####  在[计算机网络中](https://en.wikipedia.org/wiki/Computer_networking "计算机网络")，**localhost**是指*这台计算机*的[主机名](https://en.wikipedia.org/wiki/Hostname "主机名")。它用于通过[回环](https://en.wikipedia.org/wiki/Loopback "环回")网络接口访问主机上运行的网络服务。使用回送接口绕过任何本地[网络接口](https://en.wikipedia.org/wiki/Network_interface_controller "网络接口控制器")硬件。
本地环回机制可以用于在主机上运行网络服务，而不需要物理网络接口，或者不使计算机可以连接到的网络可访问服务。例如，可以通过[URL](https://en.wikipedia.org/wiki/URL "网址") http：// localhost 从Web浏览器访问本地安装的网站以显示其主页，本机的IP地址*localhost*通常解析 *127.0.0.1*。


了解完这些，在结合之前在Google上了解的"当输入URL地址浏览器发生了什么事情(通过域名搜索IP地址的过程)"然后在来仔细的构思一下如何在本地搭建一个服务器。


```
var http = require('http');
http.createServer(function (req,res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello,I\'m claus!');
  res.end();
}).listen(9000) 
```
以上代码就是通过node.js内置http模块创建一个通过listen(9000)端口号的服务器。当9000端口被访问时，页面输出'Hello,I'm claus'作为回应。
通过终端来看看效果。
![最底层版本服务器](http://upload-images.jianshu.io/upload_images/5030047-a83299d4f88459ce.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 服务器进阶版本——实现一个静态服务器

目的：通过自主搭建的静态服务器来运行自己网站。
实现的思路：获取本地文件路径——解析文件内容

需要测试的文件结构如下:
![](http://upload-images.jianshu.io/upload_images/5030047-b6727b991b9d0d18.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


```
var http = require('http')
var path = require('path')
var url = require('url')
var fs = require('fs')

function staticRoot(staticPath,request,response) {
    // console.log(staticPath)
    var urlObj = url.parse(request.url,true)
    // console.log(urlObj)
    if (urlObj === '/'){
        urlObj.pathname += 'index.html'
    }

    var filePath = path.join(staticPath,urlObj.pathname)    //  获取文件路径
    // console.log(filePath)

    // 读取文件路径
    fs.readFile(filePath,'binary',function (error,fileContent) {
        console.log(fileContent);
        if (error){
            response.writeHead(404,'Not found')
            response.end('<h1>404 Not found</h1>')
        } else {
            response.writeHead(200)
            response.write(fileContent,'binary')    //  页面写入文件 
            response.end()
        }
    })
}
http.createServer(function (request,response) {
    staticRoot(path.join(__dirname,'node-server'),request,response)
}).listen(9999)
```
以上的代码无非就是在最底层版本的服务器的基础上增加了一些需要用到的东西，比例说获取文件的路径，以及通过fs的readFile方法从获取的路径中解析文件，输入到页面上。

