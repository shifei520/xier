import axios from 'axios'

export function request(config) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: '',
    })
    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        const data = JSON.parse(window.localStorage.getItem('user'))
        data ? (config.headers.token = data.token) : null
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    // 响应拦截器
    instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        console.log(err)
      }
    )

    instance(config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
