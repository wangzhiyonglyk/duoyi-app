
/**
 * Created by wangzhiong
 * 将独立于项目的公共函数分享出来
 *
 */


let  baseUtil = {};

/// 获取地址栏参数的值
baseUtil.GetArgsFromHref = function (sHref, sArgName) {
    /// <summary>
    /// 获取地址栏参数的值
    /// </summary>
    /// <param name="sHref" type="string">url地址，</param>
    /// <param name="iwidth" type="int">参数名称</param>
    var args = sHref.toString().split("?");
    var retval = "";
    if (args[0] == sHref) /*参数为空*/ {
        return retval;
        /*无需做任何处理*/
    }
    var str = args[1];
    args = str.toString().split("&");
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.toString().split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == sArgName) retval = arg[1];
    }
    return retval;
}

//判断浏览器类型 todo
baseUtil. BrowserType=function(){
    var browserType="";
    var userAgent = navigator.userAgent.toLowerCase(); //取得浏览器的userAgent字符串
    if (userAgent.indexOf("opera") > -1) {//判断是否Opera浏览器
        browserType= "Opera"
    }
    else if(userAgent.indexOf("opr")>-1)
    {//新版本是这个
        browserType= "Opera";
    }
    else  if (userAgent.indexOf("firefox") > -1) {//判断是否Firefox浏览器
        browserType= "Firefox";
    }
    else if (userAgent.indexOf("chrome") > -1){//先判断是否Chrome浏览器
        browserType= "Chrome";
    }
    else  if (userAgent.indexOf("safari") > -1) {//判断是否Safari浏览器
        browserType= "Safari";
    }
    else if ( /msie|trident/.test(userAgent)) {////判断是否IE浏览器
        browserType=  IEType();
    }


    return browserType;
}
//判断IE类型
baseUtil.IEType=function() {
    if( navigator.userAgent.indexOf("MSIE 6.")>-1){
        return ("IE 6");
    }
    else if(navigator.userAgent.indexOf("MSIE 7.")>-1){
        return ("IE 7");
    }
    else if(navigator.userAgent.indexOf("MSIE 8.")>-1){
        return("IE 8");
    }
    else if( navigator.userAgent.indexOf("MSIE 9.")>-1){
        return("IE 9");
    }
    else if( navigator.userAgent.indexOf("MSIE 10.")>-1){
        return ("IE 10");
    }
    else if(  navigator.userAgent.toLowerCase().indexOf("trident")>-1){
        return ("IE 11");
    }
}


//将数字转为英文表达格式
baseUtil.dealNumToEnglishFormat = function (num) {
    /// <summary>
    /// 将数字转为英文表达格式
    /// </summary>
    /// <param name="num" type="int">数字</param>
    if (isNaN(num)) {
        return num;
    }

    var number = num.toString();
    return number.split('').reverse().join('').replace(/(.{3})/g, '$1,').split('').reverse().join('').replace(/^,/, "");
}

// 日期格式化为字符串
baseUtil.dateformat = function (date, format) {
    /// <summary>
    /// 日期格式化为字符串
    /// </summary>
    /// <param name="date" type="date">日期</param>
    /// <param name="format" type="string">格式化字符串，"yyyy-MM-dd hh:mm:ss","yyyy-MM-dd"</param>
    if (date instanceof Date) {

    }
    else {
        //日期格式错误
        return null;
    }
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


//判断手机类型
baseUtil.phoneType=function() {
    /// <summary>
    /// 判断手机类型
    /// </summary>
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS)
    {
        return "iphone";
    }
    else if(isAndroid)
    {
        return "android";
    }
    else
    {
        return "undefined";
    }
}

/// 字符转日期
baseUtil.stringToDate=function (strDate) {
    /// <summary>
    /// 字符转日期
    /// </summary>
    /// <param name="strDate" type="string">日期字符格式</param>
    var date = new Date(Date.parse(strDate.replace(/-/g, "/"))); //转换成Date();
    return date;
}

baseUtil.cookies={
    /// <summary>
    /// cookies设置
    /// </summary>
    set:function(key,val){
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = key + "="+ val+";path=/;expires=" + exp.toGMTString();
    },
    get:function(key){
        var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return arr[2];
        else
            return null;
    },
    del:function(key){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.get(key);
        if(cval!=null)
            document.cookie= key + "="+cval+";expires="+exp.toGMTString();
    }
}
/// 除去两端窗口
baseUtil.trim = function(str){
    /// <summary>
    /// 除去两端窗口
    /// </summary>
    /// <param name="str" type="string">str</param>
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


/// 把对象复制,返回
baseUtil.clone=function  (obj) {
    /// <summary>
    /// 把对象复制,返回
    /// </summary>
    /// <param name="obj" type="object">源对象</param>
    var o;
    switch(typeof obj){
        case 'undefined': break;
        case 'string'   : o = obj + '';break;
        case 'number'   : o = obj - 0;break;
        case 'boolean'  : o = obj;break;

        case 'object'   :

            if(obj === null){
                o = null;
            }else{
                if(obj instanceof Array){

                    o=[];
                    //o= obj.slice(0)， 注意了这里不能直接使用这个复制，如果数组中的元素为对象，复制是不成功的
                    for(var i=0;i<obj.length;i++)
                    {
                        o.push(baseUtil.clone(obj[i]));
                    }
                }else{
                    o = {};
                    for(var k in obj){
                        o[k] = baseUtil.clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;break;
    }
    return o;
}
//获取真正的数据源
baseUtil.getSource=function(data,source) {
    /// <summary>
    /// 获取真正的数据源
    /// </summary>
    /// <param name="Data" type="object">Data</param>
    /// <param name="source" type="string">source</param>
    var sourceArr=new Array();
    var returnData=data;

    if(source.indexOf(".")>-1)
    {
        sourceArr=source.split(".");
    }
    else
    {
        sourceArr.push(source);
    }
    var i=0;
    try {
        while (i<sourceArr.length)
        {
            returnData=returnData[sourceArr[i]];
            if(returnData==null) {
                return  null;//直接返回
            }
            i++;

        }
    }
    catch(e)
    {
        return null;
    }

    return  returnData;
}
//判断是否空对象
baseUtil.isEmptyObject=function(obj) {
    var isempty=true;
    if( typeof obj==="object")
    {
        for(var o in obj)
        {
            isempty=false;
        }
    }
    return isempty;

}



export default baseUtil;