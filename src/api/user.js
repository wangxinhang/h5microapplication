import request from '@/router/axios';
import {
  baseUrl
} from '@/config/env';

export const loginByUsername = () => request({
  url: baseUrl + '/blade-user/token',
  method: 'post'
})

export const getButtons = () => request({
  url: '/api/blade-system/menu/buttons',
  method: 'get'
});

export const getUserInfo = () => request({
  url: baseUrl + '/user/getUserInfo',
  method: 'get'
});
// 查询当前用户信息
export const getUserDetail = (token) => request({
  url: '/api/blade-user/userInfo',
  method: 'get',
  params: {
    token
  }
});
// 修改当前用户信息
export const updateUserDetail = (row) => request({
  url: '/api/blade-user/update',
  method: 'post',
  data: row
});
export const refreshToken = (grantType, refreshToken) => request({
  // url: baseUrl + '/user/refesh',
  // method: 'post'
  url: '/api/blade-auth/token',
  method: 'post',
  params: {
    grantType,
    refreshToken
  }
})

export const getMenu = () => request({
  url: '/api/blade-system/menu/routes',
  method: 'get'
});

export const getTopMenu = () => request({
  url: baseUrl + '/user/getTopMenu',
  method: 'get'
});

export const sendLogs = (list) => request({
  url: baseUrl + '/user/logout',
  method: 'post',
  data: list
})

export const logout = () => request({
  url: baseUrl + '/user/logout',
  method: 'get'
})

export const getXingyunValidateCode = () => request({
  url: '/api/blade-auth/xingyunValidateCode',
  method: 'get'
});