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
import EditLevelDialog from './EditLevelDialog.js';


import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


@connect(({levelLists, loading}) => ({
    levelLists,
    loading: loading.models.levelLists,
}))
@Form.create()
export default class LevelListsPage extends PureComponent {
    state = {
        modalVisible: false,
        formValues: {},
        rowItem:null,
        rowData:{
            level_ident:{//序号
                value:''
            },
            level_name:{//等级名称
                value:''
            },
            level_min:{//成长值区间
                value:''
            },
            level_max:{//成长值区间
                value:''
            },
            is_degrade:{//降级规则:1 循环降级, 0 不降
                value:''
            },
            degrade_days:{//降级天数
                value:''
            },
            status:{//状态: 1 启动, 2停用
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
            type: 'levelLists/fetch',
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
            type: 'levelLists/fetch',
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
            type: 'levelLists/fetch',
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
                type: 'levelLists/fetch',
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
                    value:rowData?rowData.level_name:'0'
                },
                level_min:{//成长值区间
                    value:rowData?rowData.level_min:'0'
                },
                level_max:{//成长值区间
                    value:rowData?rowData.level_max:'0'
                },
                is_degrade:{//降级规则:1 循环降级, 0 不降
                    value:rowData?rowData.is_degrade:'0'
                },
                degrade_days:{//降级天数
                    value:rowData?rowData.degrade_days:'0'
                },
                status:{//状态: 1 启动, 2停用
                    value:rowData?rowData.status:'1'
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
            type: 'levelLists/add',
            payload: fields,
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
            type: 'levelLists/startStop',
            payload:{
                status:status==1?'0':'1',
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
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button disabled type="primary" onClick={()=>{this.handleModalVisible(null,true)}}>添加会员等级</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
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
                title: '成长值区间',
                dataIndex: 'level_section',
            },
            {
                title: '降级规则',
                dataIndex: 'degrade_name',
            },
            {
                title: '循环降级时间',
                dataIndex: 'degrade_days',
            },
            {
                title: '当前会员人数',
                dataIndex: 'user_total',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
                // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '状态',
                dataIndex: 'status_name',
                // render: val => <span>{val=='1'?'启用':'停用'}</span>,
            },
            {
                title: '操作',
                render: (row) => (
                    <>
                        <a href="javascript:" disabled onClick={()=>{this.handleModalVisible(row,true)}}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm title={`是否要${row.status=='1'?'停用':'启用'}？`}
                                    onConfirm={() => this.remove(row)}>
                            <a href="javascript:" >{row.status=='1'?'停用':'启用'}</a>
                        </Popconfirm>
                    </>
                ),
            },
        ];
        return columns;
    }
    render() {
        const {levelLists: {data}, loading} = this.props;
        const {modalVisible,rowData,rowItem} = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderLayout title="会员等级列表">
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
                <EditLevelDialog {...parentMethods}
                                     modalVisible={modalVisible}
                                     {...rowData}
                                     rowItem={rowItem}
                />
            </PageHeaderLayout>
        );
    }
}

