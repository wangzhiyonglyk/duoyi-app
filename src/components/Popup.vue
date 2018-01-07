<template>
  <div :class="{bg:isbg}" >
  <div :class="{popup_top:ispopup_top}">
  <p :class="{popup_case:ispopup_case}">
  <button>微信登陆</button>
  <button>QQ登陆</button>
    <button>取消</button>
    </p>
  </div>

  </div>
  
</template>

<script>
export default {
data(){
   return{
      isbg:true,
      ispopup_top:true,
      ispopup_case:true
   }
     
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{background:url(../assets/popup_bg.png); width:100%; height:100%;position: absolute;}
.popup_top{ width:100%; height:5rem; background:white; position:fixed;bottom:0;-moz-box-shadow: 0px -5px 3px #796565; /* 老的 Firefox */
box-shadow: 0px -5px 3px #796565;}
.popup_case{ width:80%; margin:auto;}
.popup_case button{ width:100%;height:40px; margin:0.3rem 0;}
</style>
