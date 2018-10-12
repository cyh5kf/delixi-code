import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, Input, Radio,Col,DatePicker,Row } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
import _ from 'underscore';

class TheForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
        }
    }
    componentDidMount() {
        let { actions } = this.props;
        var { dialogData } = this.props.store;
        if(dialogData.id) {
            this.setState({
                startValue:dialogData.expirationStart,
                endValue:dialogData.expirationEnd,
            })
           actions.handleChangeValue(dialogData.expirationStart.format('YYYY-MM-DD HH:mm:ss'),'expirationStart');
           actions.handleChangeValue(dialogData.expirationEnd.format('YYYY-MM-DD HH:mm:ss'),'expirationEnd');
        }
    }
    changeDataValue = (e,type) =>{
        let { actions } = this.props;
        console.log(type);
        actions.handleChangeValue(e.target.value,type);
    }
    onChange = (field, value) =>{
        this.setState({
            [field]: value,
        });
    }
    //开始时间
    onStartChange =(value,dateString) =>{
        const {actions} = this.props;
        this.onChange('startValue', value);
        actions.handleChangeValue(dateString,'expirationStart');
        actions.handleChangeValue(2,'expirationType');
        actions.handleChangeValue(null,'expiration');
    }
    //结束时间
    onEndChange = (value,dateString) =>{
        const {actions} = this.props;
        this.onChange('endValue', value);
        actions.handleChangeValue(2,'expirationType');
        actions.handleChangeValue(null,'expiration');
        actions.handleChangeValue(dateString,'expirationEnd');
    }           
    changeRadio = (e,name) =>{
        const {actions} = this.props;
        actions.handleChangeValue(e.target.value,name);
    }
    render() {
        let that = this;
        let {  props } = that;
        let { store } = props;
        const { dialogData } = store;
        const { startValue,endValue} = this.state;
        return (
            <div>
                    <Row>
                        <Col span={6} style={{lineHeight:28+'px',textAlign:'right'}}><div>加息券规则名称：</div></Col>
                        <Col span={12}><Input value={dialogData && dialogData.name} onChange={ (e) => {this.changeDataValue(e, 'name')}}/></Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={6} style={{textAlign:'right',lineHeight:28+'px'}}><div>标的期限限制：</div></Col>
                        <Col span={18}>
                            <Input style={{width: 100}} value={dialogData.startDay} onChange={ (e) => {this.changeDataValue(e, 'startDay')}}/>-
                            <Input style={{width: 100}} value={dialogData.endDay} onChange={ (e) => {this.changeDataValue(e, 'endDay')}} /> 天标可用(0代表无天数限制)
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={6} style={{'textAlign':'right',lineHeight:28+'px'}}>加息金额：</Col>
                        <Col span={18}>
                            <Input style={{width: 100}} onChange={ (e) => {this.changeDataValue(e, 'limitThreshold')}} value={dialogData.limitThreshold }/>元（0代表不限金额）
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={6}><div style={{textAlign:'right',lineHeight:28+'px'}}>加息天数：</div></Col>
                        <Col span={18}>
                                <Input style={{width: 100}} value={dialogData.containDays} onChange={ (e) => {this.changeDataValue(e, 'containDays')}}/> 元（0代表全程加息）
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col span={6}><div style={{textAlign:'right',lineHeight:28+'px'}}>奖励有效期：</div></Col>
                        <Col span={18}>
                            <RadioGroup value={dialogData.expirationType} onChange={e =>{this.changeRadio(e,'expirationType')}}>
                            <Radio value={2}/>
                            <DatePicker showTime value={startValue} format="YYYY-MM-DD HH:mm:ss" onChange={this.onStartChange}/> 至
                            <DatePicker showTime value={endValue} format="YYYY-MM-DD HH:mm:ss" onChange={this.onEndChange}/><br />
                            <Radio value={1}/><Input onChange={ (e) => {this.changeDataValue(e, 'expiration')}} style={{width: '100px', margin: '10px 0 0 0'}} value={dialogData.expiration}/><span> 天标有效（0代表当天有效）</span>
                            </RadioGroup>
                        </Col>
                    </Row>
            </div>

        );
    }

}

const WrapForm = Form.create()(TheForm);

export default class CouponToast extends React.Component {
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
        actions.handleActivityCoupon(null, dialogData, () => {
            this.setState({ loading: false });
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
        var title = dialogData.id ? "编辑加息券": "添加加息券";
        var submitBtnText = dialogData.id ? "更新": "添加";
        return (
            <Modal
                className="ModifyOrAddI18nItemDialog"
                visible={visible}
                title={title}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>{submitBtnText}</Button>,
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
                ]}>
                <WrapForm ref="theForm" actions={actions} store={store}  ></WrapForm>
            </Modal>
        );
    }

}
