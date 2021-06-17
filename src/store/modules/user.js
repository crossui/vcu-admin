
import appConfig from "@/config"
const user = {
    state: {
        token: "",
        loginUser: null,
    },
    actions: {
        //退出系统
        exitSys(store, config = {}) {
            const { commit, dispatch, state, rootState, rootGetters } = store
            const appState = rootState.app;
            state.token = ""
            state.loginUser = null
            appState.cachePage = []
            appState.menuList = []
            appState.redirectList = []
            appState.tagNavList = [appConfig.homepage]
        }
    },
    mutations: {
        //设置token
        setToken(state, token) {
            state.token = token
        },
        //设置用户信息
        setLoginUser(state, loginUser) {
            state.loginUser = loginUser
        }
    }
};

export default user;