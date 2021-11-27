<template>
    <Layout  class="back">
        <Header :style="{position: 'fixed', width: '100%',padding: 0}" style="z-index: 3">
            <Menu mode="horizontal" theme="light" :active-name="activeName">

                <MenuItem style="margin-left: 10px;padding-right: 10px">
                    <img src="../assets/legal.png" style="height: 60px">
                </MenuItem>
                <MenuItem name="0" to="Home">
                    <p style="color: #414770;font-size: 24px;font-weight:bold;font-family: Bahnschrift"> 中国裁判文书网</p>
                </MenuItem>
                <MenuItem name="02">
                    <Icon type="ios-navigate" ></Icon>
                    <span @click="toList('02')"> 刑事案件</span>

                </MenuItem>
                <MenuItem name="03">
                    <Icon type="ios-keypad"></Icon>
                    <span @click="toList('03')">民事案件</span>
                </MenuItem>
                <MenuItem name="04">
                    <Icon type="ios-analytics"></Icon>
                    <span @click="toList('04')">行政案件</span>
                </MenuItem>
                <MenuItem name="05">
                    <Icon type="ios-paper"></Icon>
                    <span @click="toList('05')">赔偿案件</span>
                </MenuItem>
                <MenuItem name="10">
                    <Icon type="ios-paper"></Icon>
                    <span @click="toList('10')">执行案件</span>

                </MenuItem>
                <Submenu name="0">
                    <template slot="title">
                        <Icon type="ios-stats" />
                        其他案件
                    </template>
                    <MenuGroup title="其他">
                        <MenuItem name="01">
                            <span @click="toList('01')">管辖案件</span>
                        </MenuItem>
                        <MenuItem name="06">
                            <span @click="toList('06')">区际司法协助</span>

                        </MenuItem>
                        <MenuItem name="07">
                            <span @click="toList('07')">国际司法协助</span>
                        </MenuItem>
                        <MenuItem name="09">
                            <span @click="toList('09')">非诉保全</span>
                        </MenuItem>
                        <MenuItem name="08">
                            <span @click="toList('08')">司法制裁</span>
                        </MenuItem>
                        <MenuItem name="11">
                            <span @click="toList('11')">强制清算与破产</span></MenuItem>
                        <MenuItem name="99">
                            <span @click="toList('99')">其他</span>
                        </MenuItem>
                    </MenuGroup>

                </Submenu>
                <MenuItem name="100" to="Control" style="float: right">

                    欢迎 {{username}}！

                </MenuItem>

                <MenuItem name="101" to="Control" style="float: right">
                    <Icon type="ios-construct" />
                    控制台

                </MenuItem>
            </Menu>
        </Header>

            <Content :style="{margin: '0 0 0', background: '#fff', minHeight: '500px',padding:'0 0 20px'}">
                <Row type="flex" justify="center" align="top" class="code-row-bg">
                    <Col span="5">

                        <el-card style="margin-top:90px;">
                            <el-select v-model="key" clearable placeholder="关键字"     @change="oksearch('s45:'+key)">
                                <el-option
                                        v-for="item in keys"
                                        :key="item.value"
                                        :label="item.count"
                                        :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                            <el-select v-model="wenshuType" clearable placeholder="文书类型"  @change="oksearch('s6:'+wenshuType)">
                                <el-option
                                        v-for="item in wenshuTypes"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                            <el-select v-model="city" clearable placeholder="审判省份"  @change="oksearch('s33:'+city)">
                                <el-option
                                        v-for="item in citys"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                >
                                </el-option>
                            </el-select>

                            <el-select v-model="year" clearable placeholder="裁判年份"  @change="oksearch('s42:'+year)">
                                <el-option
                                        v-for="item in years"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                            <el-select v-model="level" clearable placeholder="法律层级"  @change="oksearch('s4:'+level)">
                                <el-option
                                        v-for="item in levels"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>



                        </el-card>
                        <el-card style="margin-top: 20px">
                            <h2 style="text-align: left;margin-bottom: 5px">已选条件</h2>
                            <el-tag

                                    :key="tag"
                                    v-for="tag in dynamicTags"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(tag)"
                                    style="margin-left: 5px;margin-top: 5px">
                                {{tag}}
                            </el-tag>
                        </el-card>
                        <List>
                        </List>
                    </Col>
                    <Col span="17">
                        <Search ref="search" style="margin-left: 5%;margin-right: 5%"></Search>

                        <el-card style="margin-top:20px;margin-left: 5%;margin-right: 5%">
                            <List item-layout="vertical" style="text-align: left;">
                                <ListItem style="text-align: right">
                                    共{{total}}个
                                </ListItem>
                                <ListItem  v-for="item in data" :key="item.title">
                                    <ListItemMeta  :title="item.title" :description="item.court+' |'+item.num" />
                                    <div v-html="item.reason" style="  word-break: break-all;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 3;
                                    overflow: hidden; "></div>

                                    <template slot="action" style="float: right">
                                        <li >
                                            <a @click="modal11 = true">
                                                <img src="../assets/look.png" style="width: 18px;margin-bottom: 0">
                                                查看</a>
                                            <Modal v-model="modal11"  fullscreen title="文书预览">
                                                <div v-html="item.file"></div>
                                            </Modal>

                                        </li>

                                    </template>

                                </ListItem>
                                <ListItem>
                                    <div class="block">
                                        <!--                <span class="demonstration">页数较少时的效果</span>-->
                                        <el-pagination
                                                :current-page="curPage"
                                                :page-size ="pageSize"
                                                :total ="total"
                                                style="padding:30px 0; text-align:center;"
                                                layout="total,prev,pager,next,jumper"
                                                @current-change="getList">
                                        </el-pagination>
                                    </div>
                                </ListItem>

                            </List>
                        </el-card>




                    </Col>

                </Row>

            </Content>

    </Layout>
