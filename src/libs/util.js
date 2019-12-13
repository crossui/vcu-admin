import axios from 'axios';

let util = {};

/** 
 * dom节点重绘 
 * @param vm vue对象 this
 * @param dataName 控制DOM节点是否展示的DATA变量（v-if）
 * @param callBack 重绘后的回调
 **/
util.domReset = function(vm, dataName, callBack) {
    vm[dataName] = false;
    vm.$nextTick(() => {
        vm[dataName] = true;
        if (callBack) {
            callBack();
        }
    });
};

/** 
 * 日期转换 
 * @param date date对象
 * @param format 日期格式
 * @return 例如  2016-7-16 16:24:58 
 **/
util.formatDate = function(date, format) {
    let paddNum = function(num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    };
    //指定格式字符
    let cfg = {
        yyyy: date.getFullYear(), //年 : 4位
        yy: date.getFullYear().toString().substring(2), //年 : 2位
        M: date.getMonth() + 1, //月 : 如果1位的时候不补0
        MM: paddNum(date.getMonth() + 1), //月 : 如果1位的时候补0
        d: date.getDate(), //日 : 如果1位的时候不补0
        dd: paddNum(date.getDate()), //日 : 如果1位的时候补0
        hh: paddNum(date.getHours()), //时 : 如果1位的时候补0
        mm: paddNum(date.getMinutes()), //分 : 如果1位的时候补0
        ss: paddNum(date.getSeconds()), //秒 : 如果1位的时候补0
        ms: paddNum(date.getMilliseconds()) //毫秒 : 如果1位的时候补0
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function(m) { return cfg[m]; });
}

/** 
 * ajax请求 
 * @param vm   Vue 对象
 * @param opts ajax请求参数
 * @param thenCallback 请求成功后回调
 * @param catchCallback 失败后回调
 * @return nothing 
 **/
util.axiosAjax = function(vm, opts, thenCallback, catchCallback) {
    let options = {
        method: 'get',
        url: '',
        withCredentials: true, //  解决跨域造成session不同
        params: {},
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        timeout: 8000,
        responseType: 'json',
    }
    options = Object.assign({}, options, opts);
    axios(options).then(function(response) {
        switch (response.data.code) {
            case 1:
                // 退出登录
                vm.$store.commit('logout', vm)
                break;
            case 0:
                // 成功
                if (thenCallback) {
                    thenCallback(response)
                }
                break;
        }
    }).catch(function(error) {
        vm.$Message.error('服务器请求失败！！！');
        if (catchCallback) {
            catchCallback()
        }
    })
};
/**
 * @param {*} routers 路由
 * @param {*} name 路由名
 * @description 返回路由对象
 */
util.getRouterObjByName = function(routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};
/**
 * @param {*} item 对象
 * @description 更新当前面包屑
 */
util.setCurrentPath = function(vm, items) {
    const name = items.name
    const homeTitle = '首页'
    let title = ''
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.showTitle(item, vm);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.showTitle(child, vm);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [{
            meta: items.meta,
            path: '',
            name: 'home_index'
        }];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [{
                title: homeTitle,
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        currentPathArr = [{
            title: homeTitle,
            path: '/home',
            name: 'home_index'
        }];
        items.matched.forEach(item => {
            currentPathArr.push({
                title: item.meta.title,
                path: '',
                name: item.name
            })
        })
    }

    vm.$store.commit('setCurrentPath', currentPathArr);
    return currentPathArr;
};

/**
 * @param {*} item 对象
 * @param {*} vm 对象
 * @description 返回路由TITLE
 */
util.showTitle = function(item, vm) {
    let _title = '';
    if (item.meta && item.meta.title) {
        _title = item.meta.title
    } else {
        _title = item.title
    }
    return _title;
};


/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
util.objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1)
    const keysArr2 = Object.keys(obj2)
    if (keysArr1.length !== keysArr2.length) return false
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true
        /* eslint-disable-next-line */
    else return !keysArr1.some(key => obj1[key] != obj2[key])
};


/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
util.routeEqual = function(route1, route2) {
    return route1.name === route2.name
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
util.getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
};

/**
 * @description 本地存储和获取标签导航列表
 */
util.setTagNavListInLocalstorage = list => {
    localStorage.tagNaveList = JSON.stringify(list)
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
util.getNewTagList = (list, newRoute) => {
    const { name, path, meta, params, query } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta, params, query })
    return newList
};

/**
 * @param {*} vm Vue对象
 * @param {*} name 要关闭页面NAME
 * @description 关闭页面
 */
util.colsePage = (vm, name) => {
    let itemIndex = -1
    let tagLists = vm.$store.state.app.tagNavList.filter((item, index) => {
        if (item.name == name) {
            itemIndex = index
        }
        return item.name != name
    })
    vm.$store.commit("setTagNavList", tagLists);
    if (itemIndex > -1) {
        let item = tagLists.length == itemIndex ? tagLists[tagLists.length - 1] : tagLists[itemIndex]
        vm.$router.push(item);
    }
};



/*
//封装操作localstorage本地存储的方法
 
var storage = {
 
    //存储
    set(key, value) {
		//ios safari 无痕模式下，直接使用会报错
		try{
			localStorage.setItem(key, JSON.stringify(value));
		} catch(err) {
			//开发环境下提示 error
			console.log('localStorage.setItem报错', err.message)
		}
    },
    //取出数据
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    // 删除数据
     remove(key) {
        localStorage.removeItem(key);
    }
 
}
 
// 暴露给外部访问
export default storage;
*/


export default util;