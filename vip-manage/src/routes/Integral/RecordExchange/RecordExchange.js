/**
 * Created by wy on 2018/2/7 0007.
 */

import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import ExchangeDetailDialog from './ExchangeDetailDialog.js';

import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({recordExchange, loading}) => ({
    recordExchange,
    loading: loading.models.recordExchange,
}))
@Form.create()
export default class RecordExchange extends PureComponent {
    state = {
        formValues: {

        },
        modalVisible:false,
        rowData:null,
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'recordExchange/fetch',
            payload:{
                page:1,
                page_size:10
            }
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const {dispatch} = this.props;
        const {formValues} = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = {...obj};
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            ...formValues,
            ...filters,
            page: pagination.current,
            page_size: pagination.pageSize,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'recordExchange/fetch',
            payload: params,
        });
    }

    handleFormReset = () => {
        const {form, dispatch} = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'recordExchange/fetch',
            payload: {},
        });
    }

    handleSearch = (e) => {
        e.preventDefault();

        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const {
                date,
            }=fieldsValue
            console.log('date:',date);

            const values = {
                ...fieldsValue,
                start_time:fieldsValue.date && fieldsValue.date.length ? moment(fieldsValue.date[0]).format('YYYY-MM-DD HH:mm:ss'):'',
                end_time:fieldsValue.date && fieldsValue.date.length ? moment(fieldsValue.date[1]).format('YYYY-MM-DD HH:mm:ss'):'',
                page:1,
                page_size:10
            };

            delete values.date;

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'recordExchange/fetch',
                payload: values,
            });
        });
    }

    renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={6} sm={24}>
                        <FormItem label="商品名称">
                            {getFieldDecorator('goods_title')(
                                <Input placeholder="请输入商品名称"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('real_name')(
                                <Input placeholder="请输入姓名"/>
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col md={6} sm={24}>
                        <FormItem label="手机号码">
                            {getFieldDecorator('mobile')(
                                <Input placeholder="请输入手机号码"/>
                            )}
                        </FormItem>
                    </Col> */}
                </Row>
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={8} sm={24}>
                        <FormItem label="时间搜索">
                            {getFieldDecorator('date')(
                                <RangePicker style={{ width: '100%' }}
                                             showTime = {{hideDisabledOptions: true,
                                                 defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                             }}
                                             format="YYYY-MM-DD HH:mm:ss"
                                             placeholder={['开始日期', '结束日期']} />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem
                            label="状态"
                        >
                            {getFieldDecorator('order_status', {
                                initialValue: "",
                            })(
                                <Select
                                    style={{ width: 120 }}
                                    showSearch={false}
                                >
                                    <Option value="">请选择</Option>
                                    <Option value="0">下单成功</Option>
                                    <Option value="1">待发货</Option>
                                    <Option value="2">待收货</Option>
                                    <Option value="3">收货成功</Option>
                                    <Option value="4">取消订单</Option>
                                    <Option value="5">处理失败</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="用户UID">
                            {getFieldDecorator('user_id')(
                                <Input placeholder="请输入用户UID"/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button type="primary" htmlType="submit">搜索</Button>
                          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    getColumns = () => {
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'user_id',
            },
            {
                title: '用户名称',
                dataIndex: 'real_name',
            },
            // {
            //     title: '手机号码',
            //     dataIndex: 'reg_mobile',
            // },
            {
                title: '单个积分',
                dataIndex: 'goods_integral',
            },
            {
                title: '兑换数量',
                dataIndex: 'goods_num',
            },
            {
                title: '商品名称',
                dataIndex: 'goods_title',
            },
            {
                title: '状态',
                dataIndex: 'order_status',
                render:(val) =>{
                    const statusConfig={
                        0:'下单成功',
                        1:'待发货',
                        2:'待收货',
                        3:'收货成功',
                        4:'取消订单',
                        5:'处理失败'
                    };

                    return <span status={statusConfig[val]} >
                        {statusConfig[val]}
                    </span>;
                },
            },
            {
                title: '兑换时间',
                dataIndex: 'create_time',
            },
            // {
            //     title: '发货状态',
            //     dataIndex: 'order_status',
            //     render(val) {
            //         const status={
            //             0:'下单成功',
            //             1:'支付成功',
            //             2:'发货成功',
            //             3:'收货成功',
            //             4:'取消订单',
            //             5:'处理失败'
            //         };
            //         return <span >{status[val]}</span>;
            //     },
            // },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href="javascript:;" onClick={() => this.handleModalVisible(row,true)}>兑换详情</a>
                        <Divider type="vertical"/>
                        {/*<a href="javascript:;">发货</a>*/}
                    </Fragment>
                ),
            },
        ];

        return columns;
    }
    handleModalVisible = (rowData,flag) => {
        this.setState({
            modalVisible: !!flag,
            rowData,
        });
        if(flag){
            this.props.dispatch({
                type:'recordExchange/getDetail',
                payload:{
                    id:rowData.id
                }
            })
        }
    }
    render() {
        const {recordExchange: {data,detail}, loading} = this.props;
        const {
            modalVisible,
            rowData
        }=this.state;

        const parentMethods = {
            handleModalVisible: this.handleModalVisible,
        };

        return (
            <PageHeaderLayout title="商品兑换记录">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm} style={{ marginBottom: '25px'}}>
                            {this.renderForm()}
                        </div>
                        <StandardTable
                            loading={loading}
                            data={data}
                            columns={this.getColumns()}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <ExchangeDetailDialog {...parentMethods}
                                         modalVisible={modalVisible}
                                      detail={detail} />
            </PageHeaderLayout>
        );
    }
}

