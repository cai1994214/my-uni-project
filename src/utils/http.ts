import { useMemberStore } from '@/stores'
const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const memberStore = useMemberStore()

// 添加拦截器
const httpInterceptor = {
  // 请求拦截器
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }
    options.timeout = 10000

    // 小程序请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    const token = memberStore?.profile?.token
    if (token) {
      options.header.Authorization = token
    }

    console.log(options)
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((reslove, reject) => {
    uni.request({
      ...options,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          reslove(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 清空用户信息 并且跳转登录页
          memberStore.clearProfile()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: res.data.msg || '获取数据失败',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(res)
      },
    })
  })
}