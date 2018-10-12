/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { addcompany, getbank, queryAssetArea } from '../../services/api'
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
    banklist:[],
    sourcelist:[],//资金来源列表
    load:true,
  };

  componentDidMount() {
    // this.bank()
    // this.getsource()
  };
  async getsource(){
    const res = await queryAssetArea()
    if (res.success) {
      this.setState({
        sourcelist:res.data,
        load:false
      },()=>{console.log(this.state.sourcelist)})
    }
  }
  async bank(){
    const res = await getbank()
    if(res.success){
      this.setState({
        banklist:res.data||[]
      })

    }
  }

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
      bankName:values.bankName,
      idCard:values.idCard,
      operateArea:values.runaddress,
      caseComplaint:values.law,
      administrativeSanction:values.punish,
      repaySource:values.moneysource,
      repayGuarantee:values.safeguard,
      creditReport:values.borrowerinfo,
      createUser:JSON.parse(window.localStorage.getItem('userInfo')).username,
      bankCardId:values.bankcard,
      cityCode:values.cityCode,
      codeProvince:values.codeProvince,
      codeBank:values.codeBank,
      bankBranch:values.bankBranch,
      companyArea:values.companyArea,
    }
    const res = await addcompany(params)
    if (res&&res.success) {
      message.success('添加成功')
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
                  {getFieldDecorator('companyname', {
            rules: [{ required: true, message: '请输入公司名' ,pattern:/^\S+$/}],
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>营业执照编号：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('businesslicense', {
            rules: [{ message: '请输入营业执照编号'  ,pattern:/^\S+$/}],
          })(<Input />)}
                </FormItem>
                </div>                
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>法定代表人：</p>
                <div className={styles.tal}>
                  <FormItem
                  >
                    {getFieldDecorator('founder', {
            rules: [{ required: true, message: '请输入法定代表人姓名'  ,pattern:/^\S+$/}],
          })(<Input />)}
                  </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>办公地点：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('address', {
            rules: [{ required: true, message: '请输入办公地点'  ,pattern:/^\S+$/}],
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>机构联系人手机：</p>
                <div className={styles.tal}>
                  <FormItem 
                  >
                  {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入正确联系人手机号',pattern:/^1\d{10}$/}],
          })(<Input />)}
                  </FormItem>
                </div>
                <p className={styles.tar}>所属行业：</p>
                <div className={styles.tal}>
                  <FormItem >
                    {getFieldDecorator('class', {
                      rules: [{ message: '请输入正确所属行业',pattern:/^\S+$/}],
          })(<Input />)}
                  </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>统一社会信用代码：</p>
                <div className={styles.tal}>
                  <FormItem
                  >
                    {getFieldDecorator('creditnum', {
            rules: [{ required: true, message: '请输入社会信用代码'  ,pattern:/^\S{18}$/}],
          })(<Input />)}
                  </FormItem>
                </div>
                <p className={styles.tar}>实缴资本（万元）：</p>
                <div className={styles.tal}>
                  <FormItem>
                    {getFieldDecorator('payment', {
          })(<Input />)}
                  </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>组织机构代码：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('organizationnum', {
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>法定代表人信用信息：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('foundinfo', {initialValue:'良好'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>注册资本（万元）：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('foundmoney', {
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>经营状况及财务状况：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('runstatus', {initialValue:'正常'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>注册地址：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('foundaddress', {
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>资金运用情况：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('runmoney', {initialValue:'补充企业经营性现金流'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>成立时间：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('founddate', {
            rules: [{ required: true, message: '请输入成立时间' }],
          })(<DatePicker />)}
                </FormItem>
                </div>
                <p className={styles.tar}>股东信息：</p>
                <div className={styles.tal}>
                  <FormItem>
                  {getFieldDecorator('shareholderinfo', {
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>借款用途：</p>
                <div className={styles.tal}>
                  <FormItem
                >
                  {getFieldDecorator('use', {initialValue:'补充企业经营性现金流'
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>经营区域：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('runaddress', {initialValue:'全国'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>涉诉情况：</p>
                <div className={styles.tal}>
                  <FormItem 
                >
                  {getFieldDecorator('law', {initialValue:'无'
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>行政处罚情况：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('punish', {initialValue:'无'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>还款来源：</p>
                <div className={styles.tal}>
                  <FormItem 
                >
                  {getFieldDecorator('moneysource', {initialValue:'融资方自有资金还款或核心企业/融资方法人提供无限连带担保责任'})(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>还款保障措施：</p>
                <div className={styles.tal}>
                  <FormItem >
                  {getFieldDecorator('safeguard', {initialValue:'核心企业/融资方法人提供无限连带担保责任'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>银行卡账号：</p>
                <div className={styles.tal}>
                <FormItem 
                >
                  {getFieldDecorator('bankcard', {
            rules: [{ required: true, message: '请输入正确银行卡号',pattern: /^[0-9]*$/ }],
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}>借款人征信报告情况：</p>
                <div className={styles.tal}>
                <FormItem 
                >
                  {getFieldDecorator('borrowerinfo', {initialValue:'无报告'
          })(<Input />)}
                </FormItem>
                </div>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>开户银行：</p>
                <div className={styles.tal}>
                <FormItem 
                >
                  {getFieldDecorator('bankName', {
            rules: [{ required: true, message: '请输入正确开户银行' ,pattern:/^\S+$/}],
          })(<Input />)}
                </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>法定代表人身份证号：</p>
                <div className={styles.tal}>
                <FormItem 
                >
                  {getFieldDecorator('idCard', {
            rules: [{ required: true, message: '请输入正确法定代表人身份证号' ,pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/}],
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
                    rules: [{ required: true, message: '请输入正确城市编码',pattern: /^\w+$/ }],
                    })(<Input />)}
                  </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>开户行所在省编码：</p>
                <div className={styles.tal}>
                  <FormItem 
                  >
                    {getFieldDecorator('codeProvince', {
                      rules: [{ required: true, message: '请输入正确省编码',pattern: /^\w+$/ }],
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
                    rules: [{ required: true, message: '请输入正确银行编码',pattern: /^\w+$/ }],
                    })(<Input />)}
                  </FormItem>
                </div>
                <p className={styles.tar}><b>*</b>开户支行名称：</p>
                <div className={styles.tal}>
                <FormItem 
                  >
                  {getFieldDecorator('bankBranch', {
                    rules: [{ required: true, message: '请输入正确开户支行名称',pattern: /^\S+$/ }],
                    })(<Input />)}
                  </FormItem>
                </div>
              </div>

              {/* <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>资产来源：</p>
                <div  className={styles.tal}>
                      <FormItem hasFeedback formItemLayout={{wrapperCol:{span:14}}}>
                    {getFieldDecorator('companyArea',{
                      rules: [{ required: true, message: '请选择资产来源' }],
                      initialValue:"",            
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
              <Button  onClick={()=>{window.history.go(-1)}} style={{marginLeft:'50px'}}>
                返回
              </Button>
              <Button onClick={()=>{this.save('save')}} htmlType='submit' style={{marginLeft:'100px'}} type="primary">保存</Button>
              {/* <Button onClick={()=>{this.save('reg')}} htmlType='submit' style={{marginLeft:'100px'}} type="primary">绑定</Button> */}
            </div>
          </Form>
        </div>
        <div className={styles.footer}>
          
          
        </div>
      </PageHeaderLayout>
    );
  }
}

