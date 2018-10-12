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

import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({userIntegralQuery, loading}) => ({
    userIntegralQuery,
    loading: loading.models.userIntegralQuery,
}))
@Form.create()
export default class UserIntegralQuery extends PureComponent {
    state = {
        formValues: {},
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'userIntegralQuery/fetch',
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
            type: 'userIntegralQuery/fetch',
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
            type: 'userIntegralQuery/fetch',
            payload: {
                page:1,
                page_size:10
            },
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

            const values = {
                ...fieldsValue,
                create_begin:fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
                create_end:fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
            };

            delete values.date;

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'userIntegralQuery/fetch',
                payload: values,
            });
        });
    }
    exportFile=(e)=>{
        // e.preventDefault();

        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const {
                date,
            }=fieldsValue

            const values = {
                ...fieldsValue,
                create_begin:fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
                create_end:fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
            };

            delete values.date;

            this.setState({
                formValues: values,
            });

            setTimeout(()=>{
                const keys=Object.keys(values);
                let queryStr='';

                keys.map((key,i)=>{
                    const value=values[key];
                    if(value){
                        queryStr+=`&${key}=${value}`
                    }
                });

                window.open(`/index.php?_url=/user/integral/export${queryStr}`);
            },200)
            // dispatch({
            //     type: 'userIntegralQuery/fetch',
            //     payload: values,
            // });
        });
    }
    renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={6} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('realname')(
                                <Input placeholder="请输入姓名"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="用户UID">
                            {getFieldDecorator('uid')(
                                <Input placeholder="请输入用户UID"/>
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
                                <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={12} sm={24}>
                        <Row>
                            <Col md={4} sm={4} style={{ marginTop: '5px', width: 85}}>
                            积分值范围：
                            </Col>
                            <Col md={5} sm={5}>
                                <FormItem>
                                    {getFieldDecorator('integral_begin')(
                                        <InputNumber placeholder="请输入数值" min={0} style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col md={2} sm={2}>
                                <div className={styles.line}></div>
                            </Col>
                            <Col md={5} sm={5}>
                                <FormItem>
                                    {getFieldDecorator('integral_end')(
                                        <InputNumber placeholder="请输入数值" min={0} style={{ width: '100%' }} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                            <Button type="primary"
                                    style={{ marginLeft: 8 }}
                                    onClick={()=>{this.exportFile()}}>
                                导出
                            </Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    getColumns = () => {
        const columns = [
            {
                title: '用户UID',
                dataIndex: 'uid',
            },
            {
                title: '用户名称',
                dataIndex: 'realname',
            },
            // {
            //     title: '手机号码',
            //     dataIndex: 'mobile',
            // },
            {
                title: '总积分',
                dataIndex: 'integral',
            },
            // {
            //     title: '有效积分',
            //     dataIndex: 'integral',
            // },
            {
                title: '消费积分',
                dataIndex: 'used_integral',
            },
            {
                title: '冻结积分',
                dataIndex: 'freeze_integral',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
            },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href={`#/integral/integralRecord?uid=${row.uid}`} >积分记录</a>
                    </Fragment>
                ),
            },
        ];

        return columns;
    }

    render() {
        const {userIntegralQuery: {data}, loading} = this.props;

        return (
            <PageHeaderLayout title="用户积分查询">
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
            </PageHeaderLayout>
        );
    }
}

