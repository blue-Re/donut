export default {
  token:localStorage.getItem('token'),//当前用户的token值
  current_user_id:localStorage.getItem('current_user_id'),//当前用户的id值
  allUser:[],//用来保存所有用户
  allMessage:[], //用来保存用户所发的消息,
  note_msg:[] //接收所有的消息记录
}