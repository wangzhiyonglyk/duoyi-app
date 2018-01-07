<<template>
  <div class="alterPassword">
      <el-form :model="alterPassword" :rules="passwordRules" ref="alterPassword">
          <el-form-item label="公众号" prop="openId">
              <el-input v-model="alterPassword.openId" placeholder="请输入微信公众号ID"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="alterPassword.password" placeholder="请输入新的密码" ></el-input>
          </el-form-item>
      </el-form>
      <div class="button">
      <el-button type="primary" @click="savePassword">保存</el-button>
      <el-button type="primary" @click="back">返回</el-button>
      </div>
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
          alterPassword:{
              openId:'',
              password:'',
          },
          passwordRules:{
              openId:[
                  {required:true, message:'请输入微信公众号', triggle:'blur'},
                  {pattern:/^[a-zA-Z\d_]{5,}$/, message:'公众号由5位或以上字符/数字/下划线组成', triggle:'blur'}
              ],
              password:[
                  {required:true, message:'请输入新的密码', triggle:'blur'},
                  {pattern:regs.password, message:validation.password, triggle:'blur'}
              ],
          }
      }
  },
  mounted(){},
  methods:{
      savePassword(){
         if(!/^[a-zA-Z\d_]{5,}$/.test(this.alterPassword.openId.trim())){
             var infobox = this.$alert('公众号由5位或以上字符/数字/下划线组成');
             this.$message.error(infobox);
             return;
         } 
         if(!regs.password.test(this.alterPassword.password.trim())){
             var infobox = this.$alert(validation.password);
             this.$message.error(infobox);
             return;
         }
         ajax({
             url:http.test+'/user/password',
             type:'post',
             data:{
                 openId:this.alterPassword.openId.trim(),
                 password:this.alterPassword.password.trim(),
             },
             success:(result)=>{
                 this.$message({
                     message:'保存成功',
                     type:'success'
                 })
             },
             error:(xhr, errorCode, message)=>{
                 console.log(message);
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
.alterPassword .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 65%;
}
.alterPassword .el-form-item__label {
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
    margin-left: 0.5rem;
}
.alterPassword{
    margin-top:0.8rem;
}
.button{
    margin-left:3.3rem;
    margin-top:0.3rem;
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
