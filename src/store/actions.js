import { reqUser, reqGetAllMessage, reqCurrentUserAllMessage } from "../api"
import { GET_ALL_USER, ALL_MESSAGE,RECEIVE_NOTE_MSG, RECEIVE_ALL_MSG, RECEIVE_MSG, SET_TOKEN } from "./mutation-types"


import socket from '../socketIo/socket'
export default {
  // 从服务器获取用户数据
  async getAllUser({ commit, state }) {
    // let result = await reqUser()
    // console.log(result);
    let allUser
    socket.on('friendList', (data) => {
      // console.log('服务端出过来的好友数据', data);
      allUser = data
      commit(GET_ALL_USER, { allUser })
    })
  },
  // 异步获取所有消息
  async getAllMessage({ commit, state }) {
    let result = await reqGetAllMessage()
    if (result.code === 0) {
      let allMessage = result.data
      commit(ALL_MESSAGE, { allMessage })
    }
  },
  // 异步接收所有聊天记录
  getAllNoteMsg({commit,state}){
    // 接收消息事件
    socket.on("sendMsgArr", (data) => {
      // console.log("服务器传过来的聊天数组", data);
      localStorage.setItem('message',JSON.stringify(data))
      let note_msg = data
      commit(RECEIVE_NOTE_MSG,{note_msg})
    });
  },
  // 设置token
  set_token({commit,state},token){
    commit(SET_TOKEN,token)
  },
  // 清除token
  clear_token({commit,state},token){
    commit(SET_TOKEN,token)
  }
}