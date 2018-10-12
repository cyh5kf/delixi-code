<template>
<div class="wrapBox">
    <div class="stepBox">
        <Steps :current="1">
            <Step title="已完成"></Step>
            <Step title="进行中"></Step>
            <Step title="待进行"></Step>
        </Steps>
    </div>
    <div class="clear10"></div>
    <Row type="flex" justify="start" class="lineHeight">
        <Col class="textRight">手机号码：</Col>
        <Col><Input placeholder="请输入手机号码" style="width:238px;margin-right: 20px;" v-model="inputPhone"></Input></Col>
        <Col class="textRight"> uid：</Col>
        <Col>
            <Input placeholder="请输入UID" style="width:238px;margin-right: 20px;" v-model="inputUid"></Input>
        </Col>
        <Col><Button type="primary" size="large" @click="search">搜索</Button></Col>
    </Row>
    <div class="clear10"></div>
    <div class="lineHeight">
        <Button @click="handleSelectAll(true)" type="primary" size="small">全选</Button>
        <Button @click="removeAll" type="primary" size="small">删除</Button>
    </div>
    <div class="clear10"></div>
    <div>
        <Table :loading="loading" border ref="selection" @on-selection-change="onChangeSelect" :columns="columns15" :data="dataList"></Table>
    </div>
    <div class="clear10"></div>
    <div class="pageText">
        <Page :total="total" size="small" show-total show-elevator show-sizer  @on-change="changePage" @on-page-size-change="changPageSize"></Page>
    </div>
    <div class="clear40"></div>
    <div class="pageText">
        <Button type="primary" @click="backStep" >上一步</Button>
        <Button type="primary" @click="checkedPush" >选中推送</Button>
        <Tooltip content="全部推送针对所有数据，非当前页数据" placement="top">
            <Button type="primary" @click="allPush" >全部推送</Button>
        </Tooltip>
        
    </div>
    <div class="clear50"></div>
</div>
    
