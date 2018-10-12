import React from 'react';
import {message} from 'antd';
import RedListView from './RedListView';
import moment from 'moment';
import {getRedEnvelopeRequest,addRedPackRule,editRedPackRule } from 'api/RegularPool'
export default class RedListComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packList: null, // 活动列表数据
            queryCondition: { // 查询活动列表传参
                type:1,
                page: 1,
                pageSize: 10,
            },
            total: 0, // 活动列表总数
            isOpenDialog:false,
            dialogData: null,
        }
    }
    //编辑
    edit = (record) => {
        var start = record.expiration_start == '' ? moment(new Date(),'YYYY-MM-DD HH:mm:ss'):moment(record.expiration_start,'YYYY-MM-DD HH:mm:ss');
        var end = record.expiration_end == '' ?  moment(new Date(),'YYYY-MM-DD HH:mm:ss') :  moment(record.expiration_end,'YYYY-MM-DD HH:mm:ss');
        this.setState({
            dialogData: {
                id: record.id,
                startDay:record.start_day,
                endDay:record.end_day,
                name: record.name,
                limitThreshold: record.limit_threshold,
                expirationType:record.expiration_type,
                type:record.type,
                expirationStart:start,
                expirationEnd:end,
                expiration:record.expiration
            }
        })
        this.handleToggleDialog(true);
    }
    addPackRule = () => {
        this.setState({
            dialogData:{
                type:1,
                startDay:'',
                endDay:'',
                limitThreshold:'',
                expiration:'',
                expirationStart:'',
                expirationEnd:'',
                expirationType:'1',
                name:'',
            },
        });
        this.handleToggleDialog(true);
    }
    handleChangeValue = (value,type ) =>{
        var newDialogData ={};
        newDialogData[type] = value;
        this.setState({
            dialogData:Object.assign(this.state.dialogData,newDialogData)
        })
    }
    handleToggleDialog = async(isOpen)=> {
        this.setState({isOpenDialog: isOpen});
    };
    handleActivityPackList = async(values, dialogData, finished) =>{
        if(dialogData.id){
            //修改
            let response = await editRedPackRule(dialogData);
            let data = response.data;
            if(data.error_code === 0) {
                message.success('编辑红包成功！');
                finished();
                const queryCondition = this.state.queryCondition;
                this.handleChangePackList(queryCondition);
            } else {
                message.error("编辑红包失败！");
                finished();
            }
        }else{
            let response = await addRedPackRule(dialogData);
            let data = response.data;
            if(data.error_code === 0) {
                message.success('添加红包成功！');
                finished();
                const queryCondition = this.state.queryCondition;
                this.handleChangePackList(queryCondition);
            } else {
                message.error("添加红包失败！");
                finished();
            }
        }
    }
    componentDidMount = async() => {
        let response = await getRedEnvelopeRequest(this.state.queryCondition);
        let data = response.data;
        if(response.status === 200) {
            const queryCondition = this.state.queryCondition;
            this.setState({
                packList: data.data,
                queryCondition: Object.assign(queryCondition, {
                    page: parseInt(data.pageInfo.page),
                    pageSize: parseInt(data.pageInfo.size)
                }),
                total: data.pageInfo.total
            });
        }
    }
    handleChangePackList = async() =>{
        let response = await getRedEnvelopeRequest(this.state.queryCondition);
        let data = response.data;
        if(data.error_code === 0) {
            const queryCondition = this.state.queryCondition;
            this.setState({
                packList: data.data,
                queryCondition: Object.assign(queryCondition, {
                    page: parseInt(data.pageInfo.page),
                    pageSize: parseInt(data.pageInfo.size)
                }),
                total: data.pageInfo.total
            });
        }
    }
    render() {
        return (
            <div>
                <RedListView actions={this} store={this.state} />
            </div>
        );
    }
}
