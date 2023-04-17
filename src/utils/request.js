import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(
  config => {
    // 拦截业务逻辑
    // 进行请求配置的修改
    // 如果本地又token就在头部携带
    // 1.获取用户信息对象
    const { profile } = store.state.user
    // 2.获取是否有token
    if (profile.token) {
      // 3.设置token
      config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// res => res.data 取出data数据，调用接口是直接拿到的就是后台数据
instance.interceptors.response.use(
  res => res.data,
  err => {
    // 401 状态码，进入该函数
    if (err.response && err.response.status === 401) {
      // 1.清空无效用户信息
      // 2.跳转到登录页面
      // 3.跳转需要传参（当前路由地址）给登录页码
      store.commit('user/setUser', {})
      //   当前路由地址
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push('/login?redirectUrl=' + fullPath)
    }
    return Promise.reject(err)
  }
)

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求:请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