</template>
<script>
import {stepOne,stepTwo,stepThree,stepFour,stepSix} from '../../api/step-one';
import localStorage from '../../store/localstorage';
export default {
    data () {
        return {
            loading: false,
            page:1,
            pageSize:10,
            cityList: [
                {
                    value: '338565',
                    label: '338565'
                }
            ],
            columns15: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'UID',
                    key: 'uid',
                    align: 'center'
                },
                {
                    title: '手机号码',
                    key: 'mobile',
                    align: 'center'
                },
                {
                    title: '注册日期',
                    key: 'reg_time',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'operate',
                    align: 'center',
                    render: (h,params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text'
                                },
                                style: {
                                    color:'#169bd5'
                                },
                                on: {
                                    click:() =>{
                                        this.remove(params.index);
                                    }
                                }
                            }, '移除')
                        ]);
                    }
                }
            ],
            total:0,
            dataList: [],
            queryDate:null,
            inputPhone:'',
            inputUid:'',
            biaosi:'',
            seletedArr: []
        };
    },
    methods: {
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        backStep () {
            this.$router.push('/home/part1');
        },
        // 选中推送
        checkedPush () {
            this.$Modal.confirm({
                title: '确认提示',
                content: '是否确认选中推送？',
                onOk: () => {
                    const seletedArr = this.seletedArr;
                    const uidArr = [];
                    if(seletedArr.length !== 0) {
                        for (let i of seletedArr){
                            uidArr.push(i.uid);
                        }
                        const uidStr = uidArr.join(",");
                        localStorage.setUserId(JSON.stringify(uidStr));
                        this.$router.push({path: '/home/part3', query: { pushType: 'checkedPush' }});
                    } else {
                        this.$Message.error("没有选择推送用户，请选择推送用户");
                        return;
                    }
                }
            });
        },
        // 全部推送
        allPush () {
            this.$Modal.confirm({
                title: '确认提示',
                content: '是否确认全部推送？',
                onOk: () => {
                    const queue = JSON.parse(localStorage.getQueue());
                    const queue_length = Object.keys(queue);
                    if(queue_length === 0) {
                        this.$Message.error('没有用户信息！');
                        return;
                    }
                    this.$router.push({path: '/home/part3', query: { pushType: 'allPush' }});
                }
            });
        },
        search: function(){
            if(this.inputPhone.length <= 0 && this.inputUid.length <= 0){
                this.$Message.error("两者不能为空，请重新输入！");
                return
            }
            if(this.biaosi === 1){
                this.search1()
            }else if(this.biaosi === 2){
                this.search2()
            }else if(this.biaosi === 3){
                this.search3()
            }else if(this.biaosi === 4){
                this.search4()
            }else if(this.biaosi === 5){
                
            }else{
                this.search6()
            }

        },
        search1(){
            var date = Object.assign(this.queryDate,{mobile:this.inputPhone,user_id:this.inputUid});
            this.loading = true;
            stepOne(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        search2(){
            var date = Object.assign(this.queryDate,{mobile:this.inputPhone,user_id:this.inputUid});
            this.loading = true;
            stepTwo(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        search3(){
            var date = Object.assign(this.queryDate,{mobile:this.inputPhone,user_id:this.inputUid});
            this.loading = true;
            stepThree(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        search4(){
            var date = Object.assign(this.queryDate,{mobile:this.inputPhone,user_id:this.inputUid});
            this.loading = true;
            stepFour(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        search6(){
            var date = Object.assign(this.queryDate,{mobile:this.inputPhone,user_id:this.inputUid});
            this.loading = true;
            stepSix(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        changePage(page){
            this.page = page;
            if(this.biaosi === 1){
                this.getFirstResult1(page,this.pageSize);
            }else if(this.biaosi === 2){
                this.getFirstResult2(page,this.pageSize);
            }else if(this.biaosi === 3){
                this.getFirstResult3(page,this.pageSize);
            }else if(this.biaosi === 4){
                this.getFirstResult4(page,this.pageSize);
            }else if(this.biaosi === 5){
                
            }else{
                this.getFirstResult6(page,this.pageSize);
            }
        },
        changPageSize(pageSize){
            this.pageSize = pageSize;
            if(this.biaosi === 1){
                this.getFirstResult1(this.page,pageSize);
            }else if(this.biaosi === 2){
                this.getFirstResult2(this.page,pageSize);
            }else if(this.biaosi === 3){
                this.getFirstResult3(this.page,pageSize);
            }else if(this.biaosi === 4){
                this.getFirstResult4(this.page,pageSize);
            }else if(this.biaosi === 5){
                
            }else{
                this.getFirstResult6(this.page,pageSize);
            }
        },
        getFirstResult1(page,pageSize){
            var date = Object.assign(this.queryDate,{page:page,page_size:pageSize});
            this.loading = true;
            stepOne(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        getFirstResult2(page,pageSize){
            var date = Object.assign(this.queryDate,{page:page,page_size:pageSize});
            this.loading = true;
            stepTwo(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        getFirstResult3(page,pageSize){
            var date = Object.assign(this.queryDate,{page:page,page_size:pageSize});
            this.loading = true;
            stepThree(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        getFirstResult4(page,pageSize){
            var date = Object.assign(this.queryDate,{page:page,page_size:pageSize});
            this.loading = true;
            stepFour(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },
        getFirstResult6(page,pageSize){
            var date = Object.assign(this.queryDate,{page:page,page_size:pageSize});
            this.loading = true;
            stepSix(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                }
            }).catch((err) =>{
                console.log(err)
            })
        },

        remove (index) {
            this.dataList.splice(index, 1);
        },

        removeAll(index){
             this.dataList.splice(index);
        },

        onChangeSelect(selection) {
            this.seletedArr = selection;
        },

        saveQueryParamPart3(queryDate, url) {
            const queue = Object.assign(queryDate, {url: url});
            localStorage.setQueue(JSON.stringify(queue));
        }

        
    },
    created(){
        let localData = JSON.parse(window.localStorage.getItem('queryData'));
        if(!!localData.type) {
            localData.type = localData.type.trim();
            if (localData.type === "tender_time_count") {
                localData.type = "tender_time";
            } else if(localData.type === "tender_money_count") {
                localData.type = "tender_money";
            } else if(localData.type === "recharge_time_count") {
                localData.type = "recharge_time";
            } else if(localData.type === "recharge_money_count") {
                localData.type = "recharge_money";
            } else if(localData.type === "cash_time_count") {
                localData.type = "cash_time";
            } else if(localData.type === "cash_money_count") {
                localData.type = "cash_money";
            } else if(localData.type === "repayment_money_count") {
                localData.type = "repayment_money";
            } else if(localData.type === "collection_money_count") {
                localData.type = "collection_money";
            } else if(localData.type === "account_money_count") {
                localData.type = "account_money";
            } else if(localData.type === "activity_red_count") {
                localData.type = "activity_red";
            } else if(localData.type === "activity_rate_count") {
                localData.type = "activity_rate";
            } else if(localData.type === "time_count") {
                localData.type = "time_page";
            } else if(localData.type === "import_user_count") {
                localData.type = "import_user";
            }
        }
        this.queryDate = localData;

        if(this.queryDate.condition === '条件一'){
            delete this.queryDate.condition;
            this.saveQueryParamPart3(this.queryDate, '/admin/user/point');
            var date = Object.assign(this.queryDate,{page:this.page,page_size:this.pageSize});
            this.loading = true;
            stepOne(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                    this.biaosi = res.data.indent;
                }
            }).catch((err) =>{

            })
        };
        if(this.queryDate.condition === '条件二'){
            delete this.queryDate.condition;
            this.saveQueryParamPart3(this.queryDate, '/admin/user/section');
            var date = Object.assign(this.queryDate,{page:this.page,page_size:this.pageSize});
            this.loading = true;
            stepTwo(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                    this.biaosi = res.data.indent;
                }
            }).catch((err) =>{

            })
        };
        if(this.queryDate.condition === '条件三'){
            delete this.queryDate.condition;
            this.saveQueryParamPart3(this.queryDate, '/admin/many/select');
            var date = Object.assign(this.queryDate,{page:this.page,page_size:this.pageSize});
            this.loading = true;
            stepThree(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                    this.biaosi = res.data.indent;
                    console.log(res)
                }
            }).catch((err) =>{

            })
        };
        if(this.queryDate.condition === '条件四'){
            delete this.queryDate.condition;
            this.saveQueryParamPart3(this.queryDate, '/admin/activity');
            var date = Object.assign(this.queryDate,{page:this.page,page_size:this.pageSize});
            this.loading = true;
            stepFour(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                    this.biaosi = res.data.indent;
                }
            }).catch((err) =>{

            })
        };
        if(this.queryDate.condition === '条件六'){
            delete this.queryDate.condition;
            this.saveQueryParamPart3(this.queryDate, '/admin/import');
            var date = Object.assign(this.queryDate,{page:this.page,page_size:this.pageSize});
            this.loading = true;
            stepSix(date).then((res) =>{
                this.loading = false;
                if(res.data.code === 1){
                    let data = res.data.data;
                    this.dataList = data;
                    this.total = res.data.total *1;
                    this.biaosi = res.data.indent;
                }
            }).catch((err) =>{

            })
        }
    }
};
</script>
<style lang="less" scoped>
    .wrapBox{
        width:100%;
    }
    .stepBox{
        width:100%;
        padding:10px 20px;
    }
    .textRight{
        text-align:right;
        font-size:14px;
    }
    .lineHeight{
        line-height:32px;
        height:32px;
        margin-top: 20px;
    }
    .lineHeight button{
        margin-right:10px;
        padding:4px 20px;
    }
    .pageText{
        text-align:center;
    }
    .pageText button{
        margin:0 20px;
    }
</style>