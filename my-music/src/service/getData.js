
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var rootUrl = 'http://cangdu.org:8001' ; //  'https://mainsite-restapi.ele.me'
var baseUrl = 'https://microzz.com:3000'

var fetch = (url,data) => {
	return new Promise((resolve, reject) => {
		 axios.get(rootUrl+ url,{ params: data })
			.then( (response)=> {
				resolve(response.data);				
			})
			.catch( (error)=> {  reject(error)});
	})
}
var __fetch = (url,data) => {
	return new Promise((resolve, reject) => {
		 axios.get(baseUrl + url,{ params: data })
			.then( (response)=> {
				resolve(response.data);				
			})
			.catch( (error)=> {  reject(error)});
	})
}
var _fetch = (url,data) => {
	return new Promise((resolve, reject) => {
		axios({
			url: rootUrl+ url,
			method: 'post',
			data: data,
			transformRequest: [function (data) {
			  let ret = ''
			  for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			  }
			  return ret
			}],
			headers: {	
			  'Content-Type': 'application/x-www-form-urlencoded' || 'multipart/form-data'
			}
		  }).then(function (response) {

			console.log(response)
			  resolve(response.data)
		})
		.catch( (error)=> {  reject(error)});

		// axios.post(this.registerUrl, this.newUserInfo, {
		// 	headers: {
		// 		  'Content-Type': 'application/x-www-form-urlencoded'
		// 	}
		// })
		// .then(function (response) {
		//   console.log(response);
		// })
		// .catch(function (error) {
		//   console.log(error);
		// });
	})
}


/**
 * 获取用户信息
 */

 export const getUser = () => fetch('/v1/user', {user_id: localStorage.getItem('user_id')});

/**
 * 获取图片验证码
 */

export const getcaptchas = () => _fetch('/v1/captchas', {a:'hahaha'  });

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => _fetch('/v2/login', {username, password, captcha_code});





/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});


/**
 * 获取首页热门城市
 */
export const hotcity = () => fetch('/v1/cities', {
	type: 'hot'
});

/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
});


/**
 * 获取搜索地址
 */

export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type: 'search',
	city_id: cityid,
	keyword: value
});


/**
 * 获取msite页面地址信息
 */

export const msiteAdress = geohash => fetch('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
	geohash,
	group_type: '1',
	'flags[]': 'F'
});
/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
	let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
	let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return fetch('/shopping/restaurants', data);
};

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});

/**
 * 获取服务中心信息
 */

export const getService = () => fetch('/v3/profile/explain');


/**
 * 获取歌曲列表
*/
export const getMusicList= () => __fetch('/api/music-data');











	
