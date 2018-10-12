/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {  } from '../../../services/api'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Tooltip,
  Cascader,
  Checkbox,
  AutoComplete,
  Select,
  Icon,
  Button,
  Table,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './index.less';
import { getParam } from '@/utils/utils.js';

const FormItem =Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option; 
var btn = null;


@connect(({ integralRecord, loading }) => ({
  integralRecord,
  loading: loading.models.integralRecord,
}))
@Form.create()
export default class IntegralRecord extends PureComponent {
  state = {
    formValues: {},
    uid: getParam(window.location.href, 'uid'),
    selectedids:[],
  };

  componentDidMount() {
    
  };

  onSelectChange = (selectedRowKeys,selectedRows) => {
    var selectedids = []
    selectedids=selectedRows.map(item=>item.assetId)
    console.log('selectedRowKeys changed: ', selectedids);
    this.setState({ selectedids });
  };

  async fetch(values) {
    const params={
      companyName:values.companyname,
      companyRegNo:values.businesslicense,
      frdbName:values.founder,
      workAddress:values.address,
      linkmanPhone:values.phone,
      industry:values.class,
      taxRegNo:values.creditnum,
      actualCapital:values.payment,
      zzjgCode:values.organizationnum,
      fddbrCreditInfo:values.foundinfo,
      regCapital:values.foundmoney,
      financialStanding:values.runstatus,
      regAddress:values.foundaddress,
      capitalSituation:values.runmoney,
      foundingTime:moment(values.founddate).format('YYYY-MM-DD'),
      partnerInfo:values.shareholderinfo,
      loanUsage:values.use,
      operateArea:values.runaddress,
      caseComplaint:values.law,
      administrativeSanction:values.punish,
      repaySource:values.moneysource,
      repayGuarantee:values.safeguard,
      creditReport:values.borrowerinfo,
      createUser:JSON.parse(window.localStorage.getItem('userInfo')).username,
      bankCardId:values.bankcard
    }
    console.log(params)
    const res = await addcompany(params)
    if (res&&res.success) {
      window.open(res.data);
      this.props.history.push('/borrowcompany/managecompany')
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        console.log('fetch')
        this.fetch(values)
      }
    });
  }
 save=(e)=>{
   btn=e
 }

 async getlist(){
  // const {page,pagesize,creatUser,endTime,startTime} = this.state
  // const obj={
  //   companyName,creatUser,endTime,startTime
  // };
  // var params ={
  //   page,
  //   pagesize,
  // };
  // for (const key in obj) {
  //   if (obj[key]) {
  //     params[key] = obj[key];
  //   }
  // }

  // const res = await searchcompany(params)
  // console.log(params,res)
  // this.setState({data:res.backObj})
}

 getColumns = () => {
  const columns = [
    {
      key: '2',
      title: '序号',
      dataIndex: 'createTime',
    },
    {
      key: '3',
      title: '订单号码',
      dataIndex: 'createUser',
    },
    {
      key: '4',
      title: '资产编号',
      dataIndex: 'assetId',
    },
    {
      title: '推送批次号',
      key: '5',

      dataIndex: 'companyName',
    },
    {
      title: '借款人',
      key: '6',

      dataIndex: 'borrowMoney',
    },
    {
      title: '资产平台',
      key: '7',

      dataIndex: 'borrowDeadline',
    },
    {
      title: '接收时间',
      key: '8',

      dataIndex: 'borrowDate',
    },
    {
      title: '借款金额',
      key: '9',

      dataIndex: 'repayType',
    },
    {
      title: '资产状态',
      key: '10',

      dataIndex: 'openBranch',
    },
    {
      title: '推送时间',
      key: '11',

      dataIndex: 'currentPage',
    },
    {
      title: '操作',
      key: '12',

      render: row => {
        if (row.assetId=='10') {
          return (<div>
            <Button type='primary' onClick={()=>{}}>上标</Button>
          </div>)
        }else{
          return (<Fragment>
            <Button type='primary'>
              <a href={`#/expenditure/d02/propertyinfo?uid=${row.uid}`}>查看详情</a>
            </Button>
          </Fragment>)
        }
      },
    },
  ];

  return columns;
};

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const {  loading } = this.props;

    const data = [
      {
        key: '1',
        "createTime": "2017-10-29",//创建时间
        "createUser": "xx",//创建人
        "assetId": "10",//编号
        "companyName": "xxx",//借款企业名称
        "borrowMoney": 10,//借款金额
        "borrowDeadline": 10,//借款期限
        "borrowDate": "2017-10-29",//借款日期
        "repayType": "0",//还款方式
        "openBranch": "xx支行",//收款银行名称
        "currentPage": "0",//状态
      },
      {
        key: '2',
        "createTime": "2017-10-29",//创建时间
      "createUser": "xx",//创建人
      "assetId": "10",//编号
      "companyName": "xxx",//借款企业名称
      "borrowMoney": 10,//借款金额
      "borrowDeadline": 10,//借款期限
      "borrowDate": "2017-10-29",//借款日期
      "repayType": "0",//还款方式
      "openBranch": "xx支行",//收款银行名称
      "currentPage": "0",//状态
      },
      {
        key: '3',
        "createTime": "2017-10-29",//创建时间
        "createUser": "xx",//创建人
        "assetId": "10",//编号
        "companyName": "xxx",//借款企业名称
        "borrowMoney": 10,//借款金额
        "borrowDeadline": 10,//借款期限
        "borrowDate": "2017-10-29",//借款日期
        "repayType": "0",//还款方式
        "openBranch": "xx支行",//收款银行名称
        "currentPage": "0",//状态
      },
      {
        key: '4',
        "createTime": "2017-10-29",//创建时间
      "createUser": "xx",//创建人
      "assetId": "10",//编号
      "companyName": "xxx",//借款企业名称
      "borrowMoney": 10,//借款金额
      "borrowDeadline": 10,//借款期限
      "borrowDate": "2017-10-29",//借款日期
      "repayType": "0",//还款方式
      "openBranch": "xx支行",//收款银行名称
      "currentPage": "1",//状态
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
      getCheckboxProps:record=>({
        disabled:record.currentPage=='1',
        // display:'none',
      })
    };
    return (
      <PageHeaderLayout >
        <div className={styles.info}>
          <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
          <div style={{lineHeight:'35px'}}>
                  <FormItem label='订单号码'
                  >
                    {getFieldDecorator('founder')(<Input />)}
                  </FormItem>
                  <FormItem label='资产编号'
                  >
                    {getFieldDecorator('founde')(<Input />)}
                  </FormItem>
                  <FormItem label='借款人'
                  >
                    {getFieldDecorator('foundr')(<Input />)}
                  </FormItem>
                  <FormItem label='批次号码'
                  >
                    {getFieldDecorator('founer')(<Input />)}
                  </FormItem>
                  <FormItem label='资产平台'
                  >
                    {getFieldDecorator('fouder')(<Select style={{width:'100px'}}>
                      <Option value="all">全部</Option>
                      <Option value="yirong">易融钱包</Option>
                      <Option value="pingguo">苹果贷</Option>
                      <Option value="wuban">五板钱包</Option>
                      <Option value="kale">卡乐贷</Option>
                      <Option value="jinyu">金鱼白卡</Option>
                      <Option value="other">其他</Option>
                    </Select>)}
                  </FormItem>
                  <FormItem label='资产状态'
                  >
                    {getFieldDecorator('funder')(<Select style={{width:'100px'}}>
                      <Option value="all">全部</Option>
                      <Option value="yirong">待上标</Option>
                      <Option value="pingguo">上标中</Option>
                      <Option value="wuban">上标成功</Option>
                      <Option value="kale">上标失败</Option>
                    </Select>)}
                  </FormItem>
          </div>
            <div className={styles.searchbtn}>
              <Button onClick={()=>{}} style={{float:'right',marginLeft:'150px'}}>批量上标</Button>
              <Button htmlType='submit' style={{float:'right'}} type="primary">搜索</Button>
              <Button onClick={()=>{this.props.form.resetFields()}} style={{float:'right',marginRight:'20px'}} type="primary">重置</Button>
            </div>
          </Form>
        </div>
        <div className={styles.footer}>
        <Table
              columns={this.getColumns()}
              // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={data}
              rowSelection={rowSelection}
              onChange={(p)=>{this.setState({page:p.current,pagesize:p.pageSize},this.getlist.bind(this))}}
              pagination={{
                total:this.state.data?this.state.data.totalCount:1,
                showSizeChanger:true,
                showTotal:function (total) {return `总计${total}条记录`  },
                pageSizeOptions:['10','20','50'],
                current:this.state.page,
              }}
            />
            <div style={{position:'relative'}}>
              <Button onClick={this.getlist.bind(this)} style={{position:'absolute',top:'-50px',left:'100px'}} type="primary" icon="reload"  >
                刷新
              </Button>
            </div>
          
        </div>
      </PageHeaderLayout>
    );
  }
}

