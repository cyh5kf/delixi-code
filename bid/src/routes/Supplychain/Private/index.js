/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Table,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Checkbox,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@connect(({ userIntegralQuery, loading }) => ({
  userIntegralQuery,
  loading: loading.models.userIntegralQuery,
}))
@Form.create()
export default class UserIntegralQuery extends PureComponent {
  state = {
    formValues: {},
    selectedids: [],
    
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userIntegralQuery/fetch',
      payload: {
        page: 1,
        page_size: 10,
      },
    });
  }

  onSelectChange = (selectedRowKeys,selectedRows) => {
    var selectedids = []
    selectedids=selectedRows.map(item=>item.key)
    console.log('selectedRowKeys changed: ', selectedids);
    this.setState({ selectedids });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
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
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'userIntegralQuery/fetch',
      payload: {
        page: 1,
        page_size: 10,
      },
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { date } = fieldsValue;

      const values = {
        ...fieldsValue,
        create_begin: fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        create_end: fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
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
  };
  exportFile = e => {
    // e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { date } = fieldsValue;

      const values = {
        ...fieldsValue,
        create_begin: fieldsValue.date && moment(fieldsValue.date[0]).format('YYYY-MM-DD'),
        create_end: fieldsValue.date && moment(fieldsValue.date[1]).format('YYYY-MM-DD'),
      };

      delete values.date;

      this.setState({
        formValues: values,
      });

      setTimeout(() => {
        const keys = Object.keys(values);
        let queryStr = '';

        keys.map((key, i) => {
          const value = values[key];
          if (value) {
            queryStr += `&${key}=${value}`;
          }
        });

        window.open(`/index.php?_url=/user/integral/export${queryStr}`);
      }, 200);
      // dispatch({
      //     type: 'userIntegralQuery/fetch',
      //     payload: values,
      // });
    });
  };
  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.header} style={{ position: 'reletive' }}>
        <div>
          <span>创建时间：</span>
          <RangePicker
            style={{ position: 'reletive' }}
            placeholder={['开始日期', '结束日期']}
            onChange={data => {
              console.log(data);
            }}
          />
          <span>创建人：</span>
          <Select
            value={'name'}
            size={'small'}
            style={{ width: '100px' }}
            onChange={this.handleCurrencyChange}
          >
            <Option value="name">陈坤</Option>
          </Select>
          <span>状态：</span>
          <Select
            value={'all'}
            size={'small'}
            style={{ width: '100px' }}
            onChange={this.handleCurrencyChange}
          >
            <Option value="all">全部</Option>
            <Option value="willpush">待上标</Option>
            <Option value="pushsuc">上标成功</Option>
            <Option value="pusherr">上标失败</Option>
          </Select>
          <Button style={{ float: 'right' }} type="primary" onClick={() => {}}>
            查询
          </Button>
        </div>
        <div style={{ margin: '10px 0' }}>
          <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {}}>
            批量上标
          </Button>
          <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {}}>
            批量删除数据
          </Button>
          <Button style={{ float: 'right' }} type="primary" onClick={() => {}}>
            添加业务
          </Button>
        </div>
      </div>
    );
  }

  getColumns = () => {
    const columns = [
      {
        key: '2',
        title: '导入时间',
        dataIndex: 'initdate',
      },
      {
        key: '3',
        title: '姓名',
        dataIndex: 'founder',
      },
      {
        key: '4',
        title: '身份证号码',
        dataIndex: 'num',
      },
      {
        title: '手机号码',
        key: '5',

        dataIndex: 'name',
      },
      {
        title: '标的总额',
        key: '6',

        dataIndex: 'money',
      },
      {
        title: '期限',
        key: '7',

        dataIndex: 'address',
      },
      {
        title: '期限类型',
        key: '8',

        dataIndex: 'founddate',
      },
      {
        title: '期数',
        key: '9',

        dataIndex: 'legalperson',
      },
      {
        title: '收款开户行',
        key: '10',

        dataIndex: 'use',
      },
      {
        title: '收款开户账号',
        key: '11',

        dataIndex: 'status',
      },{
        title: '账号类型',
        key: '12',

        dataIndex: 'status',
      },{
        title: '开户名',
        key: '13',

        dataIndex: 'status',
      },{
        title: '协议编号',
        key: '14',

        dataIndex: 'status',
      },{
        title: '品牌型号',
        key: '15',

        dataIndex: 'status',
      },{
        title: '颜色',
        key: '16',

        dataIndex: 'status',
      },{
        title: '车架号',
        key: '17',

        dataIndex: 'status',
      },{
        title: '发动机号',
        key: '18',

        dataIndex: 'status',
      },{
        title: '数量',
        key: '19',

        dataIndex: 'status',
      },{
        title: '单价',
        key: '20',

        dataIndex: 'status',
      },{
        title: '总计金额',
        key: '21',

        dataIndex: 'status',
      },{
        title: '首付人民币',
        key: '22',

        dataIndex: 'status',
      },{
        title: '余额人民币',
        key: '23',

        dataIndex: 'status',
      },{
        title: '共同还款人姓名',
        key: '24',

        dataIndex: 'status',
      },{
        title: '共同还款人身份证号码',
        key: '25',

        dataIndex: 'status',
      },{
        title: '公司全称',
        key: '26',

        dataIndex: 'status',
      },{
        title: '组织机构代码',
        key: '27',

        dataIndex: 'status',
      },{
        title: '签约日期（年）',
        key: '28',

        dataIndex: 'status',
      },{
        title: '签约日期（月）',
        key: '29',

        dataIndex: 'status',
      },{
        title: '签约日期（日）',
        key: '30',

        dataIndex: 'status',
      },{
        title: '保理公司名称',
        key: '31',

        dataIndex: 'status',
      },{
        title: '是否融资人分账',
        key: '32',

        dataIndex: 'status',
      },{
        title: '状态',
        key: '33',

        dataIndex: 'status',
      },
      {
        title: '操作',
        key: '34',

        render: row => {
          if (row.key!=2) {
            return (<div>
              <Button type='danger'>
                <a href={`#/supplychain/handlecompany?uid=${row.uid}`}>修改</a>              
              </Button>
              <Button type='primary'>推送</Button>
            </div>)
          }else{
            return (<Fragment>
              <Button type='primary' style={{marginLeft:'20px'}}>
              
              <a href={`#/supplychain/supplychainprivateinfo?uid=${row.uid}`}>查看详情</a>
              </Button>

            </Fragment>)
          }
        },
      },
    ];

    return columns;
  };

  render() {
    const { userIntegralQuery, loading } = this.props;

    const data = [
      {
        key: '1',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },
      {
        key: '2',
        initdate: '10/11',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },
      {
        key: '3',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },
      {
        key: '4',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '5',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '6',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '7',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '8',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '9',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '10',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '11',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '12',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '13',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '14',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },{
        key: '15',
        initdate: '10/1',
        founder: 'ck',
        num: '123456',
        name: '杭州',
        money: 1,
        address: '杭州',
        founddate: '1/2',
        legalperson: 'ck',
        use: 'piao',
        status: 'dai',
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      // selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps:record=>({
        disabled:record.currentPage=='1',
        // display:'none',
      })
    };
    return (
      <PageHeaderLayout title="业务发起">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} style={{ marginBottom: '25px' }}>
              {this.renderForm()}
            </div>
            {/* <StandardTable
                            loading={loading}
                            data={data}
                            columns={this.getColumns()}
                            onChange={this.handleStandardTableChange}
                        /> */}
            <Table
              columns={this.getColumns()}
              // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={data}
              rowSelection={rowSelection}
              scroll={{x:4000}}
              pagination={{
                total:this.state.data?this.state.data.totalCount:1,
                showSizeChanger:true,
                showTotal:function (total) {return `总计${total}条记录`  },
                pageSizeOptions:['10','20','50'],
                current:this.state.page,
              }}
            />
            <div style={{position:'relative'}}>
              <Button style={{position:'absolute',top:'-50px',left:'100px'}} type="primary" icon="reload"  >
                刷新
              </Button>
            </div>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
