 <template>
 
<div>
<el-container>
<!--头部-->
  <!--内容-->
  <el-main>
  <el-form ref="model" :model="model" :rules="rules" >
  
<!--公司名称-->
<!--<el-form-item label="公司名称">
<ul class="company_list">
<li v-for="(item,index) in model.companyName" :key="index" >
<div>{{item}}</div>
<i class="el-icon-error" @click="companyNameDelete(index)"></i>
</li>
<li  @click="companyNameDialog=true"><i class="el-icon-plus" style="margin-top:0.7rem; margin-left: 1.3rem;"></i></li>
</ul>
<!--公司名称弹出框-->
<!--<el-dialog title="公司名称" :visible.sync="companyNameDialog" width="80%">
  <el-form-item prop="companyNameVerification"> 
      <el-input v-model.trim="temporaryCompanyName" placeholder="请输入公司名称" auto-complete="off" ></el-input>
  </el-form-item>
  <div slot="footer" class="dialog-footer" >
    <el-button type="primary" @click="companyNameAdd" style="width:100%">保存</el-button>
  </div>
</el-dialog>
<!--公司名称弹出框结束-->
  <!--</el-form-item>
<!--公司名称结束-->

<!--公司名称-->
<el-form-item label="公司名称">
<el-form-item prop="companyNameVerification"> 
<div style="float:left; width:100%;"> 
  <el-input placeholder="请输入公司名称"  class="input-with-select" v-model.trim="temporaryCompanyName" style="width:86%; float:left" ></el-input>  
  <el-button icon="el-icon-plus" @click="companyNameAdd" style="width:12%; float:left; margin-left:0.1rem;" ></el-button> 
</div>
 </el-form-item>
 <div class="company_list_name_scroll">
<ul class="company_list_name">
<li v-for="(item,index) in model.companyName" :key="index" >
<div>{{item}}<i class="el-icon-error" @click="companyNameDelete(index)"></i></div>
</li>
</ul>
</div>
  </el-form-item>
<!--公司名称结束-->

<!--注册资金-->
<el-form-item label="注册资金" prop="capital">
   <el-input type="number" v-model.trim="model.capital" placeholder="请输入注册资金"></el-input>
  </el-form-item>
<!--注册资金结束-->

<!--公司地址-->
<el-form-item label="公司地址">
    <el-input v-model="model.address" placeholder="请输入公司地址" v-bind:readonly="readonly" @focus="openMap()" @blur="closeMap()" ></el-input>
  </el-form-item>
<!--公司地址结束-->

<!--法人、董事、经理和监事-->
<el-form-item >

<el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="董事长" name="first">
    <div>
      <el-input auto-complete="off" placeholder="输入董事长姓名" v-model.trim="model.director" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入董事身份证" v-model.trim="model.directorIdCard" style="margin:0.1rem 0"></el-input>
      <div slot="footer" class="dialog-footer" ></div>
    </div>
      </el-tab-pane>
    <el-tab-pane label="经理" name="second">
    <div>
      <el-input auto-complete="off" placeholder="输入经理姓名" v-model.trim="model.managerName" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入经理身份证" v-model.trim="model.managerIdcard" style="margin:0.1rem 0"></el-input>
      <div slot="footer" class="dialog-footer" ></div>
      </div>
      </el-tab-pane>   
    <el-tab-pane label="法人" name="third">
    <div>
      <el-input auto-complete="off" placeholder="输入法人姓名" v-model.trim="model.legalName" style="margin:0.1rem 0"></el-input>
      <el-input auto-complete="off" placeholder="输入法人身份证" v-model.trim="model.legalIdcard" style="margin:0.1rem 0"></el-input>
      <div slot="footer" class="dialog-footer" ></div>
      </div>  
      </el-tab-pane>
    
  </el-tabs>

  </el-form-item>
<!--法人、董事、经理和监事结束-->

<!--股东姓名+身份证+股份-->
<el-form-item label="股东姓名+身份证+股份" >
<div style="float:left; width:100%;"> 
  <el-input placeholder="股份"  class="input-with-select" v-model.trim="rate"  style="width:17%"></el-input> 
  <el-input placeholder="股东姓名"  class="input-with-select" v-model.trim="shareName"  style="width:32%"></el-input>  
  <el-input placeholder="股东身份证"  class="input-with-select" v-model.trim="shareIdcard" style="width:35%"></el-input>
  <el-button icon="el-icon-plus" @click="sharesAdd" ></el-button> 
