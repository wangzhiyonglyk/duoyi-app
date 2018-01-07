<template>
  <div>
   <input type="file" @change="fileChange">
   <img  style="width:2rem;height:2rem;" v-bind:src="imgUrl" alt="身份证">
  </div>
</template>

<script>
export default {

data(){
    return {
        imgUrl:""
    }
},
methods:{
    fileChange(event){
    //    this.imgUrl=window.URL.createObjectURL(event.target.files[0]);
      {
              let good="22";
                var   fr = new FileReader();
        var that =this;
          }
    
        fr.onload = function(ele){
          
            that.imgUrl=ele.target.result;
        }
          fr.readAsDataURL(event.target.files[0]);
         
          console.log(fr);
          console.log(good);
    }

 
     
    }

}
</script>

<style>

</style>
