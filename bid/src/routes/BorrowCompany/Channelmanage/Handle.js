/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { channelcompanyinfo,updatechannelcompany } from '../../../services/api'
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
    id: getParam(window.location.href, 'uid'),
    selectcompany:'请选择',
    showmodal:false,
    modaldata:null,
    modalpage:1,
    modalpagesize:10,
    assetId:null,
    companyName:null,
    params:null,
    // params:this.props.location.params
  };

  componentDidMount() {
    this.getdetail()
  };

  async getdetail(){
    const obj = {
      id:this.state.id
    }
    const res = await channelcompanyinfo(obj)
    if (res&&res.success) {
      this.setState({
        params:res.data
      })
    }
  }

  async fetch2(values) {
    const {companyName,companyRegNo,linkmanPhone,taxRegNo,bankCardId} = this.state.data
    const params={
      companyName,companyRegNo,linkmanPhone,taxRegNo,bankCardId,id:this.state.id
    }
    var newWindow = window.open();
    const res = await openAccount(params)
    if (res&&res.success) {
      if (res.data) {
        newWindow.location.href = res.data;
      }
      this.props.history.push('/borrowcompany/managecompany')
    }else{
      newWindow.close();
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
    console.log(34)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(56)
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
      id:this.state.id,
    }
    const res = await updatechannelcompany(params)
    if (res&&res.success) {
      message.success('更改成功')
      // window.open(res.data);
      this.props.history.push('/borrowcompany/channelmanage')
    }
  }

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

    const {params} = this.state
    if(!params){
      return null
    }
    return (
      <PageHeaderLayout title="添加业务合同">
        <div className={styles.info}>
          <div className={styles.conten} style={{marginTop:'100px'}}> 
            <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
              <div className={styles.content} style={{lineHeight:'35px'}}>
                <div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>项目名称：</p>
                    <div className={styles.tal}>
                      <FormItem
                      >
                        {getFieldDecorator('pname',{
            rules: [{ required: true, message: '请输入正确项目名称'}],
            initialValue:params.pname,
          })(<Input disabled />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>产品编号：</p>
                    <div className={styles.tal}>
                    <FormItem
                      >
                        {getFieldDecorator('productId',{
            rules: [{ required: true, message: '请输入正确的产品编号'}],
            initialValue:params.productId,            
          })(<Input disabled/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>公司名称：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('companyCurrent',{
            rules: [{ required: true, message: '请输入正确公司名称' }],
            initialValue:params.companyCurrent,            
          })(<Input disabled/>)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>保理公司名称：</p>
                    <div className={styles.tal}>
                    <FormItem 
                    >
                      {getFieldDecorator('companyDivided',{
                        initialValue:params.companyDivided,            
                      })(<Input disabled/>)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>userId：</p>
                    <div className={styles.tal}>
                    <FormItem 
                      >
                        {getFieldDecorator('taxRegNo',{
            // rules: [{ required: true, message: '请输入银行编码' }],
            initialValue:params.userId,            
          })(<Input disabled={params.userId?true:false}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}>开户银行：</p>
                    <div className={styles.tal}>
                      <FormItem >
                      {getFieldDecorator('bankBranch',{
            // rules: [{ required: true, message: '请输入开户银行' }],
                initialValue:params.bankBranch,                                    
          })(<Input disabled={true}/>)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}>银行账户：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('bankAccount',{
            // rules: [{ required: true, message: '请输入银行账户' }],
            initialValue:params.bankAccount,                                                
          })(<Input disabled={true}/>)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}>大额行号：</p>
                    <div className={styles.tal}>
                      <FormItem>
                      {getFieldDecorator('bankBigNumber',{
            // rules: [{ required: true, message: '请输入大额行号' }],
            initialValue:params.bankBigNumber,                                                            
          })(<Input disabled={true}/>)}
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
            initialValue:params.cityCode,                                                                        
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}>开户行所在省编码：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('codeProvince',{
            // rules: [{ required: true, message: '' }],
            initialValue:params.codeProvince,                                                                                    
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
            initialValue:params.codeBank,
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
                {/* <Button  disabled={params.userId?true:false} onClick={this.fetch2.bind(this)} style={{marginLeft:'100px'}} type="primary">开户</Button> */}
              </div>
            </Form>
          </div>         
        </div>  
      </PageHeaderLayout>
    );
  }
}

