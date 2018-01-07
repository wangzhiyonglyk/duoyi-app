 <template>
 
<div>
<el-container>
<!--头部-->
  <el-header>Header</el-header>
  <!--内容-->
  <el-main>
  <el-form ref="model_form" :model="model_form" :rules="rules" >

<!--注册资金-->
<el-form-item label="注册资金" prop="money">
   <el-input type="number" v-model="model_form.money" placeholder="注册资金"></el-input>
  </el-form-item>
<!--注册资金结束-->

<!--公司地址-->
<el-form-item label="公司地址">
    <el-input v-model="model_form.address"></el-input>
  </el-form-item>
<!--公司地址结束-->

<!--股东姓名+身份证-->
<el-form-item label="股东姓名+身份证" prop="userName_id">
<div style="float:left; width:100%;"> 
  <el-input placeholder="请输入股东姓名"  class="input-with-select" v-model="boss_name" style="width:36%"></el-input>  
  <el-input placeholder="请输入股东身份证"  class="input-with-select" v-model="boss_id" style="width:48%"></el-input>
  <el-button icon="el-icon-search" @click="boss_name_id_ok_btn" ></el-button> 
</div>
   <ul class="boss_id_list">  
<li v-for="(item,index) in boss_name_arr.boss_model" :key="index">
<div>{{item.name}}</div>
<div>{{item.id}}</div>
<i class="el-icon-delete" @click="boss_del(index)"></i>
</li>
</ul>

  </el-form-item>
<!--股东姓名+身份证结束-->


<!--法人、董事、经理和监事-->
<el-form-item label="法人、董事、经理和监事">
<i class="el-icon-circle-plus-outline" @click="all_boss_add_btn" style="float:right; margin-top: 0.3rem;"></i>
<el-form> 
      <div>
      <el-input auto-complete="off" placeholder="输入法人姓名" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入法人身份证"  style="margin:0.1rem 0"></el-input>
      </div>
  </el-form> 

<el-form-item>

 <ul class="all_boss_list">
<li v-for="(item,index) in all_lead.dongshi_model" :key="index">
<div>{{item.name}}</div>
<div>{{item.id}}</div>
<i class="el-icon-close" @click="dongshi_del(index)"></i>
</li>
<li v-for="(item,index) in all_lead.manager_model" :key="index">
<div>{{item.name}}</div>
<div>{{item.id}}</div>
<i class="el-icon-close" @click="manager_del(index)"></i>
</li>
<li v-for="(item,index) in all_lead.jianshi_model" :key="index">
<div>{{item.name}}</div>
<div>{{item.id}}</div>
<i class="el-icon-close" @click="jianshi_del(index)"></i>
</li>
</ul>
</el-form-item>

<!--所有弹出框-->
   <el-dialog title="添加经理,身份证" :visible.sync="all_boss_dialog" width="100%">
   
  <el-form> 
  <template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="添加董事长" name="first">
    <div>
      <el-input auto-complete="off" placeholder="输入董事长姓名" v-model="dongshi_name" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入董事身份证" v-model="dongshi_id" style="margin:0.1rem 0"></el-input>
      <div slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="dongshi_btn" style="width:100%">确 定</el-button>
  </div>
      </div>
      </el-tab-pane>
    <el-tab-pane label="添加经理" name="second">
    <div>
      <el-input auto-complete="off" placeholder="输入经理姓名" v-model="manager_name" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入经理身份证" v-model="manager_id" style="margin:0.1rem 0"></el-input>
      <div slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="manager_btn" style="width:100%">确 定</el-button>
  </div>
      </div>
      </el-tab-pane>
    <el-tab-pane label="添加监事" name="third">
    <div>
      <el-input auto-complete="off" placeholder="输入监事姓名" v-model="jianshi_name" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入监事身份证" v-model="jianshi_id" style="margin:0.1rem 0"></el-input>
      <div slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="jianshi_btn" style="width:100%">确 定</el-button>
  </div>
      </div>  
      </el-tab-pane>
    
  </el-tabs>
