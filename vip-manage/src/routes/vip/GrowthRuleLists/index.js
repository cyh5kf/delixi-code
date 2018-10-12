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
import EditGrowthRuleDialog from './EditGrowthRuleDialog.js'

import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


@connect(({growthRuleLists, loading}) => ({
    growthRuleLists,
    loading: loading.models.growthRuleLists,
}))
@Form.create()
export default class GrowthRuleLists extends PureComponent {
    state = {
        modalVisible: false,
        formValues: {},
        rowItem:null,//表格的行数据
        rowData:{//表格的行数据 用于编辑功能
            name:{
                value:''
            },
            value:{//兑换比例
                value:'1',
            },
            status:{//启用  停用状态
                value:'1'
            },
            time_limit:{//限制次数
                value:''
            }
        }
    };

    componentDidMount() {
        const {dispatch} = this.props;
        this.reload();
    }
    reload(){
        const {dispatch} = this.props;
        dispatch({
            type: 'growthRuleLists/fetch',
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
            type: 'growthRuleLists/fetch',
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
            type: 'growthRuleLists/fetch',
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
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'growthRuleLists/fetch',
                payload: values,
            });
        });
    }
    getColumns(){
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
                title: '比例值(投资金额：成长值)',
                dataIndex: 'value_name',
            },
            {
                title: '成长值行为',
                dataIndex: 'option_name',
            },
            {
                title: '频次',
                dataIndex: 'time_name',
            },
            {
                title: '限制次数',
                dataIndex: 'time_limit_name',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
            },
            {
                title: '状态',
                dataIndex: 'status_name',
                // render: val => <span>{val==0?'启用':'禁用'}</span>,
            },
            {
                title: '备注',
                dataIndex: 'desc',
            },
            {
                title: '等级限制',
                dataIndex: 'level_name',
            },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href="javascript:" onClick={() => this.handleModalVisible(row,true)}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm title="是否要停用？" onConfirm={() => this.remove(row)}>
                            <a>{row.status=='1'?'停用':'启用'}</a>
                        </Popconfirm>
                    </Fragment>
                ),
            },
        ];
        return columns;
    }
    handleModalVisible = (rowData,flag) => {
        this.setState({
            modalVisible: !!flag,
            rowItem:rowData||null,
            rowData:{
                name:{//规则名称
                    value:rowData?rowData.name:''
                },
                value:{//兑换比例
                    // // value:rowData && rowData.value_name ?rowData.value_name.replace(/\:/g,''):'1'
                    value:rowData && rowData.value ?rowData.value:'1'
                },
                status:{//启停状态
                    value:rowData?rowData.status:'1'
                },
                time_limit:{//限制次数
                    value:rowData?rowData.time_limit:'0'
                }
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
            type: 'growthRuleLists/add',
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
            type: 'growthRuleLists/startStop',
            payload:{
                status:status==1?'2':'1',
                id
            },
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
                    <Col md={4} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button type="primary" htmlType="submit">搜索</Button>
                          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                    {/* <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button href="javascript:" type="primary" onClick={() => this.handleModalVisible(null,true)}>添加规则</Button>
                        </span>
                    </Col> */}
                </Row>
            </Form>
        );
    }

    render() {
        const {growthRuleLists: {data}, loading,form} = this.props;
        const {modalVisible,rowData,rowItem} = this.state;
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderLayout title="会员成长值规则列表">
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
                <EditGrowthRuleDialog
                    {...parentMethods}
                    modalVisible={modalVisible}
                    {...rowData}
                    rowItem={rowItem}
                />
            </PageHeaderLayout>
        );
    }
}

