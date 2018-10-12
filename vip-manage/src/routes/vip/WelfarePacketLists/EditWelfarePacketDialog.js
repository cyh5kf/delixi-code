/**
 * Created by wy on 2018/3/5
 */

import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,Radio, DatePicker, Modal, message } from 'antd';
import { Fragment} from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const createVal=function (props,name) {
    return Form.createFormField({
        ...props[name],
        value: props[name].value
    })
}

const EditWelfarePacketDialog = Form.create({
    mapPropsToFields(props) {
        return {
            // level_ident:createVal(props,'level_ident'),
            // level_name:createVal(props,'level_name'),
            // level_min:createVal(props,'level_min'),
            // level_max:createVal(props,'level_max'),
            // is_degrade:createVal(props,'is_degrade'),
            // degrade_days:createVal(props,'degrade_days'),
            // status:createVal(props,'status'),
        };
    },
})((props) => {
    const { modalVisible, form, handleAdd, handleModalVisible } = props;
    const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
            alert(JSON.stringify(fieldsValue));
            if (err) return;
            handleAdd(fieldsValue);
        });
    };

    const { getFieldDecorator ,getFieldValue} = form;
    const optionLevels=[
        { text:'普通会员',value:'0'},
        { text:'青铜会员',value:'1'},
        { text:'白银会员',value:'2'},
        { text:'黄金会员',value:'4'},
        { text:'铂金会员',value:'5'},
        { text:'钻石会员',value:'6'},
        { text:'至尊会员',value:'7'},
    ];
    const options=optionLevels.map((item )=> <Option key={item.text} value={item.value} >{item.text}</Option>);
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 7 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 10 },
        },
    };
    const radioStyle ={
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return (
        <Modal
            title="编辑福利礼包"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => handleModalVisible(null,false)}
            okText="保存"
            bodyStyle={{
                height:'500px',
                overflowY:'scroll'
            }}
        >
            <FormItem label="福利名称"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 12 }}>
                {getFieldDecorator('gift_name', {
                    initialValue: "1",
                })(
                    <Select  showSearch={false} >
                        <Option value={'1'}>福利礼包</Option>
                        <Option value={'2'}>升级礼包</Option>
                        <Option value={'3'}>每月礼包</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem   label="等级名称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 12 }} >
                {getFieldDecorator('level_name', {
                    initialValue: "0",
                })(
                    <Select showSearch={false} >
                        {options}
                    </Select>
                )}
            </FormItem>
            <FormItem label="奖励类型"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 12 }}>
                {getFieldDecorator('gift_type', {
                    initialValue: "1",
                })(
                    <Select  showSearch={false} >
                        <Option value={'1'}>加息券</Option>
                        <Option value={'2'}>红包</Option>
                    </Select>
                )}
            </FormItem>

            {<Fragment>
                <FormItem label="红包名称"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('redpacket_name')(
                        <Input placeholder="请输入红包名称"/>
                    )}
                </FormItem>
                <FormItem label="红包金额"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('redpacket_value')(
                        <Input placeholder="请输入红包金额"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标的期限限制"
                >
                    {getFieldDecorator('radio-group')(
                        <RadioGroup>
                            <Row type="flex" justify="start">
                                <Col>
                                    <Radio className={radioStyle} value="0">天标</Radio>
                                </Col>
                                {
                                    getFieldValue('radio-group') === '0' && (
                                        <>
                                        <Col style={{marginRight: '10px'}}>
                                            <FormItem
                                            >
                                                {getFieldDecorator('compare', {
                                                    initialValue: "0",
                                                })(
                                                    <Select
                                                        style={{ width: 80 }}
                                                        showSearch={false}
                                                        placeholder="请输入"
                                                    >
                                                        <Option value="0">大于</Option>
                                                        <Option value="1">大于等于</Option>
                                                        <Option value="3">等于</Option>
                                                        <Option value="4">小于等于</Option>
                                                        <Option value="5">小于</Option>
                                                    </Select>
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col>
                                            <FormItem
                                            >
                                                {getFieldDecorator('tianbiao', {
                                                    rules: [{
                                                        required: true, message: '请输入天标',
                                                    }],
                                                })(
                                                    <InputNumber placeholder="请输入" />
                                                )}
                                                <span>天标可用</span>
                                            </FormItem>
                                        </Col>
                                        </>
                                    )
                                }
                            </Row>
                            <Row type="flex" justify="start">
                                <Col>
                                    <Radio className={radioStyle} value="1">天标区间</Radio>
                                </Col>
                                {
                                    getFieldValue('radio-group') === '1' && (
                                        <>
                                        <Col style={{marginRight: '10px'}}>
                                            <FormItem
                                            >
                                                {getFieldDecorator('tianbiaostart', {
                                                    rules: [{
                                                        required: true, message: '请输入天标',
                                                    }],
                                                })(
                                                    <InputNumber placeholder="请输入" />
                                                )}
                                                <span>天标至</span>
                                            </FormItem>
                                        </Col>
                                        <Col>
                                            <FormItem
                                            >
                                                {getFieldDecorator('tianbiaoend', {
                                                    rules: [{
                                                        required: true, message: '请输入天标',
                                                    }],
                                                })(
                                                    <InputNumber placeholder="请输入" />
                                                )}
                                                <span>天标可用</span>
                                            </FormItem>
                                        </Col>
                                        </>
                                    )
                                }
                            </Row>
                            <Radio className={radioStyle} value="2">无天数限制</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem label="投资金额"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('amount_value')(
                        <Input placeholder="请输入投资金额"/>
                    )}
                </FormItem>
                <FormItem label="红包描述"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('packet_desc')(
                        <TextArea style={{ minHeight: 32 }} placeholder="请输入加息券描述" rows={4} />
                    )}
                </FormItem>
                <FormItem label="状态"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('status', {
                        initialValue: "1",
                    })(
                        <Select  showSearch={false} >
                            <Option value={'1'}>开启</Option>
                            <Option value={'2'}>停用</Option>
                        </Select>
                    )}
                </FormItem>
            </Fragment>}



        </Modal>
    );
});

export default EditWelfarePacketDialog;