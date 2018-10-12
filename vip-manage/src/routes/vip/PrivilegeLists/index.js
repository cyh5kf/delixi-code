/**
 * Created by wy on 2018/2/22 0007.
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
import EditPrivilegeDialog from './EditPrivilegeDialog.js';


import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


@connect(({privilegeLists, loading}) => ({
    privilegeLists,
    loading: loading.models.privilegeLists,
}))
@Form.create()
export default class IntegralRulesLists extends PureComponent {
    state = {
        modalVisible: false,
        formValues: {},
        rowItem:null,
        rowData:{
            level_ident:{//序号
                value:''
            },
            level_name:{//等级名称
                value:'1'
            },
            gift_upgrade:{//升级礼包
                value:'1'
            },
            gift_month:{//每月礼包
                value:'1'
            },
            gift_birth:{//生日礼包
                value:'1'
            },
            coefficient:{//积分加成
                value:'1'
            },
            vip_service:{//VIP客服
                value:'1'
            },
            withdraw_times:{//提现减免
                value:''
            },
        }
    };

    componentDidMount() {
        this.reload();
    }
    reload(){
        const {dispatch} = this.props;
        dispatch({
            type: 'privilegeLists/fetch',
            payload: {
                page:1,
                page_size:10
            },
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
            type: 'privilegeLists/fetch',
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
            type: 'privilegeLists/fetch',
            payload: {},
        });
    }

    handleSearch = (e) => {
        e.preventDefault();

        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
                page:1,
                page_size:10
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'privilegeLists/fetch',
                payload: values,
            });
        });
    }

    handleModalVisible = (rowData,flag) => {

        this.setState({
            modalVisible: !!flag,
            rowItem:rowData||null,
            rowData:{
                level_ident:{//序号
                    value:rowData?rowData.level_ident:''
                },
                level_name:{//等级名称
                    value:rowData && rowData.level_name ?rowData.level_name:'1'
                },
                gift_upgrade:{//升级礼包
                    value:rowData?rowData.gift_upgrade:'1'
                },
                gift_month:{//每月礼包
                    value:rowData?rowData.gift_month:'1'
                },
                gift_birth:{//生日礼包
                    value:rowData?rowData.gift_birth:'1'
                },
                coefficient:{//积分加成
                    value:rowData?rowData.coefficient:'1'
                },
                vip_service:{//VIP客服
                    value:rowData?rowData.vip_service:'1'
                },
                withdraw_times:{//提现减免
                    value:rowData?rowData.withdraw_times.replace(/笔\/月/,''):''
                },
            },
        });
    }

    handleAdd = (fields) => {
        const {
            rowItem
        }=this.state;

        if(rowItem && rowItem.id){
            fields.id=rowItem.id
        }

        this.props.dispatch({
            type: 'privilegeLists/add',
            payload:fields,
        });
        this.reload();
        this.setState({
            modalVisible: false,
        });
    }
    remove(row) {//启用/停用
        const {
            dispatch
        }=this.props;
        const {
            status,
            id
        }=row;

        dispatch({
            type: 'privilegeLists/startStop',
            payload:{
                status:status==1?'2':'1',
                id
            },
        });
        this.reload();
    }
    getColumns(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'level_ident',
            },
            {
                title: '等级名称',
                dataIndex: 'level_name',
            },
            {
                title: '升级礼包',
                dataIndex: 'gift_upgrade_name',
                // render: val => `${val} 万`
            },
            {
                title: '每月礼包',
                dataIndex: 'gift_month_name',
            },
            {
                title: '生日礼包',
                dataIndex: 'gift_birth_name',
            },
            {
                title: '积分加成',
                dataIndex: 'coefficient_name',
            },
            {
                title: 'VIP客服',
                dataIndex: 'vip_service_name',
            },
            {
                title: '提现减免',
                dataIndex: 'withdraw_times_name',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
                // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '状态',
                dataIndex: 'status_name',
                // render: (val) => {return <span>2323</span>},
            },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href="javascript:" onClick={()=>{this.handleModalVisible(row,true)}}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm title={`是否要${row.status=='1'?'停用':'启用'}？`}
                                    onConfirm={() => this.remove(row)}>
                            <a>{row.status=='1'?'停用':'启用'}</a>
                        </Popconfirm>
                    </Fragment>
                ),
            },
        ];
        return columns;
    }
    renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={6} sm={24}>
                        <FormItem label="等级名称">
                            {getFieldDecorator('level_name')(
                                <Input placeholder="请输入等级名称"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button type="primary" htmlType="submit">搜索</Button>
                        </span>
                    </Col>

                    {/*<Col md={2} sm={24}>*/}
                        {/*<span className={styles.submitButtons}>*/}
                            {/*<Button href="javascript:" type="primary" onClick={()=>{this.handleModalVisible(null,true)}}>添加会员特权</Button>*/}
                        {/*</span>*/}
                    {/*</Col>*/}
                </Row>
            </Form>
        );
    }

    render() {
        const {privilegeLists: {data}, loading} = this.props;
        const {modalVisible,rowData,rowItem} = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderLayout title="会员特权列表">
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
                <EditPrivilegeDialog {...parentMethods}
                                     modalVisible={modalVisible}
                                     {...rowData}
                                     rowItem={rowItem}
                />
            </PageHeaderLayout>
        );
    }
}

