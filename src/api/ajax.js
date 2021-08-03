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
