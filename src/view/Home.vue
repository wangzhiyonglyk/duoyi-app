 <template>
 
<div>
<!--头部-->
<div :class="{top:istop}">
<p>主页</p>
<div :class="{app_frame:isapp_frame}">
<ul>
<li v-for="(item,index) in model.important" :key="index"><img class="icon" v-bind:src="item.icon"/><a v-bind:href="item.href">{{item.text}}</a></li>
</ul>
</div>
</div>

<!--内容页-->
<div :class="{mobile_cass:ismobile_cass}">
<!--项目列表-->

<ul :class="{service:isservice}">
<li v-for="(item,index) in model.list" :key="index">
<div>{{item.text}}</div><span></span>
<ul :class="{service_child:isservice_child}">
<li v-for="(subitem1,subindex1) in item.children" :key="subindex1">
<img class="icon" v-bind:src="subitem1.icon"/><a  v-bind:href="subitem1.href">{{subitem1.text}}</a>
</li>
</ul>
</li>
</ul>
</div>


<button :class="{btn:isbtn}">联系客服</button>
</div>
  
</template>

<script>
export default {
data(){
   return{
       istop:true,
       ismobile_cass:true,
       isapp_frame:true,
       isservice:true,
       isservice_child:true,
       isbtn:true,
       
      model:{
    important: [
        {
            value: 1,
            text: "有限公司注册",
            href: "htp://www.baidu.com",
            icon: "../static/top_icon/top_icon01.png"
        },
        {
            value: 2,
            text: "小规模记账（一年）",
            href: "htp://www.baidu.com",
            icon: "../static/top_icon/top_icon02.png"
        },
        {
            value: 3,
            text: "商标快速注册",
            href: "htp://www.baidu.com",
             icon: "../static/top_icon/top_icon03.png"
        }
    ],
        list:[
            {
                value: 1,
                text: "工商登记类",
                children: [{
                    value: 11,
                    text: "有限公司注册",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/integral.png"
                },
                {
                    value: 12,
                    text: "公司股权变更",
                    href: "htp://www.baidu.com",
                   icon: "../static/icon/similar-product.png"
                },
                                {
                    value: 13,
                    text: "工商年报公示",
                    href: "htp://www.baidu.com",
                   icon: "../static/icon/credit-level.png"
                },{
                    value:14,
                    text:"公司注销",
                    href: "htp://www.baidu.com",
                   icon: "../static/icon/manage-order.png"
                },
                {
                    value:15,
                    text:"地址续费",
                    href: "htp://www.baidu.com",
                   icon: "../static/icon/electronics.png"
                },
                {
                    value:16,
                    text:"更多",
                    href: "htp://www.baidu.com",
                   icon: "../static/icon/code.png"
                }

                ]
            },
            {
                value: 2,
                text: "财税类",
                children: [{
                    value: 21,
                    text: "小规模记账（一年）",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/machinery.png"
                },
                {
                    value: 22,
                    text: "申办一般纳税人",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/operation.png"
                },
                                {
                    value: 23,
                    text: "发票代购",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/rfq-qm.png"
                },
                {
                    value: 24,
                    text: "代开增值税专用发票",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/rfq-quantity.png"
                },
                {
                    value: 25,
                    text: "验资报告",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/history.png"
                },
                {
                    value: 26,
                    text: "更多",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/code.png"
                }

                ]
            },
            {
                value: 3,
                text: "知识产权类",
                children: [{
                    value: 31,
                    text: "商标快速注册",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/play.png"
                },
                {
                    value: 32,
                    text: "商标驳回复审",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/stop.png"
                },
                                {
                    value: 33,
                    text: "商标转让",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/compass.png"
                },
                {
                    value: 34,
                    text: "国际商标",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/security.png"
                },
                {
                    value: 35,
                    text: "撤回商标注册申请",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/share.png"
                },
                {
                    value: 36,
                    text: "更多",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/code.png"
                }

                ]
            },
            {
                value: 4,
                text: "许可证类",
                children: [{
                    value: 41,
                    text: "自营进出口权新办",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/ship.png"
                },
                {
                    value: 42,
                    text: "自营进出口权变更",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/data.png"
                },
                                {
                    value: 43,
                    text: "自营进出口权注销",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/bussiness-card.png"
                },
                {
                    value: 44,
                    text: "食品经营许可证新办",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/hot.png"
                },
                {
                    value: 45,
                    text: "食品经营许可证变更",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/trade.png"
                },
                {
                    value: 46,
                    text: "更多",
                    href: "htp://www.baidu.com",
                    icon: "../static/icon/code.png"
                }

                ]
            }
        ]//下面的列表 
}//数据模型 
   }
     
},
 methods:{
       weixin:function(){
           alert(123);
       },
       aa:function(){
           alert(11);
       }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon{
    width:30%;
    margin:auto;
    display:block;
}

.top{
    width:100%; 
    height:6rem; 
    background:#3c4862;
    text-align:center;
    line-height:1.5rem;
    font-size:0.5rem;
    color:white;
    font-weight: bold;
    letter-spacing:0.1rem;
    }
.top p{
    box-shadow: 0px 5px 20px #34415d;
-moz-box-shadow: 0px 5px 20px #34415d;
-webkit-box-shadow: 0px 5px 20px #34415d;
}
.mobile_cass{
width:95%;
background:#fafafb;
margin:auto;
overflow: hidden;
box-shadow: 0px 0px 10px #d4cbcb;
-moz-box-shadow: 0px 0px 10px #d4cbcb;
-webkit-box-shadow: 0px 0px 10px #d4cbcb;
border-radius: 5px;
-moz-border-radius: 5px;
-webkit-border-radius: 5px;
position: relative;
    top:-1.5rem;
}
.app_frame{
    width:100%;
    padding: 0.2rem 0;
    font-size:0.4rem;

}
.app_frame li{
     float:left; 
     width:33.3%; 
     display:block;
     text-align:center;
     line-height: 1rem;
     padding: 0.3rem 0;
     }
.app_frame a{
    color:white;
    font-size:0.1rem;
    letter-spacing: 0.01rem;
}  
.service li{
    width:100%;
    float:left;
    line-height: 1rem;
    text-align: center;
    font-size:0.1rem;
}
.service div{
    text-align:left;
    width:100%;
    color:#38495d;
    height: 1rem;
    line-height: 1rem;
    background: #f6f4f4;
    text-indent: 0.2rem;
    margin-bottom: 0.5rem;
    font-size: 0.4rem;
}
.service_child li{
    width:33.3%;
    margin: 0.5rem 0;
}
.service a, .service_child a{color:#7d889d;;}
.btn{ 
    background:#3c4862; 
    width:100%;
    height: 1.3rem;
    color:white;
    position: fixed;
    bottom: 0;
     }
</style>
