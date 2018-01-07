

export default {
    // clientType:"pc",// 客户端类型
    // timeStamp:Date.parse(new Date()),//当前时间戳
    // clientVersion:"1.0.0",//版本号,
    // sign:"",//签名
    // token:window.localStorage.getItem("token"),
    cookie: "JSESSIONID="+window.localStorage.getItem("shiroId"),
}