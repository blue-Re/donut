import { GET_ALL_USER,ALL_MESSAGE,RECEIVE_NOTE_MSG, LOG_OUT, SET_TOKEN } from "./mutation-types";

export default {
  // 修改state中的allUser数据
  [GET_ALL_USER](state,{allUser}){
    state.allUser = allUser
  },
  // 修改state中allMessage数据
  [ALL_MESSAGE](state,{allMessage}){
    state.allMessage = allMessage
  },
  // 修改用户记录的值
  [RECEIVE_NOTE_MSG](state,{note_msg}){
    state.note_msg = note_msg
  },
  // 修改state中token的值
  [SET_TOKEN](state,token){
    state.token = token
  }
}