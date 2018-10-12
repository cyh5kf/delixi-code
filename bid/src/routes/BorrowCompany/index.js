/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { searchcompany,getfile ,openCompanyAcct,updCompanyName,queryAssetArea} from '../../services/api'

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
import { getParam,getbutton } from '@/utils/utils.js';
import { gettoken } from '../../utils/authority';
import styles from './index.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const { Option } = Select;
const { RangePicker } = DatePicker;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
var menubutton =[]

@connect(({ userIntegralQuery, loading }) => ({
  userIntegralQuery,
  loading: loading.models.userIntegralQuery,
}))
@Form.create()
export default class UserIntegralQuery extends PureComponent {

  constructor(){
    super();
    this.state={
      formValues: {},
      selectedRowKeys: [],
      current:1,
      date:null,
      founder:null,
      page:1,
      pagesize:10,
      slid:'',
      openAccount:'',
      showmodal:false,
      startTime:undefined,
      endTime:undefined,
      createUser:undefined,
      companyName:undefined,
      companyArea:'',//资产来源
      sourcelist:[],//资产来源列表
      data: null
    };


  }
  componentDidMount() {
    this._isMounted = true;
    menubutton = getbutton(window.location.href)
    this.getlist()
    // this.getsource()
  }

  async getsource(){
    const res = await queryAssetArea()
    if (res.success) {
      this.setState({
        sourcelist:res.data
      })
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  changeopenAccount=(v)=>{
    this.setState({
      openAccount:v,
      page:1
    })
  }

  changesource=(v)=>{
    this.setState({
      companyArea:v,
      page:1
    })
  }

  async openAcct(id){
    const params = {id}
    const data = await openCompanyAcct(params)
    if (data.success) {
      message.success('开户成功')
    }    
    this.getlist()
  }

  async getlist(){
    const {page,pagesize,companyName,createUser,endTime,startTime,openAccount} = this.state
    const obj={
      companyName,createUser,endTime,startTime,openAccount
    };
    var params ={
      page,
      rows:pagesize,
    };
    for (const key in obj) {
      if (obj[key]) {
        params[key] = obj[key];
      }
    }

    const res = await searchcompany(params)
    this.setState({data: res? res: null });
  }

  timeChange=(a,b)=>{
    if (a.length==2) {
      this.setState({
        startTime:b[0],
        endTime:b[1]
      })
    }
  }

  async submit(fi){
    const formData=new FormData()
    formData.append('file', fi.files[0])
    formData.append('token', JSON.parse(gettoken()).token)
    
    const res = await fetch('app/company/import',{
        method:"POST",
        body:formData
    }).then((data)=>{return data.json()})
    fi.value = null ;
    if(res&&res.href){
      window.location.href = res.href;
    }
    if (res&&res.success) {
      message.info(`导入成功${res.data.success}条,失败${res.data.fail}条。`)
      this.getlist()
    }else{
      message.error(res.msg)      
    }
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.header} style={{ position: 'reletive' }}>
        <span style={{margin:'0 10px 0 20px'}}>创建时间: </span>
        <RangePicker onChange={this.timeChange} />
        <span style={{margin:'0 10px 0 20px'}}>创建人:</span>
        <Input style={{width:'100px'}} onBlur={(e)=>{this.setState({createUser:e.target.value})}}></Input>
        <span style={{margin:'0 10px 0 20px'}}>公司名称:</span>
        <Input style={{width:'200px'}} onBlur={(e)=>{this.setState({companyName:e.target.value})}}></Input>
        <span style={{margin:'0 10px 0 30px'}}>存管开户状态：</span>
          <Select
            defaultValue={''}
            style={{ width: '100px' }}
            onChange={this.changeopenAccount}
          >
            <Option value="">全部</Option>
            <Option value="0">未开户</Option>
            <Option value="1">已开户</Option>
            <Option value="2">禁用</Option>
            <Option value="3">开户失败</Option>
          </Select>
        {/* <span style={{margin:'0 10px 0 30px'}}>资产来源：</span>
        <Select
          defaultValue={''}
          style={{ width: '100px' }}
          onChange={this.changesource}
        >
          <Option value="">全部</Option>
          {
            this.state.sourcelist.map((item,index)=>{
              return <Option key={index} value={item}>{item}</Option>
            })
          }
        </Select> */}
        
        <div style={{ margin: '10px 0',textAlign:'right' }}>
        {/* <a style={{marginRight:'100px'}} target="_blank" href={`${window.location.origin}/company/excel?openAccount=${this.state.openAccount}`}>导出借款人</a> */}
        <a style={{marginRight:'50px' }} href="/company.xlsx" download='companymodel.xlsx'>
          下载模板
        </a>
        <Button style={{ marginRight:'50px' }} type="primary" onClick={()=>{this.refs.refString.click()}}>
          导入借款企业
        </Button>
        <input type="file" ref="refString" accept=".xlsx" id="upload_file" style={{display:'none'}} name="file"  onChange={(e)=>{
          if(e.target.value){
            this.submit(e.target)
          }
        }} />
        <Button type="primary" onClick={()=>{getfile({url:`/company/excel?openAccount=${this.state.openAccount}`})}} style={{marginRight:'100px'}}>导出借款人</Button>
        <Button onClick={this.getlist.bind(this)} style={{marginRight:'10px'}}>查询</Button>
        {
          menubutton.includes('bid:company:add')
          ?
          <Button type="primary" onClick={() => {this.props.history.push('/borrowcompany/addcompany')}}>
            添加企业 
          </Button>
          :
          null
        }
          
        </div>
      </div>
    );
  }
//修改企业名称
  async changename(){

    const params = {id:this.state.slid,companyName:this.refs.comname.value}
    const data = await updCompanyName(params)
    this.refs.comname.value = ''
    this.setState({
      showmodal:false,
      slid:''
    })
    if (data&&data.success) {
      message.success('修改成功')
    }
    this.getlist()
  }

