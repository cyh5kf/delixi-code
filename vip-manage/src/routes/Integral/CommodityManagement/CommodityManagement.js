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
import {routerRedux} from 'dva/router';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import styles from './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({commodityManagement,integral, loading}) => ({
    commodityManagement,
    integral,
    loading: loading.models.commodityManagement,
}))
@Form.create()
export default class CommodityManagement extends PureComponent {
    state = {
        formValues: {},
        showDetail: false,
        rowData: {}
    };

    componentDidMount() {
        this.reload();
    }

    reload() {
        const {dispatch} = this.props;
        dispatch({
            type: 'commodityManagement/fetch',
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
            type: 'commodityManagement/fetch',
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
            type: 'commodityManagement/fetch',
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
            });

            dispatch({
                type: 'commodityManagement/fetch',
                payload: values,
            });
        });
    }

    handleAdd = (fields) => {
        this.props.dispatch({
            type: 'commodityManagement/add',
            payload: {
                description: fields.desc,
            },
        });

        message.success('添加成功');
    }

    openFormPage = (row=null) => {
        this.props.dispatch({
            type: 'integral/openFormPage',
            payload: {
                row
            }
        });
    }
    remove = (fields) => {
        const params = {
            is_up: fields.is_up == 1 ? 0 : 1,
            id: fields.id
        }
        this.props.dispatch({
            type: 'commodityManagement/remove',
            payload: params,
        });
        this.reload();
    }

    renderForm() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={6} sm={24}>
                        <FormItem label="商品名称">
                            {getFieldDecorator('name')(
                                <Input placeholder="请输入商品名称"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={18} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                            <Button type="primary" style={{float: 'right'}} onClick={() => this.openFormPage()}>添加商品</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    getColumns = () => {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '编码',
                dataIndex: 'goods_sn',
                key: 'goods_sn',
            },
            {
                title: '名称',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '分类',
                dataIndex: 'cate_name',
                key: 'cate_name',
            },
            {
                title: '积分值',
                dataIndex: 'change_integral',
                key: 'change_integral',
            },
            {
                title: '状态',
                dataIndex: 'is_up',
                key: 'is_up',
                render(val){
                    const status = {
                        0: '下架',
                        1: '上架'
                    }
                    return <span>{status[val]}</span>;
                }
            },
            {
                title: '平台售价（元）',
                dataIndex: 'change_price',
                key: 'change_price',
            },
            {
                title: '成本价',
                dataIndex: 'cost_price',
                key: 'cost_price',
            },
            {
                title: '销量',
                dataIndex: 'change_num',
                key: 'change_num',
            },
            {
                title: '是否热销',
                dataIndex: 'is_recommend',
                key: 'is_recommend',
                render(val){
                    const status = {
                        0: '否',
                        1: '是'
                    }
                    return <span>{status[val]}</span>;
                }
            },
            {
                title: '所属用户组',
                dataIndex: 'level_name',
                key: 'level_name',
            },
            {
                title: '库存',
                dataIndex: 'goods_num',
                key: 'goods_num',
            },
            {
                title: '添加时间',
                dataIndex: 'create_time',
                key: 'create_time',
                // sorter: true,
            },
            {
                title: '操作',
                render: (row) => {
                    let prefix = '';
                    const domain = window.location.hostname;
                    switch (domain) {
                        case 'lvipadmin.51rz.com/':
                            prefix='http://lvip.51rz.com/jifen'; // 测试环境
                            break;
                        case 'pre-vipadmin.51rz.com':
                            prefix='https://pre-vip.51rz.com/jifen'; // 演练环境
                            break;
                        case 'vipadmin.51rz.com':
                            prefix='https://vip.51rz.com/jifen'; // 生产环境
                            break;
                        default:
                            prefix='https://vip.51rz.com/jifen'; // 生产环境
                    }

                    return <Fragment>
                        <a href={"/#/integral/commodityDetail?id="+row.id} >详情</a>
                        <Divider type="vertical"/>
                            <a href="javascript:;" onClick={() => this.openFormPage(row)}>编辑</a>
                        <Divider type="vertical"/>
                        <Popconfirm title={row.is_up == '1' ? "是否要下架？" : "是否要上架？"} onConfirm={() => this.remove(row)}>
                            <a>{row.is_up == '1' ? '下架' : '上架'}</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a href={`${prefix}/app/exchangeDetail.html?goods_id=${row.id}`} target="_blank" >预览wap</a>
                        <Divider type="vertical" />
                        <a href={`${prefix}/pc/jf-shop/jf_info.html?id=${row.id}`} target="_blank" >预览PC</a>
                    </Fragment>
                }
            },
        ];

        return columns;
    }

    render() {
        const {commodityManagement: {data}, loading} = this.props;
        const {showDetail, rowData} = this.state;
        return (
            <PageHeaderLayout title="商品管理">
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

