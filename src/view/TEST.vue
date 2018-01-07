<template>
  <div class="main">
  <el-form :model="form" :rules="rules" ref="form">
  <el-form-item label="用户名" prop="userName">
    <el-input type="text" v-model="form.userName1"></el-input>
    <el-input type="text" v-model="form.userName2"></el-input>
  </el-form-item>
  
  </el-form>
  </div>
</template>


<script>
import ajax from "../../static/js/ajax";
import regs from "../../static/js/regs";
import validation from "../../static/js/validation";
export default {
  data() {
    
      return {
        form:{
          userName1:'',
           userName2:'',
          phone:'',
          password: '',
          confirmPassword: '',
          checkCode:'',
        },
        rules:{
            userName:[
              {required:true, message:'请输入用户名', triggle:'blur'},
              {pattern:regs.userName, message:validation.userName, triggle:'blur'},
          ],
         
        }  
        }
        ;
  },
    mounted(){},  
    methods: {
       getCheckCode(){
           if(!regs.mobile.test(this.form.phone.trim())){
               this.$message.error(validation.mobile);
               return;
           }
           ajax({
               url:"http://192.168.1.114:8080/mockjs/2/User/Register",
               type:"post",
               data:{
                   phone: this.form.phone.trim(),
               },
               success:(result)=>{
                   this.$message({
                       message: '成功发送验证码',
                       type: 'success'
                   });
               },
               error:(xhr, errorCode, message)=>{
                   console.log(message);
               }
           })
       },
       submit(){
           if(!regs.userName.test(this.form.userName1.trim())){
               this.$message.error(validation.userName1);
               return;
           }
           if(!regs.mobile.test(this.form.phone.trim())){
               this.$message.error(validation.phone);
               return;
           if(!regs.password.test(this.form.password.trim())){
               this.$message.error(validation.password);
               return;
           }
           if(this.form.password.trim()!==this.form.confirmPassword.trim()){
               this.$message.error(validation.confirmPassword);
               return;
           }
           if(message!=this.form.checkCode.trim()){
               this.$message.error(validation.checkCode);
               console.log('25435161316513.163');
               return;
           }

           ajax({
               url:"http://192.168.1.114:8080/mockjs/2/User/Register",
               type:"post",
               data:{
                   userName: this.form.userName1.trim(),
                   phone: this.form.phone.trim(),
                   password: this.form.password.trim(),
                   confirmPassword: this.form.confirmPassword.trim(),
                   chekCode: this.form.checkCode.trim(),
               },
               success:(result)=>{
                   this.$message({
                       message: '注册成功',
                       type: 'success'
                   });
                   window.location.herf="../login";
               },
                /**********************这里怎么验证失败**********************/
               error:(xhr, errorCode, message)=>{
                   console.log(message);
               }
           })
       }
       }     }}
</script>
>


<<style>
body{
    background:whitesmoke;
}
.main {
    border: solid white 1px;
    width: 555px;
    height: 430px;
    left: 35%;
    top: 15%;
    position: absolute;
    background:white;
}
.el-form{
    margin-top:30px;
}
.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 50%;
    margin-left:40px;
}
.el-form-item__label {
    text-align: center;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 82px;
    position: absolute;
}
.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    margin-left: 30px;
}
.checkCode{
    width:170px;
    margin-left:18px;
}
.checkCodeButton{
    margin-right:-53px;
    margin-left:23px;
}
</style>
>