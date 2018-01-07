<<template>
  <div class="register">
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="">
          <el-form-item label="姓名" prop="realName">
              <el-input v-model="registerForm.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="registerForm.mobile" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="checkCode">
              <el-input type="text" v-model="registerForm.checkCode" class="checkCode" placeholder="请输入验证码"></el-input>
              <el-button @click="getCheckCode" class="checkCodeButton">获取验证码</el-button>
          </el-form-item>
          <el-button type="primary" @click="submitRegister" class="registerButton">注册</el-button>
      </el-form>
  </div>
</template>
>

<<script>
import regs from '../../static/js/regs'
import validation from '../../static/js/validation'
import ajax from '../../static/js/ajax'
import httpHeader from '../../static/js/httpHeader'
import http from '../../static/config/http'
import status from '../../static/config/status'
export default {
  data(){
      return{
          registerForm:{
              openId:'',//用户公众号ID
              realName:'',//用户姓名
              mobile:'',//用户手机号码
              checkCode:'',//验证码
          },
          registerRules:{
              realName:[
                  {required:true, message:'请输入姓名', trigger:'blur'},
                  {pattern:/\w{1,}/, message:'姓名至少为一个字符', trigger:'blur'}
              ],
              mobile:[
                  {required:true, message:'请输入手机号码', trigger:'blur'},
                  {pattern:regs.mobile, message:validation.mobile, trigger:'blur'},
              ],
              checkCode:[
                  {required:true, message:'请输入验证码', trigger:'blur'},
              ],
          },
      }
  },
  mounted(){},
  methods:{
      getCheckCode(){//获取验证码
          if(!regs.mobile.test(this.registerForm.mobile.trim())){
              this.$message.error(validation.mobile);
              return;
          }
          ajax({
              url:http.pro+'/user/getCheckCode',
              type:'post',
              data:{
                  mobile:this.registerForm.mobile.trim(),
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
      submitRegister(){//提交注册表单
          if(!/\w{1,}/.test(this.registerForm.realName.trim())){
              this.$message.error('姓名至少为一个字符');
              return;
          }
          if(!regs.mobile.test(this.registerForm.mobile.trim())){
              this.$message.error(validation.mobile);
              return;
          }
          if(!this.registerForm.checkCode.trim()){
              this.$message.error('请输入验证码');
              return;
          }
          ajax({
              url:http.pro+'/user/register',
              type:'post',
              data:{
                  openId:window.localStorage.getItem("openid"),
                  realName:this.registerForm.realName.trim(),
                  mobile:this.registerForm.mobile.trim(),
                  checkCode:this.registerForm.checkCode.trim(),
              },
              success:(result)=>{
                  this.$message({
                      message:'成功提交',
                      type:'success',
                  })
              },
              error:(xhr, errorCode, message)=>{
                  var info = this.$alert(message);
                  this.$message.error(info)
              }
          })
      },
  },
}
</script>

<<style>
.register{
    margin-top:3rem;
}
.register .el-input {
    position: relative;
    font-size: 14px;
    display: inline-flex;
    width: 65%;
}
.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 102px;
}
.el-form-item__error {
    color: #fa5555;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 100px;
}
.checkCodeButton {
    margin-left: -0.2rem !important;
    width: 2.4rem;
}
.checkCode{
    width:4.053333rem !important;
}
.registerButton{
    margin-left:4.25rem;
    margin-top:2rem;
}
</style>
