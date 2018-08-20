/**
 * Created by yanhongfei on 2017/3/21.
 */
function ajax(opt) {
    var defaults = {
        url: '',
        methods:'GET',
        data:{},
        async: true,
        cache: true,
        contentType: 'application/x-www-form-urlencoded',
        success: function (){},
        error: function (){}
    };
    var arr=[],oData,cache;
    for (var key in opt){
        defaults[key]=opt[key];
    }
    if(typeof defaults.data == 'object'){
        for(var key in defaults.data ){
            arr.push(key+'='+defaults.data[key])
        }
    }
    oData=arr.join('&');//数据拼接

    if(!defaults.cache){
        cache='&'+new Date().getTime();
    }

    var xmlHttp=window.XMLHttpRequest? new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
    if(defaults.method.toUpperCase()=='GET'){
        xmlHttp.open(defaults.method,defaults.url+'?'+oData+cache,defaults.async);
        xmlHttp.send(null)

    }else if(defaults.method.toUpperCase()=='POST'){
        xmlHttp.open(defaults.method,defaults.url+cache,defaults.async);
        xmlHttp.setRequestHeader('Content-type',defaults.contentType);
        xmlHttp.send(oData)
    }
    xmlHttp.onreadystatechange=function (statu) {
        if(statu.readyState==4){
            if(statu.status==200){
                defaults.success(statu.responseText)

            }else{
                defaults.error(statu.responseText)
            }

        }
    }

}


