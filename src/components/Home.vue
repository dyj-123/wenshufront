<style scoped>

</style>
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
                    <Submenu name="18">
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
            <Content :style="{margin: '0 0 0', padding:'0 0 20px',background: '#fff', minHeight: '500px'}">

                <Search ref="search"></Search>
                <el-card style="margin-top:20px;margin-left:20%;margin-right: 20%">
                    <span>今日新增</span>
                    <el-tag effect="dark" type="info" style="margin-left: 10px">
                        民事文书 | {{ms}}
                    </el-tag>
                    <el-tag effect="dark" type="info" style="margin-left: 10px">
                        刑事文书 | {{xs}}
                    </el-tag>
                    <el-tag effect="dark" type="info" style="margin-left: 10px">
                        行政文书 | {{xz}}
                    </el-tag>
                    <el-tag effect="dark" type="info" style="margin-left: 10px">
                        赔偿文书 | {{pc}}
                    </el-tag>
                    <el-tag effect="dark" type="info" style="margin-left: 10px">
                        执行文书 | {{zx}}
                    </el-tag>
                    <el-tag effect="dark" type="info" style="margin-left: 10px">
                        其他文书 | {{qt}}
                    </el-tag>

                </el-card>



                <el-card style="margin-top:20px;margin-left:20%;margin-right: 20%">
                    <Bar/>
                </el-card>



            </Content>


        </Layout>

</template>
<script>
    import Bar from "@/components/Bar";
    import Search from '@/components/Search'
    import {getCurDate, spiderWensnhu} from "@/api/api";
  //  import {getWenshuList} from "@/api/api";
    export default {
        name:"Home",
        components: {Bar,Search},
        data(){
            return{
                username:"",
                simplesearch:'',
                labelPosition: 'right',
                anjianName:'',
                courtName:'',
                anjianNum:'',
                anjianType:'',
                judge:'',
                file:'',
                person:'',
                cookie:'',
                type:'',
                userAgent:'',
                ms:'',
                xs:'',
                xz:'',
                pc:'',
                zx:'',
                qt:'',
                options: [ {
                    "code" : "01",
                    "name" : "管辖案件"
                }, {
                    "code" : "02",
                    "name" : "刑事案件"
                }, {
                    "code" : "03",
                    "name" : "民事案件"
                }, {
                    "code" : "04",
                    "name" : "行政案件"
                }, {
                    "code" : "05",
                    "name" : "国家赔偿与司法救助案件"
                }, {
                    "code" : "06",
                    "name" : "区际司法协助案件"
                }, {
                    "code" : "07",
                    "name" : "国际司法协助案件"
                }, {
                    "code" : "08",
                    "name" : "司法制裁案件"
                }, {
                    "code" : "09",
                    "name" : "非诉保全审查案件"
                }, {
                    "code" : "10",
                    "name" : "执行案件"
                }, {
                    "code" : "11",
                    "name" : "强制清算与破产案件"
                }, {
                    "code" : "99",
                    "name" : "其他案件"
                } ]
            }
        },
        methods:{
            reset(){
                this.anjianName='';
                this.courtName="";
                this.anjianNum='';
                this.anjianType='';
                this.judge='';
                this.person='';
            },

           toList(s8){
                this.$router.push({name:'List',params:{
                        'title':'',
                        'anjianType':s8,
                        'anjianNum':'',
                        'courtName':'',
                        'file':''
                    }});
              // localStorage.clear();

                localStorage.setItem("s8",s8);
            },

            async getCurDateWenshu(){
                var data = (await getCurDate()).data;
                if(data.status===200){
                    this.ms = data.data.WS_T_tmsaj;
                    this.xs = data.data.WS_T_txsaj;
                    this.xz = data.data.WS_T_txzaj;
                    this.pc = data.data.WS_T_tpcaj;
                    this.zx = data.data.WS_T_tzxaj;
                    this.qt = data.data.WS_T_tqtaj;

                }
            },

            async insert(){
                await spiderWensnhu(this.cookie,this.userAgent,this.type);
            }



        },
        mounted(){
            this.username = localStorage.getItem("username");

            var isSearch;
            this.$refs['search'].$on('title',(msg)=>{
                this.anjianName=msg;

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
                console.log(msg);
            });
            this.$refs['search'].$on('search',(msg)=>{
                isSearch=msg;
                if(isSearch==='true'){
                    this.$router.push({name:'List',params:{
                            'title':this.anjianName,
                            'anjianType':this.anjianType,
                            'anjianNum':this.anjianNum,
                            'courtName':this.courtName,
                            'file':this.file
                        }});
                }
            });
            this.getCurDateWenshu();


        },


    }
</script>
