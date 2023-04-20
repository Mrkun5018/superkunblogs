import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080/',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  return config
})

// 响应拦截器
instance.interceptors.response.use((response) => {
    if (response.status === 200) { 
        return response.data
    } 
    return []
},
error => { 
    return Promise.reject(error) 
})

// 导出axios实例
export default instance