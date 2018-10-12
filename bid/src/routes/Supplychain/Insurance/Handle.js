/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { searchcompanyid,updatecompanyzichan } from '../../../services/api'
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
    contractUrl:'',  //合同附件
    agreementUrl:'', // 协议附件
    saleContractUrl:'', //销售合同
    // params:this.props.location.params
  };

  componentDidMount() {
    this.getdetail()
  };

  async getdetail(){
    const obj = {
      id:this.state.id
    }
    const res = await searchcompanyid(obj)
    if (res&&res.success) {
      this.setState({
        params:res.backObj.recordList[0],
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
      id:this.state.params.id,
      borrowMoney:values.borrowMoney,
      borrowDeadline:values.borrowDeadline,
      contractNo:values.contractNo,
      openBranch:values.openBranch,
      repayType:values.repayType,
      borrowDate:moment(values.borrowDate).format('YYYY-MM-DD'),
    }

    if(this.state.contractUrl){
      params.contractUrl = this.state.contractUrl
    }
    if(this.state.agreementUrl){
      params.agreementUrl = this.state.agreementUrl
    }
    if(this.state.saleContractUrl){
      params.saleContractUrl = this.state.saleContractUrl
    }

    const res = await updatecompanyzichan(params)
    if (res&&res.success) {
      message.success('更改成功')
      // window.open(res.data);
      this.props.history.push('/supplychain/supplychaincompany')
    }
  }

  submit=()=>{
    const self = this;
    let form = new FormData()
    form.append('file', this.refs.refString.files[0])
    let xhr = new XMLHttpRequest()
    var timer;
    timer = setTimeout(() => {
      this.refs.refString.value = null,
      message.error("网络不佳，稍后再试")
    }, 5000);
    xhr.onload = () => {
        if (xhr.status == 200 || xhr.status == 304) {
            const data = JSON.parse(xhr.responseText)
            console.log(data)
            if (data.success) {
              clearTimeout(timer);
              self.setState({
                contractUrl:data.data
              })
            }
        }
    }
    xhr.open("POST", 'http://devbid.51rz.com/bidContract/upload')
    xhr.send(form)
  }

  submitxieyi=()=>{
    const self = this;    
    let form = new FormData()
    form.append('file', this.refs.xieyi.files[0])
    let xhr = new XMLHttpRequest()
    var timer;    
    timer = setTimeout(() => {
      message.error("网络不佳，稍后再试");      
      this.refs.xieyi.value = null
    }, 5000);
    xhr.onload = () => {
        if (xhr.status == 200 || xhr.status == 304) {
            const data = JSON.parse(xhr.responseText)
            if (data.success) {
              clearTimeout(timer);              
              self.setState({
                agreementUrl:data.data
              })
            }
        }
    }
    xhr.open("POST", 'http://devbid.51rz.com/bidContract/upload')
    xhr.send(form)
  }

  submitxiaoshou=()=>{
    const self = this;    
    let form = new FormData()
    form.append('file', this.refs.xiaoshou.files[0])
    let xhr = new XMLHttpRequest()
    var timer;
    
    timer = setTimeout(() => {
      message.error("网络不佳，稍后再试");      
      this.refs.xiaoshou.value = null
    }, 5000);
    xhr.onload = () => {
        if (xhr.status == 200 || xhr.status == 304) {
            const data = JSON.parse(xhr.responseText)
            if (data.success) {
              clearTimeout(timer);              
              self.setState({
                saleContractUrl:data.data
              })
            }
        }
    }
    xhr.open("POST", 'http://devbid.51rz.com/bidContract/upload')
    xhr.send(form)
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
                    <p className={styles.tar}><b>*</b>姓名：</p>
                    <div className={styles.tal}>
                      <FormItem
                      >
                        {getFieldDecorator('borrowMoney',{
                          rules: [{ required: true, message: '请输入正确借款金额',pattern: /^\d+(\.\d+)?$/ }],
                          initialValue:params.borrowMoney,
                        })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>身份证号码</p>
                    <div className={styles.tal}>
                      <FormItem hasFeedback formItemLayout={{wrapperCol:{span:14}}}>
                        {getFieldDecorator('outType',{
                          rules: [{ required: true, message: '请输入出账至' }],
                          initialValue:params.outType,            
                        })(
                          <Select disabled={true} style={{width:'178px'}}>
                            <Option value='0'>借款人银行卡</Option>
                            <Option value='1'>保理人</Option>
                          </Select>
                        )}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>手机号码：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('borrowDate',{
                        rules: [{ required: true, message: '请输入借款日期' }],
                        initialValue:moment(params.borrowDate)
                        })(<DatePicker />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>标的总额：</p>
                    <div className={styles.tal}>
                    <FormItem 
                    >
                      {getFieldDecorator('borrowDeadline',{
                        rules: [{ required: true, message: '请输入正确借款期限',pattern: /^[0-9]*$/ }],
                        initialValue:params.borrowDeadline,
                      })(<Input style={{width:'90px'}}/>)}
                    </FormItem>
                      <FormItem >
                      {getFieldDecorator('borrowDeadlinetype',{
                        rules: [{ required: true, message: '请输入正确借款期限类型' }],
                        initialValue:params.borrowDeadlineType+'',
                        })(
                      <Select style={{width:'72px'}}>
                        <Option value='1'>日</Option>
                        <Option value='2'>周</Option>
                        <Option value='3'>月</Option>
                        <Option value='5'>年</Option>
                      </Select>)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>期限：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('contractNo',{
                        rules: [{ required: true, message: '请输入借款合同编码'  ,pattern:/^\S/}],
                        initialValue:params.contractNo,
                        })(<Input />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>期限类型：</p>
                    <div className={styles.tal}>
                      <FormItem >
                      {getFieldDecorator('openBranch',{
                        rules: [{ required: true, message: '请输入收款银行名称' ,pattern:/^\S/ }],
                        initialValue:params.openBranch,
                        })(<Input />)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>期数：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('repayType',{
                        rules: [{ required: true, message: '请选择还款方式' }],
                        initialValue:params.repayType,
                        })(
                        <Select placeholder='请选择' style={{width:'178px'}}>
                          <Option value='0'>一次性还本付息</Option>
                          <Option value='1'>按月付息，到期还本</Option>
                        </Select>
                      )}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款开户行：</p>
                    <div className={styles.tal}>
                      <FormItem>
                      {getFieldDecorator('payeeName',{
                        rules: [{ required: true, message: '请输入收款帐户名' }],
                        initialValue:params.payeeName,
                        })(<Input disabled={true}/>)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>收款开户账号：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>账号类型：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>开户名：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('istYear',{
                          rules: [{ required: true, message: '请输入年化收益率' }],
                          initialValue:params.istYear,            
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}>协议编号</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('istYear',{
                          rules: [{ required: true, message: '请输入年化收益率' }],
                          initialValue:params.istYear,            
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>开户名：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>协议编号：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>品牌型号：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>颜色：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>车架号：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>发动机号：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>数量：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>单价：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>总计金额：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>首付人民币：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>余款人民币：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>共同还款人姓名：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>共同还款人身份证号：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>公司全称：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>组织机构代码：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>签约日期：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>保理公司名称：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利息' }],
                          initialValue:params.financInt,
                        })(<Input disabled={true}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>是否融资人分账：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
                          rules: [{ required: true, message: '请输入收款银行账号' }],
                          initialValue:params.withdrawAccount,
                          })(<Input disabled={true}/>)}
                      </FormItem>
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

