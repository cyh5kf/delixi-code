import React from 'react';
import {message} from 'antd';
import TeskListView from './TeskListView';
import moment from 'moment';
import {couponList,addCouponList,editCouponItem } from 'api/RegularPool'
export default class TeskListComposer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            couponList: null,
            queryCondition: {
                type:2,
                page: 1,
                pageSize: 10,
            },
            total: 0,
            isOpenDialog:false,
            dialogData:null,
        }
    }
    handleChangeValue = (value,name) =>{
        var newDialogData ={
            type:2,
        };
        newDialogData[name] = value;
        this.setState({
            dialogData:Object.assign(this.state.dialogData,newDialogData)
        });
    }
    //编辑加息券
    editCouponList = (record) => {
        var start = record.expiration_start == '' ? moment(new Date(),'YYYY-MM-DD HH:mm:ss'):moment(record.expiration_start,'YYYY-MM-DD HH:mm:ss');
        var end = record.expiration_end == '' ?  moment(new Date(),'YYYY-MM-DD HH:mm:ss') :  moment(record.expiration_end,'YYYY-MM-DD HH:mm:ss');
        this.setState({
            dialogData: {
                id: record.id,
                name: record.name,
                startDay:record.start_day,
                endDay:record.end_day,
                containDays:record.contain_days,
                expiration:record.expiration,
                expirationType:Number(record.expiration_type),
                expirationStart:start,
                expirationEnd:end,
                limitThreshold: record.limit_threshold,
                type:record.type,
            }
        })
        console.log(this.state.dialogData)
        this.handleToggleDialog(true);
    }
    addCouponRule = () => {
        this.setState({dialogData:{
            name: '',
            startDay:'',
            endDay:'',
            containDays:'',
            expiration:'',
            expirationType:2,
            expirationStart:'',
            expirationEnd:'',
            limitThreshold: '',
            type:2,
        }});
        this.handleToggleDialog(true);
    }
    handleToggleDialog = async(isOpen)=> {
        this.setState({isOpenDialog: isOpen});
    }
    componentDidMount = async() =>{
        let response = await couponList(this.state.queryCondition);
        let data = response.data;
        if(response.status === 200) {
            const queryCondition = this.state.queryCondition;
            this.setState({
                couponList: data.data,
                queryCondition: Object.assign(queryCondition, {
                    page: parseInt(data.pageInfo.page),
                    pageSize: parseInt(data.pageInfo.size)
                }),
                total: data.pageInfo.total
            });
        }
    }
    handleActivityCoupon = async(values, dialogData, finished) =>{
        if(dialogData.id){
            //修改
            let response = await editCouponItem(dialogData);
            let data = response.data;
            if(data.error_code === 0) {
                message.success('编辑加息券成功！');
                finished();
                this.componentDidMount();
            } else {
                message.error("编辑加息券失败！");
                finished();
            }
        }else{
            let response = await addCouponList(dialogData);
            let data = response.data;
            if(data.error_code === 0) {
                message.success('添加加息券成功！');
                finished();
                this.componentDidMount();
            } else {
                message.error("添加加息券失败！");
                finished();
            }
        }
    }
    handleChangeCouponList = async(queryCondition) =>{
        let response = await couponList(queryCondition);
        let data = response.data;
        if(data.error_code === 0) {
            const queryCondition = this.state.queryCondition;
            this.setState({
                couponList: data.data,
                queryCondition: Object.assign(queryCondition, {
                    page: parseInt(data.pageInfo.page),
                    pageSize: parseInt(data.pageInfo.size)
                }),
                total: data.pageInfo.total
            });
        }else{
            message.error(data.msg);
        }
    }
    render() {
        return (
            <div>
                <TeskListView actions={this} store={this.state} />
            </div>
        );
    }
}
