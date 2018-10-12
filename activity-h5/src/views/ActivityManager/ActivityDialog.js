import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, Input, Radio, message, DatePicker } from 'antd';
const FormItem = Form.Item;
import _ from 'underscore';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

function disabledDate(current) {
    // Can not select days before today and today
    return current && moment(current.valueOf()).isBefore(Date.now(), 'day');
}

class TheForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // 如果弹窗有初始值，那么是编辑弹窗，则给弹窗表单赋值
        var { dialogData } = this.props.store;
        if(dialogData) {
            let formData = _.clone(dialogData);
            delete formData.id;
            delete formData.at_status;
            this.props.form.setFieldsValue(formData);  //给表单赋值的数据必须与表单注册的字段一一对应，多余的要删除，否则会有警告
        }
    }

    render() {

        var that = this;
        var { state, props } = that;
        var { store, actions } = props;
        const { dialogData } = store;
        
        const at_status = dialogData? dialogData.at_status: '';
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 14 },
            }
          };

        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="活动名称:"
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入活动名称!'}]
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="活动关键字:"
                    hasFeedback
                >
                    {getFieldDecorator('keywords')(
                        <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="活动规则描述："
                    hasFeedback
                >
                    {getFieldDecorator('desc')(
                        <Input  />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="是否启用:"
                >
                    {getFieldDecorator('status')(
                    <RadioGroup disabled={dialogData && at_status !== 1}>
                        <Radio value="0">启用</Radio>
                        <Radio value="2">禁用</Radio>
                    </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="开始时间:"
                >
                    {getFieldDecorator('startTime', {
                        rules: [{required: true, message: '请输入开始时间!'}]
                    })(
                        <DatePicker
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{ format: 'HH:mm:ss' }}
                            disabled={dialogData && at_status !== 1}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="结束时间:"
                >
                    {getFieldDecorator('endTime', {
                        rules: [{required: true, message: '请输入结束时间!'}]
                    })(
                        <DatePicker
                            disabledDate={disabledDate}
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{ format: 'HH:mm:ss' }}
                            disabled={dialogData && at_status !== 1}
                        />
                    )}
                </FormItem>
            </Form>
        );
    }

}

const WrapForm = Form.create()(TheForm);


export default class ActivityDialog extends React.Component {

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
        theForm.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return;
            }
            this.setState({ loading: true });
            // 时间格式化
            fieldsValue = Object.assign(fieldsValue, {
                startTime: moment(fieldsValue.startTime).format("YYYY-MM-DD HH:mm:ss"),
                endTime: moment(fieldsValue.endTime).format("YYYY-MM-DD HH:mm:ss")
            })
            if(dialogData) { // 编辑活动，增加一个id参数
                fieldsValue.id = dialogData.id;
                const at_status = dialogData.at_status;
                if(at_status !== 1) { // 活动未开始(1)时传，其余时候不传
                    delete fieldsValue.startTime;
                    delete fieldsValue.endTime;
                    delete fieldsValue.status;
                }
            }
            actions.handleActivityDialog(fieldsValue, dialogData, () => {
                this.setState({ loading: false });
                actions.handleToggleDialog(false);
            })
        });
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
        var state = this.state;
        var title = dialogData ? "修改活动": "添加活动";

        var submitBtnText = dialogData ? "更新": "添加";

        return (
            <Modal
                className="activityDialog"
                visible={visible}
                title={title}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>{submitBtnText}</Button>
                ]}>

                <WrapForm ref="theForm" actions={this} store={store} data={dialogData} ></WrapForm>
            </Modal>
        );
    }

}