</div>
   <ul class="boss_id_list">  
<li v-for="(item,index) in model.shares" :key="index">
<div>{{item.rate}}</div>
<div>{{item.shareName}}</div>
<div>{{item.shareIdcard}}</div>
<i class="el-icon-error" @click="sharesDelete"></i>
</li>
</ul>
  </el-form-item>
<!--股东姓名+身份证结束+股份-->

<!--添加监事-->
<el-form-item label="监事+身份证" >
<div style="float:left; width:100%;"> 
  <el-input placeholder="请输入监事姓名"  class="input-with-select" v-model.trim="superName"  style="width:36%"></el-input>  
  <el-input placeholder="请输入监事身份证"  class="input-with-select" v-model.trim="superIdcard" style="width:48%"></el-input>
  <el-button icon="el-icon-plus" @click="supersAdd" ></el-button> 
</div>
   <ul class="jianshi_id_list">  
<li v-for="(item,index) in model.supers" :key="index">
<div>{{item.superName}}</div>
<div>{{item.superIdcard}}</div>
<i class="el-icon-error" @click="supersDelete"></i>
</li>
</ul>
  </el-form-item>
<!--添加监事-->

<!--经营范围-->
<el-form-item label="经营范围" prop="businessScope">
    <el-input type="textarea"  v-model.trim="model.businessScope"></el-input>
  </el-form-item>
<!--经营范围结束-->

<!--上传身份证-->
<el-form-item label="上传身份证">
<div class="upload_img">
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"              
  list-type="picture-card"
  :multiple='true'
  :on-preview="uploadImage"
  :on-remove="removeResponse"
  :on-success="successResponse"
  :on-error="errorResponse"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="imageDialog" size="tiny">
  <img width="100%" :src="image" alt="">
</el-dialog>
</div>
</el-form-item>
<!--上传身份证结束-->
<!--提交按钮-->
<el-form-item style="margin:0.2rem 0">
  <el-button @click="submit" type="primary" style="width:100%">提交</el-button>
  </el-form-item>
  </el-form>
  </el-main>
  <!--尾部-->
  
</el-container>
<!--api输入框-->
<div v-show="showMap" class="map">
  <div id="r-result" class="ipt"><span class="iptl">请输入：</span><el-input v-model="input" id="suggestId" size="20" value="广东" style="height:0.5rem; width:6.5rem; float:left;" @focus="openMap()" @blur="closeMap()"/>
  <el-button type="success" @click="closeMap()">确定</el-button></div>
  <div id="allmap" style="height:9.7rem; width:9.9rem; margin-top:0.1rem"></div>
  <div id="searchResultPanel" style="border:1px solid #C0C0C0; width:150px; height:auto; display:none;"></div>
  </div>
</div>
</div>
<!--api输入框结束-->
</div>
</template>
<style>
.live {
  width: 80%;
}
</style>
<script>
/**
 彭达文 2017/11/24
  */
