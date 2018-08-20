
// 获取微信分享信息
//var service 	= require('modules/tools/service');

function wechatShare(shareData){
	this.init( shareData );
}
var linkBase = location.origin;
wechatShare.prototype.init = function ( _shareData ) {
    var shareData = $.extend({}, _shareData);
    var regex1 = /^\/\//;
	if (shareData.link) {

	    if(regex1.test(shareData.link)){
	        // '//'开头的添加协议http：或https：
            shareData.link = location.protocol + shareData.link;
        }

        else if(!/^http/.test(shareData.link)){
            shareData.link = linkBase + shareData.link;
        }
	}
	if (shareData.imgUrl) {
        if (regex1.test(shareData.imgUrl)) {
            // '//'开头的添加协议http：或https：
            shareData.imgUrl = location.protocol + shareData.imgUrl;
        }
        else if(!/^http/.test(shareData.imgUrl)){
            shareData.imgUrl = linkBase + shareData.imgUrl;
        }
	}

	this.whenLoadWX(function(){

	    if(!publicConfig.wechatApiHost[publicConfig.mode]){
	        console.warn("limin-error","not found ",publicConfig.mode);
	        return false;
        }

        $.getJSON(publicConfig.wechatApiHost[publicConfig.mode] + '?method=com.wechat.load.config&url=' + encodeURIComponent(window.location.href.split("#")[0]), function (result) {
            wx.config({
                //debug : true,
                appId: result.appId,
                timestamp: result.timestamp,
                nonceStr: result.nonceStr,
                signature: result.signature,
                jsApiList: ['showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
            });

            wx.ready(function () {
                var shareData2 = $.extend({}, shareData);
                shareData2.title = shareData2.desc;
                var shareData3 = $.extend({}, shareData);
                // shareData3.success = null;

                // 分享到QQ
                wx.onMenuShareQQ(shareData);
                // 分享到朋友圈
                wx.onMenuShareTimeline(shareData2);
                // 分享给朋友
                wx.onMenuShareAppMessage(shareData3);
            });

            wx.error(function (res) {
                //alert(JSON.stringify(res));//.errMsg
            });
        });
	});



};
wechatShare.prototype.whenLoadWX = function(done){
	if(!window.wx){
		limin.loadResouse('js','//res.wx.qq.com/open/js/jweixin-1.0.0.js',done);
	}else{
		done()
	}
};

module.exports = wechatShare;