import Cookies from 'js-cookie';

const user = {
    state: {},
    mutations: {
        logout(state) {
            console.info('logout.....')
            Cookies.remove('user');
            Cookies.remove('password');
            localStorage.clear();
        }
    }
};

export default user;