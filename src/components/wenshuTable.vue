<template>
    <div>

        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="title"
                    label="标题"
                    width="200"
                    show-overflow-tooltip='true'>
            </el-table-column>

            <el-table-column
                    prop="num"
                    width="200"
                    label="案号">
            </el-table-column>
            <el-table-column
                    prop="reason"
                    label="裁判理由"
                    width="500"
                    show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button @click="modal11 = true" type="text" size="small">查看</el-button>
                    <Modal v-model="modal11"  fullscreen title="文书预览">
                        <div v-html="scope.row.file"></div>
                    </Modal>

                </template>
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
                    @current-change="getWenshuBySpiderName"
                 >
            </el-pagination>
        </div>
    </div>


</template>

<script>
    import {getWenshuBySpiderName} from "@/api/api";

    export default {
        name:'wenshuTable',
        props: {
            detailSpider: {
                type: String
            }
        },
        watch:{
            detailSpider:{
                handler(){
                    this.getWenshuBySpiderName();
                    //根据父组件传来的值，刷新表格

                },
                deep:true// 深度监听父组件传过来对象变化
            }
        },
        data() {

            return {
                curPage:1,
                pageSize:10,
                total:0,

                modal11: false,
                tableData: []
            }
        },
        methods:{
            async getWenshuBySpiderName(val){
                if(val){
                    this.curPage = val;
                }
                var data = (await getWenshuBySpiderName(this.detailSpider,this.curPage,this.pageSize)).data;
                if(data.status===200){
                    this.tableData=data.data.wenshulist;

                    this.total=data.data.total;
                }
            }
        },
        mounted(){
            this.curPage=1;
            this.pageSize=10;
            
            this.getWenshuBySpiderName();
        }
    }
</script>
