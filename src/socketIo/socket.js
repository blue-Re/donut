import io from 'socket.io-client'

// 连接服务器，得到代表连接的socket对象
const socket = io('ws://localhost:3000')

// // 绑定serverSendMsg消息的监听，来接收服务端发送过来的消息
// // socket.on('serverSendMsg',function (data) {
// //   console.log('服务器发的消息为',data);
// // })

// socket.on("updateUser", function (data) {
//   console.log("服务器发的消息为", data);
// });
// // 客户端向服务端发消息
// socket.emit('clientSendMsg',{
//   name:'我是浏览器',
//   content:'好舒服！！！！！！'
// })

export default socket