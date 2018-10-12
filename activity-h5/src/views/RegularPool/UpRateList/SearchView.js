/**
 * Created by Administrator on 2017/11/27.
 */
import React from 'react';
import {Select,Modal,Button,Spin,message } from 'antd'
import _ from 'underscore'
const Option = Select.Option;
import {couponList,getRedEnvelopeRequest} from 'api/RegularPool'
export default class SearchView extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading:false,
            result: [],
            value: [],
            fetching: false,
            query:{
                page:1,
                pageSize:20,
                name:''
            }
        }
        this.lastFetchId = 0;
        this.searchName = _.debounce(this.searchName, 800);
    }
    handleOk = () => {
        const { $this,actions } = this.props;
        const {value,result} = this.state;
        if(value.length === 0){
            if(actions.state.queryData.rewardType === '1'){
                message.warning('请输入红包名称！');
            }else{
                message.warning('请输入加息券名称！');
            }
            return;
        }
        value.map((item) => {
            let id = item;
             result.map((current,index) =>{
                if(id === current.keys){
                    $this.setState({
                        isOpen:false,
                        result:this.state.result
                    })
                    actions.handleChangeState(current.keys,'rewardRuleId')
                }else{
                    delete this.state.result[index];
                }
            })
        })

    }
    handleCancel = () => {
        let {$this} = this.props;
        $this.setState({
            isOpen:false
        })
    }
    searchName = async(value) => {
        const {actions} = this.props;
        this.setState({
            query:Object.assign(this.state.query,{name:value,type:actions.state.queryData.rewardType})
        })
        if(value === ''){
            return;
        }
        var response = actions.state.queryData.rewardType === '1' ? await getRedEnvelopeRequest(this.state.query) :  await couponList(this.state.query);
        let data = response.data;
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({ fetching: true });
        if(response.status === 200 && data.error_code === 0){
            if (fetchId !== this.lastFetchId) {
                return;
            }
            const num = data.data.map(item => ({
                keys:item.id,
                value: item.name,
                fetching: false,
            }));
            this.setState({ result:num });
        }
    }
    handleChange = (value) => {
        console.log(value)
        this.setState({
            value,
            fetching: false,
        });
    }
    render(){
        let {store,actions,$this} = this.props;
        const { fetching, result, value } = this.state;
        let place = actions.state.queryData.rewardType === '1' ? '请输入红包名称':'请输入加息券名称';
        return (
            <Modal
                title="搜索内容"
                visible={$this.state.isOpen}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>确定</Button>,
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
                ]}
            >
                <Select
                    mode="multiple"
                    placeholder={place}
                    value={value}
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.searchName}
                    onChange={this.handleChange}
                    style={{ width: '100%' }}
                >
                    {result.map((d,index) => <Option key={d.value}  value={d.keys} >{d.value}</Option>)}
                </Select>
            </Modal>
        )
    }
}
