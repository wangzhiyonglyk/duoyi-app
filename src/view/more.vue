 <template>
 
<div>
<!--头部-->
<div :class="{top:istop}">
<p>工商登记类</p>
</div>

<!--内容页-->
<div :class="{more_cass:ismore_cass}">
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


<button class="butt btn btn-info">联系客服</button>
</div>
  
</template>

<script>
export default {
data(){
   return{
       istop:true,
       ismore_cass:true,
       isapp_frame:true,
       isservice:true,
       isservice_child:true,
       
      model:{
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
                },
               

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
.more_cass{
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
    top:-4rem;
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
.butt{ 
    width:100%;
    height:1.3rem;
    position: fixed;
    bottom: 0;
    background: #3c4862;
    }
</style>
