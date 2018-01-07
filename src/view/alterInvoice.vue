<template>
<div>
<el-container>
  <el-header>
    <router-link to="#" class="return">返回</router-link>
  </el-header>
  <el-main class="issuedInvoice">
<el-form label-width="80px"  :model="alterInvoice" :rules="InvoiceRules" ref="alterInvoice">
  <el-form-item label="单位全称" prop="name">
    <el-input v-model="alterInvoice.name" placeholder="请输入购货方的单位全称"></el-input>
  </el-form-item>
  <el-form-item label="信用代码" prop="code">
    <el-input v-model="alterInvoice.code" placeholder="请输入购货方的统一社会信用代码"></el-input>
  </el-form-item>
  <el-form-item label="注册地址" prop="address">
    <el-input v-model="alterInvoice.address" placeholder="购货方的注册地址" v-bind:readonly="readonly" @focus="openMap()" @blur="closeMap()"></el-input>
  </el-form-item>
  <el-form-item label="座机号码" prop="phone">
    <el-input v-model="alterInvoice.phone" placeholder="请输入购货方的座机号码"></el-input>
  </el-form-item>
  <el-form-item label="开户银行" prop="bank">
    <el-input v-model="alterInvoice.bank" placeholder="请输入购货方的开户银行名称"></el-input>
  </el-form-item>
  <el-form-item label="银行账号" prop="id">
    <el-input v-model="alterInvoice.id" placeholder="请输入购货方的银行账号"></el-input>
  </el-form-item>
  <!--<el-form-item label="公众号" prop="openid">
    <el-input v-model="alterInvoice.openid" placeholder="请输入用户公众号id"></el-input>
  </el-form-item>-->
  <el-form-item label="品名" prop="content">
    <el-input v-model="alterInvoice.content" placeholder="请输入代开发票的内容（品名）"></el-input>
  </el-form-item>
  <el-form-item label="单价" prop="price">
    <el-input v-model="alterInvoice.price" placeholder="请输入货品单价"></el-input>
  </el-form-item>
  <el-form-item label="数量" prop="number">
    <el-input v-model="alterInvoice.number" placeholder="请输入货品数量"></el-input>
  </el-form-item>
  <el-form-item label="总金额" prop="total">
    <el-input v-model="alterInvoice.total" placeholder="请输入总金额"></el-input>
  </el-form-item>
  <el-button type="primary" @click="submitForm">提交</el-button>
</el-form>
  </el-main>
  <el-footer></el-footer>
</el-container>


<div v-show="showMap" class="map">
  <div id="r-result" class="ipt"><span class="iptl">请输入：</span><el-input v-model="input" id="suggestId" size="20" value="广东" style="height:0.5rem; width:6.5rem; float:left;" @focus="openMap()" @blur="closeMap()"/>
  <el-button type="success" @click="closeMap()">确定</el-button></div>
  <div id="allmap" style="height:9.7rem; width:9.9rem; margin-top:0.1rem"></div>
  <div id="searchResultPanel" style="border:1px solid #C0C0C0; width:150px; height:auto; display:none;"></div>
  </div>
</div>
</template>


<script>
  import ajax from '../../static/js/ajax';
  import regs from '../../static/js/regs';
  import validation from '../../static/js/validation';
  import http from '../../static/config/http'
