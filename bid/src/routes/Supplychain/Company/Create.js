/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { submitcompanyzichan,savecompanyzichan,gylcreatesearchcompany, findCompany, findCompanyBank,channelcompanylist,queryAssetArea} from '../../../services/api'
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
var send = false;
// const AutoCompleteOption = AutoComplete.Option; 
var send = false
@connect(({ integralRecord, loading }) => ({
  integralRecord,
  loading: loading.models.integralRecord,
}))
@Form.create()
export default class IntegralRecord extends PureComponent {
  state = {
    formValues: {},
    uid: getParam(window.location.href, 'uid'),
    selectcompany:'',
    showmodal:false,
    showbaolimodal:false,
    modaldata:null,
    modalpage:1,
    modalpagesize:10,
    assetId:null,
    companyName:null,
    bankBranch:'',
    bankAccount:'',
    bankName:'',
    companyDivided:'',
    bankCardId:null,
    bankCardIdtype:'',  //保理类型/个人担保
    fucktype:'',//类型
    baolidata:null,
    baolipage:1,
    baolisize:10,
    total:0,
    formd:{},
    contractUrl:'',
    agreementUrl:'',
    saleContractUrl:'',
    sourcelist:[],//资金来源列表
  };
  componentDidMount() {
    this.getsource()
  };
  async getsource(){
    const res = await queryAssetArea()
    if (res.success) {
      this.setState({
        sourcelist:res.data,
        load:false
      })
    }
  }
  componentWillUnmount(){
    send = false
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

  handleSearchSubmit(){
    this.getborrowlist(this.state.companyName)
  }

  async getborrowlist(name){
    const {modalpage,modalpagesize} = this.state
    var params ={
      pageStart:parseInt(modalpage),
      size:parseInt(modalpagesize),
      companyName:name,
    };

    const res = await gylcreatesearchcompany(params)
    this.setState({modaldata:res.rzBmAssetCompany,total:res.total})
  }

  handleSubmit(e){
    if (!this.state.assetId) {
      message.error('请选择借款企业')
      return 
    };
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err&&!send) {
        send = true;    
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        this.tofetch(values)        
      }
    });
  }

  async tofetch(values) {
    // if (!this.state.contractUrl||!this.state.agreementUrl||!this.state.saleContractUrl) {
    //   message.error('请上传合同')
    //   return ;
    // }
    var params={
      contractUrl:this.state.contractUrl,  //合同附件
      agreementUrl:this.state.agreementUrl, // 协议附件
      saleContractUrl:this.state.saleContractUrl, //销售合同
      assetId:this.state.assetId,
      borrowMoney:values.borrowMoney,
      // outType:values.outType,
      borrowDeadline:values.borrowDeadline,
      borrowDeadlineType:parseInt(values.borrowDeadlinetype),
      contractNo:values.contractNo,
      openBranch:this.state.bankCardIdtype=='1'?this.state.bankBranch:values.openBranch,
      repayType:values.repayType,
      payeeName:this.state.bankCardIdtype=='1'?this.state.companyDivided:values.payeeName,
      withdrawAccount:this.state.bankCardIdtype=='1'?this.state.bankAccount:values.withdrawAccount,
      borrowDate:moment(values.borrowDate).format('YYYY-MM-DD'),
      financInt:values.financInt,
      istYear:values.istYear,
      createUser:JSON.parse(window.localStorage.getItem('userInfo')).username,
      source:values.source,
    }

    const {contractUrl,agreementUrl,saleContractUrl} = this.state
    const obj={
      contractUrl,agreementUrl,saleContractUrl
    };
    for (const key in obj) {
      if (obj[key]) {
        params[key] = obj[key];
      }
    }

    const res = await savecompanyzichan(params)
    console.log(res)
    if (res&&res.success) {
      this.props.history.push('/supplychain/supplychaincompany')
    }else if(res&&!res.success){
      send = false
    }
  }

  showModal=()=>{
    this.setState({
      showmodal:true
    })
  }

  save=(e)=>{
    btn=e
  }

  closeModal=()=>{
    this.setState({
      showmodal:false
    })
  }
  closebaoliModal=()=>{
    this.setState({
      showbaolimodal:false
    })
  }
  getcompany=(v)=>{
    // if (v=='0') {
    //   this.setState({
    //     bankCardIdtype:v,        
    //   })
    //   return;
    // }
    if (!this.state.selectcompany) {
      message.error('请选择借款企业')
      return 
    };
    
    this.findCompanyfetch1(v)
  }

  async findCompanyfetch(v){
    const params ={
      name:this.state.selectcompany
    }
    const res = await findCompany(params)
    if (res&&res.success&&res.data) {
      this.setState({
        bankCardIdtype:v,
        bankCardId:res.data.bankCardId,
        bankName:res.data.bankName,
      })
    }else{
      this.setState({
        bankCardIdtype:v,        
      })
    }
  }

  async findCompanyfetch1(v){
    const {baolipage,baolisize} = this.state
    var params = {
      page:baolipage,
      rows:baolisize,
    }
    const res = await channelcompanylist(params)
    if (v) {
      this.setState({
        bankCardIdtype:'1',  //类型判断不在是v了，固定1 fuck   
        fucktype:v,  //产品需求
        showbaolimodal:true,
        baolidata:res.data||{}
      })
    }else{
      this.setState({
        baolidata:res.data
      })
    }

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
                // this.setState({
                //   selectcompany:row.companyName,
                //   assetId:row.assetId,
                //   showmodal:false,
                // })   有出账至
                this.setState({
                  selectcompany:row.companyName,
                  bankCardIdtype:1,
                  bankBranch:row.bankName,
                  assetId:row.assetId,
                  companyDivided:row.companyName,
                  bankAccount:row.bankCardId,
                  showmodal:false,
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
    var formd = {}
    const fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    }];
    const uploadprops = {
      // action: 'http://devbid.51rz.com/bidContract/upload',
      // action: 'http://10.1.20.199:4024/upload/jpg',
      action: 'http://10.1.20.199:4024/bidContract/upload',
      headers:{
        "method":"POST"
      },
      onChange: this.handleChange,
      multiple: true,
      data:(file)=>{
        var formData = new FormData()
        // formData.set('name','avatar')
        // formData.append('avatar',file)
    formData.append('file', this.refs.refString.files[0])
        
        formData.append('file',file)
        // formData.append('name','avatar')
        // formData.append('id',72)
        // formData.append('type',3)
        return formData
      },
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
          bankName:item.bankName,
          bankCardId:item.bankCardId,
          statustxt:item.openStatus=='0'?'未开户':item.openStatus=='1'?'已开户':'禁用',
        }
        return obj
      })
    }
    var baolidata=[];
    // if (this.state.baolidata) {
    //   baolidata=this.state.baolidata.recordList.map((item,index)=>{
    //     const obj={
    //       key:index+'',
    //       pname:item.pname,
    //       isValid:item.isValid,
    //       companyDivided:item.companyDivided,
    //       bankBranch:item.bankBranch,
    //       bankAccount:item.bankAccount,
    //     }
    //     return obj
    //   })
    // }
    return (
      <PageHeaderLayout title="添加业务合同">
        <div className={styles.info}>
          <div className={styles.conten}>
            <div style={{margin:'40px auto 40px auto',width:'500px'}}>
              <b>* </b>
              <Button onClick={this.showModal}>选择借款企业</Button><span style={{marginLeft:'30px'}}>已选择：{this.state.selectcompany?this.state.selectcompany:'请选择'}</span>
            </div>
            <Form onSubmit={this.handleSubmit.bind(this)} layout="inline">
              <div className={styles.content} style={{lineHeight:'35px'}}>
                <div>
                  <div style={{display:'flex'}}>
                    <p className={styles.tar}><b>*</b>借款金额（元）：</p>
                    <div className={styles.tal}>
                      <FormItem
                      >
                        {getFieldDecorator('borrowMoney',{
            rules: [{ required: true, message: '请输入正确借款金额',pattern: /^\d+(\.\d+)?$/ }],
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
          })(
                          <Select disabled={this.state.selectcompany?false:true} onSelect={this.getcompany} placeholder='请选择' style={{width:'178px'}}>
                            <Option value='0'>借款人银行卡</Option>
                            <Option value='1'>保理公司（分账）</Option>
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
          })(<DatePicker />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>借款期限：</p>
                    <div className={styles.tal}>
                    <FormItem 
                    >
                      {getFieldDecorator('borrowDeadline',{
                        rules: [{ required: true, message: '请输入正确借款期限',pattern: /^[0-9]*$/ }],
                      })(<Input style={{width:'90px'}}/>)}
                    </FormItem>
                      <FormItem >
                      {getFieldDecorator('borrowDeadlinetype',{
            rules: [{ required: true, message: '请输入借款期限类型' }],
          })(
                      <Select placeholder='单位' style={{width:'72px'}}>
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
          })(<Input />)}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款银行名称：</p>
                    {/* <div className={styles.tal}>
                      <FormItem >
                      {getFieldDecorator('openBranch',{
            rules: [{ required: true, message: '请输入收款银行名称'  ,pattern:/^\S/}],
            initialValue:this.state.bankCardIdtype=='1'?this.state.bankBranch:'',                        
          })(<Input disabled={this.state.bankCardIdtype=='1'?true:false}/>)}
                    </FormItem>
                    </div> */}
                    {
                      this.state.bankCardIdtype=='1'?
                        <div className={styles.tal}>
                            <span className={styles.dis}>{this.state.bankBranch}</span>
                        </div>
                        :
                        <div className={styles.tal}>
                          <FormItem >
                          {getFieldDecorator('openBranch',{
                            rules: [{ required: true, message: '请输入收款银行名称' ,pattern:/^\S/}],
                            initialValue:'',
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
          })(
                        <Select placeholder='请选择' style={{width:'178px'}}>
                          <Option value='1'>一次性还本付息</Option>
                          <Option disabled={true} value='0'>按月付息，到期还本</Option>
                        </Select>
                      )}
                    </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款账户名：</p>
                    {/* <div className={styles.tal}>
                      <FormItem>
                      {getFieldDecorator('payeeName',{
            rules: [{ required: true, message: '请输入收款帐户名' }],
            initialValue:this.state.bankCardIdtype=='1'?this.state.companyDivided:'',            
          })(<Input disabled={this.state.bankCardIdtype=='1'?true:false}/>)}
                    </FormItem>
                    </div> */}
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
                            initialValue:'',
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
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>收款银行账号：</p>
                    {/* <div className={styles.tal}>
                      <FormItem 
                      >
                        {getFieldDecorator('withdrawAccount',{
            rules: [{ required: true, message: '请输入收款银行卡号' }],
            initialValue:this.state.bankCardIdtype=='1'?this.state.bankAccount:'',                        
          })(<Input disabled={this.state.bankCardIdtype=='1'?true:false}/>)}
                      </FormItem>

                    </div> */}
                    {
                      this.state.bankCardIdtype=='1'?
                        <div className={styles.tal}>
                          
                          <span className={styles.dis}>{this.state.bankAccount}</span>
                        </div>
                        :
                        <div className={styles.tal}>
                          <FormItem 
                          >
                            {getFieldDecorator('withdrawAccount',{
                              rules: [{ required: true, message: '请输入收款银行账号' ,pattern:/^\S/}],
                              initialValue:'',
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
            rules: [{ required: true, message: '请输入年化收益率' ,pattern:/^\S/}],
          })(<Input />)}
                      </FormItem>
                    </div>
                    <p className={styles.tar}><b>*</b>资产来源：</p>
                    <div className={styles.tal}>
                    <FormItem hasFeedback formItemLayout={{wrapperCol:{span:14}}}>
                    {getFieldDecorator('source',{
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
            {/* <Upload {...uploadprops} fileList={fileList}>
              <Button>
                <Icon type="upload" /> upload
              </Button>
            </Upload> */}
            {/* <form ref="formfile" action="http://10.1.20.199:4024/bidContract/upload" method="post" encType="multipart/form-data"  > */}
            <div>
              <h3>请上传担保合同附件</h3>
              
              <input type="file" ref="refString" name="file" onChange={(e)=>{
                if(e.target.value){
                  this.submit()
                }
              }} />
              {/* <button onClick={this.submit}>上传</button> */}
              {/* <label for="upload_file" class="col-sm-2 control-label">上传文件</label>  
  
              <div class="col-sm-4">  
                  <input type="file" class="form-control" id="upload_file" ref="upload_file" name="upload_file"  
                        style={{display: 'none'}} onChange={()=>{}}/>  
                  <input type="text" class="form-control" id="upload_file_tmp" name="upload_file_tmp"  
                        readonly="readonly" onClick={()=>{this.refs.upload_file.click()}}/>  
              </div>  
              <div class="col-sm-2">  
                  <button type="button" class="btn btn-primary" id="select_file"  
                          onClick={()=>{this.refs.upload_file.click()}}>浏览  
                  </button>  
              </div>   */}
            </div>
            <hr style={{margin:'50px 0'}}/>
            <div>
              <h3>请上传销售合同附件</h3>
          {/* <span>{1?this.state.baolipage:''}</span> */}
              
              <input type="file" ref="xiaoshou" name="file" onChange={(e)=>{
                if(e.target.value){
                  this.submitxiaoshou()
                }
              }} />
              {/* <button onClick={this.submit}>上传</button> */}
            </div>

            <hr style={{margin:'50px 0'}}/>
            <div>
              <h3>请上传协议附件</h3>
              
              <input type="file" ref="xieyi" name="file" onChange={(e)=>{
                if(e.target.value){
                  this.submitxieyi()
                }
              }} />
              {/* <button onClick={this.submit}>上传</button> */}
            </div>
            {/* </form> */}
          </div>          
        </div>
        <Modal 
          visible={this.state.showmodal}
          onCancel={this.closeModal}
          maskClosable={false}
          footer={null}
          title="选择借款企业"
        >
          <div>
            <Input style={{width:'200px'}} onBlur={(e)=>{this.setState({companyName:e.target.value,modalpage:1})}}></Input>
            <Button onClick={this.handleSearchSubmit.bind(this)} style={{marginLeft:'30px',width:'100px'}} type="primary">查询</Button>            
          </div>
          <Table
            columns={this.getColumns()}
            onChange={(p)=>{ this.setState({modalpage:p.current,modalpagesize:p.pageSize},this.handleSearchSubmit.bind(this))}}            
            // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={data}
            // rowSelection={rowSelection}
            pagination={{
                total:this.state.total,
                showSizeChanger:true,
                showTotal:function (total) {return `总计${total}条记录`  },
                pageSizeOptions:['10','20','50'],
                current:this.state.modalpage,
            }}
          />          
        </Modal>     
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
                          bankBranch:row.bankBranch,
                          bankAccount:row.bankAccount,
                          companyDivided:row.companyDivided,
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