  // function showConfirm(id) {
  //   confirm({
  //     title: 'Do you Want to delete these items?',
  //     content: 'Some descriptions',
  //     onOk() {
  //       this.changename(id)
  //     },
  //     onCancel() {
  //       message.info('已取消')
  //     },
  //   });
  // }

  getColumns = () => {
    const columns = [
      {
        key: '2',
        title: '创建时间',
        dataIndex: 'initdate',
      },
      {
        key: '3',
        title: '创建人',
        dataIndex: 'founder',
      },
      {
        key: '4',
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '法定代表人',
        key: '9',

        dataIndex: 'legalperson',
      },
      {
        title: '全称或简称',
        key: '5',

        dataIndex: 'name',
      },

      // {
      //   title: '注册资本（万元）',
      //   key: '6',

      //   dataIndex: 'money',
      // },
      // {
      //   title: '注册地址',
      //   key: '7',

      //   dataIndex: 'address',
      // },
      // {
      //   title: '成立时间',
      //   key: '8',

      //   dataIndex: 'founddate',
      // },
      // {
      //   title: '借款用途',
      //   key: '10',

      //   dataIndex: 'use',
      // },
      {
        key: '13',
        title: '存管开户状态',
        dataIndex: 'statustxt',
      },
      {
        key: '14',
        title: '描述',
        dataIndex: 'openAcctInfo',
      },

      {
        title: '操作',
        key: '12',
        render: row => {
            return (
              <div>
                <Button type='danger' onClick={()=>{this.setState({slid:row.id,showmodal:true})}}>
                  修改名称
                </Button>
                {
                  menubutton.includes('bid:company:edit')?
                  <Button type='danger' onClick={()=>{this.props.history.push(`/borrowcompany/handlecompany?id=${row.id}`)}}>
                    编辑
                  </Button>
                    :null
                }
                {
                  row.status!=1?
                  <Button type='primary' onClick={()=>{this.openAcct(row.id)}}>
                    开户
                  </Button>
                  :
                  null
                }
              </div>
                
            )      
        },
      },
    ];

    return columns;
  };

  render() {
    const { userIntegralQuery, loading } = this.props;
    const list = this.state.data
    // if (!list) {
    //   return <div></div>
    // }
    var data=[]
    if (list&&list.rows) {
      data=list.rows.map((item,index)=>{
        const obj={
          key: index+'',
          initdate: item.createTime,
          founder: item.createUser,
          id: item.id,
          name: item.companyName,
          money: item.regCapital,
          address: item.regAddress,
          status:item.status,
          statustxt:item.status==0?'未开户':item.status==1?'已开户':item.status==2?'禁用':'开户失败',
          openAcctInfo:item.openAcctInfo,
          founddate: item.foundingTime,
          legalperson: item.frdbName,
          use: item.loanUsage,
        }
        return obj
      })
    }
    
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} style={{ marginBottom: '25px' }}>
              {this.renderForm()}
            </div>
            <Table
              columns={this.getColumns()}
              // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={data}
              scroll={{x:1400}}                            
              // rowSelection={rowSelection}
              onChange={(p)=>{this.setState({page:p.current,pagesize:p.pageSize},this.getlist.bind(this))}}
              pagination={{
                total:this.state.data?this.state.data.total:1,
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
          <Modal
            title="修改企业名称"
            visible={this.state.showmodal}
            onOk={this.changename.bind(this)}
            onCancel={()=>{this.refs.comname.value = '';this.setState({showmodal:false,slid:'',})}}
            okText="确认"
            cancelText="取消"
          >
            {/* <Input placeholder='请输入企业名称' ref={node => this.userNameInput = node}></Input> */}
            <input style={{width:'460px'}} placeholder='请输入企业名称' ref='comname' type="text" />
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}

