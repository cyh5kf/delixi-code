/**
 * Created by Administrator on 2017/11/25.
 */
import React from 'react';
import { Form,Select,Input,Row,Col } from  'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import SearchView from './SearchView'
export default class TaskToast extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            isOpen:false,
            result:[],
        }
    }
    changeValue = (e,type) =>{
        const {actions} = this.props;
        actions.handleChangeState(e.target.value,type)
    }
    changeSelect = (value,name) => {
        const {actions} = this.props;
        actions.handleChangeState(value,'rewardType')
        this.setState({
            isOpen:true,
            result:[],
        })
    }
    componentWillMount() {
        this.setState({
            result:[],
        })
    }
    render(){
        const {store,actions} = this.props;
        let data = store.queryData;
        console.log(data)
        let result = this.state.result;
        return(
            <div className="container">
                <div>
                    <div className="container-left">任务名称：</div>
                    <div className="container-right"><input onChange={(e) =>{this.changeValue(e,'name')}} value={data.name} className="name-input" /></div>
                </div>
                <div style={{marginTop:20,marginBottom:10}}>
                    <div className="container-left"></div>
                    <div className="container-right">
                        <span className="sm-6">条件</span>
                        <span className="sm-6">数值</span>
                        <span className="sm-6">期限限制</span>
                    </div>
                </div>
                <div>
                    <div className="container-left">任务条件：</div>
                    <div className="container-right">
                        <span className="option" >
                            <select>
                                <option value={1}>单笔投资金额</option>
                            </select>
                        </span>
                        <span style={{marginLeft: 5}}>
                            <input style={{width:'20%'}} onChange={(e) =>{this.changeValue(e,'amount')}} value={data.amount} />
                        </span>
                        <span style={{marginLeft: 5}}>
                            <input style={{width:'20%'}} value={data.startDay}  onChange={(e) =>{this.changeValue(e,'startDay')}} /><span style={{fontSize:14}}>天</span><input onChange={(e) =>{this.changeValue(e,'endDay')}} style={{width:'20%'}} value={data.endDay} /><span style={{fontSize:14}}>天</span>
                        </span>
                    </div>
                </div>
                <div style={{marginTop:20,marginBottom:10}}>
                    <div className="container-left"></div>
                    <div className="container-right">
                        <span className="text-width" style={{width:42+'%',textAlign:'left'}}>奖励类型</span>
                        <span className="text-width">选择奖励规则</span>
                    </div>
                </div>
                <div>
                    <div className="container-left">任务奖励：</div>
                    <div className="container-right">
                        <span className="option">
                            <Select  style={{width:126}} defaultValue="1" onSelect={(value,option) =>{this.changeSelect(value,option)}}>
                                <Option value="1">红包</Option >
                                <Option value="2">加息券</Option >
                            </Select>
                        </span>
                        <span className="option" style={{marginLeft:10}}>
                            <select style={{minWidth:200}} onChange={(e) =>{this.changeValue(e,'rewardRuleId')}} disabled="disabled" >
                                {
                                    result.length != 0?result.map((item,i) => <option key={i} value={item.id}>{item.value}</option>):<option>{data.rewardRuleName}</option>
                                }
                            </select>
                        </span>
                        
                        <div className="container-right" style={{marginTop:10}}>
                            <span className="text-width" style={{width:50+'%',textAlign:'left'}}>奖励数值</span>
                            <span className="text-width">奖励名称</span>
                        </div>
                        <span>
                            <Input style={{width:126,marginTop:10,}} value={data.rewardValue} onChange={(e) =>{this.changeValue(e,'rewardValue')}} />
                        </span>
                        <span style={{marginLeft: 10}}>
                            <Input style={{width:'50%',marginTop:10}}  onChange={(e) =>{this.changeValue(e,'rewardName')}} value={data.rewardName}  />
                        </span>
                    </div>
                </div>
                <SearchView store={store} actions={actions} $this={this}></SearchView>
            </div>
        )
    }
}
