/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { channelcompanycreate,getbank} from '../../../services/api'
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
  Table,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Upload,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './index.less';
import { getParam } from '@/utils/utils.js';

const FormItem =Form.Item;
const Option = Select.Option;
var btn = null;
// const AutoCompleteOption = AutoComplete.Option; 

@connect(({ integralRecord, loading }) => ({
  integralRecord,
  loading: loading.models.integralRecord,
}))
@Form.create()
export default class IntegralRecord extends PureComponent {
  state = {
    formValues: {},
    uid: getParam(window.location.href, 'uid'),
    selectcompany:'请选择',
    modaldata:null,
    modalpage:1,
    modalpagesize:10,
    assetId:null,
    companyName:null,
    banklist:[],
  };

  componentDidMount() {
    // this.bank()
  };
  async bank(){
    const res = await getbank()
    if(res.success){
      this.setState({
        banklist:res.data
      })

    }
  }
  handleChange = (info) => {
    let fileList = info.fileList;
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ fileList });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        this.tofetch(values)        
      }
    });
  }

  async tofetch(values) {
    const params={
      pname:values.pname,
      productId:values.productId,
      companyCurrent:values.companyCurrent,
      companyDivided:values.companyDivided,
      bankBranch:values.bankBranch,
      bankAccount:values.bankAccount,
      mobile:values.mobile,
      companyRegNo:values.companyRegNo,
      taxRegNo:values.taxRegNo,
      bankBigNumber:values.bankBigNumber,
      cityCode:values.cityCode,
      codeProvince:values.codeProvince,
      codeBank:values.codeBank,
    }
    const res = await channelcompanycreate(params)
    if (res&&res.success) {
      message.success('开户成功') 
      this.props.history.push('/borrowcompany/channelmanage')
    }
    // message.error(res.msg)
  }

  save=(e)=>{
    btn=e
  }

  getColumns = () => {
    const columns = [
      {
        key: '1',
        title: '借款企业名称',
        dataIndex: 'companyName',
      },
      {
        key: '2',
        title: '开户状态',
        dataIndex: 'statustxt',
      },{
        title: '',
        key: '12',
        render: row => {
            return (
              <Button onClick={()=>{
                this.setState({
                  selectcompany:row.companyName,
                  assetId:row.assetId,
                })
              }}>
                选择           
              </Button>)
        },
      }
    ];

    return columns;
  };

  render() {
    const fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    }];
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange: this.handleChange,
      multiple: true,
    };
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const list = this.state.modaldata
    var data=[];
    if (list) {
      data=list.map((item,index)=>{
        const obj={
          key: index+'',
          companyName: item.companyName,
          status:item.openstatus,
          assetId:item.assetId,
          statustxt:item.openStatus=='0'?'未开户':item.openStatus=='1'?'已开户':'禁用',
        }
        return obj
      })
    }
    return (
      <PageHeaderLayout title="新建渠道管理">
        <div className={styles.info}>
          <div className={styles.conten} style={{paddingTop:'50px'}}>
            <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
              <div className={styles.content} style={{lineHeight:'35px'}}>
                <div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>渠道名称：</p>
                    <div className={styles.tal}>
                      <FormItem
                      >
                        {getFieldDecorator('pname',{
            rules: [{ required: true, message: '请输入正确渠道项目名称' ,pattern:/^\S/}],
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>产品编号：</p>
                    <div className={styles.tal}>
                    <FormItem
                      >
                        {getFieldDecorator('productId',{
            rules: [{ required: true, message: '请输入正确的产品编号' ,pattern:/^\S/}],
          })(<Input />)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>渠道公司名称：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('companyCurrent',{
            rules: [{ required: true, message: '请输入正确渠道公司名称'  ,pattern:/^\S/}],
          })(<Input />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>保理公司名称：</p>
                    <div className={styles.tal}>
                    <FormItem 
                    >
                      {getFieldDecorator('companyDivided',{
                        rules: [{ required: true, message: '请输入正确保理公司名称' ,pattern:/^\S/}],
                      })(<Input />)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>手机号：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('mobile',{
            rules: [{ required: true, pattern: /^1\d{10}$/, message: '请输入正确手机号'  ,pattern:/^\S/}],
          })(<Input />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}>开户银行：</p>
                    <div className={styles.tal}>
                      <FormItem >
                      {getFieldDecorator('bankBranch',{
            // rules: [{ required: true, message: '请输入开户银行' }],
          })(<Input />)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>保理公司银行卡号：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('bankAccount',{
            rules: [{ required: true, message: '请输入保理公司银行卡号'  ,pattern:/^\S/}],
          })(<Input />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}>大额行号：</p>
                    <div className={styles.tal}>
                      <FormItem>
                      {getFieldDecorator('bankBigNumber',{
            // rules: [{ required: true, message: '请输入大额行号' }],
          })(<Input />)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}>城市编码：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('cityCode',{
            // rules: [{ required: true, message: '请输入城市编码' }],
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}>开户行所在省编码：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('codeProvince',{
            // rules: [{ required: true, message: '' }],
          })(<Input />)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}>银行编码：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('codeBank',{
            // rules: [{ required: true, message: '请输入银行编码' }],
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}>营业执照编号：</p>
                    <div className={styles.tal}>
                    <FormItem 
                      >
                        {getFieldDecorator('companyRegNo',{
            rules: [{ message: '请输入正确营业执照编码'  ,pattern:/^\S/}],
          })(<Input />)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>社会信用代码证：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('taxRegNo',{
            rules: [{ required: true, message: '请输入正确社会信用代码证'  ,pattern:/^\S/}],
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}></p>
                    <div className={styles.tal}>
                    </div>
                  </div>
                </div>
                  
              </div>
              <div style={{margin:'0 auto',width:'500px',marginTop:'100px'}}>
                <Button  onClick={()=>{window.history.go(-1)}} style={{marginLeft:'50px'}}>
                  返回
                </Button>
                <Button htmlType='submit' style={{marginLeft:'100px'}} type="primary">保存</Button>
              </div>
            </Form>
          </div>
        </div>     
      </PageHeaderLayout>
    );
  }
}

