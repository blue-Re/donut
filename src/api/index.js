import ajax from './ajax'
// 登录
export function reqLogin(username, password) {
  return ajax({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 注册
export function reqRegister(username, password, email) {
  return ajax({
    url: '/register',
    method: 'POST',
    data: {
      username,
      password,
      email
    }
  })
}

// 获取所有的用户
export function reqUser() {
  return ajax({
    url: '/user',
  })
}

// 发送消息接口
export function reqSend(user_id, friend_id, content) {
  return ajax({
    url: '/send',
    method: 'POST',
    data: {
      user_id, friend_id, content
    }
  })
}
// 获取所有消息
export function reqGetAllMessage() {
  return ajax({
    url: '/getMessage',
  })
}

// 获取与当前用户聊天人的所有信息
export function reqCurrentUserAllMessage(user_id, friend_id) {
  return ajax({
    url: '/currentUserAllMsg',
    method: 'GET',
    params: { user_id, friend_id }
  })
}

// 获取当前登录的用户信息
export function reqCurrentUser(current_id) {
  return ajax({
    url:'/currentUser',
    method:'GET',
    params:{
      current_id
    }
  })
}

// 上传头像,
export function reqUploadImg(file,current_id){
  return ajax({
    url:'/uploadImg',
    method:'POST',
    Headers:{
      "content-type": "multipart/form-data",
    },
    data:file,
    params:{current_id}
  })
}

// 修改用户信息
export function updateUserInfo(username,password,email,current_id){
  return ajax({
    url:'/updateUserInfo',
    method:'POST',
    data:{
      username,password,email
    },
    params:{current_id}
  })
}

// 发布动态
export function publishDynamic(file,user){
  return ajax({
    url:'/publish',
    method:'POST',
    data:file,
    Headers:{
      "content-type": "multipart/form-data",
    },
    params:user
  })
}

// 查找所有的动态
export function findAllDynamic(){
  return ajax({
    url:'/allDynamic',
    method:'GET'
  })
}

// 评论动态接口
export function dynamic_remark(remark_username,dynamic_id, remark_content){
  return ajax({
    url:'/remark',
    method:'POST',
    data:{
      remark_username,dynamic_id, remark_content
    }
  })
}

// 查找所有的评论
export function findAllRemark(dynamic_id){
  return ajax({
    url:'/allRemark',
    method:'GET',
    params:{
      dynamic_id
    }
  })
}