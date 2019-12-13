import axios from 'axios';
import { message } from 'vcu';
import { router } from '../router/index';
import store from '../store';

//批量导入API
const files = require.context('./modules', false, /\.js$/);
let servieModules = {};
files.keys().forEach(key => {
    servieModules = Object.assign({}, servieModules, files(key).default);
})


// 创建一个AXIOS实例 (请求不同服务器地址或超时时长等等可以创建不同的实例)
const requestAjax = axios.create({
    baseURL: '', //请求的域名基本地址     process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // 跨域请求时发送cookies
    timeout: 8000 // 请求超时
});
// 请求拦截器
requestAjax.interceptors.request.use(
    config => {
        //router.push({name: "home_index"})
        //store.commit('logout')
        message.loading('数据加载中..', 0);
        // 在发出请求前做点什么
        /* 
          例如：
          //让每个请求携带令牌
          //['x-token']是自定义头密钥
          if (store.getters.token) {
              config.headers['X-Token'] = getToken()
          }
        */
        return config
    },
    error => {
        // 处理请求错误
        console.log("请求拦截器", error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
requestAjax.interceptors.response.use(
    /**
     *如果您想要获取诸如头或状态之类的http信息
     *请返回response=>response
     */

    /**
     *通过自定义代码确定请求状态
     *这里只是一个例子
     *您还可以通过HTTP状态代码判断状态
     */
    response => {
        message.destroy()
        const res = response.data;
        // 如果自定义代码不是20000，则判断为错误。
        /* if (res.code !== 20000) {
            //提示错误 并做一些相应的操作
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        } */
        return res;
    },
    error => {
        console.log('err' + error); // for debug
        //请求失败服务未响应
        this.$Message.error('服务器请求失败！！！');
        return Promise.reject(error)
    }
);

//请求格式/参数统一
const Http = {};
for (let key in servieModules) {
    let api = servieModules[key];
    Http[key] = async(
        params, //请求参数  get : url;  post, put, patch : data; delete : url
        isFormData = false, //是否是form-data请求
        config = {} //配置参数
    ) => {
        let newParams = {};
        //content-type 是否是form-data的判断
        if (params && isFormData) {
            newParams = new FormData();
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params;
        }
        //不同请求判断
        let response = {}; //请求返回值
        if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
            try {
                response = await requestAjax[api.method](api.url, newParams, config)
            } catch (err) {
                response = err;
            }
        } else if (api.method === 'delete' || api.method === 'get') {
            config.params = newParams;
            try {
                response = await requestAjax[api.method](api.url, config)
            } catch (err) {
                response = err;
            }
        }

        return response;
    }
}

/**
 * 并发请求：axios.all() , axios.spread()
 *      axios.all(
 *          [
 *              axios.get('./data.json'),
 *              axios.get('city.json')
 *          ]
 *      ).then(
 *          axios.spread((dataRes,cityRes) => {
 *              console.log(dataRes,cityRes)
 *          })
 *      )
 *  
 *  */

/**
  * axios 取消请求

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});
// cancel the request (the message parameter is optional)
source.cancel('Operation canceled by the user.');

*/
export { requestAjax, Http };