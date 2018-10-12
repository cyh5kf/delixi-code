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
import CategoryDialog from './CategoryDialog';

import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({commodityCategory, loading}) => ({
    commodityCategory,
    loading: loading.models.commodityCategory,
}))
@Form.create()
export default class CommodityCategory extends PureComponent {
    state = {
        modalVisible: false,
        formValues: {},
        rowData: {
            cate_name: {value: ''},
            rank: {value: ''},
            note: {value: ''},
            up_id: {value:''},
            id:{value:''},
            status:{value:'1'}
        }
    };

    componentDidMount() {
        this.reload();
    }

    reload(){
        const {dispatch} = this.props;
        dispatch({
            type: 'commodityCategory/fetch',
            payload: {
                page: 1,
                page_size: 10
            }
        });
        dispatch({
            type: 'commodityCategory/getTree',
            payload: {}
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
            type: 'commodityCategory/fetch',
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
            type: 'commodityCategory/fetch',
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
            };

            this.setState({
                formValues: values,
                page: 1,
                page_size: 10
            });

            dispatch({
                type: 'commodityCategory/fetch',
                payload: values,
            });
        });
    }

    handleModalVisible = (rowData, flag) => {
        this.setState({
            modalVisible: !!flag,
            rowData: {
                cate_name: {
                    value: rowData ? rowData.cate_name : ''
                },
                rank: {
                    value: rowData ? rowData.rank : 99
                },
                note: {
                    value: rowData ? rowData.note : ''
                },
                up_id: {
                    value: rowData ? rowData.up_id : ''
                },
                id: {
                    value: rowData ? rowData.id : ''
                },
                status: {
                    value: rowData ? rowData.status : '1'
                },
            }
        });
    }

    handleAdd = (add,fields) => {
        if(add){
            this.props.dispatch({
                type: 'commodityCategory/add',
                payload: fields,
            });
        }else{
            this.props.dispatch({
                type: 'commodityCategory/edit',
                payload:  fields,
            });
        }
        this.reload();
        this.setState({
            modalVisible: false,
        });
    }
    remove = (fields) => {
        fields.status = fields.status == 1 ? 2 : 1;
        this.props.dispatch({
            type: 'commodityCategory/status',
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
                        <FormItem label="类别名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入类别名称"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={4} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button type="primary" htmlType="submit">搜索</Button>
                          <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                          <Button href="javascript:" type="primary" onClick={() => this.handleModalVisible(null,true)}>添加规则</Button>
                        </span>
                    </Col>
                </Row>

            </Form>
        );
    }

    getColumns = () => {
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
            },
            {
                title: '类别名称',
                dataIndex: 'cate_name',
            },
            {
                title: '排序',
                dataIndex: 'rank',
            },
            {
                title: '备注',
                dataIndex: 'note',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(val) {
                    const status = {
                        1: '启用',
                        2: '停用'
                    }
                    return <span>{status[val]}</span>;
                },
            },
            {
                title: '添加时间',
                dataIndex: 'create_time',
                render: val => val * 1 ? <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm:ss')}</span> : '',
            },
            {
                title: '操作',
                render:(row)=> {
                    console.log(row.id,row.up_id,row.id=='1' || row.up_id=='1');
                   return <Fragment>
                       {
                           (row.id!='1' && row.up_id!='1') && <a href="javascript:;" onClick={() => this.handleModalVisible(row, true)}>编辑</a>
                       }

                        <Divider type="vertical"/>
                        <Popconfirm title={row.status == '1' ? "是否要停用？" : "是否要启用？"} onConfirm={() => this.remove(row)}>
                            <a>{row.status == '1' ? '停用' : '启用'}</a>
                        </Popconfirm>
                    </Fragment>
                }
            },
        ];

        return columns;
    }

    render() {
        const {commodityCategory: {data,tree}, loading} = this.props;
        const {modalVisible,rowData} = this.state;
        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible,
        };
        return (
            <PageHeaderLayout title="积分商品类别">
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
                <CategoryDialog
                    {...parentMethods}
                    modalVisible={modalVisible}
                    {...rowData}
                    tree={tree}
                />
            </PageHeaderLayout>
        );
    }
}

