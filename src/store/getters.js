const getters = {
    language: state => state.common.language,
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    roles: state => state.user.roles,
    permission: state => state.user.permission,
    menu: state => state.user.menu,
    logsList: state => state.logs.logsList,
    dictionary: state => state.user.dictionary
}
export default getters