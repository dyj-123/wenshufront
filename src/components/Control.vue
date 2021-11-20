<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        /*height: 100%;*/
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .demo-spin-container{
        display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu theme="dark" width="auto" active-name="1-1" :class="menuitemClasses">
                    <MenuItem name="1-0" to="Home">
                        <Icon type="ios-backspace" />
                        <span>返回</span>
                    </MenuItem>

                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>控制中心</span>
                    </MenuItem>
                    <MenuItem name="1-2" to="SpideInfo">
                        <Icon type="ios-search"></Icon>
                        <span>历史任务</span>
                    </MenuItem>

                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '700px'}">
                    <div style="margin-top: 20px;">
                        <Row style="text-align: left">
                            <Col span="6">
                                <el-card shadow="hover" style="background-color: #4395b9;margin-left: 30px;padding-bottom: 20px">
                                    <Col span="18">
                                        <i class="el-icon-cpu" style="color: white;font-size: 20px"></i>
                                        <span style="color:white;font-weight: bold;font-size: 14px;margin-left: 10px">当前爬虫数：{{spiderNum}}</span>
                                    </Col>
                                    <Col span="6">
                                        <el-button icon="el-icon-plus" style="margin-right: 0" size="small" round @click="dialogFormVisible = true"></el-button>
                                    </Col>

                                </el-card>
                            </Col>
                            <Col span="6">
                                <el-card shadow="hover" style="background-color: #42b983;margin-left: 30px;padding-bottom: 20px">
                                    <Col span="18">
                                        <i class="el-icon-cpu" style="color: white;font-size: 20px"></i>
                                        <span style="color:white;font-weight: bold;font-size: 14px;margin-left: 10px">今日爬虫数：{{todayspiderNum}}</span>
                                    </Col>
                                    <Col span="6">
                                        <el-button icon="el-icon-view" style="margin-right: 0" size="small" round @click="dialogFormVisible1 = true"></el-button>
                                    </Col>

                                </el-card>
                            </Col>


                        </Row>
                        <el-dialog title="今日爬虫" :visible.sync="dialogFormVisible1">
                            <el-table
                                    :data="tableData"
                                    style="width: 100%" :default-sort = "{prop: 'startTime', order: 'descending'}">
                                <el-table-column
                                        label="开始时间"
                                        sortable
                                        prop="startTime">
                                </el-table-column>
                                <el-table-column
                                        label="结束时间"
                                        prop="endTime">
                                </el-table-column>
                                <el-table-column
                                        label="有效文书数量"
                                        prop="wenshuNum">
                                </el-table-column>

                                <el-table-column
                                        prop="node"
                                        label="节点"
                                        width="100"
                                        :filters="[{ text: 'api1', value: 'api1' }, { text: 'api2', value: 'api2' }]"
                                        :filter-method="filterTag"
                                        filter-placement="bottom-end">
                                    <template slot-scope="scope">
                                        <el-tag
                                                :type="scope.row.node=== 'api1' ? 'primary' : 'success'"
                                                disable-transitions>{{scope.row.node}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="状态"
                                        width="180">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.status==4||scope.row.status==2||scope.row.status==5">

                                            <div slot="reference" class="name-wrapper">
                                                <el-tag size="medium">已完成</el-tag>
                                            </div>

                                        </div>
                                        <div v-else-if="scope.row.status==0">
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag type="warning" size="medium">已停止</el-tag>
                                            </div>

                                        </div>
                                        <div v-else-if="scope.row.status==1">
                                            <div slot="reference" class="name-wrapper">
                                                <el-tag type="success" size="medium">运行中</el-tag>
                                            </div>

                                        </div>

                                    </template>
                                </el-table-column>

                            </el-table>
                        </el-dialog>

                        <el-dialog title="添加爬虫" :visible.sync="dialogFormVisible">
<!--                            <h3 style="text-align: left;margin-left:50px">条件选择</h3>-->
<!--                            <el-select v-model="checkboxGroup1" multiple placeholder="请选择" size="small">-->
<!--                                <el-option-->
<!--                                        v-for="item in conditions"-->
<!--                                        :key="item.value"-->
<!--                                        :label="item.label"-->
<!--                                        :value="item.value">-->
<!--                                </el-option>-->
<!--                            </el-select>-->

<!--                            <div style="margin-top: 20px">-->
<!--                                <h3 style="text-align: left;margin-left: 50px" >-->
<!--                                    案件类型-->
<!--                                </h3>-->
<!--                                <el-select v-model="anjianType" placeholder="请选择" clearable size="small">-->
<!--                                    <el-option-->
<!--                                            v-for="item in options1"-->
<!--                                            :key="item.code"-->
<!--                                            :label="item.name"-->
<!--                                            :value="item.code">-->
<!--                                    </el-option>-->
<!--                                </el-select>-->
<!--                            </div>-->
<!--                            <div style="margin-top: 20px">-->
<!--                                <h3 style="text-align: left;margin-left:50px">日期限定</h3>-->
<!--                                <Row>-->
<!--                                    <span style="font-size:12px;margin-right:10px;font-weight: bold">开始</span>-->
<!--                                    <el-date-picker-->
<!--                                            v-model="start"-->
<!--                                            type="date"-->
<!--                                            size="small"-->
<!--                                            placeholder="选择日期">-->
<!--                                    </el-date-picker>-->
<!--                                    <span style="font-size:12px;margin-left: 20px;margin-right:10px;font-weight: bold">结束</span>-->
<!--                                    <el-date-picker-->
<!--                                            v-model="end"-->
<!--                                            type="date"-->
<!--                                            size="small"-->
<!--                                            placeholder="选择日期">-->
<!--                                    </el-date-picker>-->
<!--                                </Row>-->

<!--                            </div>-->
                            <div style="margin-top: 20px">
                                <h3 style="text-align: left;margin-left:50px">节点</h3>
                                <Row>
                                    <el-select v-model="node" placeholder="请选择" clearable size="small" @change="getRecordByNode(node)">
                                        <el-option
                                                v-for="item in nodes"
                                                :key="item.label"
                                                :label="item.name"
                                                :value="item.label">
                                        </el-option>
                                    </el-select>
                                </Row>

                            </div>
                            <div style="margin-top: 20px">
                                <h3 style="text-align: left;margin-left:50px">登录</h3>
                                <el-tag type="warning" style="width: 10%">UserAgent</el-tag>
                                <el-input
                                        placeholder="请输入内容"
                                        v-model="userAgent"
                                        style="width:50%;margin-left: 20px"
                                        size="small"
                                        clearable>
                                </el-input>
                            </div>
                            <div style="margin-top: 20px">
                                <el-tag type="warning" style="width: 10%">Cookie</el-tag>
                                <el-input
                                        placeholder="请输入内容"
                                        v-model="Cookie"
                                        size="small"
                                        style="width:50%;margin-left: 20px"
                                        clearable>
                                </el-input>
                                <br/>

                                <el-button type="primary" style="margin-top: 20px;" @click="submit">提交</el-button>
                            </div>

                        </el-dialog>

                    </div>
                    <el-divider></el-divider>
                    <div style="text-align: left;margin-left: 30px;margin-top: 20px"><el-tag type="info" size="medium">筛选</el-tag>
                        <el-select v-model="value" placeholder="请选择节点" size="medium" style="margin-left: 10px">
                            <el-option
                                    v-for="item in nodes"
                                    :key="item.name"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </div>


                    <div>
                        <!--                <span class="demonstration">页数较少时的效果</span>-->
                        <el-pagination
                                :current-page="curPage"
                                :page-size ="pageSize"
                                :total ="total"
                                style="padding:30px 0; text-align:center;"
                                layout="total,prev,pager,next"
                                @current-change="getRecord"
                        >
                        </el-pagination>
                    </div>
                    <div style="margin-left: 6%;margin-right: 6%;">
                        <Col span="6" v-for="item in spiderdata" :key="item.id">

                            <div v-if="item.status!=4">
                                <el-card  style="height:380px;margin-bottom: 20px;margin-left: 10px" >
                                    <h3>{{item.spiderName}}</h3>
                                    <div v-if="item.status==1">
                                        <div class="demo-spin-container">
                                            <Spin fix size="large">
                                                <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
                                                <div>Spiding</div>
                                            </Spin>
                                        </div>
                                    </div>
                                    <div v-else-if="item.status==0">
                                        <div class="demo-spin-container">
                                            <el-progress size="small" type="circle" :percentage="50" status="warning"></el-progress>
                                        </div>
                                    </div>
                                    <div v-else-if="item.status==2||item.status==5">
                                        <div class="demo-spin-container">
                                            <el-progress type="circle" :percentage="100" status="success"></el-progress>
                                        </div>
                                    </div>
                                    <div v-else-if="item.status==3">
                                        <div class="demo-spin-container">
                                            <el-progress type="circle" :percentage="100" status="exception"></el-progress>
                                        </div>
                                    </div>
                                    <div  style="text-align: left;margin-left:20%;margin-right: 20%;margin-top: 15px">
                                        <span style="font-size:14px;font-weight: bold">节点</span>
                                        <span style="margin-left: 10px">{{item.node}}</span>

                                    </div>



                                    <div  style="text-align: left;margin-left:20%;margin-right: 20%">

                                        <span style="font-size:14px;font-weight: bold">有效</span>
                                        <span style="font-size: 14px;margin-left: 10px;margin-right:10px;color: dodgerblue">{{item.wenshuNum}}</span>
                                        <span style="font-size:14px;font-weight: bold">文书</span>

                                    </div>
                                    <div  style="text-align: left;margin-left:20%;margin-right: 20%">

                                        <span style="font-size:14px;font-weight: bold">skip</span>
                                        <span style="font-size: 14px;margin-left: 10px;margin-right:10px;color: dodgerblue">{{item.skip}}</span>
                                        <span style="font-size:14px;font-weight: bold">文书</span>

                                    </div>
                                    <div v-if="item.status==1">
                                        <div  style="text-align: left;margin-left:20%;margin-right: 20%">
                                            <span style="font-size:14px;font-weight: bold">进度</span>
                                            <el-popover
                                                    placement="top-start"
                                                    title="进度"
                                                    width="200"
                                                    trigger="hover"
                                                    :content="item.progress">
                                                 <span slot="reference" style="font-size: 14px;margin-left: 10px;margin-right:10px;color:dodgerblue;
                                                word-break: break-all;
                                                text-overflow: ellipsis;
                                                display: -webkit-box;
                                                -webkit-box-orient: vertical;
                                                -webkit-line-clamp: 1;
                                                overflow: hidden; ">{{item.progress}}</span>
                                            </el-popover>

                                        </div>
                                        <div  style="text-align: left;margin-left:20%;margin-right: 20%">
                                            <span style="font-size: 14px;font-weight: bold">状态</span>
                                            <el-tag size="small" type="" style="margin-left: 10px">正在爬取</el-tag>
                                        </div>
                                        <el-button size="small" type="danger" style="margin-top: 10px;" @click="stop(item.spiderName,item.node)">强行结束</el-button>
                                    </div>
                                    <div v-else-if="item.status==0"  >
                                        <div style="text-align: left;margin-left:20%;margin-right:20%;">
                                            <span style="font-size: 14px;font-weight: bold">状态</span>
                                            <el-tag size="small" type="warning" style="margin-left: 10px">停止爬取</el-tag>
                                        </div>

                                        <el-button size="small" type="info" style="margin-top: 10px;" @click="remove(item.spiderName)">移除</el-button>
                                    </div>
                                    <div v-else-if="item.status==2"  >
                                        <div style="text-align: left;margin-left:20%;margin-right:10%">
                                            <span style="font-size: 14px;font-weight: bold">状态</span>
                                            <el-tag size="small" type="success" style="margin-left: 10px">权限过期,爬虫结束</el-tag>
                                        </div>
                                        <el-button size="small" type="info" style="margin-top: 10px;" @click="remove(item.spiderName)">移除</el-button>
                                    </div>
                                    <div v-else-if="item.status==5"  >
                                        <div style="text-align: left;margin-left:20%;margin-right:10%">
                                            <span style="font-size: 14px;font-weight: bold">状态</span>
                                            <el-tag size="small" type="success" style="margin-left: 10px">爬虫频繁,爬虫结束</el-tag>
                                        </div>
                                        <el-button size="small" type="info" style="margin-top: 10px;" @click="remove(item.spiderName)">移除</el-button>
                                    </div>
                                    <div v-else-if="item.status==3" >
                                        <div  style="text-align: left;margin-left:20%;margin-right:20%">
                                            <span style="font-size: 14px;font-weight: bold">状态</span>
                                            <el-tag size="small" type="danger" style="margin-left: 10px">爬取失败,无权限</el-tag>
                                        </div>
                                        <el-button size="small" type="info" style="margin-top: 10px;" @click="remove(item.spiderName)">移除</el-button>
                                    </div>

                                </el-card>


                            </div>


                        </Col>

                    </div>

                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {getRecords, getSpdingNum, getSpiderByDate, removeSpider, spiderWensnhu, stopSpide} from "@/api/api";


    export default {
        data () {
            return {
                curPage:0,
                pageSize:8,
                total:0,
                value:'',
                anjianType:'',
                current:-1,
                checkboxGroup1: [],
                userAgent:'',

                Cookie:'',
                submitInfo:'',
                spiderInfo:'',
                spiderNum:2,
                todayspiderNum:4,
                start:'',
                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible1: false,
                dialogTableVisible1: false,
                end:'',
                tableData:[],
                timer:'',
                spiderName:"爬虫1",
                conditions:[{
                    label:'法律层级',
                    value:'法律层级'
                },{
                    label:'文书类型',
                    value:'文书类型'
                },{
                    label:'审判程序',
                    value:'审判程序'
                },{
                    label:'审判省份',
                    value:'审判省份'
                },{
                    label:'裁判年份',
                    value:'裁判年份'
                },{
                    label:'关键字',
                    value:'关键字'
                }],
                spiderdata:[{
                    name:"爬虫1",
                    num:10000,
                    conditions:"法律层级、年份、宋帝即位、上的回事哦分的、大师说的、杰佛i海外分行",
                    status:1,
                },
                    {
                        name:"爬虫1",
                        num:10000,
                        conditions:"法律层级、年份",
                        status:0,
                    },
                    {
                        name:"爬虫1",
                        num:10000,
                        conditions:"法律层级、年份",
                        status:2,
                    },  {
                        name:"爬虫1",
                        num:10000,
                        conditions:"法律层级、年份",
                        status:3,
                    },  {
                        name:"爬虫1",
                        num:10000,
                        conditions:"法律层级、年份",
                        status:3,
                    }],
                options1: [ {
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
                } ],

                isCollapsed: false,
                node:'',
                nodes:[{
                    label:'api1',
                    name:'节点1'
                },{
                    label:'api2',
                    name:'节点2'
                },{
                    label:'api',
                    name:'节点0'
                }

                ]

            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },

        },
        methods: {
            filterTag(value, row) {
                return row.node === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            dateFormat(time) {
                var date=new Date(time);
                var year=date.getFullYear();
                /* 在日期格式中，月份是从0开始的，因此要加0
                 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
                 * */
                var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
                var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();

                // 拼接
                return year+"-"+month+"-"+day;
            },
            async stopSpide(spiderName,node){
                (await stopSpide(spiderName,node)).data;
                this.getSpidingNum();

            },
            async getRecord(val){
                console.log(this.value)
                if(val){
                    this.curPage = val;
                }
                var data = (await getRecords(this.curPage,this.pageSize,this.value)).data;
                if(data.status===400){
                    this.$message({
                        message: data.msg,
                        type: 'error'
                    });
                }else{
                    this.spiderdata=data.data.recordlist;
                    this.total = data.data.total;
                }

            },

            async getSpiderByDate(){
                var data = (await getSpiderByDate()).data;
                this.todayspiderNum=data.data.num;
                this.tableData=data.data.recordlist;

            },
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            async submit (){
                if(this.userAgent===''||this.Cookie===''||this.node===''){
                    this.$message({
                        message: '请填写完整再提交',
                        type: 'warning'
                    });
                }else{

                    var date ="";
                    this.current=1;
                    if(this.start!=""&&this.end!=""){
                        date = this.dateFormat(this.start)+" TO "+this.dateFormat(this.end);
                        console.log(this.start);
                        this.start="";
                        this.end="";
                    }
                    this.dialogFormVisible=false;

                    this.getSpidingNum();
                    this.getSpiderByDate();
                    var data = (await spiderWensnhu(this.Cookie, this.userAgent, this.checkboxGroup1.toString(),date,this.anjianType,this.node)).data;

                    if(data.status===200){
                        localStorage.setItem("Wemshucookie",this.Cookie);
                        localStorage.setItem("WenshuAgent",this.userAgent);
                        localStorage.setItem("status",this.current);
                        localStorage.setItem("conditions",this.checkboxGroup1);


                        this.$message({
                            message: data.msg,
                            type: 'success'
                        });


                    }else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                        });

                    }
                }

            },
            async stop(spiderName,node){

                this.$confirm('将停止爬取, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.stopSpide(spiderName,node);
                    this.$message({
                        type: 'info',
                        message: "请稍等",
                        showClose: true,
                    });
                    this.current=-1;

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async remove(spiderName){
                var data = (await removeSpider(spiderName)).data;
                if(data.status==200){
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                }
            },
            async getSpidingNum(){
                var data = (await getSpdingNum()).data;
                this.spiderNum=data.data;
            },
            getRecordByNode(node){
                localStorage.setItem("node",node);
            }


        },
        mounted(){
            const timer = setInterval(() => {
                this.getRecord();//你所加载数据的方法

            }, 1000);
            //销毁定时器
            this.$once('hook:beforeDestroy', () => {
                clearInterval(timer)
            });
            this.getSpidingNum();
            this.getSpiderByDate();

            this.Cookie = localStorage.getItem("Wemshucookie",this.Cookie);
            this.userAgent = localStorage.getItem("WenshuAgent",this.userAgent);
            // this.current=localStorage.setItem("status",this.current);
            // this.checkboxGroup1=localStorage.setItem("conditions",this.checkboxGroup1);

        }
    }
</script>
