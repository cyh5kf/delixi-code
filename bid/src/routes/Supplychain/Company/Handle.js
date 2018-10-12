/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { searchcompanyid,updatecompanyzichan , findCompany, channelcompanylist,queryAssetArea} from '../../../services/api'
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
import { gettoken } from '@/utils/authority.js';

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
    showbaolimodal:false,
    bankAccount:'',
    companyDivided:'',
    bankName:'',
    bankCardId:null,
    bankCardIdtype:'',  //保理类型/个人担保
    baolidata:null,
    baolipage:1,
    baolisize:10,
    contractUrl:'',  //合同附件
    agreementUrl:'', // 协议附件
    saleContractUrl:'', //销售合同
    sourcelist:[],//资源来源数据
    // params:this.props.location.params
  };

  componentDidMount() {
    this.getdetail()
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

  async getdetail(){
    const obj = {
      id:this.state.id
    }
    const res = await searchcompanyid(obj)
    if (res&&res.success) {
      this.setState({
        params:res.rows[0],
        bankCardId:res.rows[0].withdrawAccount,
        bankName:res.rows[0].openBranch,
        companyDivided:res.rows[0].payeeName||'',
        bankCardIdtype:'1'||res.rows[0].outType, //fuck 假的
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
        // console.log('Received values of form: ', values);
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        this.tofetch(values)        
      }
    });
  }

  async tofetch(values) {
    var params={
      id:this.state.params.id,
      borrowMoney:values.borrowMoney,
      borrowDeadline:values.borrowDeadline,
      contractNo:values.contractNo,
      openBranch:this.state.bankCardIdtype=='1'?this.state.bankName:values.openBranch,
      repayType:values.repayType,
      financInt:values.financInt,
      istYear:values.istYear,
      outType:values.outType,
      payeeName:this.state.bankCardIdtype=='1'?this.state.companyDivided:values.payeeName,
      withdrawAccount:this.state.bankCardIdtype=='1'?this.state.bankCardId:values.withdrawAccount,
      borrowDate:moment(values.borrowDate).format('YYYY-MM-DD'),
      source:values.source,
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

  getcompany=(v)=>{
    // if (v=='0') {
    //   // this.findCompanyfetch(v)
    //   this.setState({
    //     bankCardIdtype:v,   
    //   },()=>{
    //     this.setState({
    //       bankCardId:'',
    //       bankName:'',
    //       companyDivided:'',     
    //     })
    //   })
    // }else{
    //   this.findCompanyfetch1(v)
    // }
    this.findCompanyfetch1(v)
    
  }
  // async findCompanyfetch(v){
  //   const params ={
  //     name:this.state.selectcompany
  //   }
  //   const res = await findCompany(params)
  //   if (res&&res.success&&res.data) {
  //     this.setState({
  //       bankCardIdtype:v,
  //       bankCardId:res.data.bankCardId,
  //       bankName:res.data.bankName,
  //       companyDivided:'',
  //     })
  //   }else{
  //     this.setState({
  //       bankCardIdtype:v,        
  //     })
  //   }
  // }

  async findCompanyfetch1(v){
    const {baolipage,baolisize} = this.state
    var params = {
      page:baolipage,
      rows:baolisize,
    }
    const res = await channelcompanylist(params)
      this.setState({
        showbaolimodal:true,
        baolidata:res.data
      })

  }

  submit=()=>{
    const self = this;
    let form = new FormData()
    form.append('file', this.refs.refString.files[0])
    form.append('token', JSON.parse(gettoken()).token)
    let xhr = new XMLHttpRequest()
    var timer;
    timer = setTimeout(() => {
      this.refs.refString.value = null,
      message.error("网络不佳，稍后再试")
    }, 5000);
    xhr.onload = () => {
        if (xhr.status == 200 || xhr.status == 304) {
            const data = JSON.parse(xhr.responseText)
            if (data.success) {
              clearTimeout(timer);
              self.setState({
                contractUrl:data.data
              })
            }
        }
    }
    xhr.open("POST", 'app/bidContract/upload')
    xhr.send(form)
  }

  submitxieyi=()=>{
    const self = this;    
    let form = new FormData()
    form.append('file', this.refs.xieyi.files[0])
    form.append('token', JSON.parse(gettoken()).token)    
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
    xhr.open("POST", 'app/bidContract/upload')
    xhr.send(form)
  }

  submitxiaoshou=()=>{
    const self = this;    
    let form = new FormData()
    form.append('file', this.refs.xiaoshou.files[0])
    form.append('token', JSON.parse(gettoken()).token)
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
    xhr.open("POST", 'app/bidContract/upload')
    xhr.send(form)
  }

  closebaoliModal=()=>{
    this.setState({
      showbaolimodal:false,
    })
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
    var baolidata=[];
    if (this.state.baolidata) {
      baolidata=this.state.baolidata.recordList.map((item,index)=>{
        const obj={
          key:index+'',
          pname:item.pname,
          isValid:item.isValid,
          companyDivided:item.companyDivided,
          bankBranch:item.bankBranch,
          bankAccount:item.bankAccount,
        }
        return obj
      })
    }
    return (
      <PageHeaderLayout title="添加业务合同">
        <div className={styles.info}>
          <div className={styles.conten} style={{marginTop:'100px'}}> 
            <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
              <div className={styles.content} style={{lineHeight:'35px'}}>
                <div>
                <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>全称或简称：</p>
                    <div className={styles.tal}>
                      <FormItem
                      >
                        {getFieldDecorator('borrowMoney',{
                          rules: [{ required: true, message: '请输入正确借款金额',pattern: /^\d+(\.\d+)?$/ }],
                          initialValue:params.companyName,
                        })(<Input disabled={true} />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}></p>
                    <div className={styles.tal}>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>借款金额（元）：</p>
                    <div className={styles.tal}>
                      <FormItem
                      >
                        {getFieldDecorator('borrowMoney',{
                          rules: [{ required: true, message: '请输入正确借款金额',pattern: /^\d+(\.\d+)?$/ }],
                          initialValue:params.borrowMoney,
                        })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}>
                      {/* <b>*</b>出账至： */}
                    </p>
                    <div className={styles.tal}>
                      {/* <FormItem hasFeedback formItemLayout={{wrapperCol:{span:14}}}>
                        {getFieldDecorator('outType',{
                          rules: [{ required: true, message: '请输入出账至' }],
                          initialValue:params.outType,            
                        })(
                          <Select style={{width:'178px'}}  onSelect={this.getcompany}>
                            <Option value='0'>借款人银行卡</Option>
                            <Option value='1'>保理公司</Option>
                          </Select>
                        )}
                      </FormItem> */}
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>借款日期：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('borrowDate',{
                        rules: [{ required: true, message: '请输入借款日期' }],
                        initialValue:moment(params.borrowDate)
                        })(<DatePicker />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>借款期限：</p>
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
                        <Option disabled={true} value='2'>周</Option>
                        <Option disabled={true} value='3'>月</Option>
                        <Option disabled={true} value='5'>年</Option>
                      </Select>)}
                    </FormItem>
                    </div>
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>借款合同编码：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('contractNo',{
                        rules: [{ required: true, message: '请输入借款合同编码'  ,pattern:/^\S/}],
                        initialValue:params.contractNo,
                        })(<Input />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款银行名称：</p>
                    {
                      this.state.bankCardIdtype=='1'?
                        <div className={styles.tal}>
                            <span className={styles.dis}>{this.state.bankName}</span>
                        </div>
                        :
                        <div className={styles.tal}>
                          <FormItem >
                          {getFieldDecorator('openBranch',{
                            rules: [{ required: true, message: '请输入收款银行名称' ,pattern:/^\S/}],
                            initialValue:params.openBranch,
                            })(<Input />)}
                        </FormItem>
                        </div>
                    }
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>还款方式：</p>
                    <div className={styles.tal}>
                      <FormItem
                    >
                      {getFieldDecorator('repayType',{
                        rules: [{ required: true, message: '请选择还款方式' }],
                        initialValue:params.repayType,
                        })(
                        <Select placeholder='请选择' style={{width:'178px'}}>
                          <Option value='1'>一次性还本付息</Option>
                          <Option disabled={true} value='0'>按月付息，到期还本</Option>
                        </Select>
                      )}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款帐户名：</p>
                    {
                      this.state.bankCardIdtype=='1'?
                        <div className={styles.tal}>
                          <span className={styles.dis}>{this.state.companyDivided}</span>
                        </div>
                        :
                        <div className={styles.tal}>
                          <FormItem>
                          {getFieldDecorator('payeeName',{
                            rules: [{ required: true, message: '请输入收款帐户名' ,pattern:/^\S/}],
                            initialValue:params.payeeName,
                            })(<Input />)}
                        </FormItem>
                        </div>
                    }
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>融资利率（%）：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('financInt',{
                          rules: [{ required: true, message: '请输入融资利率'  ,pattern:/^\S/}],
                          initialValue:params.financInt,
                        })(<Input disabled={false} />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款银行账号：</p>
                    {
                      this.state.bankCardIdtype=='1'?
                        <div className={styles.tal}>
                          
                          <span className={styles.dis}>{this.state.bankCardId}</span>
                        </div>
                        :
                        <div className={styles.tal}>
                          <FormItem 
                          >
                            {getFieldDecorator('withdrawAccount',{
                              rules: [{ required: true, message: '请输入收款银行账号' ,pattern:/^\S/}],
                              initialValue:params.withdrawAccount,
                              })(<Input />)}
                          </FormItem>
                        </div>
                    }
                    
                  </div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>年化收益率（%）：</p>
                    <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('istYear',{
                          rules: [{ required: true, message: '请输入年化收益率'  ,pattern:/^\S/}],
                          initialValue:params.istYear,            
                        })(<Input disabled={false}/>)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>资产来源：</p>
                    <div className={styles.tal}>
                    <FormItem hasFeedback formItemLayout={{wrapperCol:{span:14}}}>
                    {getFieldDecorator('source',{
                      rules: [{ required: true, message: '请选择资产来源' }],
                      initialValue:params.source,            
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
          <div className={styles.accessory}>
            <h3 style={{lineHeight:'60px'}}>合同附件</h3>
            <div>
              <h3>担保合同附件</h3>
              <label htmlFor="upload_file" style={{padding:'5px 10px',border:'1px dashed #aaa'}}>上传文件 ：</label>
              {
                params&&params.contractUrl?
                <a href={params.contractUrl} target="_blank" style={{marginLeft:'10px'}}>查看</a>
                :null
              }                
              <input type="file" ref="refString" id="upload_file" style={{display:'none'}} name="file"  onChange={(e)=>{
                if(e.target.value){
                  this.submit()
                }
              }} />
            </div>
            <hr style={{margin:'50px 0'}}/>
            <div>
              <h3>销售合同附件</h3>
              <label htmlFor="xieyi" style={{padding:'5px 10px',border:'1px dashed #aaa'}}>上传文件 ：</label>
              {
                params&&params.saleContractUrl?
                <a href={params.saleContractUrl} target="_blank" style={{marginLeft:'10px'}} download>查看</a>
                :null
              }    
              <input type="file" id="xieyi" ref="xieyi" name="file" style={{display:'none'}} onChange={(e)=>{
                if(e.target.value){
                  this.submitxiaoshou()
                }
              }} />
            </div>
            <hr style={{margin:'50px 0'}}/>
            <div>
              <h3>协议附件</h3>
              <label htmlFor="xiaoshou" style={{padding:'5px 10px',border:'1px dashed #aaa'}}>上传文件 ：</label>  
              {
                params&&params.agreementUrl?
                <a href={params.agreementUrl} target="_blank" style={{marginLeft:'10px'}}>查看
                </a>
                :null
              }   
              {/* <a href="http://10.1.14.23:3000/ReferenceCard.pdf" target="_blank" style={{marginLeft:'10px'}}>lal</a>                                           */}
              <input type="file" id="xiaoshou" ref="xiaoshou" name="file" style={{display:'none'}} onChange={(e)=>{
                if(e.target.value){
                  this.submitxieyi()
                }
              }} />
            </div>
          </div>          
        </div>  
        <Modal 
          visible={this.state.showbaolimodal}
          onCancel={this.closebaoliModal}
          maskClosable={false}
          footer={null}
          title="选择保理公司"
        >
          <Table
            columns={[
              {
                key: '1',
                title: '渠道名称',
                dataIndex: 'pname',
              },{
                key: '2',
                title: '保理公司名称',
                dataIndex: 'companyDivided',
              },{
                key: '3',
                title: '开户银行',
                dataIndex: 'bankBranch',
              },{
                key: '4',
                render: row => {
                    return (
                      <Button title={row.isValid==0?'已禁用':''} disabled={row.isValid==0?true:false} onClick={()=>{
                        this.setState({
                          showbaolimodal:false,
                          bankName:row.bankBranch,
                          bankCardId:row.bankAccount,
                          companyDivided:row.companyDivided,
                          bankCardIdtype:'1',           
                        })
                      }}>
                        选择           
                      </Button>)
                },
              }
            ]}
            onChange={(p)=>{this.setState({baolipage:p.current,baolisize:p.pageSize},this.findCompanyfetch1.bind(this))}}            
            // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={baolidata}
            // rowSelection={rowSelection}
            pagination={{
                total:this.state.baolidata?this.state.baolidata.totalCount:1,
                showSizeChanger:true,
                showTotal:function (total) {return `总计${total}条记录`  },
                pageSizeOptions:['10','20','50'],
                current:this.state.baolipage,
            }}
          />          
        </Modal>    
      </PageHeaderLayout>
    );
  }
}

