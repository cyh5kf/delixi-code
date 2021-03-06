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
import {getParam} from '@/utils/utils.js';


const FormItem = Form.Item;
const {Option} = Select;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({integralRecord, loading}) => ({
    integralRecord,
    loading: loading.models.integralRecord,
}))
@Form.create()
export default class IntegralRecord extends PureComponent {
    state = {
        formValues: {},
        uid:getParam(window.location.href,'uid')
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'integralRecord/fetch',
            payload:{
                page:1,
                page_size:10,
                uid:this.state.uid
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
            page: pagination.current,
            page_size: pagination.pageSize,
            ...formValues,
            ...filters,
            uid:this.state.uid,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'integralRecord/fetch',
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
            type: 'integralRecord/fetch',
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

            const values = {
                ...fieldsValue,
                uid:this.state.uid,
                date_begin:fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
                date_end:fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
            };

            delete values.date;
            dispatch({
                type: 'integralRecord/fetch',
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
                        <FormItem label="时间搜索">
                            {getFieldDecorator('date')(
                                <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
                            )}
                        </FormItem>
                    </Col>
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
                title: '用户UID',
                dataIndex: 'uid',
            },
            {
                title: '用户名称',
                dataIndex: 'realname',
            },
            {
                title: '手机号码',
                dataIndex: 'mobile',
            },
            {
                title: '操作类型',
                dataIndex: 'optype_name',
            },
            {
                title: '参与任务名称',
                dataIndex: 'task_name',
            },
            // {
            //     title: '任务状态',
            //     dataIndex: 'status',
            // },
            {
                title: '操作积分',
                dataIndex: 'integral',
            },
            {
                title: '积分行为',
                dataIndex: 'type_name',
            },
            {
                title: '积分余额',
                dataIndex: 'balance_integral',
            },
            // {
            //     title: '冻结积分',
            //     dataIndex: 'freeze_integral',
            // },
            {
                title: '备注',
                dataIndex: 'grow_note',
            },
            {
                title: '记录时间',
                dataIndex: 'create_date',
                // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '积分有效期',
                dataIndex: 'valid_date',
                // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
        ];
        return columns;
    }

    render() {
        var {integralRecord: {data}, loading} = this.props;
        return (
            <PageHeaderLayout title="积分记录查询">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>
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

