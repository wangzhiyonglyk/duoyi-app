/**
 * @description 袁婷的路由
 * @author 袁婷
 * 
 */
import register from "../view/register"; //注册
import alterMobile from "../view/alterMobile"; //修改手机号码
import alterInform from "../view/alterInform"; //修改信息
import issuedInvoice from "../view/issuedInvoice"; //代开发票
import alterInvoice from "../view/alterInvoice"; //修改代开发票

export default [

    { //注册
        path: '/register',
        name: 'register',
        component: register
    },
    { //修改手机号码
        path: '/alterMobile',
        name: 'alterMobile',
        component: alterMobile
    },
    { //修改信息
        path: '/alterInform',
        name: 'alterInform',
        component: alterInform
    },
    { //代开发票
        path: '/issuedInvoice',
        name: 'issuedInvoice',
        component: issuedInvoice
    },

]