export default {
  /*@author:yt;
    @finished:false */
    
   data() {
      return {
        alterInvoice: {
          name: '',
          code: '',
          address:'',
          phone:'',
          bank:'',
          id:'',
          openid:'',
          content:'',
          price:'',
          number:'',
          total:'',
        },
        showMap:false,
        readonly:true,
        input:'',
        InvoiceRules:{
            name:[
                {required:true, message:'请输入公司名称', trigger:'blur'},
                {min:1, max:20, message:'请输入正确的公司名称长度为 1 到 20 个字符', trigger:'blur'}
            ],
            code:[
                {required:true, message:'请输入信用代码', trigger:'blur'},
                {pattern:/^[0-9A-Z]{18}$/, message:'请输入正确的信用代码（十八位数字/字母组合）', trigger:'blur'}
            ],
            address:[
                {required:true, message:'请输入注册地址', trigger:'blur'},
                {pattern:/^.{1,}$/, message:'请输入正确的地址', trigger:'blur'}
            ],
            phone:[
                {required:true, message:'请输入座机号码', trigger:'blur'},
                {pattern:/^0[0-9]{2,3}-[0-9]{8}$/, message:'请输入正确的座机号码(四位区号+八位座机号码)', trigger:'blur'}
            ],
            bank:[
                {required:true, message:'请输入开户银行', trigger:'blur'},
                {pattern:/^.{1,20}$/, message:'请输入正确的银行名称（1到20位字符）', trigger:'blur'}
            ],
            id:[
                {required:true, message:'请输入银行账号', trigger:'blur'},
                {pattern:/^\d{15}$|^\d{19}$/, message:'请输入正确的银行账号（15或19位）', trigger:'blur'}
            ],
            /*openid:[
                {required:true, message:'请输入用户公众号id', trigger:'blur'},
                {pattern:/^[a-zA-Z\d_]{5,}$/, message:'请输入正确的公众号id', trigger:'blur'}
            ],*/
            content:[
                {required:true, message:'请输入代开发票的内容（品名）', trigger:'blur'},
                {pattern:/^.{1,10}$/, message:'请输入正确的发票品名（1到10位字符）', trigger:'blur'}
            ],
            price:[
                {required:true, message:'请输入货品单价', trigger:'blur'},
                {pattern:/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/, message:'请输入正确的价格', trigger:'blur'}
            ],
            number:[
                {required:true, message:'请输入货品数量', trigger:'blur'},
                {pattern:/^[1-9]*[1-9][0-9]*$/, message:'请输入正确的数量（整数）', trigger:'blur'}
            ],
            total:[
                {required:true, message:'请输入总金额', trigger:'blur'},
                {pattern:/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/, message:'请输入正确的金额', trigger:'blur'}
            ]

        }
      }
    },
    /*
    methods: {
        submitForm:function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            alert('error submit!!');
            return false;
          }
        });

        ajax({
          url:"http://192.168.1.114:8080/mockjs/1/Invoice/Add",
          type:"post",
          data:{
            companyName:this.alterInvoice.name.trim(),
            companyid:this.alterInvoice.code.trim(),
            address:this.alterInvoice.address.trim(),
            phone:this.alterInvoice.phone.trim(),
            bankName:this.alterInvoice.bank.trim(),
            account:this.alterInvoice.id.trim(),
            openid:this.alterInvoice.openid.trim(),
            content:this.alterInvoice.content.trim(),
            price:this.alterInvoice.price.trim(),
            num:this.alterInvoice.number.trim(),
            sum:this.alterInvoice.total.trim(),
          },
          success:(result)=>{
            this.$message({
                massage:'提交成功',
                type:'success',
            })
          },
          error:(xhr,erroCode,message)=>{
            this.$message({
              message:'提交失败',
              type:'fail',
            })
          }
        })

      },
      openMap:function(){
        this.showMap=true;
      },
      closeMap:function(){
        this.alterInvoice.address=this.input;
        this.showMap=false;
      }
    },*/
    mounted:function(){
     /* var a=window.localStorge.getItem("financeid");
      console.log(a);*/
      this.$nextTick(function(){
          ajax({
              url:http.test+'',  //代开发票详情页
              type:'get',
              success:(result)=>{
                  this.alterInvoice=result.data;
              },
              error:(xhr, errorCode, message)=>{
                  console.log(message);
              }
          })
      })
    },
    methods:{
      submitForm(){
           if(!/^.{1,20}$/.test(this.alterInvoice.name.trim())){
               var inforbox = this.$alert('请输入正确的公司名称长度为 1 到 20 个字符');
               this.$message.error(inforbox);
               return;
           }
           if(!/^[0-9A-Z]{18}$/.test(this.alterInvoice.code.trim())){
               var inforbox = this.$alert('请输入正确的信用代码（十八位数字/字母组合）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^.{1,}$/.test(this.alterInvoice.address.trim())){
               var inforbox = this.$alert('请输入正确的地址');
               this.$message.error(inforbox);
               return;
           }
           if(!/^0[0-9]{2,3}-[0-9]{8}$/.test(this.alterInvoice.phone.trim())){
               var inforbox = this.$alert('请输入正确的座机号码(四位区号+八位座机号码)');
               this.$message.error(inforbox);
               return;
           }
           if(!/^.{1,20}$/.test(this.alterInvoice.bank.trim())){
               var inforbox = this.$alert('请输入正确的银行名称（1到20位字符）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^\d{15}$|^\d{19}$/.test(this.alterInvoice.id.trim())){
               var inforbox = this.$alert('请输入正确的银行账号（15或19位）');
               this.$message.error(inforbox);
               return;
           }
          /* if(!/^[a-zA-Z\d_]{5,}$/.test(this.alterInvoice.openid.trim())){
               var inforbox = this.$alert('请输入正确的公众号id');
               this.$message.error(inforbox);
               return;
           }*/
           if(!/^.{1,10}$/.test(this.alterInvoice.content.trim())){
               var inforbox = this.$alert('请输入正确的发票品名（1到10位字符）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.alterInvoice.price.trim())){
               var inforbox = this.$alert('请输入正确的价格');
               this.$message.error(inforbox);
               return;
           }
           if(!/^[1-9]*[1-9][0-9]*$/.test(this.alterInvoice.number.trim())){
               var inforbox = this.$alert('请输入正确的数量（整数）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.alterInvoice.total.trim())){
               var inforbox = this.$alert('请输入正确的金额');
               this.$message.error(inforbox);
               return;
           }
           ajax({
          url:http.test+'/invoice/save',
          type:"post",
          data:{
            companyName: this.alterInvoice.name.trim(),
            companyid:   this.alterInvoice.code.trim(),
            address:     this.alterInvoice.address.trim(),
            phone:       this.alterInvoice.phone.trim(),
            bankName:    this.alterInvoice.bank.trim(),
            account:     this.alterInvoice.id.trim(),
            openid:      this.alterInvoice.openid.trim(),
            content:     this.alterInvoice.content.trim(),
            price:       this.alterInvoice.price.trim(),
            num:         this.alterInvoice.number.trim(),
            sum:         this.alterInvoice.total.trim(),
            id:          '',
            financeid:   window.localStorage.getItem("financeid"),
            openid:      window.localStorage.getItem("openid"),
            salesmanid:  window.localStorage.getItem("salesmanid")
          },
          success:(result)=>{   
           this.$message({
                massage:'提交成功',
                type:'success',
            })
            console.log(result)
          },
          error:(xhr,errorCode,message)=>{
                    console.log(message);
               }
        })
      },
      openMap:function(){
        this.showMap=true;
      },
      closeMap:function(){
        this.alterInvoice.address=this.input;
        this.showMap=false;
      }
    },
    
      mounted(){
          //百度地图API功能
        function G(id){
          return document.getElementById(id);
        }

        var map = new BMap.Map("allmap");
        map.centerAndZoom("北京",12);//初始化地图，设置城市和地图级别

        var ac = new BMap.Autocomplete(//建立一个自动完成的对象
          {"input" : "suggestId",
          "location" : map}
        );

        ac.addEventListener("onhighlight",function(e){//鼠标在下拉列表上的事件
        var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1){
              value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1){
              _value = e.toitem.value;
              value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });
        let that=this;
        var myValue;
        ac.addEventListener("onconfirm",function(e){//鼠标点击下拉列表后的事件
        var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            that.input=myValue;
            setPlace();
        });

        function setPlace(){
          map.clearOverlays();//清除地图上所有覆盖物
          function myFun(){
            var pp = local.getResults().getPoi(0).point;//获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));//添加标注
          }
          var local = new BMap.LocalSearch(map, {//智能搜索
            onSearchComplete:myFun
          });
          local.search(myValue);
        }


  }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
element.style{
  height:45px;
}
.el-header{
  background:#000;
  height:45px ! important;
}
.el-input__inner{
    width: 98%;;
}
.el-button{
  display: block;
  margin:auto; 
}
.el-footer{
  background:grey;
  height:45px ! important;
}
.map{
  background-color:#fff;
  position: absolute;
  width:9.9rem;
  height:11.1rem;
  border:whitesmoke solid 1px;
  top:5.3rem;
  left: 0rem;
  border-radius:5px;
}
.ipt{
  margin-top:0.1rem;
  margin-left: 0.05rem;
  height:1rem;
  text-align:center;
}
#suggestId{
  height:0.8rem;
}
#allmap{
  margin-top:0.1rem;
  width:11rem;
}
.iptl{
  float:left;
  margin-top:0.1rem;
  margin-left:0.1rem;
}
.el-form-item__error{
  width:max-content;
}
.el-message-box__btns {
    padding: 7px 15px 0;
    text-align: center;
    margin-left: 3.5rem;
}
.el-message-box {
    display: inline-block;
    width: 8rem;
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
    margin-top: -7rem;
}
.issuedInvoice .el-form-item__error {
    color: #fa5555;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0px;
}
.return{
  color: dimgrey;
  font-size: 0.6rem;
  font-family: Arial, Helvetica, sans-serif;
  margin-top:0.5rem;
  margin-left:-0.3rem;
}
</style>
