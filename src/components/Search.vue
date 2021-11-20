<template>
    <el-card style="margin-top:90px;margin-left:20%;margin-right: 20%">
        <Row style="margin-bottom: 20px">
            <span style="color: #414770;font-size: 26px;font-weight:bold;">开发 动态 透明 便民</span>
        </Row>
        <Row style="margin-bottom: 20px">
            <Col span="6" style="text-align: right">
                <el-tag type="info" >全文搜索</el-tag>
            </Col>
            <Col span="18" style="text-align: left;padding-left: 10px">
                <Input v-model="simplesearch" placeholder="Enter something..." clearable style="width:70%" />
                <Button style="background-color: #6482C3;color: white" @click="search1">搜 索</Button>
            </Col>



        </Row>
        <Row>
            <Col span="6" style="text-align: right">
                <el-tag type="info" >高级查询</el-tag>
            </Col>
            <Col span="7" style="text-align: left;padding-left: 10px">
                <el-form :label-position="labelPosition" size="small" label-width="80px" style="width:250px">
                    <el-form-item label="案件名称">
                        <el-input v-model="anjianName"></el-input>

                    </el-form-item>
                    <el-form-item label="法院名称">
                        <el-input v-model="courtName"></el-input>
                    </el-form-item>

                </el-form>
            </Col>
            <Col span="9" style="text-align: left;padding-left: 5px">
                <el-form :label-position="labelPosition" size="small" label-width="80px"  style="width:250px">
                    <el-form-item label="案号">
                        <el-input v-model="anjianNum"></el-input>
                    </el-form-item>
                </el-form>
            </Col>
        </Row>
        <Row>
            <Col span="12" offset="6">
                <Button style="background-color: #414770;color: white; width:80px;margin-right: 40px" @click="reset">重 置</Button>
                <Button style="background-color: #6482C3;color: white;width:80px;margin-left: 40px" @click="search2">搜 索</Button>
            </Col>

        </Row>

    </el-card >
</template>

<script>
    export default {
        name: "Search",
        data(){
            return{
                simplesearch:'',
                labelPosition: 'right',
                anjianName:'',
                courtName:'',
                anjianNum:'',
                anjianType:'',
                judge:'',
                person:'',
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

            search1(){
                this.$emit('title','');
                this.$emit('anjianType','');
                this.$emit('anjianNum','');
                this.$emit('courtName','');
                this.$emit('file',this.simplesearch);
                this.$emit('search','true');
                localStorage.setItem("s21",this.simplesearch);
            },

            search2(){
                this.$emit('title',this.anjianName);
                this.$emit('anjianType',this.anjianType);
                this.$emit('anjianNum',this.anjianNum);
                this.$emit('courtName',this.courtName);
                this.$emit('file',this.judge);
                this.$emit('search','true');
                localStorage.setItem("s7",this.anjianNum);
                localStorage.setItem("s2",this.courtName);
                localStorage.setItem("s1",this.anjianName);


            }


        }
    }
</script>

<style scoped>

</style>
