import AuthService from "@/services/auth.service";

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? { status : { loggedIn: true }, user, token : user.access_token }
    : { status : { loggedIn: false }, user: null, token : null };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
                    if (user.status === 200) {
                        commit('loginSuccess', user.data);
                        return Promise.resolve(user);
                    }
                    else {
                        commit('loginFailure');
                        return Promise.resolve(user);
                    }
                })
        },
        logout({commit}) {
            AuthService.logout();
            commit('logout');
        },
        register({commit}, user) {
            console.log("auth" + user)
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
}