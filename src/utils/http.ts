import { useMemberStore } from '@/stores'
const memberStore = useMemberStore()
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 请求拦截器
const httpInterceptor = {
  // 请求前拦截。args是 uni.request 传入的参数
  invoke(args: UniApp.RequestOptions) {
    // 非 http 开头需拼接地址
    if (!args.url.startsWith('http')) {
      args.url = baseURL + args.url
    }
    //请求超时，默认60s改为10s
    args.timeout = 10000
    // 添加小程序端请求头标识
    args.header = {
      ...args.header,
      'source-client': 'miniapp',
    }
    // 添加 token 请求头标识
    const token = memberStore.profile?.token
    if (token) {
      args.header.Authorization = token
    }
  },
}

// 拦截 request 请求、uploadFile 文件上传
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

// 响应拦截器
/**
 * @param
 * @returns Promise
 */
interface data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 服务器返回响应
      success(res) {
        // console.log(res)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 状态码2xx，说明返回了所需数据
          // 提取核心数据res.data
          resolve(res.data as data<T>)
        } else if (res.statusCode === 401) {
          // 401错误，用户没有访问权限
          memberStore.clearProfile() //清空用户信息
          uni.navigateTo({ url: '/pages/login/login' }) //前往登陆页
          reject(res)
        } else {
          //其他错误，根据后端信息进行轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 服务器没有响应——网络问题
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，稍后重试',
        })
        reject(err)
      },
    })
  })
}
