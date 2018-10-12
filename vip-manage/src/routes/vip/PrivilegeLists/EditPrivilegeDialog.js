/**
 * Created by wy on 2018/3/2 0001.
 */

import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber, DatePicker, Modal, message } from 'antd';
import { Fragment} from 'react';

const FormItem = Form.Item;
const Option = Select.Option;

const createVal=function (props,name) {
    return Form.createFormField({
        ...props[name],
        value: props[name].value
    })
}

const EditPrivilegeDialog = Form.create({
    mapPropsToFields(props) {
        return {
            level_ident:createVal(props,'level_ident'),
            level_name:createVal(props,'level_name'),
            gift_upgrade:createVal(props,'gift_upgrade'),
            gift_month:createVal(props,'gift_month'),
            gift_birth:createVal(props,'gift_birth'),
            coefficient:createVal(props,'coefficient'),
            vip_service:createVal(props,'vip_service'),
            withdraw_times:createVal(props,'withdraw_times'),
        };
    },
})((props) => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleAdd(fieldsValue);
        });
    };

    const { getFieldDecorator } = form;
    const optionLevels=[
        { text:'普通会员',value:'0'},
        { text:'青铜会员',value:'1'},
        { text:'白银会员',value:'2'},
        { text:'黄金会员',value:'4'},
        { text:'铂金会员',value:'5'},
        { text:'钻石会员',value:'6'},
        { text:'至尊会员',value:'7'},
    ];
    const options=optionLevels.map((item )=> <Option key={item.text} value={item.text} >{item.text}</Option>);

    return (
        <Modal
            title="编辑会员特权"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible(null,false)}
            okText="保存"
            bodyStyle={{
                height:'400px',
                overflowY:'scroll'
            }}
        >
            <FormItem label="序号"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('level_ident')(
                    <Input placeholder="请输入规则名称"/>
                )}
            </FormItem>
            <FormItem label="等级名称"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('level_name', {
                    initialValue: "普通会员",
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                    >
                        {options}
                    </Select>
                )}
            </FormItem>

            <FormItem label="升级礼包"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('gift_upgrade', {
                    initialValue: "1",
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                    >
                        <Option value={'1'}>开启</Option>
                        <Option value={'0'}>停用</Option>
                    </Select>
                )}
            </FormItem>

            <FormItem label="每月礼包"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('gift_month', {
                    initialValue: "1",
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                    >
                        <Option value={'1'}>开启</Option>
                        <Option value={'0'}>停用</Option>
                    </Select>
                )}
            </FormItem>

            <FormItem label="生日礼包"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('gift_birth', {
                    initialValue: "1",
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                    >
                        <Option value={'1'}>开启</Option>
                        <Option value={'0'}>停用</Option>
                    </Select>
                )}
            </FormItem>

            <FormItem label="积分加成"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}>
                {getFieldDecorator('coefficient')(
                    <InputNumber placeholder=""/>
                )}
            </FormItem>

            <FormItem label="VIP客服"
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 10 }}
            >
                {getFieldDecorator('vip_service', {
                    initialValue: "1",
                })(
                    <Select
                        style={{ width: 120 }}
                        showSearch={false}
                    >
                        <Option value={'1'}>开启</Option>
                        <Option value={'0'}>停用</Option>
                    </Select>
                )}
            </FormItem>
            <Row gutter={{md: 24, lg: 24, xl: 24}}>
                <Col md={24} sm={24}>
                    <FormItem label="提现减免"
                              extra="笔/月"
                              labelCol={{ span: 5 }}
                              wrapperCol={{ span: 8 }}>
                        {getFieldDecorator('withdraw_times')(
                            <Input placeholder=""/>
                        )}
                    </FormItem>
                </Col>
            </Row>
        </Modal>
    );
});

export default EditPrivilegeDialog;