</template>

<script>
    import Search from "@/components/Search";
    import {getWenshu} from "@/api/api";
    export default {
        name: "list",
        components:{Search},
        data(){
            return{
                username:"",
                activeName:-1,
                curPage:1,
                pageSize:5,
                total:20,
                title:'',
                anjianName:'',
                courtName:'',
                anjianNum:'',
                anjianType:'',
                file:'',
                modal11: false,
                data: [
                    {
                        title: 'This is title 1',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 2',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 3',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    }
                ],
                keys: [ {value: "合同", count: "合同", childGroupFieldList: null},
                    {value: "利息", count: "利息", childGroupFieldList: null},
                    {value: "利率", count: "利率", childGroupFieldList: null},
                    {value: "合同约定", count:"合同约定", childGroupFieldList: null},
                    {value: "民间借贷", count: "民间借贷", childGroupFieldList: null},
                    {value: "驳回", count: "驳回", childGroupFieldList: null},
                    {value: "强制性规定", count: "强制性规定", childGroupFieldList: null},
                    {value: "违约金", count:"违约金", childGroupFieldList: null},
                    {value: "返还", count: "返还", childGroupFieldList: null},
                    {value: "交通事故", count: "交通事故", childGroupFieldList: null},
                    {value: "贷款", count: "贷款", childGroupFieldList: null},
                    {value: "债权", count: "债权", childGroupFieldList: null},
                    {value: "担保", count: "担保", childGroupFieldList: null},
                    {value: "鉴定", count: "鉴定", childGroupFieldList: null},
                    {value: "清偿", count: "清偿", childGroupFieldList: null},
                    {value: "借款合同", count: "借款合同", childGroupFieldList: null},
                    {value: "给付", count: "给付", childGroupFieldList: null},
                    {value: "处分", count:"处分", childGroupFieldList: null},
                    {value: "人身损害赔偿", count: "人身损害赔偿", childGroupFieldList: null},
                    {value: "误工费", count: "误工费", childGroupFieldList: null},
                    {value: "交付", count: "交付", childGroupFieldList: null},
                    {value: "合", count: "合", childGroupFieldList: null},
                    {value: "违约责任", count: "违约责任", childGroupFieldList: null},
                    {value: "保证", count: "保证", childGroupFieldList: null},
                    {value: "赔偿责任", count:"赔偿责任", childGroupFieldList: null},
                    {value: "买卖合同", count: "买卖合同", childGroupFieldList: null},
                    {value: "传票", count: "传票", childGroupFieldList: null},
                    {value: "减刑", count: "减刑", childGroupFieldList: null},
                    {value: "程序合法", count: "程序合法", childGroupFieldList: null},
                    {value: "传唤", count:"传唤", childGroupFieldList: null},
                    {value: "非法占有", count:"非法占有", childGroupFieldList: null},
                    {value: "第三人", count: "第三人", childGroupFieldList: null},
                    {value: "交通事故损害赔偿", count:"交通事故损害赔偿", childGroupFieldList: null},
                    {value: "缺席判决", count:  "缺席判决", childGroupFieldList: null},
                    {value: "债务人", count: "债务人", childGroupFieldList: null},
                ],
                key:'',
                wenshuTypes:[{
                    value:'裁判书',
                    label:'裁判书'
                },{
                    value:'调解书',
                    label:'调解书'
                },{
                    value:'决定书',
                    label:'决定书'
                },{
                    value:'通知书',
                    label:'通知书'
                },{
                    value:'令',
                    label:'令'
                },{
                    value:'其他',
                    label:'其他'
                }],
                wenshuType:'',
                citys: [ {
                   value : "北京市",
                   label : "北京市"
                }, {
                    value : "天津市",
                    label : "天津市"
                }, {
                    value: "河北省",
                    label: "河北省",
                }, {
                   value: "山西省",
                    label: "山西省",

                }, {
                    value : "内蒙古自治区",
                    label : "内蒙古自治区",
                    //fyCode : "500"
                }, {
                    value : "辽宁省",
                    label : "辽宁省",
                   // fyCode : "600"
                }, {
                    value : "吉林省",
                    label : "吉林省",
                    //fyCode : "700"
                }, {
                    value: "黑龙江省",
                    label: "黑龙江省",
                   // fyCode : "800"
                }, {
                   value : "上海市",
                    label : "上海市",
                   // fyCode : "900"
                }, {
                    value : "江苏省",
                   label : "江苏省",
                    //fyCode : "A00"
                }, {
                    value : "浙江省",
                    label : "浙江省",
                 //   fyCode : "B00"
                }, {
                    value : "安徽省",
                    label : "安徽省",
                    //fyCode : "C00"
                }, {
                    value : "福建省",
                    label : "福建省",
                    //fyCode : "D00"
                }, {
                    value : "江西省",
                    label : "江西省",
                    //fyCode : "E00"
                }, {
                    value : "山东省",
                    label : "山东省",
                  //  fyCode : "F00"
                }, {
                    value : "河南省",
                    label : "河南省",
                   // fyCode : "G00"
                }, {
                    value : "湖北省",
                   label : "湖北省",
                    //fyCode : "H00"
                }, {
                    value : "湖南省",
                    title : "湖南省",
                  //  fyCode : "I00"
                }, {
                    value : "广东省",
                    label : "广东省",
                   // fyCode : "J00"
                }, {
                    value : "广西壮族自治区",
                    label : "广西壮族自治区",
                  //  fyCode : "K00"
                }, {
                   value : "海南省",
                   label: "海南省",
                    //yCode : "L00"
                }, {
                    value : "重庆市",
                    label: "重庆市",
                   // fyCode : "M00"
                }, {
                    value : "四川省",
                    label : "四川省",
                    //fyCode : "N00"
                }, {
                    value : "贵州省",
                    label : "贵州省",
                  //  fyCode : "O00"
                }, {
                    value : "云南省",
                    label : "云南省",
                    //fyCode : "P00"
                }, {
                   value : "西藏自治区",
                    label : "西藏自治区",
                   // fyCode : "Q00"
                }, {
                    value : "陕西省",
                    label: "陕西省",
                   // fyCode : "R00"
                }, {
                    value : "甘肃省",
                    label: "甘肃省",
                    //fyCode : "S00"
                }, {
                    value : "青海省",
                    label : "青海省",
                   // fyCode : "T00"
                }, {
                    value : "宁夏回族自治区",
                    label : "宁夏回族自治区",
                    //fyCode : "U00"
                }, {
                    value : "新疆维吾尔自治区",
                    label: "新疆维吾尔自治区",
                   // fyCode : "V00"
                }, {
                    value : "新疆维吾尔自治区高级人民法院生产建设兵团分院",
                    label: "新疆维吾尔自治区高级人民法院生产建设兵团分院",
                } ],
                city:'',
                years:[],
                year:'',
                processs:[],
                process:'',
                levels:[{
                    value:'最高法院',
                    label:'最高法院'
                },{
                    value:'高级法院',
                    label:'高级法院'
                },{
                    value:'中级法院',
                    label:'中级法院'
                },{
                    value:'基层法院',
                    label:'基层法院'
                }

                ],
                level:'',
                dynamicTags: [],
                queryConditions:[{}]
            }
        },
        filters:{
            ellipsis(value){
                if (!value) return '';
                if (value.length > 200) {
                    return value.slice(0,200) + '...'
                }
                return value
            }
        },
        methods:{
            //查询
            async getList(val){
                if(val){
                    this.curPage = val;
                }
                //var data=(await getWenshuList(this.curPage,this.pageSize,this.title,this.anjianType,this.anjianNum,this.courtName,this.file)).data;
                var data = (await getWenshu(this.curPage,this.pageSize,this.dynamicTags.toString())).data;
              //  alert(data.status);
                if(data.status===400){
                    this.$Message.error(data.msg);

                }else{
                    this.data=data.data.wenshulist;
                    this.total=data.data.total;

                }
            },
            toList(s8){
             //   alert(s8);
                this.title= '';
                this.anjianType = s8;
                this.courtName = '';
                this.anjianNum = '';
                this.file = '';
                this.getList();
                //localStorage.clear();
                localStorage.setItem('s8',s8);

                location.reload();

            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                localStorage.removeItem(tag.split(':')[0]);
                location.reload();



            },
            oksearch(key){

                localStorage.setItem(key.split(':')[0],key.split(':')[1]);

                location.reload();
            },

            getTime(){
                var date = new Date();
                var curYear = date .getFullYear();

                for(var i=1999;i<=curYear;i++){

                    this.years.push({
                        value:i,
                        label:i
                    });
                }
            }



        },
        mounted(){
            this.username = localStorage.getItem("username");
            this.getTime();
            this.activeName = localStorage.getItem("s8");
            if(localStorage.getItem("s4")!=''&&localStorage.getItem("s4")!=null){
                this.dynamicTags.push("s4:"+localStorage.getItem("s4"));
                this.queryConditions.push({
                    "s4":localStorage.getItem("s4")
                })
            }
            if(localStorage.getItem("s6")!=''&&localStorage.getItem("s6")!=null){
                this.dynamicTags.push("s6:"+localStorage.getItem("s6"));
                this.queryConditions.push({
                    "s6":localStorage.getItem("s6")
                })
            }
            if(localStorage.getItem("s33")!=''&&localStorage.getItem("s33")!=null){
                this.dynamicTags.push("s33:"+localStorage.getItem("s33"));
                this.queryConditions.push({
                    "s33":localStorage.getItem("s33")
                })
            }
            if(localStorage.getItem("42")!=''&&localStorage.getItem("s42")!=null){
                this.dynamicTags.push("s42:"+localStorage.getItem("s42"));
                this.queryConditions.push({
                    "s42":localStorage.getItem("s42")
                })
            }
            if(localStorage.getItem("s8")!=''&&localStorage.getItem("s8")!=null){
                this.dynamicTags.push("s8:"+localStorage.getItem("s8"));
                this.queryConditions.push({
                    "s8":localStorage.getItem("s8")
                })
            }
            if(localStorage.getItem("s10")!=''&&localStorage.getItem("s10")!=null){
                this.dynamicTags.push("s10:"+localStorage.getItem("s10"));
                this.queryConditions.push({
                    "s10":localStorage.getItem("s10")
                })
            }
            if(localStorage.getItem("s45")!=''&&localStorage.getItem("s45")!=null){
                this.dynamicTags.push("s45:"+localStorage.getItem("s45"));
                this.queryConditions.push({
                    "s45":localStorage.getItem("s45")
                })
            }
            if(localStorage.getItem("s21")!=''&&localStorage.getItem("s21")!=null){
                this.dynamicTags.push("s21:"+localStorage.getItem("s21"));
                this.queryConditions.push({
                    "s21":localStorage.getItem("s21")
                })
            }
            if(localStorage.getItem("s2")!=''&&localStorage.getItem("s2")!=null){
                this.dynamicTags.push("s2:"+localStorage.getItem("s2"));
                this.queryConditions.push({
                    "s2":localStorage.getItem("s2")
                })
            }
            if(localStorage.getItem("s7")!=''&&localStorage.getItem("s7")!=null){
                this.dynamicTags.push("s7:"+localStorage.getItem("s7"));
                this.queryConditions.push({
                    "s7":localStorage.getItem("s7")
                })
            }
            if(localStorage.getItem("s1")!=''&&localStorage.getItem("s1")!=null){
                this.dynamicTags.push("s1:"+localStorage.getItem("s1"));
                this.queryConditions.push({
                    "s1":localStorage.getItem("s1")
                })
            }

            this.title= this.$route.params.title;
            this.anjianType = this.$route.params.anjianType;
            this.courtName = this.$route.params.courtName;
            this.anjianNum = this.$route.params.anjianNum;
            this.file = this.$route.params.file;
            console.log(this.dynamicTags);

            this.getList();

            var isSearch;
            this.$refs['search'].$on('title',(msg)=>{
                this.title=msg;

            });
            this.$refs['search'].$on('anjianType',(msg)=>{
                this.anjianType=msg;
            });
            this.$refs['search'].$on('anjianNum',(msg)=>{
                this.anjianNum=msg;

            });
            this.$refs['search'].$on('courtName',(msg)=>{
                this.courtName=msg;

            });
            this.$refs['search'].$on('file',(msg)=>{
                this.file=msg;
                location.reload();

            });
            this.$refs['search'].$on('search',(msg)=>{
                isSearch=msg;
                if(isSearch==='true'){


                    this.getList();

                }
            });
        }
    }
</script>

<style scoped>

</style>
