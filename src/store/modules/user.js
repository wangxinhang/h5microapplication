import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import webiste from '@/config/website'
import { loginByUsername, getUserInfo, getMenu, logout, refreshToken, getButtons } from '@/api/user'
import { getList } from "@/api/system/dict";

function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'name',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild) ele[propsDefault.children] = [];
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children].forEach(child => {
            addPath(child);
        })
    }

}
const user = {
    state: {
        userInfo: getStore({ name: 'userInfo' }) || [],
        permission: getStore({ name: 'permission' }) || {},
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        token: getStore({ name: 'token' }) || '',
        dictionary: getStore({ name: 'dictionary' }) || [],
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }) {
            return new Promise((resolve,reject) => {
                loginByUsername().then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data.accessToken);
                    commit('SET_USERIFNO', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //获取用户信息
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data;
                    commit('SET_ROLES', data.roles);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token
        refreshToken({commit },refreshParams) {
            return new Promise((resolve, reject) => {
                refreshToken(refreshParams.grantType,refreshParams.refreshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data.accessToken);
                    commit('SET_USERIFNO', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出登录
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //401未授权，注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                removeToken()
                resolve()
            })
        },
        //获取系统权限
        GetButtons({ commit }) {
            return new Promise((resolve) => {
                getButtons().then(res => {
                    const data = res.data.data;
                    commit('SET_PERMISSION', data);
                    resolve();
                })
            })
        },
        //获取系统数据字典
        GetDictionary({ commit }) {
            return new Promise((resolve) => {
                getList().then(res => {
                    const data = res.data.data;
                    data.sort((a, b) => {
                        return a.sort - b.sort;
                    });
                    commit('SET_DICTIONARY', data);
                    resolve();
                })
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data.data
                    let menu = deepClone(data);
                    menu.forEach(ele => {
                        addPath(ele, true);
                    })
                    commit('SET_MENU', menu)
                    resolve(menu)
                })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
            setStore({ name: 'userInfo', content: state.userInfo, type: 'session' })
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            let result = [];
            function getCode(list) {
                list.forEach(ele => {
                    if (typeof (ele) === 'object') {
                        const chiildren = ele.children;
                        const code = ele.code;
                        if (chiildren) {
                            getCode(chiildren)
                        } else {
                            result.push(code);
                        }
                    }
                })
            }
            getCode(permission);
            state.permission = {};
            result.forEach(ele => {
                state.permission[ele] = true;
            });
            setStore({ name: 'permission', content: state.permission, type: 'session' })
        },
        SET_DICTIONARY:(state, dictionary) => {
            state.dictionary = dictionary;
            setStore({ name: 'dictionary', content: state.dictionary, type: 'session' })
        }
    }

}
export default user
