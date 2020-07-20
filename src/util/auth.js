import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'
const RefreshTokenKey = 'x-access-refreshToken'
export function getToken() {
    return Cookies.get(TokenKey)
}

export function getRefreshToken() {
    return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(refreshToken) {
    var inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);
    return Cookies.set(RefreshTokenKey, refreshToken, { expires: inFifteenMinutes })
}

export function setToken(token) {
    var inFifteenMinutes = new Date(new Date().getTime() + 120 * 60 * 1000);
    return Cookies.set(TokenKey, token, { expires: inFifteenMinutes })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function removeRefreshToken() {
    return Cookies.remove(RefreshTokenKey)
}