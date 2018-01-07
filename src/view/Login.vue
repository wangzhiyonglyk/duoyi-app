<template>
  <div :class="{text_case:istext_case}">
  <!--<ul>
  <li v-for="(site,index) in sites" :class="list">
  <input :type="index==2?'button':'text'" :class="text"  v-bind:placeholder="site.name">
  <input type="text" :class="text" :placeholder="site.name">
  </li>
  </ul>
  <button class="btn btn-info">登陆</button>-->
  <p>{{Login_method}}</p>
  <button @click="weixin" :class="{weixin_bg:isweixin_bg}"></button>
   <p>{{and}}</p>
   <button @click="weixin" :class="{phone_bg:isphone_bg}">{{other_phone_login}}</button>
    <p @click="aa">{{other_login}}</p>
    


 
    

  </div>
  
</template>

<script>
export default {
data(){
   return{
       Login_method:'推荐登陆方式',
       and:'或',
       other_phone_login:'使用手机号码登陆注册',
       other_login:'使用其他方式登陆',
       istext_case:true,
       istext_p:true,
       isweixin_bg:true,
       isphone_bg:true,
       visible:false
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
.list_case{ list-style:none; float:left; width:100%; margin-bottom:10px; }
.text_case{ width:80%; margin:auto; position: relative; top:4rem;}
.text_case p{text-align:center; margin: 0.5rem 0; color:#cbcbcb;}
.text_case button{ width:100%; height:1rem; border-radius: 0.1rem; border:0.02rem solid #999; color:#999;}
.weixin_bg{ background:url(../assets/weixin.png) no-repeat; background-size:100%;}
.phone_bg{ background:white; font-size:0.4rem;}

</style>
