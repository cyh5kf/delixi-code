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
import EditWelfarePacketDialog from './EditWelfarePacketDialog.js'

import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];


@connect(({welfarePacketLists, loading}) => ({
    welfarePacketLists,
    loading: loading.models.welfarePacketLists,
}))
@Form.create()
export default class IntegralRulesLists extends PureComponent {
    state = {
        modalVisible: false,
        formValues: {

        },
        rowItem:null,
        rowData:{
            level_ident:{//序号
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
            type: 'welfarePacketLists/fetch',
            payload:{
                page:1,
                page_size:10
            }
        });
    }
    openFormPage = (type,row=null) => {
        this.props.dispatch({
            type: 'welfarePacketLists/openFormPage',
            payload: {
                editType: type,
                row
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
            type: 'welfarePacketLists/fetch',
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
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
                page: 1,
                page_size: 10,
            };

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'welfarePacketLists/fetch',
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
                }
            },
        });
    }

    handleAdd = (fields) => {
        this.props.dispatch({
            type: 'welfarePacketLists/add',
            payload: {
                description: fields.desc,
            },
        });

        message.success('添加成功');
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
            type: 'welfarePacketLists/startStop',
            payload:{
                status:status==1?'0':'1',
                id
            },
        });
        this.reload();
    }
    renderForm() {
        const {getFieldDecorator} = this.props.form;

        const optionLevels=[
                { levelname:'普通会员',level:'0'},
                { levelname:'青铜会员',level:'1'},
                { levelname:'白银会员',level:'2'},
                { levelname:'黄金会员',level:'4'},
                { levelname:'铂金会员',level:'5'},
                { levelname:'钻石会员',level:'6'},
                { levelname:'至尊会员',level:'7'},
            ]
        const options=optionLevels.map((item )=> <Option key={item.level} value={item.levelname} >{item.levelname}</Option>)

        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={6} sm={24}>
                        <FormItem label="福利名称">
                            {getFieldDecorator('type_name')(
                                <Input placeholder="请输入福利名称"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="会员等级">
                            {getFieldDecorator('level_name',{
                                initialValue: '',
                            })(
                                <Select  showSearch={false} >
                                    <Option value=''>请选择</Option>
                                    {options}
                                </Select>
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
                          <Button href="javascript:" type="primary" onClick={()=>{this.openFormPage('add',null)}}>添加福利礼包</Button>
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
                dataIndex: 'id',
            },
            {
                title: '福利名称',
                dataIndex: 'type_name',
            },
            {
                title: '会员等级',
                dataIndex: 'level_name',
            },
            {
                title: '奖励类型',
                dataIndex: 'cate_name',
            },
            {
                title: '面值',
                dataIndex: 'market_price',
            },
            {
                title: '起投金额',
                dataIndex: 'tender_limit',
            },
            {
                title: '加息金额',
                dataIndex: 'income_money',
            },
            {
                title: '起投期限',
                dataIndex: 'borrow_limit',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
                // render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },
            {
                title: '状态',
                dataIndex: 'status_name',
            },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href="javascript:"
                           onClick={()=>{this.openFormPage('edit',row)}}>编辑</a>
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
    render() {
        const {welfarePacketLists: {data}, loading} = this.props;
        const {
            modalVisible,
            rowData,
            rowItem
        } = this.state;

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderLayout title="福利礼包列表">
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
                <EditWelfarePacketDialog {...parentMethods}
                                 modalVisible={modalVisible}
                                 {...rowData}
                                 rowItem={rowItem}/>
            </PageHeaderLayout>
        );
    }
}

