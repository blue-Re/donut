# app项目笔记

## 一、项目遇到的问题及其解决

### 1.在登录注册页面中隐藏Tabbar

在app的各个页面中底部的TabBar都会存在，但是在登录和注册页面中不需要存在，所以我们需要将其隐藏

隐藏方案：在需要显示TabBar的路由中，设置meta对象，设置一个属性isRequireFooter为true，找到TarBar组件，使用v-if进行条件限制，只有isRequireFooter为true时才显示TarBar

```js
<template>
  <div id="tabbar" v-if="$route.meta.isRequireFooter">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="search">更多</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/friends">好友</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '',
    }
  },
};
</script>

<style></style>

```



### 2.封装axios实例，前端在拦截器中拦截token，发现没有token，跳转到登陆首页进行登陆，获取token后才有权限去进行其他功能

在api中创建ajax.js文件

```js
import axios from 'axios'

export default function ajax(config){
  const instance = axios.create({
    baseURL:'http://localhost:3000',
    timeout:5000
  })
  // 配置请求拦截器
  instance.interceptors.request.use(config=>{
    // 判断是否存在token,如果存在将每个页面header添加token
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
    return config
  },err=>{
    console.log(err);
  })
  // 响应拦截器
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })
  // 发送网络请求
  return instance(config)
}

```

在路由的index.js文件中给需要验证的路由设置meta对象，里边设置requiresAuth属性为true

在main.js中设置拦截函数

```js
router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  const token = localStorage.getItem('token')
  // 筛选需要传token的路由，匹配route里面需要登录的路径，如果匹配到就是true
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
```

### 3.关于vuex中的一整套流程的使用

需求：需要将后台得到的数据保存在state中，此时就需要在action中发送异步请求，将所得到的结果保存，然后commit到mutations-types中的常量中，并将所保存的数据以载荷的形式发送过去。在mutation中，将action带过来的数据赋值给state中的数据，此时就完成了数据的change，然后在.vue文件中，通过`this.$store.dispatch('action中的方法名',{data})`触发action中的方法。

state中的数据

![image-20210715210312717](C:\Users\。\AppData\Roaming\Typora\typora-user-images\image-20210715210312717.png)

action中的操作

![image-20210715210415991](C:\Users\。\AppData\Roaming\Typora\typora-user-images\image-20210715210415991.png)

mutation中的具体操作

![image-20210715210346394](C:\Users\。\AppData\Roaming\Typora\typora-user-images\image-20210715210346394.png)

通过整套操作后，vuex中的state的数据就发生了变化

### 4.关于动态路由的使用

我们需要点击v-for循环出来的列表，通过点击不同的列表，根据列表动态的id值进入到的页面根据id值展示对应内容。

首先需要准备好两个路由组件，一个是跳转前的路由组件，一个是跳转后的路由组件。然后配置对应的路由关系

```js
//跳转前的路由组件
{
    path: '/friends',
    name: 'Friends',
    component: () => import(/* webpackChunkName: "about" */ '../views/Friends/Friends.vue'),
    meta:{isRequireFooter:true,requiresAuth:true},
  },
    // 跳转后的路由组件
  {
    path:'/chat/:id',
    meta:{isRequireFooter:true,requiresAuth:true},
    component:()=>import('../views/Friends/child/Chat.vue')
  },
```

跳转前的路由组件：需要你传入要跳转的对应的id

```js
<li class="user" v-if="allUser">
        <div
          class="info"
          v-for="(item, index) in allUser"
          @click="goToChat(`/chat/${item.id}`)"//要跳转的对应的id
        >
          <img src="../../assets/logo.png" alt="" style="width: 50px" />
          <div class="username">
            {{ item.username }}
            <div class="content">你好</div>
          </div>
        </div>
      </li>
```

跳转后的组件：通过计算属性获取到自身url路径上的params参数取得不同的id值，从而展示不同的数据

```js
<template>
  <div id="chat">
    <h1>聊天组件</h1>
    <div>{{user_id}}</div>	// 这里展示出了不同的id值
  </div>
</template>

<script>
export default {
  computed:{
    user_id(){
      return this.$route.params.id
    }
  }
}
</script>
```

### 5.使用socket.io实现聊天

要用到socket.io，需要先下载依赖包，下面简单搭建一个环境

**前台步骤：**

```js
//客户端
npm i socket.io-client
```

在src下创建socketIo文件夹，创建一个js文件

```js
import io from 'socket.io-client'

// 连接服务器，得到代表连接的socket对象
const socket = io('ws://localhost:3000')

// 绑定serverSendMsg消息的监听，来接收服务端发送过来的消息
socket.on('serverSendMsg',function (data) {
  console.log('客户端接受到服务器发的消息为',data);
})

// 客户端向服务端发消息
socket.emit('clientSendMsg',{msg:'hello',date:Date.now()})
console.log('客户端向服务端发的消息为：',{msg:'hello',date:Date.now()});
```

在main的js中将其导入

```js
// 导入socket.io
import './socketIo/socket'
```

**后台步骤**

```js
npm i socket.io
```

在项目下创建一个socketIo的文件夹，里边创建一个js文件

```js
module.exports = function (server) {
  // 得到IO对象
  const io = require('socket.io')(server, { cors: true })
  // 监视连接，（当有一个客户端连接上时的回调）
  io.on('connection',function (socket) {
    console.log('有一个客户端连接上了');
    // 绑定发送消息的监听
    socket.on('clientSendMsg',function (data) {
      console.log('服务端接受到了客户端发的消息',data);

      // 服务端向客户端发送消息
      io.emit('serverSendMsg',data) 
      console.log('服务端向客户端发消息',123);
    })
  })
}
```

在bin目录下的www.js文件将其引入

```js
// 引入socket
require('../socketIo/socket')(server)
```

**需求：聊天APP**

**功能：查看聊天列表，实现单聊、群聊**

==聊天列表==

1. 首先，创建一张用户表

   字段为username,password,email,headerimg,socketid,isonline

2. 前端内容

   - socket.io-client客户端与服务端的socket连接，(选择当前的用户)，然后建立连接
   - 向服务器发送一个获取用户列表的事件，`socket.emit('getUserList')`,监听服务器返回的数据，`socket.on('getUserList')`

3. 后端内容

   - 服务器监听客户端的连接，获取当前连接的用户名和socketid,更改数据库内容
     - 服务器监听获取用户列表事件`socket.on('getUserList',function(){数据库的查询user表的语句，将结果返回给前端`socket.emit(‘getUserList’)`})`

在监听事件连接之后，进行数据库的操作

### 6.使用第三方包以表格的形式导出数据库中的内容

```js
首先需要下载第三方包
npm install vue-json-excel -S
```

```js
接着在main.js中引入并使用
// 导入表格第三方包，用于生成excel表格
import JsonExcel from 'vue-json-excel'
Vue.component('DownloadExcel', JsonExcel)
```

```js
之后就是在页面中使用
<DownloadExcel :data="allUser" header="表格的头部标题" name="好友列表">
   <van-button round size="small" type="danger">保存用户列表</van-button>
</DownloadExcel>

属性值：
data:后台返回的数据
name:导出表格的名称
header:导出b
```

