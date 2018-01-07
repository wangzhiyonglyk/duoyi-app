/**
 * Created by zhiyongwang on 2016-03-24.
 */

/**
 * @author 王志勇
 * @description 正则表达式
 * @description  
 * create date 2016-03-24
 * edit date:2018-01-05
 */
var  validation= {
    email: '邮箱格式不正确',
    url:"网址格式不正确",
    number: '必须为数字',
    date:"日期格式为: 0000-00-00",
    date:"日期时间格式为: 0000-00-00 00:00:00",
    daterange:"日期范围格式为: 0000-00-00,0000-00-00",
    datetimerange:"日期时间范围格式为: 0000-00-00 00:00:00,0000-00-00 00:00:00",

    alpha: '只能包含英文字符，"_"',
    alphanum: '只能包含数字、英文字符和"_"',
    chinese:"只能输入汉字",
    integer: '必须为整数',
    mobile:"手机号码格式不正确",
    idcard:"身份证号码格式不正确",
    invalidTip:"输入格式无效",
    max: {
        array: '最多选择 {0} 个选项',
        number: '不能大于 {0}',
        string: '最大长度不能超过 {0} 个字符'
    },
    min: {
        array: '最少选择 {0} 个选项',
        number: '不能小于 {0}',
        string: '最小长度不能少于 {0} 个字符'
    },
    userName:"只能包含数字、英文字符和下划线，长度在6到20",
    password: '密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-16之间。',
   
}


export default validation;