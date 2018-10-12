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
    Divider,
    Popconfirm
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import IntegralRulesDialog from './IntegralRulesDialog';

import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({integralRulesLists, loading}) => ({
    integralRulesLists,
    loading: loading.models.integralRulesLists,
}))
@Form.create()
export default class IntegralRulesLists extends PureComponent {
    state = {
        modalVisible: false,
        formValues: {},
        rowData: {
            name: {value: ''},
            status: {value: ''},
            note: {value: ''},
            id: '',
            bonus_points: {value: ''}
        }
    };

    componentDidMount() {
        this.reload();
    }

    reload() {
        const {dispatch} = this.props;
        dispatch({
            type: 'integralRulesLists/fetch',
            payload: {
                page: 1,
                page_size: 10
            }
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const {dispatch} = this.props;
        const {formValues} = this.state;

        // const filters = Object.keys(filtersArg).reduce((obj, key) => {
        //     const newObj = {...obj};
        //     newObj[key] = getValue(filtersArg[key]);
        //     return newObj;
        // }, {});

        const params = {
            ...formValues,
            page: pagination.current,
            page_size: pagination.pageSize,
            // ...filters,
        };
        // if (sorter.field) {
        //     params.sorter = `${sorter.field}_${sorter.order}`;
        // }

        dispatch({
            type: 'integralRulesLists/fetch',
            payload: params,
        });
    }

    handleFormReset = () => {
        const {form, dispatch} = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    }

    handleSearch = (e) => {
        e.preventDefault();

        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                page: 1,
                page_size: 10
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'integralRulesLists/fetch',
                payload: values,
            });
        });
    }

    handleModalVisible = (rowData, flag) => {
        this.setState({
            modalVisible: !!flag,
            rowData: {
                name: {
                    value: rowData ? rowData.name : ''
                },
                bonus_points: {
                    value: rowData ? rowData.bonus_points : ''
                },
                note: {
                    value: rowData ? rowData.note : ''
                },
                status: {
                    value: rowData ? rowData.status : ''
                },
                id: {
                    value: rowData ? rowData.id : ''
                },
            }
        });
    }

    handleAdd = (fields) => {
        this.props.dispatch({
            type: 'integralRulesLists/edit',
            payload: fields,
        });
        this.reload();
        this.setState({
            modalVisible: false,
        });
    }

    remove = (fields) => {
        fields.status = fields.status == 1 ? 0 : 1;
        this.props.dispatch({
            type: 'integralRulesLists/edit',
            payload: fields,
        });
        this.reload();
    }

    renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={6} sm={24}>
                        <FormItem label="规则名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入规则名称"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button type="primary" htmlType="submit">搜索</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    getColumns = () => {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
            },
            {
                title: '规则名称',
                dataIndex: 'name',
            },
            {
                title: '积分',
                dataIndex: 'bonus_points',
            },
            {
                title: '类型',
                dataIndex: 'type',
                render(val) {
                    const type = {
                        1: '新手任务',
                        2: '每月任务'
                    }
                    return <span >{type[val]}</span>;
                },
            },
            {
                title: '积分行为',
                dataIndex: 'action',
                render(val){
                    const action = {
                        inc: '增加',
                        dec: '减少'
                    }
                    return <span >{action[val]}</span>;
                }
            },
            {
                title: '创建日期',
                dataIndex: 'create_time',
                render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(val) {
                    const status = {
                        1: '启用',
                        0: '停用',
                        2: '删除'
                    }
                    return <span >{status[val]}</span>;
                },
            },
            {
                title: '备注',
                dataIndex: 'note',
            },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href="javascript:;" onClick={() => this.handleModalVisible(row, true)}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm title={row.status == '1' ? "是否要停用？" : "是否要启用？"} onConfirm={() => this.remove(row)}>
                            <a>{row.status == '1' ? '停用' : '启用'}</a>
                        </Popconfirm>
                    </Fragment>
                ),
            },
        ];

        return columns;
    }

    render() {
        const {integralRulesLists: {data}, loading} = this.props;
        const {modalVisible, rowData} = this.state;
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderLayout title="积分规则列表">
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
                <IntegralRulesDialog
                    {...parentMethods}
                    modalVisible={modalVisible}
                    {...rowData}
                />
            </PageHeaderLayout>
        );
    }
}

