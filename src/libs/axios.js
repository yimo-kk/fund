import axios from 'axios'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css'

// 超时时间
axios.defaults.timeout = 3000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
NProgress.configure({
    showSpinner: false
}) 

// 配置公共baseUrl
axios.defaults.baseURL = process.env.VUE_APP_REQURST_BASE_URL;

// 请求拦截器
axios.interceptors.request.use(config => {
    NProgress.start() 
    return config
}, error => {
    return Promise.reject(error)
})

// HTTPresponse响应拦截
axios.interceptors.response.use(data => {
    NProgress.done()
    return data.data

}, error => {
    NProgress.done()

    return Promise.reject(new Error(error))
})

export default axios