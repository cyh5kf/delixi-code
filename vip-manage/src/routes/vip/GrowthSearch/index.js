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



@connect(({growthSearch, loading}) => ({
    growthSearch,
    loading: loading.models.growthSearch,
}))
@Form.create()
export default class GrowthSearch extends PureComponent {
    state = {
        formValues: {},
    };

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({
            type: 'growthSearch/fetch',
            payload: {
                page:1,
                page_size: 10,
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
            page: pagination.current,
            page_size: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'growthSearch/fetch',
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
            type: 'growthSearch/fetch',
            payload: {},
        });
    }

    handleSearch = (e) => {
        e.preventDefault();

        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const {
                createDate,
                changeDate
            }=fieldsValue

            const values = {
                ...fieldsValue,
                create_begin:fieldsValue.createDate && moment(fieldsValue.createDate[0]).format('YYYY-MM-DD'),
                create_end:fieldsValue.createDate && moment(fieldsValue.createDate[1]).format('YYYY-MM-DD'),
                update_begin: fieldsValue.changeDate && moment(fieldsValue.changeDate[0]).format('YYYY-MM-DD'),
                update_end: fieldsValue.changeDate && moment(fieldsValue.changeDate[1]).format('YYYY-MM-DD'),
            };

            delete values.createDate;
            delete values.changeDate;

            this.setState({
                formValues: values,
            });

            dispatch({
                type: 'growthSearch/fetch',
                payload: values,
            });
        });
    }
    exportFile(){
        const {dispatch, form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const {
                createDate,
                changeDate
            }=fieldsValue

            const values = {
                ...fieldsValue,
                create_begin:fieldsValue.createDate && moment(fieldsValue.createDate[0]).format('YYYY-MM-DD'),
                create_end:fieldsValue.createDate && moment(fieldsValue.createDate[1]).format('YYYY-MM-DD'),
                update_begin: fieldsValue.changeDate && moment(fieldsValue.changeDate[0]).format('YYYY-MM-DD'),
                update_end: fieldsValue.changeDate && moment(fieldsValue.changeDate[1]).format('YYYY-MM-DD'),
            };

            delete values.createDate;
            delete values.changeDate;

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
                window.open(`/index.php?_url=/user/grow/export${queryStr}`);
            },200)
            // dispatch({
            //     type: 'growthSearch/exportFile',
            //     payload: values,
            // });
        });
    }
    renderForm() {
        const {getFieldDecorator} = this.props.form;
        const {growthSearch: {data}} = this.props;

        const optionLevels=data.level_list && data.level_list.data ||[
            { levelname:'普通会员',level:'0'},
            { levelname:'青铜会员',level:'1'},
            { levelname:'白银会员',level:'2'},
            { levelname:'黄金会员',level:'4'},
            { levelname:'铂金会员',level:'5'},
            { levelname:'钻石会员',level:'6'},
            { levelname:'至尊会员',level:'7'},
        ]
        const options=optionLevels.map((item )=> <Option key={item.level} value={item.level} >{item.levelname}</Option>)

        return (
            <Form onSubmit={this.handleSearch} layout={"inline"}>
                <Row gutter={{md: 8, lg: 24, xl: 48}}>

                    <Col md={5} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('realname')(
                                <Input placeholder="请输入姓名"/>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={5} sm={24}>
                        <FormItem label="用户UID">
                            {getFieldDecorator('uid')(
                                <Input placeholder="请输入用户UID"/>
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col md={5} sm={24}>
                        <FormItem label="手机号码">
                            {getFieldDecorator('mobile')(
                                <Input placeholder="请输入手机号码"/>
                            )}
                        </FormItem>
                    </Col> */}
                    <Col md={6} sm={24}>
                        <FormItem label="创建时间搜索">
                            {getFieldDecorator('createDate')(
                                <RangePicker format="YYYY-MM-DD"
                                             style={{ width: '100%' }}
                                             placeholder={['开始日期', '结束日期']}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={5} sm={24}>
                        <FormItem label="等级名称" >
                            {getFieldDecorator('level', {
                                initialValue:'', //optionLevels[0].level,
                            })(
                                <Select  showSearch={false} >
                                    <Option value="">请选择</Option>
                                    {options}
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                    {/*<Col md={3} sm={3} style={{marginTop:'5px'}}>*/}
                        {/*成长值范围：*/}
                    {/*</Col>*/}
                    <Col md={3} sm={3} style={{paddingRight:'0'}}>
                        <FormItem label={'成长值范围'}>
                            {getFieldDecorator('grow_begin',{
                                rules: [
                                    {validator:(rule, value, callback) => {
                                        const form = this.props.form;
                                        if (value > form.getFieldValue('grow_end')) {
                                            callback('成长值范围最小值不能大于最大值！');
                                        } else {
                                            callback();
                                        }
                                    }}
                                ],
                            })(
                                <InputNumber placeholder="请输入数值" min={0} style={{ width: '100px' }} />
                            )}
                            
                        </FormItem>
                    </Col>
                    <Col md={1} sm={1}>
                        <span style={{color:'#999'}}>—</span>
                    </Col>
                    <Col md={3} sm={3} style={{paddingLeft:'0'}}>
                        <FormItem label={''}>
                            {getFieldDecorator('grow_end',{
                                rules: [
                                    {validator:(rule, value, callback) => {
                                        const form = this.props.form;
                                        if (value < form.getFieldValue('grow_begin')) {
                                            callback('成长值范围最大值不能小于最小值！');
                                        } else {
                                            callback();
                                        }
                                    }}
                                ],
                            })(
                                <InputNumber placeholder="请输入数值" min={0} style={{ width: '100px' }} />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="变更时间搜索">
                            {getFieldDecorator('changeDate')(
                                <RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col md={2} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                            <Button style={{ marginLeft: 10 }} type="primary"  onClick={()=>{this.exportFile()}}>数据导出</Button>
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
                title: '成长值',
                dataIndex: 'grow',
                // render:(row={})=>{
                //     const {
                //         grow_begin='',
                //         grow_end=''
                //     }=row;
                //     return <span>{`${grow_begin}${'-'+grow_end}`}</span>
                // },
            },
            {
                title: '当前等级',
                dataIndex: 'levelname',
            },
            {
                title: '创建日期',
                dataIndex: 'create_date',
            },
            {
                title: '变更日期',
                dataIndex: 'update_date',
            },
            {
                title: '操作',
                render: (row) => (
                    <Fragment>
                        <a href={`#/vip/growthRecord?uid=${row.uid}`} >成长值记录</a>
                    </Fragment>
                ),
            },
        ];

        return columns;
    }

    render() {
        const {growthSearch: {data}, loading} = this.props;
        return (
            <PageHeaderLayout title="会员成长值查询">
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

