//引入mockjs
const Mock = require('mockjs')
    // 获取 mock.Random 对象
const Random = Mock.Random;


//使用mockjs模拟数据
//当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
//checkboxs
Mock.mock('/api/checkboxs', (req, res) => {
    return {
        data: [{ value: "1", label: "自定义1" }, { value: "2", label: "自定义2" }]
    }
})

//radios
Mock.mock('/api/radios', (req, res) => {
    return {
        data: [{ value: "1", label: "自定义1" }, { value: "2", label: "自定义2" }]
    }
})

//selects
Mock.mock('/api/selects', (req, res) => {
    return {
        data: [{ value: "1", label: "自定义1" }, { value: "2", label: "自定义2" }]
    }
})