import ajax from "../../static/js/ajax";
import regs from "../../static/js/regs";
import validation from "../../static/js/validation";
import http from "../../static/config/http.js";
export default {
  data() {
    return {
      imageUrl: http.test + "/images/upload", //上传地址
      image: "", //里面是图片
      imageDialog: false, //上传图片弹出框
      activeName: "second", //tab切换
      companyNameDialog: false, //公司名称弹出框
      ratesDialog: false, //股份比例弹出框
      ratesDeleteDialog:false, //股份比例删除弹出框
      showMap:false,//是否显示地图
      readonly:true,//设置公司地址输入框为只读（仅可从地图输入框获取内容）
      input:'',//地图输入框内容

      model: {
        //组件
        address: "", //公司地址
        businessScope: "", //经营范围
        companyName: [], //公司名称
        directorIdCard: "", //执行董事身份证
        director: "", //执行董事姓名
        capital: "", //注册资金
        id: null, //id号（新增时空）
        imgaes: "", //相关人员的身份证照片
        legalIdcard: "", //公司法人
        legalName: "", //法人姓名
        managerIdcard: "", //经理身份证
        managerName: "", //经理姓名
        openid: "", //用户在公众号上的ID
        salesmanid: "", //销售员
        rates: [], //股份比例
        shares: [], //股东信息
        supers: [] //监事
      },
      shareName: "", //临时股东姓名
      shareIdcard: "", //临时股东身份证
      rate: "", //临时股份比例
      superIdcard: "", //临时监事身份证
      superName: "", //临时监事姓名
      temporaryCompanyName: "", //临时公司名称
      rules: {
        capital: [
          { required: true, message: "请输入注册资金", triggle: "blur" },
          { pattern: regs.number, message: validation.number, triggle: "blur" } //pattern验证表达式
        ],
        businessScope: [
          { required: true, message: "请输入经营范围", triggle: "blur" },
          {
            pattern: regs.alphanum,
            message: validation.alphanum,
            triggle: "blur"
          }
        ],
        
      }
    };
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


  },
  methods: {
    /**添加公司名称 */
    companyNameAdd: function() {
      if(!this.temporaryCompanyName){
        return 
      }else{
      this.model.companyName.push(this.temporaryCompanyName);
      this.companyNameDialog = false; //关闭弹出框
      this.temporaryCompanyName = ""; //清空输入框
      }
    },
    /**删除公司名称 */
    companyNameDelete: function(index) {
      this.model.companyName.splice(index, 1);
    },
  
    /**添加股东姓名+身份证+股份 */
    sharesAdd: function() {
    if(!this.rate){
      return 
    }else if(!this.shareName){
      return 
    }else if(!this.shareIdcard){
      return 
    }else{
      this.model.shares.push({
        rate:this.rate,
        shareName: this.shareName,
        shareIdcard: this.shareIdcard,
      });
      this.rate="";
      this.shareIdcard = ""; //清空输入框
      this.shareName = "";
    }
    },

    /**删除股东姓名+身份证 */
    sharesDelete: function(index) {
      this.model.shares.splice(index, 1);
    },

    /**添加监事 */
    supersAdd: function() {
      if(!this.superName){
        return 
      }else if(!this.superIdcard){
        return 
      }else{
        this.model.supers.push({
        superName: this.superName,
        superIdcard: this.superIdcard
      });
      this.superName = "";
      this.superIdcard = "";
      }
    },

    /**删除监事 */
    supersDelete: function(index) {
      this.model.supers.splice(index, 1);
    },

    /**tab切换 */
    tabClick(tab, event) {
      //console.log(tab, event);
    },

    /**上传图片 */
    uploadImage(file) {
      this.image = file.url;
      this.imageDialog = true;
    },
    /**上传图片成功响应 */
    successResponse(response) {
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    /**删除图片成功响应 */
    removeResponse(file, fileList) {
      this.$message({
        message: "删除成功",
        type: "success"
      });
    },
    /**上传失败响应 */
    errorResponse(err, file, fileList) {
      //console.log(fileList)
      this.$message({
        message: "上传失败",
        type: "success"
      });
    },

    /** 获取焦点打开地图*/
    openMap:function(){
        this.showMap=true;
      },
      /**失去焦点关闭地图*/
      closeMap:function(){
        this.model.address=this.input;
        this.showMap=false;
      },

    validate() {
      //注册资金
      if (!regs.number.test(this.model.capital.trim())) {
        var capital_error = this.$alert("注册资金输入格式有误", "注册资金错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(capital_error);
        return false;
      }
      return true;
      //范围经营
      if (!regs.alphanum.test(this.model.businessScope.trim())) {
        var businessScope_error = this.$alert("经营范围输入格式有误", "范围经营错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(businessScope_error);
        return false;
      }
      return true;
      //股东信息 -姓名
      var shareName = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!shareName.test(this.shareName.charAt())) {
        var sharesName_error = this.$alert("请输入有效的股东姓名", "股东姓名错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(sharesName_error);
        return false;
      }
      return true;
      //股东信息 -身份证
      if (!regs.number.test(this.shareIdcard.trim())) {
        var shareIdcard_error = this.$alert("请输入有效的股东身份证", "股东身份证错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(shareIdcard_error);
        return false;
      }
      return true;
      //监事 -姓名
      var superName = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!superName.test(this.superName.charAt())) {
        var superName_error = this.$alert("请输入有效的监事名称", "监事姓名错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(superName_error);
        return false;
      }
      return true;
      //监事 -身份证
      if (!regs.number.test(this.superIdcard.trim())) {
        var superIdcard_error = this.$alert("请输入有效的监事身份证", "监事身份证错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(superIdcard_error);
        return false;
      }
      return true;
      //   //公司名称
      //   if(!regs.userName.test(this.temporaryCompanyName.trim())){
      //     var companyName_error = this.$alert('请输入有效的公司名称','公司名称错误提示',{
      //       closeOnClickModal:true,   // 是否可通过点击遮罩关闭message
      //       customClass:"live",       // 添加样式
      //       confirmButtonText: '确定',  //确定按钮
      //     });
      //     this.$message.error(companyName_error);
      //     return false;
      //   }
      //       return true;
      //   //股东比例
      //    if(!regs.number.test(this.rate.trim())){
      //     var rate_error = this.$alert('请输入有效的股东比例', '股东比例错误提示',{
      //       closeOnClickModal:true,   // 是否可通过点击遮罩关闭message
      //       customClass:"live",       // 添加样式
      //       confirmButtonText: '确定',  //确定按钮
      //     });
      //     this.$message.error(rate_error);
      //     return false
      // }
      //     return true;
      //   //股东比例-身份证
      //   if(!regs.number.test(this.shareIdcord.trim())){
      //     var shareIdcord_error = this.$alert('请输入有效的股东比例身份证', '股东比例身份证错误提示',{
      //       closeOnClickModal:true,   // 是否可通过点击遮罩关闭message
      //       customClass:"live",       // 添加样式
      //       confirmButtonText: '确定',  //确定按钮
      //     });
      //     this.$message.error(shareIdcord_error);
      //     return false
      // }
      //     return true;
      //执行董事长 -姓名
      var director = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!director.test(this.model.director.charAt())) {
        var director_error = this.$alert("请输入有效的执行董事长", "执行董事长错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(director_error);
        return false;
      }
       return true;
      //执行董事长 -身份证
      if (!regs.number.test(this.model.directorIdCard.trim())) {
        var directorIdCard_error = this.$alert("请输入有效的执行董事长身份证", "执行董事长证错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(directorIdCard_error);
        return false;
      }
        return true;
      //经理 -姓名
      var managerName = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!managerName.test(this.model.managerName.charAt())) {
        var managerName_error = this.$alert("请输入有效的经理姓名", "经理姓名错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(managerName_error);
        return false;
      }
        return true;
      //经理 -身份证
      if (!regs.number.test(this.model.managerIdcard.trim())) {
        var managerIdcard_error = this.$alert("请输入有效的经理身份证", "经理身份证错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(managerIdcard_error);
        return false;
      }
        return true;
      //法人 -姓名
      var legalName = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      if (!legalName.test(this.model.legalName.charAt())) {
        var legalName_error = this.$alert("请输入有效的法人姓名", "法人姓名错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(legalName_error);
        return false;
      }
       return true;
      //法人 -身份证
      if (!regs.number.test(this.model.legalIdcard.trim())) {
        var legalIdcard_error = this.$alert("请输入有效的法人身份证", "法人身份证错误提示", {
          closeOnClickModal: true, // 是否可通过点击遮罩关闭message
          customClass: "live", // 添加样式
          confirmButtonText: "确定" //确定按钮
        });
        this.$message.error(legalIdcard_error);
        return false;
      }
        return true;
    },
    /**
      提交
       */
    submit: function() {
      //if (this.validate()) {
        ajax({
          url: http.app + "/company/save",
          type: "post",
          data: this.mdoel,
          success: result => {
            if (result.data) {
              this.model = result.data;
              console.log(this.model)
            }
            this.$message({
              message: "注册成功",
              type: "success"
            });
          },
          error: (xhr, staus, message) => {
            alert("错误提示"+message);
          }
        });
      //}
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-footer {
  background: #67c23a;
  color: white;
  text-align: center;
}
.el-main {
  padding: 0px 0.2rem;
}

.el-form-item {
  margin-bottom: 0rem;
}
.company_list li {
  display: block;
  width: 30%;
  float: left;
  height: 1.7rem;
  border:1px dashed #c0ccda;
  background: white;
  margin: 0 0 0.1rem 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 0.6rem;
  border-radius: 6px;
}
.company_list_name li {
  display: block;
  float: left;
  border:1px solid #c0ccda;
  background: white;
  padding: 0 0 0.1rem 0.1rem;
  margin:0.1rem 0.1rem 0.1rem 0;
  line-height: 0.6rem;
  border-radius: 6px;
}
.company_list_name i{
  position: relative;
  margin:0.2rem;
}
.company_list_name{
    display: flex;
    overflow-x: scroll;
    white-space: nowrap;
}
.company_list_name div{
  height:0.7rem;
  line-height:0.8rem;
  text-indent: 0.3rem;
}
.company_list {
  width: 100%;
  float: left;
}
.heng {
  float: left;
  white-space: nowrap;
  overflow-x: scroll;
  display: flex;
  max-height: 165px;
  width: 100%;
}
.all_btn_width {
  width: 100%;
  margin: 0.2rem 0;
}
.com_name {
  width: 335px;
  height: 30px;
  border: 1px solid #d8dce5;
  border-radius: 4px;
  background: white;
  float: left;
}
.com_button {
  float: left;
  border: 0;
  border-radius: 4px 0px 0px 4px;
}
.com_list {
  max-width: 20rem;
  overflow-x: scroll;
  display: flex;
}
.com_list li {
  float: left;
  margin: 0 0.2rem;
  display: inherit;
}
.com_list i {
  line-height: 0.87rem;
}
.name_id_list li {
  display: block;
  width: 100%;
  float: left;
}
.name_id_list li:nth-child(even) {
  background: white;
}
.name_id_list li div i {
  margin-left: 1rem;
  line-height: 0.9rem;
  float: right;
  margin-right: 0.1rem;
}
.name_id_list li div:nth-child(odd) {
  width: 40%;
  float: left;
}
.name_id_list li div:nth-child(even) {
  width: 60%;
  float: left;
}
.shares_list li {
  display: block;
  width: 30%;
  float: left;
  height: 1.7rem;
  border: 1px dashed #c0ccda;
  background: white;
  margin: 0 0 0.1rem 0.1rem;
  border-radius: 6px;
}

.shares_list {
  width: 100%;
  float: left;
}
.shares_list div{
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
text-align: center;
}
.all_boss_list {
  text-align: left;
  text-indent: 0.1rem;
  width: 100%;
  float: left;
}
.all_boss_list li {
  background: white;
  height: 1.5rem;
  width: 49%;
  float: left;
  border: 1px solid #d8dce5;
}
.all_boss_list div {
  line-height: 0.7rem;
  width: 145px;
}
.all_boss_list i {
  position: relative;
  top: -0.8rem;
  float: right;
  width: 0.5rem;
  display: block;
}
.jianshi_id_list {
  text-align: left;
  text-indent: 0.1rem;
  width: 100%;
  float: left;
}
.jianshi_id_list li {
  background: white;
  width: 100%;
  float: left;
  margin: 0.1rem 0;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  height:0.8rem;
  line-height:0.8rem;
}
.jianshi_id_list div {
  width: 46%;
  float: left;
  text-align: center;
  height: 1rem;
}

.jianshi_id_list i {
  position: relative;
  margin: -0.8rem 0.1rem 0 0;
}
.boss_id_list {
  text-align: left;
  text-indent: 0.1rem;
  width: 100%;
  float: left;
}
.boss_id_list li {
  background: white;
  width: 100%;
  float: left;
  margin: 0.1rem 0;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  height:0.8rem;
  line-height:0.8rem;
}
.boss_id_list div {
  width: 35%;
  float: left;
  text-align: center;
  height: 1rem;
}
.boss_id_list div:first-child {
  width: 15%;
}
.boss_id_list i {
  position: relative;
  float: right;
  margin: 0.2rem 0.1rem 0 0;
}
.all_boss_case {
  width: 100%;
  float: left;
  margin-bottom: 0.1rem;
}
.all_boss_case button {
  float: left;
  height: 1.5rem;
}
.upload_img {
  width: 100%;
  max-height: 163px;
  display: flex;
  float: left;
  overflow-y: hidden;
  white-space: nowrap;
}

/**map样式 */
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


</style>