</template>
  </el-form>
  
</el-dialog>
<!--所有弹出框结束-->


  </el-form-item>
<!--法人、董事、经理和监事结束-->

<!--经营范围-->
<el-form-item label="经营范围" prop="">
    <el-input type="textarea"  v-model="model_form.range"></el-input>
  </el-form-item>
<!--经营范围结束-->

<!--公司名称-->
<el-form-item label="公司名称">
<ul class="company_list">
<li v-for="(item,index) in com" :key="index">{{item}}<i class="el-icon-close" @click="del(index)"></i></li>
<li  @click="add_company_name"><i class="el-icon-plus" style="margin-top:0.7rem;"></i></li>
</ul>
<!--公司名称弹出框-->
<el-dialog title="公司名称" :visible.sync="namedialog" width="100%">
  <el-form> 
      <el-input v-model="company" auto-complete="off" ></el-input>
  </el-form>
  <div slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="ok_btn" style="width:100%">确 定</el-button>
  </div>
</el-dialog>
<!--公司名称弹出框结束-->
  </el-form-item>
<!--公司名称结束-->

<!--股份比例-->
<el-form-item label="股份比例">
<ul class="shares_list">
<li v-for="(item,index) in gudong_scale_arr.gudong_model" :key="index">
<div>{{item.name}}</div>
<div>{{item.scale}}<i class="el-icon-close" @click="shares_del(index)"></i></div>
</li>
<li @click="shares_add_btn" ><i class="el-icon-plus" style="margin-top:0.7rem;"></i></li>
</ul>

<!--股份比例弹出框-->
   <el-dialog title="股份比例" :visible.sync="shares_dialog" width="100%">
  <el-form> 
      <div>
      <el-input auto-complete="off" placeholder="输入股东姓名" v-model="gudong_name" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入股东股份" v-model="gudong_scale" style="margin:0.1rem 0"></el-input>
      </div>
      
  </el-form>

  <div slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="shares_btn" style="width:100%">确 定</el-button>
  </div>
</el-dialog>
<!--股份比例弹出框结束-->
  </el-form-item>
<!--股份比例结束-->

<!--上传身份证-->
<el-form-item label="上传身份证">
<div class="upload_img">
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :multiple='true'
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
</el-form-item>
<!--上传身份证结束-->

  </el-form>
  </el-main>
  <!--尾部-->
  <el-footer>
  <div v-on:click="submit">提交</div>
  </el-footer>
</el-container>


</div>
</template>
<style>
.live{width:95%;}
</style>
<script>
 /**
 彭达文 2017/11/24
  */
