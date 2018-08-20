import request from './request';

/**
 * 获取首页默认地址
 */
export const cityGuess = () => {
    return request({
        url: '/v1/cities',
        method: 'get',
        params: { type: 'guess' }
    })
};


/**
 * 获取首页热门城市
 */

export const hotcity = () => {
    return request({
        url: '/v1/cities',
        method: 'get',
        params: { type: 'hot' }
    })
};

/**
 * 获取首页所有城市
 */

export const groupcity = () => {
    return request({
        url: '/v1/cities',
        method: 'get',
        params: { type: 'group' }
    })
};

/**
 * 获取用户信息
 */

export const getUser = () => {
    return request({
        url: '/v1/user',
        method: 'get',
        params: {user_id: localStorage.getItem('user_id')}
    })
};




//以下是 demo 写法
export function loginByUsername(username, password) {
  return request({
    url: '/login/login',
    method: 'post',
    data:{ username,  password }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

