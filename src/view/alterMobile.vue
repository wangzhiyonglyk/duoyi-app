<<template>
  <div class="alterMobile">
      <el-form :model="alterMobile" :rules="mobileRules" ref="alterMobile">
          <el-form-item label="旧手机号" prop="mobile">
              <el-input v-model="alterMobile.mobile" placeholder="请输入旧的手机号"></el-input>
          </el-form-item>
          <el-form-item label="新手机号" prop="newMobile">
              <el-input v-model="alterMobile.newMobile" placeholder="请输入新的手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode">
              <el-input type="text" v-model="alterMobile.checkCode" class="checkCode" placeholder="请输入验证码"></el-input>
              <el-button @click="getCheckCode" class="checkCodeButton">获取验证码</el-button>
          </el-form-item>
      </el-form>
      <div class="button">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button type="primary" @click="back">返回</el-button>
      </div>
  </div>
</template>

<<script>
import regs from '../../static/js/regs';
import validation from '../../static/js/validation';
import ajax from '../../static/js/ajax';
import http from '../../static/config/http';
export default {
  data(){
      return{
          alterMobile:{
              openId:'',//用户公众号ID
              mobile:'',//旧手机号码
              newMobile:'',//新手机号码
              checkCode:'',//验证码
          },
          mobileRules:{
              mobile:[
                  {required:true, message:'请输入旧手机号', trigger:'blur'},
                  {pattern:regs.mobile, message:validation.mobile, trigger:'blur'}
              ],
              newMobile:[
                  {required:true, message:'请输入新手机号', trigger:'blur'},
                  {pattern:regs.mobile, message:validation.mobile, trigger:'blur'}
              ],
              checkCode:[
                  {required:true, message:'请输入验证码', trigger:'blur'},
              ]
          },
      }
  },
  mounted(){},
  methods:{
      //获取验证码
      getCheckCode(){
          if(!regs.mobile.test(this.alterMobile.newMobile.trim())){
              this.$message.error(validation.mobile);
              return;
          }
          ajax({
              url:http.pro+'/user/getCheckCode',
              type:'post',
              data:{
                  mobile:this.alterMobile.newMobile.trim(),
              },
              success:(result)=>{
                  this.$message({
                      message:'成功获取验证码',
                      type:'success'
                  })
              },
              error:(xhr, errorCode, message)=>{
                  var info = this.$alert(message);
                  this.$message.error(info)
              }
          })
      },

      //提交手机修改表单
      submit(){
          if(!regs.mobile.test(this.alterMobile.mobile.trim())){
              var infobox = this.$alert(validation.mobile);
              this.$message.error(infobox);
              return;
          }
          if(!regs.mobile.test(this.alterMobile.newMobile.trim())){
              var infobox = this.$alert(validation.mobile);
              this.$message.error(infobox);
              return;
          }
          if(!this.alterMobile.checkCode.trim()){
              var infobox = this.$alert('请输入验证码');
              this.$message.error(infobox);
              return;
          }
          ajax({
              url:http.pro+'/user/mobile',
              type:'post',
              data:{
                  openId:window.localStorage.getItem("openid"),//公众号
                  mobile:this.alterMobile.mobile.trim(),//旧手机号
                  newMobile:this.alterMobile.newMobile.trim(),//新手机号
                  checkCode:this.alterMobile.checkCode.trim(),//验证码
              },
              success:(result)=>{
                  this.$message({
                      message:'修改成功',
                      type:'success'
                  })
              },
              error:(xhr, errorCode, message)=>{
                   var info = this.$alert(message);
                  this.$message.error(info)
              }
          })
      },
      back(){
          window.history.back(-1);//返回上一个页面
      },
  }
}
</script>

<<style>
.alterMobile .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 2.5rem;
    margin-left: 0.3rem;
}
.button{
    margin-left:3.3rem;
    margin-top:0.3rem;
}
.alterMobile .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 57%;
}
.alterMobile{
    margin-top:0.8rem;
}
.button .el-button {
    display: inline-block;
    margin: auto;
}
.el-message-box {
    display: inline-block;
    width: 300px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    font-size: 18px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.checkCode{
    width:33%!important;
}
.checkCodeButton{
    margin-left:-0.13rem!important;
}
</style>