import ajax from "../../static/js/ajax";
import regs from "../../static/js/regs";
import validation from "../../static/js/validation";
export default {
data(){
   return{
     dialogImageUrl: '',
     dialogVisible: false,  //上传图片弹出框
     activeName: 'second',
     namedialog: false,
     shares_dialog:false,
     all_boss_dialog:false,
     
     company:"",    //临时公司名称
     com:[],        //公司名称数组
     boss_name:"",  //临时股东姓名     
     boss_id:"",    //临时身份证   
     boss_name_arr:{boss_model:[]},  //创建对象股东姓名，身份证为数组
     gudong_name:"",  //临时股东姓名
     gudong_scale:"",  //临时股东比例
     gudong_scale_arr:{gudong_model:[]},  //创建对象股东姓名，比例为数组
     faren_name:"",
     faren_id:"",
     dongshi_name:"",
     dongshi_id:"",
     manager_name:"",
     manager_id:"",
     jianshi_name:"",
     jianshi_id:"",
     all_lead:{faren_model:[],dongshi_model:[],manager_model:[],jianshi_model:[]},
        model_form:{   //组件
        name:'',
        address:'',
        money:'',
        range:'',
        
        },
      rules:{
        money:[
          {required:true,message:"请输入注册资金",triggle:"blur"},
          {pattern:regs.number,message:validation.number,triggle:"blur"},   //pattern校验表达式
        ],
        userName:[
          {required:true,message:"请输入股东姓名",triggle:"blur"},
          {pattern:regs.userName,message:validation.userName,triggle:"blur"},   
        ],
        idcard:[
          {required:true,message:"请输入股东身份证",triggle:"blur"},
          {pattern:regs.idcard,message:validation.idcard,triggle:"blur"},  
        ]
      },
   }
     
},

methods: {
  /**公司名称 */
  
  add_company_name:function(){
    this.namedialog=true;       //打开弹出框
    this.company="";            //清空输入框
  },
  
  ok_btn:function(){          
  this.namedialog=false;          //关闭弹出框   
  this.com.push(this.company);    //当前com数组中添加company的元素
  },
  del:function(index){
  this.com.splice(index,1);     //删除com数组下标为1的元素
},
  /**股东姓名+身份证 */

  boss_name_id_ok_btn:function(){
  let boss_name_id_obj={name:this.boss_name,id:this.boss_id };  //创建对象
  this.boss_name_arr.boss_model.push(boss_name_id_obj);         //新创建对象添加到数组里 
  this.boss_name="";          //清空股东姓名
  this.boss_id="";             //清空股东身份证
  },

  boss_del:function(index){
this.boss_name_arr.boss_model.splice(index,1);                       //删除对象下标为1的元素
  },
  /**股东股份比例 */
  shares_add_btn:function(){
    this.shares_dialog=true;       //打开弹出框
    this.gudong_name="";
    this.gudong_scale="";
  },
  shares_btn:function(){
    this.shares_dialog=false;         //关闭弹出框  
    let gudong_obj={name:this.gudong_name,scale:this.gudong_scale};
    this.gudong_scale_arr.gudong_model.push(gudong_obj);
  },
  shares_del:function(index){
    this.gudong_scale_arr.gudong_model.splice(index,1); 
  },
  /**所有法人，董事，经理 */
  all_boss_add_btn:function(){
    this.all_boss_dialog=true;   //打开所有窗口
    this.dongshi_name="";         //清空所有内容
    this.dongshi_id="";
    this.manager_name="";
    this.manager_id="";
    this.jianshi_name="";
    this.jianshi_id="";
  },
  dongshi_del:function(index){                           //删除
    this.all_lead.dongshi_model.splice(index,1);
  },
  manager_del:function(index){
    this.all_lead.manager_model.splice(index,1);
  },
  jianshi_del:function(index){
    this.all_lead.jianshi_model.splice(index,1);
  },
  dongshi_btn:function(){
    this.all_boss_dialog=false;   //关闭所有弹出框
    let dongshi_obj={name:this.dongshi_name,id:this.dongshi_id};
    this.all_lead.dongshi_model.push(dongshi_obj);
  },


  manager_btn:function(){
    this.all_boss_dialog=false;   //关闭所有弹出框
    let manager_obj={name:this.manager_name,id:this.manager_id};
    this.all_lead.manager_model.push(manager_obj);
  },
  
  jianshi_btn:function(){
    this.all_boss_dialog=false;   //关闭所有弹出框
    let jianshi_obj={name:this.jianshi_name,id:this.jianshi_id};
    this.all_lead.jianshi_model.push(jianshi_obj);
  },
  /** */
  handleClick(tab, event) {
        console.log(tab, event);
      },
      /** */
  handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      /**提交 */
      submit:function(){
        if(!regs.number.test(this.model_form.money.trim())){        
         var submit_error = this.$alert('注册资金输入格式有误', '错误提示', {
          confirmButtonText: '确定',  //确定按钮
          customClass:"live",       // 添加样式 
          closeOnClickModal:true,   // 是否可通过点击遮罩关闭message
        });
        this.$message.error(submit_error);
         return;
        }
        ajax({
          url:"http://192.168.1.114:8080/mockjs/1/Invoice/Add",
          type:"post",
          data:{
            number:this.model_form.money.trim(),
          },
          success:(data)=>{
           /* this.$message({
                       message: '注册成功',
                       type: 'success'
                   });
            window.location.href="../home";*/
          },
          error:(xhr,staus,message)=>{
           console.log(message);
          }
        })
      }
    },
    
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header, .el-footer {
    /*background-color: #B3C0D1;
    color: #333;*/
    background:#67c23a;
    color:white;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-form-item{
    margin-bottom:0rem;
  }
  .company_list li{      
display:block;
width:30%;
float:left;
height: 1.7rem;
border:1px dashed #b5aaaa;
background:white;
margin:0 0 0.1rem 0.1rem;
overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:0.6rem;
}
 .company_list{
   width:100%;
   float:left;
 }
.heng{
  float:left;
  white-space:nowrap;
  overflow-x:scroll;
  display:flex;
  max-height:165px;
  width:100%;
}
.all_btn_width{
  width:100%;
  margin:0.2rem 0;
}
.com_name{
    width: 335px;
    height: 30px;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    background: white;
    float:left;
}
.com_button{
    float: left;
    border: 0;
    border-radius: 4px 0px 0px 4px;
}
.com_list{
  max-width:20rem;
  overflow-x: scroll;
    display: flex;
}
.com_list li{
  float:left;
  margin: 0 0.2rem;
  display:inherit;
}
.com_list i{
  line-height: 0.87rem;
}
.name_id_list li{      
display:block;
width:100%;
float:left;
}
.name_id_list li:nth-child(even){
  background:white;
}
.name_id_list li div i{
  margin-left:1rem;
  line-height: 0.9rem;
  float: right;
  margin-right: 0.1rem;
}
.name_id_list li div:nth-child(odd){
  width:40%;
  float:left;
}
.name_id_list li div:nth-child(even){
  width:60%;
  float:left;
}
.shares_list li{      
display:block;
width:30%;
float:left;
height: 1.7rem;
border:1px dashed #b5aaaa;
background:white;
margin:0 0 0.1rem 0.1rem;
}

.shares_list{
 width:100%;
 float:left;
}
.all_boss_list{
  text-align:left;
  text-indent:0.1rem;
  width:100%;
  float:left;
}
.all_boss_list li{
  background:white;
  height: 1.5rem;
  width:49%;
  float:left;
  border: 1px solid #d8dce5;
}
.all_boss_list div{
      line-height: 0.7rem;
      width:145px;
}
.all_boss_list i{
    position: relative;
    top: -0.8rem;
    float: right;
    width: 0.5rem;
    display:block;
}
.boss_id_list{
  text-align:left;
  text-indent:0.1rem;
  width:100%;
  float:left;
}
.boss_id_list li{
  background:white;
  width:100%;
  float:left;
  margin:0.1rem 0;
  border-right: 1px solid #d8dce5;
  border-bottom: 1px solid #d8dce5;
  -moz-box-shadow:2px 2px 6px #d0c5c5; 
  -webkit-box-shadow:2px 2px 6px #d0c5c5;
   box-shadow:2px 2px 6px #d0c5c5;
}
.boss_id_list div{
     width:70%;
     float:left;
     text-align: center;
}
.boss_id_list div:first-child{
  width:30%;
}
.boss_id_list i{
    position: relative;
    float: right;
    margin: -0.6rem 0.1rem 0 0;
}
.all_boss_case{ 
  width:100%;
  float:left;
  margin-bottom:0.1rem;
  }
.all_boss_case button{
  float:left;
  height:1.5rem;
}
.upload_img{
  width:100%;
  max-height:163px;
  display:flex;
  float:left;
  overflow-y:hidden;
  white-space:nowrap;
}


</style>
