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
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu theme="dark" active-name="1-2" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-0" to="Home">
                        <Icon type="ios-backspace" />
                        <span>返回</span>
                    </MenuItem>

                    <MenuItem name="1-1" to="Control">
                        <Icon type="ios-navigate"></Icon>
                        <span>控制中心</span>
                    </MenuItem>
                    <MenuItem name="1-2">
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
                    <el-card style="width: 100%">
                        <el-table
                                :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
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
<!--                            <el-table-column-->
<!--                                    label="案件类型"-->
<!--                                    prop="anjianType">-->
<!--                            </el-table-column>-->
                            <el-table-column
                                    label="速度"
                                    prop="speed">
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
                                    width="100">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.status==4||scope.row.status==2">

                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">已完成</el-tag>
                                        </div>

                                    </div>
                                    <div v-else-if="scope.row.status==0">
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag type="warning" size="medium">已停止</el-tag>
                                        </div>

                                    </div>

                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-button @click="lookDetail(scope.row.spiderName)" type="text" size="small">查看详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="right">
                                <template slot="header">
                                    <el-input
                                            v-model="search"
                                            size="mini"
                                            placeholder="输入关键字搜索"/>
                                </template>
<!--                                <template slot-scope="scope">-->
<!--                                    <el-button-->
<!--                                            size="mini"-->
<!--                                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
<!--                                    <el-button-->
<!--                                            size="mini"-->
<!--                                            type="danger"-->
<!--                                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                                </template>-->
                            </el-table-column>
                        </el-table>

                        <div class="block">
                            <!--                <span class="demonstration">页数较少时的效果</span>-->

                            <el-pagination
                                    :current-page="curPage"
                                    :page-size ="pageSize"
                                    :total ="total"
                                    style="padding:30px 0; text-align:center;"
                                    layout="total,prev,pager,next,jumper"
                                    @current-change="getRecord"
                                   >
                            </el-pagination>
                        </div>
                    </el-card>
                    <el-card  style="margin-top: 10px;width: 100%">

                        <span style="font-size: 18px;font-weight: bold;float: left">详细信息</span>
                        <wenshuTable :detailSpider="detailSpider"/>

                    </el-card>
                    <el-card style="margin-top: 10px;width: 100%">
                        <div id="line" style="height:400px;width:90%"></div>
                    </el-card>




                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {getLine, getBar} from "@/api/api";
    import * as echarts from 'echarts';

    import {getFinishRecord} from "@/api/api";
    import wenshuTable from "@/components/wenshuTable";


   export default {
       components:{wenshuTable},
        data() {

            return {
                curPage:1,
                pageSize:5,
                total:0,
                search:'',
                detailSpider:'',
                tableData: [{
                    id:1,
                    startTime:'2021-9-14',
                    endTime:'2021-9-14',
                    wenshuNum:100,
                  //  published:'',
                }],


                isCollapsed: false,
                data:{
                    "dateList":['2021','2020'],
                    "numberList":[10,20]
                },


            }

        },
        computed: {
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
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

            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            async getRecord(val){

                if(val){
                    this.curPage = val;
                }
                var data = (await getFinishRecord(this.curPage,this.pageSize)).data;
                if(data.status===400){
                    this.$message({
                        message: data.msg,
                        type: 'error'
                    });
                }else{
                   this.tableData=data.data.recordlist;
                   this.total = data.data.total;
                }

            },
            async getLine(){
                var data = (await getLine()).data;
                console.log(data);

                this.InitLine(data.data);

            },
            InitLine(data){
                var myChart = echarts.init(document.getElementById('line'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '爬虫统计'
                    },
                    tooltip: {},
                    // legend: {
                    //     data:['销量','最低']
                    // },
                    legend: {},
                    xAxis: {
                        type: 'category',
                        // data: this.dataX,
                        data: data.datelist,
                        boundaryGap: false, //控制日期是否在中间显示
                        axisLabel: {
                            show: true, //是否显示日期
                            interval: 0, //强制显示全部 // rotate: 40,//倾斜的角度
                            textStyle: {
                                color: '#000', //日期的颜色
                                fontSize: 12 //字体的大小
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc' // x轴的颜色
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#000' //数字的颜色
                            },
                            inside: false //控制数据是否在内侧还是外侧显示
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ccc' // 折线的颜色
                            }
                        }
                    },
                    series: [
                        {
                            // data: this.dataY,
                            data: data.numlist,
                            type: 'line',
                            symbol: 'circle', //是否显示实心的折线圆点
                            smooth: true, //让折线有弧度
                            symbolSize: 7, //折线圆点的大小
                            itemStyle: {
                                normal: {
                                    color: '#efc883', //折线点的颜色
                                    lineStyle: {
                                        color: '#efc883' //折线的颜色
                                    },
                                    label: { show: true } //是否在折线点上显示数字
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option)

            },
            lookDetail(spiderName){
                console.log(spiderName)
                this.detailSpider = spiderName;

            },



       async getBar(){
           var data = (await getBar()).data;
         //  console.log(data.retList);
           //this.workSalary=data.reList;
           //this.workSalary=data.reList;
           this.InitBar(data.data);

       },
       InitBar(data) {
           var myChart = echarts.init(document.getElementById('bar'));
           // 指定图表的配置项和数据

           var option = {
               title: {
                   text: '法院层级'
               },
               xAxis: {
                   type: 'category',
                   data: data.levellist
               },
               yAxis: {
                   type: 'value'
               },
               series: [{
                   data: data.numlist,
                   type: 'bar',
                   showBackground: true,
                   backgroundStyle: {
                       color: 'rgba(180, 180, 180, 0.2)'
                   }
               }]

           };
           myChart.setOption(option)
       },

            // async getMap(){
            //     var data = (await getMap()).data;
            //     if(data.status===200){
            //         this.InitMap(data.data.retlist);
            //     }
            //
            //
            //
            // },
            // InitMap(data){
            //     var myChart = echarts.init(document.getElementById('pie'));
            //     // 指定图表的配置项和数据
            //     var option = {
            //         tooltip: {
            //             trigger: 'item'
            //         },
            //         title: {
            //             text: '地区分布',
            //
            //         },
            //
            //         series: [
            //             {
            //                 name: '地区分布',
            //                 type: 'pie',
            //                 radius: ['40%', '70%'],
            //                 avoidLabelOverlap: true,
            //                 itemStyle: {
            //                     borderRadius: 10,
            //                     borderColor: '#fff',
            //                     borderWidth: 2
            //                 },
            //                 label: {
            //                     show: false,
            //                     position: 'center'
            //                 },
            //                 emphasis: {
            //                     label: {
            //                         show: true,
            //                         fontSize: '40',
            //                         fontWeight: 'bold'
            //                     }
            //                 },
            //                 labelLine: {
            //                     show: true
            //                 },
            //                 data: data
            //             }]
            //     };
            //     myChart.setOption(option)
            //
            // }



       },

       mounted(){
          this.getRecord();
          this.getLine();

           //this.getMap();
       }
    }
</script>
