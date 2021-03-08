import axios from 'axios'

const TIME_OUT_MS = 60 * 1000 // 默认请求超时时间
//const BASE_URL = process.env.API_ROOT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/*
 * @param response 返回数据列表
 */
function handleResults (response) {
  let remoteResponse = response.data
  var result = {
    success: false,
    message: '',
    status: [],
    errorCode: '',
    data: {
      total: 0,
      results: []
    }
  }
  if (remoteResponse.success) {
    result.data.results = remoteResponse.data
    result.data.total = remoteResponse.total
    result.success = true
  }
  if (!remoteResponse.success) {
    let code = remoteResponse.errorCode
    if (code === 400) {
      console.log('传参错误')
    }
    result.errorCode = remoteResponse.errorCode
    result.message = remoteResponse.message
  }
  return result
}

function handleUrl (url) {
  return url
  //return BASE_URL + url
}

/*
 * @param data 参数列表
 * @return
 */
function handleParams (data) {
  return JSON.parse(JSON.stringify(data))
}

export default {
  post (url, data) {
    return new Promise((resolve, reject) => {
      axios.post(handleUrl(url), handleParams(data)).then(
        (result) => {
          resolve(result.data)
        }
      ).catch(
        (error) => {
          reject(error.response)
        }
      )
    })
  },
  get (url) {
    return new Promise((resolve, reject) => {
      axios.get(handleUrl(url))
        .then(response => {
          resolve(response.data)
        }).catch(error => {
        reject(error.response)
      })

    })

  },
  put (url, data) {
    return new Promise((resolve, reject) => {
      axios.put(handleUrl(url), JSON.parse(JSON.stringify(data))).then(
        (result) => {
          resolve(result.data)
        }
      ).catch(
        (error) => {
          reject(error.response)
        }
      )
    })
  },
  delete (url, data) {
    return new Promise((resolve, reject) => {
      axios.delete(handleUrl(url), {data: handleParams(data)}).then(
        (result) => {
          resolve(result)
        }
      ).catch(
        (error) => {
          reject(error)
        }
      )
    })
  },
  upload (url, data, config) {
    return new Promise((resolve, reject) => {
      axios.post(handleUrl(url), data, config).then(
        (result) => {
          resolve(result)
        }
      ).catch(
        (error) => {
          reject(error)
        }
      )
    })
  },
}

