 <template>
<div>
<ul>
<li v-for="(item,index) in model.important" :key="index"><img :src="item.icon" /><a :src="item.href">{{item.text}}</a></li>
</ul>
<ul>
<li v-for="(item,index) in model.list" :key="index">
<div>{{item.text}}</div>
<ul>
<li v-for="(sub,subXIA) in item.children" :key="sunXIA">
<img :src="sub.icon" />
<a :src="sub.href">{{sub.text}}</a>
</li>
</ul>
</li>
</ul>

<ul>
<li v-for="(lx,ind) in inp" :key="ind">
<input :name="lx.name" :type="lx.type" :class="lx.class" :value="lx.value" />
</li>
</ul>
</div>
  
</template>

<script>
export default {
        data(){
            return{
                isicon:true,
                model:{
                    important:[
                        {
                        value:1,
                        text:"人工服务",
                        href:"http://www.baidu.com",
                        icon:"../static/icon/001.png"
                    },
                    {
                     value:1,
                        text:"人工服务",
                        href:"http://www.baidu.com",
                        icon:"../static/icon/001.png"   
                    },
                    {
                     value:1,
                        text:"人工服务",
                        href:"http://www.baidu.com",
                        icon:"../static/icon/001.png"   
                    }
                    ],
                    list:[
                        {
                            value:2,
                            text:"淘宝",
                            children:[
                                {
                                value:3,
                                text:"111",
                                href:"http://www.baidu.com",
                                icon:"../static/icon/001.png"
                            },{
                                value:3,
                                text:"111",
                                href:"http://www.baidu.com",
                                icon:"../static/icon/001.png"
                            },{
                                value:3,
                                text:"111",
                                href:"http://www.baidu.com",
                                icon:"../static/icon/001.png"
                            }
                            ]
                    },{
                       value:2,
                            text:"淘宝2",
                            children:[
                                {
                                value:3,
                                text:"111",
                                href:"http://www.baidu.com",
                                icon:"../static/icon/001.png"
                            },{
                                value:3,
                                text:"111",
                                href:"http://www.baidu.com",
                                icon:"../static/icon/001.png"
                            },{
                                value:3,
                                text:"111",
                                href:"http://www.baidu.com",
                                icon:"../static/icon/001.png"
                            }
                            ]  
                    }
                    ]
                },
                inp:[
                    {
                        type:"text",
                        name:"text",
                        class:"text"
                },{
                        type:"password",
                        name:"password",
                        class:"password" 
                },{
                        type:"button",
                        name:"button",
                        class:"button",
                        value:"按钮"
                }
                ]

            }



        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon{ 
    display:block; 
    width:30%;}

</style>
