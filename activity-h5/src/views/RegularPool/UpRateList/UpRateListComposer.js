import React from 'react';
import {message} from 'antd';
import UpRateListView from './UpRateListView';
import { taskList,add,editTask,infoTask } from 'api/RegularPool';

export default class UpRateListComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryPage:{
                page:1,
                pageSize:10,
                total:0,
            },
            isOpen:false,
            taskList:null,
            queryData:{}
        }
    }
    //初始化加载
    componentDidMount = async() => {
        let response = await taskList(this.state.queryPage);
        let data = response.data;
        if(response.status === 200&&data.error_code == 0) {
            this.setState({
                taskList:data.data.data,
                queryPage:Object.assign(this.state.queryPage,{
                    page:data.data.pageInfo.page,
                    pageSize:data.data.pageInfo.size,
                    total:data.data.pageInfo.total
                })
            })
        }
    }
    //改变分页
    handleChangePageSize = async(queryPage) =>{
        let response = await taskList(queryPage);
        let data = response.data;
        if(response.status === 200 && data.error_code == 0){
            let queryPage = this.state.queryPage;
            this.setState({
                taskList:data.data.data,
                queryPage:Object.assign(queryPage,{
                    page:data.data.pageInfo.page,
                    pageSize:data.data.pageInfo.size,
                    total:data.data.pageInfo.total
                })
            })
        }else{
            message.error(data.msg)
        }
    }

    //弹窗添加任务或者编辑提交并重新请求数据
    addList = async(queryData) => {
        delete queryData.rewardRuleName;
        if(queryData.id){
            let response = await editTask(queryData);
            const {data} =response;
            data.error_code === 0 ? message.success('编辑成功'):message.error('编辑失败');
        }else{
            delete queryData.id;
            let response = await add(queryData);
            const {data} =response;
            data.error_code === 0 ? message.success('添加成功'):message.error('添加失败');
        }
        this.handleToastShow(false);
        this.componentDidMount();
    }

    //编辑
    editTaskList = async(item) =>{
       // let response = await infoTask({id:item.id});
       // let data = response.data;
       // if(data.error_code === 0){
       //      this.setState({
       //          queryData:data.data
       //      })
       // }
        this.setState({
            queryData:{
                id:item.id,
                name:item.name,
                amount:item.amount,
                startDay:item.start_day,
                endDay:item.end_day,
                rewardType:item.rewardType,
                rewardRuleId:item.reward_rule_id,
                rewardRuleName:item.rewardRuleName,
                rewardName:item.reward_name,
                rewardValue:item.reward_value,
                type:item.type
            }
        })
        this.handleToastShow(true);
    }
    //控制是否弹窗是否显示
    handleToastShow = (flag) =>{
        this.setState({
            isOpen:flag
        })
    }
    //添加任务按钮
    addTask = () =>{
        this.setState({queryData:{
            name:'',
            amount:'',
            startDay:'',
            endDay:'',
            rewardType:'',
            rewardRuleId:'',
            rewardRuleName:'',
            rewardName:'',
            rewardValue:'',
            type:1,
        }})
        console.log(this.state.queryData);
        this.handleToastShow(true);
    }
    //弹窗添加合并对象
    handleChangeState = (value,type) =>{
        var newTaskList = {
            type:1
        };
        newTaskList[type] = value
        this.setState({
            queryData:Object.assign(this.state.queryData,newTaskList)
        })
        console.log(this.state);
    }
    render() {
        return (
            <UpRateListView actions={this} store={this.state}/>
        );
    }
}
