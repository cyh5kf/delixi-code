/**
 * Created by wy on 2018/3/5
 */

import { Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown, Menu, InputNumber,Radio, DatePicker, Modal, message } from 'antd';
import React, {PureComponent, Fragment} from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

export default class ExchangeDetailDialog extends PureComponent {
    state = {

    }
    componentDidMount(){

    }
    render(){
        const { modalVisible, form, handleAdd, handleModalVisible ,detail} = this.props;
        const okHandle = () => {
            form.validateFields((err, fieldsValue) => {
                alert(JSON.stringify(fieldsValue));
                if (err) return;
                handleAdd(fieldsValue);
            });
        };

        const {
            goods=[{}],
            info={},
            user={},
        }=detail;
        console.log('detail:',detail);


        // const {
        //     user_id='',//用户ID
        //     order_sn='',//订单号
        //     id='',//订单ID
        //     goods_id='',//商品ID
        //     order_status='',//订单状态 0 下单成功，待支付 1 支付成功，待发货 2发货成功，待收货 3 收货成功，已完成 4，取消订单 5 处理失败
        //     goods_title='',//商品名称
        //     goods_num='',//商品数量
        //     goods_integral='',//商品积分
        //     real_name='',//姓名
        //     reg_mobile='',//手机号
        //     create_time='',//兑换时间
        // }=detail;

        const {
            goods_id,
            goods_title,
            goods_integral,
            goods_num,
        }=goods.length && goods[0] || {};

        const {
            id,
            user_id,
            order_status,
            create_time,
        }=info;

        const {
            real_name,
            reg_mobile,
        }=user;


        const statusConfig={
            0:'下单成功',
            1:'支付成功',
            2:'发货成功',
            3:'收货成功',
            4:'取消订单',
            5:'处理失败'
        };

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
                title="兑换详情"
                visible={modalVisible}
                onCancel={() => handleModalVisible(null,false)}
                onOk={() => handleModalVisible(null,false)}
                bodyStyle={{
                    height:'500px',
                    overflowY:'scroll'
                }}
                footer={[
                    <Button key="submit" type="primary" onClick={() => handleModalVisible(null,false)}>
                      确定
                    </Button>,
                ]}
            >
                <FormItem label="用户ID"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    <span>{user_id}</span>
                </FormItem>
                <FormItem   label="用户名称"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 12 }} >
                    <span>{real_name}</span>
                </FormItem>
                <FormItem label="手机号码"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 12 }}>
                    <span>{reg_mobile}</span>
                </FormItem>

                {<Fragment>
                    <FormItem label="单个积分"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{goods_integral}</span>
                    </FormItem>
                    <FormItem label="兑换数量"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{goods_num}</span>
                    </FormItem>
                    <FormItem label="商品名称"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{goods_title}</span>
                    </FormItem>
                    <FormItem label="状态"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{order_status && statusConfig[order_status] || ''}</span>
                    </FormItem>
                    <FormItem label="兑换时间"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{create_time}</span>
                    </FormItem>
                    <FormItem label="发货状态"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{''}</span>
                    </FormItem>
                    <FormItem label="快递单号"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{}</span>
                    </FormItem>
                    <FormItem label="快递公司"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{''}</span>
                    </FormItem>
                    <FormItem label="联系地址"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{''}</span>
                    </FormItem>
                    <FormItem label="联系人"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{''}</span>
                    </FormItem>
                    <FormItem label="联系电话"
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 12 }}>
                        <span>{''}</span>
                    </FormItem>
                    {/*<FormItem label="发货状态"*/}
                              {/*labelCol={{ span: 6 }}*/}
                              {/*wrapperCol={{ span: 12 }}>*/}
                        {/*<span>{''}</span>*/}
                    {/*</FormItem>*/}
                </Fragment>}
            </Modal>
        );
    }
};
