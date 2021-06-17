
import store from '@/store';
import { router } from '@/router';
import { menuRouter } from '@/router/router';

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
    return route1.name === route2.name
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNaveList
    return list ? JSON.parse(list) : []
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
    const { name, path, meta, params, query } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta, params, query })
    return newList
};


/**
 * @param {*} item 对象
 * @description 返回路由TITLE
 */
export const showTitle = (item) => {
    let _title = '';
    if (item.meta && item.meta.title) {
        _title = item.meta.title
    } else {
        _title = item.title
    }
    return _title;
};


/**
 * @param {*} route 对象
 * @description 返回当前路由信息
 */
export const getRouteTitleHandled = (route) => {
    let router = { ...route }
    let meta = { ...route.meta }
    let title = ''
    if (meta.title) {
        if (typeof meta.title === 'function') {
            meta.__titleIsFunction__ = true
            title = meta.title(router)
        } else title = meta.title
    }
    meta.title = title
    router.meta = meta
    return router
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1
    while (++i < times) {
        callback(i)
    }
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
    let len = tagNavList.length
    let res = false
    doCustomTimes(len, (index) => {
        if (routeEqual(tagNavList[index], routeItem)) res = true
    })
    return res
}


/**
 * @param {*} name 要关闭页面NAME
 * @description 关闭页面
 */
export const colsePage = (name) => {
    let itemIndex = -1
    let tagLists = store.state.app.tagNavList.filter((item, index) => {
        if (item.name == name) {
            itemIndex = index
        }
        return item.name != name
    })
    store.commit("setTagNavList", tagLists);
    if (itemIndex > -1) {
        let item = tagLists.length == itemIndex ? tagLists[tagLists.length - 1] : tagLists[itemIndex]
        router.push(item);
    }
};

/**
 * @param {*} name 要清除缓存页面NAME
 * @description 清除缓存页面
 */
export const delCachePage = (name) => {
    let tagLists = store.state.app.tagNavList.filter((item) => {
        return item.name != name
    })
    store.commit("setCachePage", tagLists);
};

const getPermission = (list) => {
    if (!list) return [];
    let permission = [];
    if (!_.isEmpty(list.name)) {
        let item = {
            name: list.name
        }
        if (list.action) {
            item.action = list.action
        }
        if (list.keycode) {
            item.keycode = list.keycode
        }
        permission.push(item);
    }
    if (_.isArray(list.list) && !_.isEmpty(list.list)) {
        let children = _.flatten(list.list.map(subList => getPermission(subList)))
        permission = permission.concat(_.flatten(children));
    }
    return permission;
}

/**
 * @description 开启页面提示层 appSpin
 */
export const appSpinLoad = (value, text) => {
    store.commit("setAppSpin", {
        value,
        text
    });
};

/**
 * @description 刷新主体页面
 */
export const mainReload = () => {
    store.commit("setIsMainAlive", false);
};

/**
 * @description 刷新主页面
 */
export const reload = () => {
    store.commit("setIsAlive", false);
};

/**
 * @description 判断当前页是否作为子页面供其他子系统调用（如住院收费调用门诊病人费别修改）
 */
export const isLinkPageFunction = (routeObj) => {
    if(routeObj.query.quotePage&&routeObj.query.quotePage==true||routeObj.query.quotePage=='true'){
        return true
    }
    else{
        return false
    }
};