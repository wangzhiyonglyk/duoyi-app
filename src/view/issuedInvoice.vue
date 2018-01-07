<template>
<div>
<el-container>
  <el-main class="issuedInvoice">
<el-form label-width="80px"  :model="ruleForm" :rules="rules" ref="ruleForm">
  <el-form-item label="单位全称" prop="companyName">
    <el-input v-model="ruleForm.companyName" placeholder="请输入购货方的单位全称"></el-input>
  </el-form-item>
  <el-form-item label="信用代码" prop="companyId">
    <el-input v-model="ruleForm.companyId" placeholder="请输入购货方的统一社会信用代码"></el-input>
  </el-form-item>
  <el-form-item label="注册地址" prop="address">
    <el-input v-model="ruleForm.address" placeholder="购货方的注册地址" v-bind:readonly="readonly" @focus="openMap()" @blur="closeMap()"></el-input>
  </el-form-item>
  <el-form-item label="座机号码" prop="phone">
    <el-input v-model="ruleForm.phone" placeholder="请输入购货方的座机号码"></el-input>
  </el-form-item>
  <el-form-item label="开户银行" prop="bankName">
    <el-input v-model="ruleForm.bankName" placeholder="请输入购货方的开户银行名称"></el-input>
  </el-form-item>
  <el-form-item label="银行账号" prop="account">
    <el-input v-model="ruleForm.account" placeholder="请输入购货方的银行账号"></el-input>
  </el-form-item>
  <el-form-item label="品名" prop="content">
    <el-input v-model="ruleForm.content" placeholder="请输入代开发票的内容（品名）"></el-input>
  </el-form-item>
  <el-form-item label="单价" prop="price">
    <el-input v-model="ruleForm.price" placeholder="请输入货品单价"></el-input>
  </el-form-item>
  <el-form-item label="数量" prop="num">
    <el-input v-model="ruleForm.num" placeholder="请输入货品数量"></el-input>
  </el-form-item>
  <el-form-item label="总金额" prop="sum">
    <el-input v-model="ruleForm.sum" placeholder="请输入总金额"></el-input>
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
        ruleForm: {
          companyName: '',//公司名称
          companyId: '',//统一社会信用代码
          address:'',//公司地址
          phone:'',//座机号码
          bankName:'',//开户银行名称
          account:'',//银行账号
          openid:'',//用户公众号ID
          content:'',//代开发票内容
          price:'',//单价
          num:'',//数量
          sum:'',//总数
        },
        showMap:false,//是否显示地图
        readonly:true,//设置公司地址输入框为只读（仅可从地图输入框获取内容）
        input:'',//地图输入框内容
        rules:{
            companyId:[
                {required:true, message:'请输入公司名称', trigger:'blur'},
                {min:1, max:20, message:'请输入正确的公司名称长度为 1 到 20 个字符', trigger:'blur'}
            ],
            companyId:[
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
            bankName:[
                {required:true, message:'请输入开户银行', trigger:'blur'},
                {pattern:/^.{1,20}$/, message:'请输入正确的银行名称（1到20位字符）', trigger:'blur'}
            ],
            account:[
                {required:true, message:'请输入银行账号', trigger:'blur'},
                {pattern:/^\d{15}$|^\d{19}$/, message:'请输入正确的银行账号（15或19位）', trigger:'blur'}
            ],
            content:[
                {required:true, message:'请输入代开发票的内容（品名）', trigger:'blur'},
                {pattern:/^.{1,10}$/, message:'请输入正确的发票品名（1到10位字符）', trigger:'blur'}
            ],
            price:[
                {required:true, message:'请输入货品单价', trigger:'blur'},
                {pattern:/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/, message:'请输入正确的价格', trigger:'blur'}
            ],
            num:[
                {required:true, message:'请输入货品数量', trigger:'blur'},
                {pattern:/^[1-9]*[1-9][0-9]*$/, message:'请输入正确的数量（整数）', trigger:'blur'}
            ],
            sum:[
                {required:true, message:'请输入总金额', trigger:'blur'},
                {pattern:/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/, message:'请输入正确的金额', trigger:'blur'}
            ]

        }
      }
    },
    mounted(){
    },
    methods:{
      submitForm(){
           if(!/^.{1,20}$/.test(this.ruleForm.companyName.trim())){
               var inforbox = this.$alert('请输入正确的公司名称长度为 1 到 20 个字符');
               this.$message.error(inforbox);
               return;
           }
           if(!/^[0-9A-Z]{18}$/.test(this.ruleForm.companyId.trim())){
               var inforbox = this.$alert('请输入正确的信用代码（十八位数字/字母组合）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^.{1,}$/.test(this.ruleForm.address.trim())){
               var inforbox = this.$alert('请输入正确的地址');
               this.$message.error(inforbox);
               return;
           }
           if(!/^0[0-9]{2,3}-[0-9]{8}$/.test(this.ruleForm.phone.trim())){
               var inforbox = this.$alert('请输入正确的座机号码(四位区号+八位座机号码)');
               this.$message.error(inforbox);
               return;
           }
           if(!/^.{1,20}$/.test(this.ruleForm.bankName.trim())){
               var inforbox = this.$alert('请输入正确的银行名称（1到20位字符）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^\d{15}$|^\d{19}$/.test(this.ruleForm.account.trim())){
               var inforbox = this.$alert('请输入正确的银行账号（15或19位）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^.{1,10}$/.test(this.ruleForm.content.trim())){
               var inforbox = this.$alert('请输入正确的发票品名（1到10位字符）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.ruleForm.price.trim())){
               var inforbox = this.$alert('请输入正确的价格');
               this.$message.error(inforbox);
               return;
           }
           if(!/^[1-9]*[1-9][0-9]*$/.test(this.ruleForm.num.trim())){
               var inforbox = this.$alert('请输入正确的数量（整数）');
               this.$message.error(inforbox);
               return;
           }
           if(!/^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(this.ruleForm.sum.trim())){
               var inforbox = this.$alert('请输入正确的金额');
               this.$message.error(inforbox);
               return;
           }
           ajax({
          url:http.app+'/invoice/save',
          type:"post",
          data:{
            companyName: this.ruleForm.companyName.trim(),//公司名称
            companyId:   this.ruleForm.companyId.trim(),//统一社会信用代码
            address:     this.ruleForm.address.trim(),//公司地址
            phone:       this.ruleForm.phone.trim(),//座机号码
            bankName:    this.ruleForm.bankName.trim(),//开户银行名称
            account:     this.ruleForm.account.trim(),//银行账号
            content:     this.ruleForm.content.trim(),//代开发票内容
            price:       this.ruleForm.price,//物品单价
            num:         this.ruleForm.num,//数量
            sum:         this.ruleForm.sum,//总金额
            id:          window.localStorage.getItem("uid"),
            financeid:   window.localStorage.getItem("financeid"),
            openid:      window.localStorage.getItem("openid"),
            salesmanid:  window.localStorage.getItem("salesmanid")
          },
          success:(result)=>{   
           this.$message({
                massage:'提交成功',
                type:'success',
            })
          },
          error:(xhr,errorCode,message)=>{
                    var info = this.$alert(message);
                    this.$message.error(info)
               }
        })
      },
      openMap:function(){
        this.showMap=true;
      },
      closeMap:function(){
        this.ruleForm.address=this.input;
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
  top:4.1rem;
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
