import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, Input, Radio, message, DatePicker,Col,Row } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _ from 'underscore';
const { TextArea, } = Input;
const format = 'YYYY-MM-DD HH:mm:ss'
class TheForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time:2,
            startValue:null,
            endValue:null,
        };
    }
    changeValue = (e,type) =>{
        let { actions} = this.props;
        actions.handleChangeValue(e.target.value,type);
    }
    onChange = (field, value) =>{
        this.setState({
            [field]: value,
        });
    }
    onStartChange = (value,dataString)=>{
        const {actions} = this.props;
        this.onChange('startValue', value);
        actions.handleChangeValue(dataString,'expirationStart');
        actions.handleChangeValue(null,'expiration');
    }
    onEndChange = (value,dataString) => {
        const {actions} = this.props;
        this.onChange('endValue', value);
        actions.handleChangeValue(dataString,'expirationEnd');
        actions.handleChangeValue(null,'expiration');
    }
    changeRadio = (value) => {
        const {actions} = this.props;
        this.setState({
            time:value,
        })
        actions.handleChangeValue(value,'expirationType')
    }
    componentDidMount(){
        let { store,dialogData,actions} = this.props;
        const {expirationStart,expirationEnd,expirationType} = dialogData;
        //编辑的时候初始化选中
        if(dialogData.id){
            this.setState({
                startValue:expirationStart,
                endValue:expirationEnd,
                time:expirationType*1,
            })
             actions.handleChangeValue(expirationStart.format('YYYY-MM-DD HH:mm:ss'),'expirationStart');
             actions.handleChangeValue(expirationEnd.format('YYYY-MM-DD HH:mm:ss'),'expirationEnd');
        }
    }
    render() {
        const { dialogData} = this.props;
        let {startValue,endValue,time} = this.state;
        return (
            <div className="toast">
                <Row >
                    <Col span={4} className="packName">红包规则名称:</Col>
                    <Col span={18}><Input onChange={(e) => {this.changeValue(e,'name')}} value={dialogData.name}  /></Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={4} >标的期限限制:</Col>
                    <Col span={20}>
                            <Input style={{width:100}} onChange={ (e) => {this.changeValue(e,'startDay')}} value={dialogData.startDay} />-<Input style={{width:100}} onChange={ (e) => {this.changeValue(e,'endDay')}} value={dialogData.endDay} />天标可用（0代表不限天数）
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={4} >最低投资限额:</Col>
                    <Col span={20}>
                        <Input onChange={(e) => {this.changeValue(e,'limitThreshold')}} value={dialogData.limitThreshold} style={{width:100}} />元
                    </Col>
                </Row>
                <Row style={{marginTop:10}}>
                    <Col span={4} >奖励有效期:</Col>
                    <Col span={20}>
                        <RadioGroup  name="radiogroup" onChange={(e) =>{this.changeRadio(e.target.value)}} value={time}>
                            <Radio value={2}></Radio>
                            <DatePicker
                                showTime
                                value={startValue}
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={this.onStartChange}
                                style={{width:150}} /><span>至</span>
                            <DatePicker
                                showTime
                                value={endValue}
                                onChange={this.onEndChange}
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{width:150}} /><br />
                            <Radio value={1} style={{marginTop:10}}></Radio><Input onChange={(e) =>{this.changeValue(e,'expiration')}}  value={dialogData.expiration} style={{width:135}} /><span>天有效（0代表当天有效）</span>
                        </RadioGroup>
                    </Col>
                </Row>
            </div>
        );
    }

}

const WrapForm = Form.create()(TheForm);


export default class RedListToast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    // 弹窗点击确定提交
    handleOk = () => {
        var theForm = this.refs['theForm'];
        var { actions, store } = this.props;
        const { dialogData } = store;
        console.log(dialogData)
        actions.handleActivityPackList(null, dialogData, () => {
            this.setState({loading: false});
            actions.handleToggleDialog(false);
        })

    };

    // 关闭弹窗
    handleCancel = () => {
        var { actions } = this.props;
        actions.handleToggleDialog(false)
    };
    render() {
        var { store, actions } = this.props;
        var visible = store.isOpenDialog;
        var dialogData = store.dialogData;
        if (!visible) {
            return null;
        }
        var title = dialogData.id ? "编辑红包": "添加红包";
        var submitBtnText = dialogData.id ? "更新": "添加";
        return (
            <Modal
                className="ModifyOrAddI18nItemDialog"
                visible={visible}
                title={title}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>{submitBtnText}</Button>
                ]}>
                <WrapForm ref="theForm" actions={actions} store={store} dialogData={dialogData} ></WrapForm>
            </Modal>
        );
    }

}
