/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { deletecompany,pushcompany,gylsearchcompany,getfile ,cancelCompany ,queryAssetArea,updateSource} from '../../../services/api'
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
import { getbutton } from '@/utils/utils.js';

import styles from './index.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const { Option } = Select;
var menubutton =[]
const { RangePicker } = DatePicker;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ userIntegralQuery, loading }) => ({
  userIntegralQuery,
  loading: loading.models.userIntegralQuery,
}))
@Form.create()
export default class UserIntegralQuery extends PureComponent {
  state = {
    formValues: {},
    selectedids: [],
    founder:null,
    page:1,
    pagesize:10,
    startTime:undefined,
    endTime:undefined,
    createUser:undefined,
    companyName:undefined,
    status:null,
    selectedRowKeys:[],
    data: {},
    slid:'',
    showmodal:false,
    selectpages:[],
    souname:'',
    searchid:'',//精确查找
    defsource:'',
    sourcelist:[],//资产来源数据
    source:'',//资产来源
  };

  componentDidMount() {
    menubutton = getbutton(window.location.href)
    this.getlist()
    this.getsource()
  }
  async getsource(){
    const res = await queryAssetArea()
    if (res.success) {
      this.setState({
        sourcelist:res.data
      })
    }
  }

  async changename(){

    // const params = {id:this.state.slid,source:this.refs.comname.value}
    const params = {id:this.state.slid,source:this.state.souname}
    const data = await updateSource(params)
    // console.log(this.refs)
    // this.refs.comname.value = ''
    this.setState({
      showmodal:false,
      slid:''
    })
    if (data&&data.success) {
      message.success('修改成功')
    }
    this.getlist()
  }

  deletedisable=()=>{
    setTimeout(()=>{
      const disableds = this.refs.table.querySelectorAll(".ant-checkbox-input[type='checkbox']:disabled")
      disableds.forEach(e => {
        e.parentNode.style.display='none'
        // e.parentNode.removeChild(e)
      });
    },100)
  }

  // onSelectChange = (selectedRowKeys,selectedRows) => {
  //   var selectedids = [];
  //   selectedids=selectedRows.map(item=>item.id)
  //   console.log('selectedRowKeys changed: ', selectedids);
  //   this.setState({ selectedids,selectedRowKeys});
  // };

  select=(e,id)=>{
    var selectedids = this.state.selectedids;
    if (e) {
      selectedids.push(id)
      this.setState({
        selectedids,
      })
    }else{
      selectedids = selectedids.filter((item)=>{
        return item!=id
      })
      this.setState({
        selectedids,
      })
    }
    // this.setState
  }

  selectnowpage=()=>{
    var page = this.state.page
  }

