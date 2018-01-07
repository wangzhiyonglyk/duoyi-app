<<template>
  <div class="alterInform">
      <el-form :model="alterInform" :rules="informRules" ref="alterInform">
           <el-form-item label="姓名" prop="realName">
               <el-input type="text" v-model="alterInform.realName" placeholder="请输入姓名"></el-input>
           </el-form-item>
           <el-form-item label="性别" prop="sex">
               <template>
                   <el-radio v-model="alterInform.sex" label="male">男</el-radio>
                   <el-radio v-model="alterInform.sex" label="female">女</el-radio>
               </template>
           </el-form-item>
           <el-form-item label="出生日期" prop="birthDate">
               <el-date-picker v-model="alterInform.birthDate" type="date" placeholder="请选择您的出生日期"></el-date-picker>
           </el-form-item>
           <el-form-item label="手机号码" prop="mobileNo">
               <el-input type="text" v-model="alterInform.mobileNo" disabled></el-input>
           </el-form-item>
           <el-form-item label="固定电话" prop="linkTele">
               <el-input type="text" v-model="alterInform.linkTele" placeholder="请输入您的座机号码"></el-input>
           </el-form-item>
           <el-form-item label="邮箱" prop="email">
               <el-input type="email" v-model="alterInform.email" placeholder="请输入您的邮箱"></el-input>
           </el-form-item>
           <el-form-item label="微信" prop="weixin">
               <el-input type="text" v-model="alterInform.weixin" placeholder="请输入您的微信号"></el-input>
           </el-form-item>
           <el-form-item label="公众号" prop="openId">
               <el-input type="text" v-model="alterInform.openId" disabled></el-input>
           </el-form-item>
           <el-form-item label="qq" prop="qq">
               <el-input type="text" v-model="alterInform.qq" placeholder="请输入您的QQ号"></el-input>
           </el-form-item>
           <div class="button">
           <el-button type="primary" @click="submit">提交</el-button>
           <el-button type="primary" @click="back">返回</el-button>
           </div>
      </el-form>
  </div>
</template>

<<script>
  import ajax from '../../static/js/ajax';
  import regs from '../../static/js/regs';
  import validation from '../../static/js/validation';
  import http from '../../static/config/http';
export default {
  data(){
      return{
          regOpenId:'',//公众号是否必填的判断
          alterInform:{
             realName:'',//用户姓名
             sex:'male',//用户性别
             birthDate:'',//用户出生日期
             mobileNo:'',//用户手机号码
             linkTele:'',//座机号码
             email:'',//邮箱地址
             weixin:'',//微信账号
             openId:'',//公众号账号
             qq:'',//qq账号
          },
          informRules:{
              realName:[
                  {required:true, message:'请输入您的姓名', trigger:'blur'},
                  {pattern:/\w{1,}/, message:'姓名至少为一个字符', trigger:'blur'}
              ],
              birthDate:[
                  {type:'date', message:validation, trigger:'blur'}
              ],
              linkTele:[
                  {pattern:/^0[0-9]{2,3}-[0-9]{8}$/, message:'请输入正确的座机号码(四位区号+八位座机号码)', trigger:'blur'},
              ],
              email:[
                  {required:true, message:'请输入您的邮箱', trigger:'blur'},
                  {pattern:regs.email, message:validation.email, trigger:'blur'}
              ],
              weixin:[
                  {pattern:/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message:'微信号为6-20个字母、数字、下划线或减号，以字母开头', trigger:'blur'}
              ],
              qq:[
                  {pattern:/[1-9][0-9]{4,14}/, message:'qq号为第1位1-9之间，第2位0-9之间，长度为4-14位', trigger:'blur'},
              ]
          }
      }
  },
  mounted:function(){//页面渲染完成后向后台请求用户个人信息详情
      this.$nextTick(function(){
          var type;
           ajax({
               url:http.pro+"/user/detail",
               type:"get",
               data:{
                   openid:window.localStorage.getItem("openid"),
               },
               success:(result)=>{
                   this.alterInform=result.data
                   this.alterInform.openId=window.localStorage.getItem("openid")
                   //将得到的用户信息保存
               },
               error:(xhr, errorCode, message)=>{
                  var info = this.$alert(message);
                  this.$message.error(info)
               }
           })
           if(this.alterInform.userType=='customer'){//判断用户类型是否为“客户”类型，是则将regOpenId设为真，修改信息表单中的公众号一栏设为必填
               this.regOpenId=true;
           }
           else{
               this.regOpenId=false;
           }
      })
  },
  methods:{
      submit:function(){
          if(!/\w{1,}/.test(this.alterInform.realName.trim())){
              var info = this.$alert('姓名至少为一个字符');
              this.$message.error(info);
              return;
          }
          if(this.alterInform.linkTele.trim()&&!/^0[0-9]{2,3}-[0-9]{8}$/.test(this.alterInform.linkTele.trim())){
              var info = this.$alert('请输入正确的座机号码(四位区号+八位座机号码)');
              this.$message.error(info);
              return;
          }
          if(!regs.email.test(this.alterInform.email.trim())){
              var info = this.$alert(validation.email);
              this.$message.error(info);
              return;
          }
          if(this.alterInform.weixin.trim()&&!/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(this.alterInform.weixin.trim())){
              var info = this.$alert('微信号为6-20个字母、数字、下划线或减号，以字母开头');
              this.$message.error(info);
              return;
          }
          if(this.alterInform.openId.required){
              if(!/^[a-zA-Z\d_]{5,}$/.test(this.alterInform.openId.trim())){
                  var info = this.$alert('公众号由5位或以上字符/数字/下划线组成');
                  this.$message.error(info);
                  return;
              }
          }
          else{
              if(this.alterInform.openId.trim()&&!/^[a-zA-Z\d_]{5,}$/.test(this.alterInform.openId.trim())){
                  var info = this.$alert('公众号由5位或以上字符/数字/下划线组成');
                  this.$message.error(info);
                  return;
              }
          }
          if(this.alterInform.qq.trim()&&!/[1-9][0-9]{4,14}/.test(this.alterInform.qq.trim())){
              var info = this.$alert('qq号为第1位1-9之间，第2位0-9之间，长度为4-14位');
              this.$message.error(info);
              return;
          }
          ajax({
              url:http.pro+'/user/save',
              type:'post',
              data:{
                  realName:this.alterInform.realName.trim(),//用户姓名
                  sex:this.alterInform.sex,//用户性别
                  birthDate:this.alterInform.birthDate,//用户出生日期
                  linkTele:this.alterInform.linkTele.trim(),//座机号码
                  email:this.alterInform.email.trim(),//邮箱地址
                  weixin:this.alterInform.weixin.trim(),//微信账号
                  openId:this.alterInform.openId.trim(),//公众号账号
                  qq:this.alterInform.qq.trim()//qq账号
              },
              success:(result)=>{
                  this.$message({
                      message:"提交成功",
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
          window.history.back(-1);
      },
  }
}
</script>

<<style>
.alterInform .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 65%;
}
.alterInform .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #5a5e66;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 2rem;
    margin-left: 0.8rem;
}
.alterInform{
    margin-top:1rem;
}
.alterInform item--small.el-form-item {
    margin-bottom: 18px;
    margin-top: 0.8rem;
}
.button {
    margin-left: 3rem;
    margin-top: 0.2rem;
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
</style>
