/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''; 
let routerMode = 'history';
let imgBaseUrl = 'http://cangdu.org:8001/img/';

const getImgPath = (path)=> {
	let suffix;
	if (!path) {
		return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
	}
	if (path.indexOf('jpeg') !== -1) {
		suffix = '.jpeg'
	} else {
		suffix = '.png'
	}
	let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
	return 'https://fuss10.elemecdn.com' + url
}
	

if (process.env.NODE_ENV == 'development') {

}else if(process.env.NODE_ENV == 'production'){

	// baseUrl = 'http://cangdu.org:8001';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	getImgPath
}