  allSelect=(e)=>{
    var nowpageids = []
    var page = this.state.page
    var sel = JSON.parse(JSON.stringify(this.state.selectpages))
    this.state.data.rows.forEach((item,index)=>{
      if (item.status=='0'||item.status=='2') {
        nowpageids.push(item.id)
      }
    })
    var selectedids = JSON.parse(JSON.stringify(this.state.selectedids));
    if (e.target.checked) {
      nowpageids.forEach((item,index)=>{
        if (!selectedids.includes(item)) {
          selectedids.push(item)
        }
      })
      sel.push(page)
      this.setState({
        selectedids,
        selectpages:sel,
      })
    }else{
      selectedids = selectedids.filter((item,index)=>{
        if (!nowpageids.includes(item)) {
          return item
        }
      })

      this.setState({
        selectedids,
        selectpages:sel.filter((item,index)=>{
          return item!=page
        })
      })
    }
  }

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
    
  };
  timeChange = (b)=>{
    this.setState({
      startTime:moment(b[0]).format('YYYY-MM-DD'),
      endTime:b[1].format('YYYY-MM-DD'),
      page:1
    })
  }

  async onlypush(ag){
    const params={
      ids:ag.join()
    }
    const res = await pushcompany(params)
    if (res.length==1) {
      message.info(res[0].msg)
    }else{
      var e=0,s=0;
      res.forEach((item,idx)=>{
        if (item.success) {
          s++
        }else{
          e++
        }
      })
      message.info(`成功${s}条, 失败${e}条`)
    }

    this.getlist()
  }

  async deletes(ag){
    const params={
      ids:ag.join()
    }
    const res = await deletecompany(params)
    if (res.success) {
      message.success('删除成功')
      // window.location.reload()
      this.getlist()
    }
  }
  //批量删除弹窗
  showConfirm = ()=> {
    const amount = this.state.selectedids.length
    confirm({
      title: '确定删除?',
      content: `共${amount}条`,
      onOk() {
        this.deletes(this.state.selectedids);        
      },
      onCancel() {
        message.info('撤销删除')
      },
    });
  }

  //批量上标弹窗
  showpushConfirm = ()=> {
    const amount = this.state.selectedids.length
    confirm({
      title: '确定上标?',
      content: `共${amount}条`,
      onOk() {
        this.onlypush(this.state.selectedids);            
      },
      onCancel() {
        message.info('撤销上标')
      },
    });
  }
  //撤标弹窗
  showcancelConfirm = (id)=> {
    var self = this
    confirm({
      title: '确定提交该撤标操作?',
      content: '撤标后该标将作废！',
      onOk() {
        self.cancelbiao(id)
      },
      onCancel() {
        message.info('已取消')
      },
    });
  }
  async cancelbiao(id){
    const params={
      id
    }
    const res = await cancelCompany(params)
    if (res.success) {
      message.success('撤标成功')
      this.getlist()
    }
  }
  changesource=(v)=>{
    this.setState({
      source:v,
      page:1
    })
  }

  handleChange=(value)=> {
    this.setState({
      souname:value
    })
  }

  async getlist(){
    const {status,page,pagesize,createUser,endTime,startTime,source,searchid} = this.state
    const obj={
      createUser,endTime,startTime,id:searchid,source,
      status:status=='2'?'2,9':status=='3'?'4,6,8':status,
    };
    //source资产来源先不做
    var params ={
      page:page,
      rows:pagesize,
    };
    for (const key in obj) {
      if (obj[key]) {
        params[key] = obj[key];
      }
    }
    const res = await gylsearchcompany(params);
    this.setState({data: res? res: null });
  }
  handleCurrencyChange=(v)=>{
    this.setState({
      status:v,
      page:1
    })
  }
  renderForm() {
    
    return (
      <div className={styles.header} style={{ position: 'reletive' }}>
        <div>
          <span>创建时间：</span>
          <RangePicker
            style={{ position: 'reletive' }}
            placeholder={['开始日期', '结束日期']}
            onChange={this.timeChange}
          />
          <span style={{margin:'0 10px 0 30px'}}>创建人：</span>
          <Input style={{width:'120px'}} onBlur={(e)=>{this.setState({createUser:e.target.value,page:1})}}></Input>
          <span style={{margin:'0 10px 0 30px'}}>编号：</span>
          <Input style={{width:'120px'}} onBlur={(e)=>{this.setState({searchid:e.target.value,page:1})}}></Input>
          <span style={{margin:'0 10px 0 30px'}}>状态：</span>
          <Select
            defaultValue={''}
            
            style={{ width: '100px' }}
            onChange={this.handleCurrencyChange}
          >
            <Option value="">全部</Option>
            <Option value="0">待上标</Option>
            <Option value="1">上标成功</Option>
            <Option value="2">上标失败</Option>
            <Option value="3">同步失败</Option>
            <Option value="10">已撤标</Option>
          </Select>
          <span style={{margin:'0 10px 0 30px'}}>资产来源：</span>
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
          </Select>
          <Button style={{ float: 'right' }} type="primary" onClick={this.getlist.bind(this)}>
            查询
          </Button>
        </div>
        <div style={{ margin: '10px 0' }}>
          {/* <Checkbox onChange={() => {}}>全选</Checkbox> */}
          <Checkbox key={new Date().getTime()} defaultChecked={this.state.selectpages.includes(this.state.page)} onChange={this.allSelect}>选择此页</Checkbox> 
          {/* <Button  type="primary" onClick={()=>{console.log(this.state.selectedids)}}> 000</Button>    */}
          {
            menubutton.includes('bid.asset.put')
            ?
            <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {
              if(this.state.selectedids.length<1){
                return
              }
              // this.onlypush(this.state.selectedids);
              this.showpushConfirm()
              }}>
              批量上标
            </Button>
            :null
          }
          
          {
            menubutton.includes('bid.asset.batchdelete')||true
            ?
            <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {
              if(this.state.selectedids.length<1){
                return
              }
              // this.deletes(this.state.selectedids);
              this.showConfirm()
            }}>
              批量删除数据
            </Button>
            :null
          }
          {
            menubutton.includes('bid.asset.add')
            ?
            <Button style={{ float: 'right' }} type="primary" onClick={()=>{this.props.history.push('/supplychain/createcompany')}}>
              添加业务
            </Button>
            :null
          }
        {/* <a style={{marginRight:'100px',float:'right'}} target="_blank" href={`${window.location.origin}/assetBorrow/borrowExcel`}>导出企业</a> */}
        <Button style={{marginRight:'100px',float:'right'}} type="primary" onClick={()=>{getfile({url:"/assetBorrow/borrowExcel"})}}>
          导出列表
        </Button>
        
        </div>
      </div>
    );
  }

  getColumns = () => {
    const columns = [
      {
        title: '选择',
        key: '15',
        render: row => {
          if (row.status=='0'||row.status=='2') {
            return (<div>
              <Checkbox key={new Date().getTime()} defaultChecked={this.state.selectedids.includes(row.id)?true:false} onChange={(e)=>{this.select(e.target.checked,row.id)}}></Checkbox>
              {/* <input onChange={(e)=>{this.select(e.target.checked,row.id)}} checked={this.state.selectedids.includes(row.id)?true:false} type="checkbox"/> */}
              
            </div>)
          }else{
            return null
          }
        },
      },
      {
        key: '2',
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        key: '3',
        title: '创建人',
        dataIndex: 'createUser',
      },
      {
        key: '4',
        title: '编号',
        dataIndex: 'id',
      },
      {
        title: '全称或简称',
        key: '5',

        dataIndex: 'companyName',
      },
      {
        title: '借款金额（元）',
        key: '6',

        dataIndex: 'borrowMoney',
      },
      {
        title: '借款期限',
        key: '7',

        dataIndex: 'borrowDeadlinetxt',
      },
      {
        title: '借款日期',
        key: '8',

        dataIndex: 'borrowDate',
      },
      {
        title: '还款方式',
        key: '9',

        dataIndex: 'repayTypetxt',
      },
      {
        title: '收款银行名称',
        key: '10',

        dataIndex: 'openBranch',
      },
      {
        title: '资产来源',
        key: '14',

        dataIndex: 'source',
      },
      {
        title: '状态',
        key: '11',

        dataIndex: 'statustxt',
      },
      {
        title: '描述',
        key: '12',

        dataIndex: 'statusMsg',
      },
      {
        title: '操作',
        key: '13',

        render: row => {
          if (row.status=='4'||row.status=='6'||row.status=='8') {
            return (<div>
              {
                menubutton.includes('bid.asset.syncronize')
                ?
                <Button onClick={()=>{this.onlypush([row.id])}} type='primary'>同步</Button>
                :null
              }
                <Button onClick={()=>{this.showcancelConfirm(row.id)}} type='danger'>撤标</Button>  
                         
            </div>)
          }else if (row.status=='0'||row.status=='2') {
            return (<div>
              {
                menubutton.includes('bid.asset.modify')
                ?
                  <Button type='danger' onClick={()=>{
                  this.props.history.push(`/supplychain/handlecompany?uid=${row.id}`)
                  }}>
                  修改    
                </Button>
                :null
              }
              {
                menubutton.includes('bid.asset.put')
                ?
                <Button onClick={()=>{this.onlypush([row.id])}} type='primary'>上标</Button>
                :null
              }
              
            </div>)
          }else if(row.status=='10'){
            return(
              <Button type='danger' onClick={()=>{
                  this.deletes([row.id]);              
                }}>
                删除
              </Button>
            )
          }else{
            return (<Fragment>
              <Button type='primary' style={{marginLeft:'20px'}} onClick={()=>{this.props.history.push(`/supplychain/supplychaincompanyinfo?id=${row.id}`)}}>
                查看详情
              </Button>
              <Button onClick={()=>{this.showcancelConfirm(row.id)}} type='danger'>撤标</Button>    
              <Button type='danger' onClick={()=>{this.setState({defsource:row.source,slid:row.id,showmodal:true})}}>
                修改资产来源
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
    const list = this.state.data;
    var data=[]
    if (list&&list.rows) {
      data=list.rows.map((item,index)=>{
        const obj={
          key: index+'',
          createTime: item.createTime,
          createUser: item.createUser,
          assetId: item.assetId,
          companyName: item.companyName,
          borrowMoney: item.borrowMoney,
          borrowDeadline: item.borrowDeadline,
          borrowDeadlineTypeStr: item.borrowDeadlineTypeStr,
          borrowDeadlinetxt:item.borrowDeadline+(item.borrowDeadlineTypeStr||'天'),
          borrowDeadlineType: item.borrowDeadlineType,
          borrowDate: moment(item.borrowDate).format('YYYY-MM-DD'),
          repayType: item.repayType,
          repayTypetxt: item.repayType=='0'?'按月付息到期还本':'一次还本付息',
          openBranch: item.openBranch,
          status:item.status,
          id:item.id,
          payeeName:item.payeeName,
          outType:item.outType,
          financInt:item.financInt,
          withdrawAccount:item.withdrawAccount,
          istYear:item.istYear,
          source:item.source,
          contractNo:item.contractNo,
          statusMsg:item.statusMsg,
          statustxt:item.status=='0'?'待上标':item.status=='1'?'上标成功':item.status=='2'?'上标失败':item.status=='10'?'已撤标':'同步失败',
        }
        return obj
      })
    }

    const { selectedRowKeys,selectedids } = this.state;
    
    // const rowSelection = {
    //   selectedRowKeys:this.state.selectedRowKeys,
    //   onChange: this.onSelectChange,
    //   getCheckboxProps:record=>({
    //     disabled:record.status!='0',
    //   })
    // };
    // this.deletedisable()
    return (
      <PageHeaderLayout title="业务发起">
        <Card bordered={false}>
          <div className={styles.tableList} ref='table'>
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
              // key={new Date().getTime()}
              columns={this.getColumns()}
              // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={data}
              scroll={{x:2000}}              
              onChange={(p)=>{this.setState({page:p.current,pagesize:p.pageSize,selectedids:[],selectpages:[]},this.getlist.bind(this))}}
              // rowSelection={rowSelection}
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
            title="修改资产来源"
            visible={this.state.showmodal}
            onOk={this.changename.bind(this)}
            onCancel={()=>{this.setState({showmodal:false,slid:'',})}}
            okText="确认"
            cancelText="取消"
          >
            {/* <Input placeholder='请输入企业名称' ref={node => this.userNameInput = node}></Input> */}
            {/* <input style={{width:'460px'}} placeholder='请输入资产来源' ref='comname' type="text" /> */}
            <Select defaultValue={this.state.defsource} style={{ width: 120 }} onChange={this.handleChange}>
              {
                this.state.sourcelist.map((item,index)=>{
                  return <Option key={index} value={item}>{item}</Option>
                })
              }
            </Select>
          </Modal>
        </Card>
      </PageHeaderLayout>
    );
  }
}
