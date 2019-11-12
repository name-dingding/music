const Axios = require('axios')


const request= function (url,success,fail) {
  const base_url = 'http://127.0.0.1:3000/'
  const timeout= 5000
  new Axios({
    url: base_url + url,
    method: 'get',
    withCredentials: true,
    timeout,
    header:'Access-Control-Allow-Origin'
  }).then(res=>success(res))
      .catch(err=>fail(err))
}

export default request
