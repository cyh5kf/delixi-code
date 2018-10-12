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

const EditLevelDialog = Form.create({
    mapPropsToFields(props) {
        return {
            level_ident:createVal(props,'level_ident'),
            level_name:createVal(props,'level_name'),
            level_min:createVal(props,'level_min'),
            level_max:createVal(props,'level_max'),
            is_degrade:createVal(props,'is_degrade'),
            degrade_days:createVal(props,'degrade_days'),
            status:createVal(props,'status'),
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
            title="编辑会员成长值规则"
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
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 12 }}>
                {getFieldDecorator('level_ident',{
                    rules: [
                        {required:true, message: `序号不能为空`},

                    ],
                })(
                    <Input placeholder="请输入序号"/>
                )}
            </FormItem>
            <FormItem
                label="等级名称"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('level_name', {
                    initialValue: "普通会员",
                    rules: [
                        {required:true, message: `等级名称不能为空`},
                    ],
                })(
                    <Select showSearch={false} >
                        {options}
                    </Select>
                )}
            </FormItem>
            <Row gutter={{md: 24, lg: 24, xl: 24}}>
                <Col md={12} sm={12}>
                    <FormItem label="成长值区间"
                              labelCol={{ span: 12 }}
                              wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('level_min',{
                            initialValue: "0",
                            rules: [
                                {required:true, message: `区间最小值不能为空`},
                                {validator:(rule, value, callback) => {
                                    if (value*1 > form.getFieldValue('level_max')) {
                                        if(form.getFieldValue('level_name') !=optionLevels[optionLevels.length-1].text){
                                            callback('成长值范围最小值不能大于最大值！');
                                        }else{
                                            callback();
                                        }
                                    } else {
                                        callback();
                                    }
                                }}
                            ],
                        })(
                            <InputNumber style={{width:'100px'}} placeholder="0"/>
                        )}
                    </FormItem>
                </Col>

                <Col md={11} sm={11}>
                    <FormItem label="至"
                              colon={false}
                              labelCol={{ span: 3 }}
                              wrapperCol={{ span: 12 }}>
                        {getFieldDecorator('level_max',{
                            initialValue: "0",
                            rules: [
                                {required:true, message: `区间最大值不能为空`},
                                {validator:(rule, value, callback) => {
                                    if (value*1 < form.getFieldValue('level_min')) {
                                        if(form.getFieldValue('level_name') !=optionLevels[optionLevels.length-1].text){
                                            callback('成长值范围最大值不能小于最小值！');
                                        }else{
                                            callback();
                                        }
                                    } else {
                                        callback();
                                    }
                                }}
                            ],
                        })(
                            <Input style={{width:'100px'}} placeholder="0"/>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="降级规则"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 12 }}>
                {getFieldDecorator('is_degrade', {
                    initialValue: "1",
                })(
                    <Select  showSearch={false} >
                        <Option value={'1'}>循环降级</Option>
                        <Option value={'0'}>不降</Option>
                    </Select>
                )}
            </FormItem>

            <FormItem label="降级时间（天）"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 12 }}
            >
                {getFieldDecorator('degrade_days',{
                    initialValue: "0",
                    rules: [
                        {required:true, message: `降级时间不能为空`},
                    ],
                })(
                    <InputNumber  placeholder=""/>
                )}
            </FormItem>

            <FormItem label="状态"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 12 }}>
                {getFieldDecorator('status', {
                    initialValue: "1",
                })(
                    <Select  showSearch={false} >
                        <Option value={'1'}>启用</Option>
                        <Option value={'2'}>停用</Option>
                    </Select>
                )}
            </FormItem>
        </Modal>
    );
});

export default EditLevelDialog;