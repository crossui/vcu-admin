import { otherRouter, menuRouter } from '@/router/router';
import Util from '@/libs/util';
import { hasOneOf } from '@/libs/tools';


const app = {
    state: {
        routers: [
            otherRouter,
            ...menuRouter
        ],
        menuList: [],
        tagNavList: [{
            title: '首页',
            path: '/',
            name: 'home_index'
        }],
        messageCount: 0,
        currentPath: [{
            title: '首页',
            path: '/',
            name: 'home_index'
        }], // 面包屑数组
        cachePage: [],
        dontCache: ["level-2", "level-3-1"] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        setCurrentPath(state, pathArr) { //设置当前面包屑
            state.currentPath = pathArr;
        },
        setMessageCount(state, count) { //设置未读消息多少条
            state.messageCount = count;
        },
        updateMenulist(state) { //设置左侧导航
            let menuList = [];
            menuRouter.forEach((item, index) => {
                if (item.show) {
                    if (item.children.length === 1) {
                        if (item.children[0].show) {
                            menuList.push(item);
                        }
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = [];
                        childrenArr = item.children.filter(child => {
                            if (child.show) {
                                return child;
                            }
                        });
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1);
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
                            handledItem.children = childrenArr;
                            menuList.splice(len - 1, 1, handledItem);
                        }
                    }
                }
            });
            state.menuList = menuList;
        },
        setTagNavList(state, list) { //设置标签导航
            let tagList = []
            if (list) {
                tagList = [...list]
            } else {
                tagList = Util.getTagNavListFromLocalstorage().length > 0 ? Util.getTagNavListFromLocalstorage() : state.tagNavList
            }
            state.tagNavList = tagList
            this.commit('updateCachePage', tagList)
            Util.setTagNavListInLocalstorage([...tagList])
        },
        updateCachePage(state, pages) { //设置缓存页面
            let names = pages.map((item) => {
                return item.name
            }).filter(item => {
                return !hasOneOf(state.dontCache, [item])
            })
            names.push("ParentView") //多级路由手动添加成缓存
            state.cachePage = names
        }
    }
};

export default app;