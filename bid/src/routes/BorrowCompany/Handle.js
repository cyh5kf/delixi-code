/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { handlecompany,updCompany ,openAccount,queryAssetArea} from '../../services/api'
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
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
} from 'antd';
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
    id: getParam(window.location.href, 'id'),
    data:null,
    sourcelist:[],
  };

  componentDidMount() {
    this.getdata()
    this.getsource()
  };

  async getsource(){
    const res = await queryAssetArea()
    if (res.success) {
      this.setState({
        sourcelist:res.data
      })
    }
  }

  async getdata(){
    const data = await handlecompany({id:this.state.id})
    this.setState({
      data:data.data
    })
  }

  async fetch1(values) {
    console.log(values.foundmoney)
    const params={
      id:this.state.id,
      frdbName:values.founder,
      workAddress:values.address,
      industry:values.class,
      companyName:values.companyname,
      companyRegNo:values.businesslicense,
      linkmanPhone:values.phone,
      taxRegNo:values.creditnum,
      bankCardId:values.bankcard,
      bankName:values.bankName,
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
      idCard:values.idCard,
      administrativeSanction:values.punish,
      repaySource:values.moneysource,
      repayGuarantee:values.safeguard,
      creditReport:values.borrowerinfo,
      createUser:JSON.parse(window.localStorage.getItem('userInfo')).username,
      cityCode:values.cityCode,
      codeProvince:values.codeProvince,
      codeBank:values.codeBank,
      bankBranch:values.bankBranch,
      companyArea:values.companyArea,
    }
    // console.log(moment(values.founddate).format('YYYY-MM-DD'))
    const res = await updCompany(params)
    if (res&&res.success) {
      message.success('保存成功')
      this.props.history.push('/borrowcompany/managecompany')
    }
  }

  async fetch2(values) {
    const {companyName,companyRegNo,linkmanPhone,taxRegNo,bankCardId,bankName} = this.state.data
    const params={
      companyName,companyRegNo,linkmanPhone,taxRegNo,bankCardId,bankName,
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
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.fetch1(values)
      }
    });
  }
 save=(e)=>{
   btn=e
 }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 12
      },
      wrapperCol: {
         span: 12
      },
    };
    const data = this.state.data
    const date = data?data.foundingTime:'2018-01-01'
    return (
      <PageHeaderLayout title="添加企业">
        <div className={styles.info}>
          <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
          <div className={styles.content} style={{lineHeight:'35px'}}>
            <div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>全称或简称：</p>
                <div className={styles.tal}>
                  <FormItem 
                >
                  {getFieldDecorator('companyname',{initialValue:data?data.companyName:''})(<Input disabled={data&&data.openStatus==1?true:false} />)}
                </FormItem>
                </div>
                <p className={styles.tar}>营业执照编号：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('businesslicense',{initialValue:data?data.companyRegNo:''})(<Input />)}
                </FormItem>
                </div>                
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>法定代表人：</p>
                <div className={styles.tal}>
                  <FormItem
                  >
                    {getFieldDecorator('founder',{initialValue:data?data.frdbName:'',rules: [{ required: true, message: '请输入法定代表人'  ,pattern:/^\S+$/}]})(<Input />)}
                  </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>办公地点：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('address',{initialValue:data?data.workAddress:'',rules: [{ required: true, message: '请输入办公地点'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>机构联系人手机：</p>
                <div className={styles.tal}>
                  <FormItem 
                  >
                  {getFieldDecorator('phone',{initialValue:data?data.linkmanPhone:'',rules: [{ required: true, message: '请输入机构联系人手机号'  ,pattern:/^1\d{10}$/}]})(<Input  disabled={data&&data.openStatus==1?true:false} />)}
                  </FormItem>
                </div>
                <p className={styles.tar}>所属行业：</p>
                <div className={styles.tal}>
                  <FormItem >
                    {getFieldDecorator('class',{initialValue:data?data.industry:'',rules: [{  message: '请输入所属行业'  ,pattern:/^\S+$/}]})(<Input />)}
                  </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>统一社会信用代码：</p>
                <div className={styles.tal}>
                  <FormItem
                  >
                    {getFieldDecorator('creditnum',{initialValue:data?data.taxRegNo:'',rules: [{  message: '请输入社会信用代码'  ,pattern:/^\S{18}$/}]})(<Input  disabled={data&&data.openStatus==1?true:false}/>)}
                  </FormItem>
                </div>
                <p className={styles.tar}>实缴资本（万元）：</p>
                <div className={styles.tal}>
                  <FormItem>
                    {getFieldDecorator('payment',{initialValue:data?data.actualCapital:'',rules: [{ message: '请输入实缴资本'  ,pattern:/^\S+$/}]})(<Input />)}
                  </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>组织机构代码：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('organizationnum',{initialValue:data?data.zzjgCode:'',rules: [{ message: '请输入组织机构代码'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>法定代表人信用信息：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('foundinfo',{initialValue:data&&data.fddbrCreditInfo?data.fddbrCreditInfo:'良好',rules: [{message: '请输入法定代表人信用'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>注册资本（万元）：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('foundmoney',{initialValue:data?data.regCapital:'',rules: [{message: '请输入注册资本'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>经营状况及财务状况：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('runstatus',{initialValue:data&&data.financialStanding?data.financialStanding:'正常',rules: [{ message: '请输入经营状况'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>注册地址：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('foundaddress',{initialValue:data?data.regAddress:'',rules: [{ message: '请输入注册地址'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>资金运用情况：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('runmoney',{initialValue:data&&data.capitalSituation?data.capitalSituation:'补充企业经营性现金流',rules: [{message: '资金运用情况'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>成立时间：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('founddate',{initialValue:moment(date),rules: [{ required: true, message: '请输入成立时间' }]})(<DatePicker />)}
                </FormItem>
                </div>
                <p className={styles.tar}>股东信息：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('shareholderinfo',{initialValue:data?data.partnerInfo:'',rules: [{message: '请输入股东信息' ,pattern:/^\S+$/ }]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>借款用途：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('use',{initialValue:data&&data.loanUsage?data.loanUsage:'补充企业经营性现金流',rules: [{message: '请输入借款用途' ,pattern:/^\S+$/ }]})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>经营区域：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('runaddress',{initialValue:data&&data.operateArea?data.operateArea:'全国',rules: [{ message: '请输入经营区域' ,pattern:/^\S+$/ }]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>涉诉情况：</p>
                <div className={styles.tal}>
                  <FormItem 
                >
                  {getFieldDecorator('law',{initialValue:data&&data.caseComplaint?data.caseComplaint:'无',rules: [{ message: '请输入涉诉情况'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>行政处罚情况：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('punish',{initialValue:data&&data.administrativeSanction?data.administrativeSanction:'无',rules: [{ message: '请输入行政处罚情况'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>还款来源：</p>
                <div className={styles.tal}>
                  <FormItem 
                >
                  {getFieldDecorator('moneysource',{initialValue:data&&data.repaySource?data.repaySource:'融资方自有资金还款或核心企业/融资方法人提供无限连带担保责任',rules: [{ message: '请输入还款来源'  ,pattern:/^\S+$/}]})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>还款保障措施：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('safeguard',{initialValue:data&&data.repayGuarantee?data.repayGuarantee:'核心企业/融资方法人提供无限连带担保责任',rules: [{message: '请输入还款保障措施' ,pattern:/^\S+$/ }]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>银行卡账号：</p>
                <div className={styles.tal}>
                <FormItem 
                >
                  {getFieldDecorator('bankcard',{initialValue:data?data.bankCardId:''})(<Input disabled={data&&data.openStatus==1?true:false} />)}
                </FormItem>
                </div>
                <p className={styles.tar}>借款人征信报告情况：</p>
                <div className={styles.tal}>
                <FormItem 
                >
                  {getFieldDecorator('borrowerinfo',{initialValue:data&&data.creditReport?data.creditReport:'无报告',rules: [{ message: '请输入借款人征信情况' ,pattern:/^\S+$/ }]})(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>开户银行：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('bankName', {
                    initialValue:data?data.bankName:'',
                  rules: [{ required: true, message: '请输入正确开户银行' ,pattern:/^\S+$/}],
                  })(<Input disabled={data&&data.openStatus==1?false:false} />)}
                </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>法定代表人身份证号码：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('idCard', {
                    initialValue:data?data.idCard:'',
                    rules: [{ required: true, message: '请输入正确法定代表人身份证号码' ,pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/}],
                  })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>城市编码：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('cityCode', {
                    initialValue:data?data.cityCode:'',
                  rules: [{ required: true, message: '请输入正确城市编码' ,pattern:/^\w+$/}],
                  })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>开户行所在省编码：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('codeProvince', {
                    initialValue:data?data.codeProvince:'',
                    rules: [{ required: true, message: '请输入正确省编码' ,pattern:/^\w+$/}],
                  })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>银行编码：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('codeBank', {
                    initialValue:data?data.codeBank:'',
                  rules: [{ required: true, message: '请输入正确银行编码' ,pattern:/^\w+$/}],
                  })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>开户支行名称：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('bankBranch', {
                    initialValue:data?data.bankBranch:'',
                  rules: [{ required: true, message: '请输入正确开户支行名称' ,pattern:/^\S+$/}],
                  })(<Input />)}
                </FormItem>
                </div>
              </div>
              {/* <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>资产来源：</p>
                <div className={styles.tal}>
                  <FormItem hasFeedback formItemLayout={{wrapperCol:{span:14}}}>
                    {getFieldDecorator('companyArea',{
                      rules: [{ required: true, message: '请选择资产来源' }],
                      initialValue:data?data.companyArea:'',            
                    })(
                      <Select style={{width:'178px'}}>
                        <Option value=''>全部</Option>
                        {
                          this.state.sourcelist.map((item,index)=>{
                            return <Option key={index} value={item}>{item}</Option>
                          })
                        }
                      </Select>
                    )}
                  </FormItem>
                </div>
                <p className={styles.tar}></p>
                <div className={styles.tal}>
                </div>
              </div> */}

            </div>
              
          </div>
            <div style={{margin:'0 auto',width:'500px'}}>
              <Button  onClick={()=>{
                window.history.go(-1)
                }} style={{marginLeft:'50px'}}>
                返回
              </Button>
              <Button htmlType='submit' style={{marginLeft:'100px'}} type="primary">保存</Button>
              {/* <Button disabled={data&&data.openStatus==1?true:false} onClick={this.fetch2.bind(this)} style={{marginLeft:'100px'}} type="primary">开户</Button> */}
            </div>
          </Form>
        </div>
        <div className={styles.footer}>
          
          
        </div>
      </PageHeaderLayout>
    );
  }
}

