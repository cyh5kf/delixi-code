/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {updatestatuschannelcompany ,channelcompanylist,deletechannelcompany} from '../../../services/api'
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
const { Option } = Select;
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
var menubutton =[]
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
    founder:null,
    page:1,
    pagesize:10,
    startTime:undefined,
    endTime:undefined,
    createUser:undefined,
    companyName:undefined,
    status:null,
    data: null
  };

  componentDidMount() {
    menubutton = getbutton(window.location.href)
    this.getlist()
  }

  componentDidUpdate() {
  }

  deletedisable=()=>{
    setTimeout(()=>{
      const disableds = this.refs.table.querySelectorAll(".ant-checkbox-input[type='checkbox']:disabled")
      disableds.forEach(e => {
        e.parentNode.style.display='none'
      });
    },10)
  }
  handleSearch = e => {
    
  };
  timeChange = (b)=>{
    this.setState({
      startTime:moment(b[0]).format('YYYY-MM-DD'),
      endTime:b[1].format('YYYY-MM-DD'),
      page:1,
    })
  }

  async changestatus(id,status){
    const params={
      id,
      status,
    }
    const res = await updatestatuschannelcompany(params)
    // if (res.success) {
      
    // }
    this.getlist()
  }

  async deletes(ag){
    const params={
      ids:ag.join()
    }
    const res = await deletecompany(params)
    if (res.success) {
      message.success('删除成功')
      window.location.reload()
    }
  }

  async getlist(){
    const {status,page,pagesize,companyName,endTime,startTime} = this.state
    const obj={
      companyName,endTime,startTime,status
    };
    var params ={
      page:page,
      rows:pagesize,
    };
    for (const key in obj) {
      if (obj[key]) {
        params[key] = obj[key];
      }
    }

    const res = await channelcompanylist(params)
    this.setState({data: res? res.data: null} )
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
          <span style={{margin:'0 10px 0 30px'}}>保理公司名：</span>
          <Input style={{width:'120px'}} onBlur={(e)=>{this.setState({companyName:e.target.value,page:1})}}></Input>
          <Button style={{ float: 'right' }} type="primary" onClick={this.getlist.bind(this)}>
            查询
          </Button>
        </div>
        <div style={{ margin: '10px 0' }}>
        {
          menubutton.includes('bid.channel.add')
          ?
          <Button style={{ float: 'right' }} type="primary" onClick={()=>{this.props.history.push('/borrowcompany/createchannelmanage')}}>
            添加渠道
          </Button>
          :null
        }
          
        </div>
      </div>
    );
  }

  getColumns = () => {
    const columns = [
      {
        key: '1',
        title: '序号',
        dataIndex: 'id',
      },{
        key: '2',
        title: '产品编号',
        dataIndex: 'productId',
      },
      {
        key: '3',
        title: '渠道名称',
        dataIndex: 'pname',
      },
      {
        key: '4',
        title: '渠道公司名称',
        dataIndex: 'companyCurrent',
      },{
        key: '13',
        title: '保理公司名称',
        dataIndex: 'companyDivided',
      },
      {
        title: '开户银行',
        key: '5',

        dataIndex: 'bankBranch',
      },
      {
        title: '卡号',
        key: '6',

        dataIndex: 'bankAccount',
      },
      {
        title: '创建时间',
        key: '7',

        dataIndex: 'timeAdd',
      },
      {
        title: '状态',
        key: '8',

        dataIndex: 'statustxt',
      },
      {
        title: '操作',
        key: '9',

        render: row => {
          if (row.status!='1') {
            return (<div>
              {
                menubutton.includes('bid.channel.edit')
                ?
                <Button type='danger' onClick={()=>{
                  this.props.history.push(`/borrowcompany/handlechannelmanage?uid=${row.id}`)
                  }}>
                  编辑
                </Button>
                :null
              }
              {
                menubutton.includes('bid.channel.valid')
                ?
                <Button onClick={()=>{this.changestatus(row.id,row.isValid?0:1)}} type='primary'>
                  {
                    row.isValid=='0'?'启用':'禁用'
                  }
                </Button>
                :null
              }
              
              <Button onClick={()=>{this.props.history.push(`/borrowcompany/infochannelmanage?uid=${row.id}`)}}>详情</Button>
              {
                menubutton.includes('bid.channel.delete')
                ?
                <Button onClick={
                  ()=>{
                    const self = this;
                    confirm({
                      title: '提示',
                      content: '您是否要删除当前记录？',
                      okText: "确认",
                      cancelText: "取消",
                      onOk:async function() {
                        const res = await deletechannelcompany({id:row.id})
                        return new Promise((resolve, reject) => {
                          if (res&&res.success) {
                            self.getlist.bind(self)()
                            resolve()
                          }else{
                            reject()
                          }
                        }).catch(() => console.log('Oops errors!'));
                        // console.log(this.disablefetch.bind(this))
                        // const m =await this.disablefetch.bind(this)({id:row.id}) 
                        // return m
                      },
                      onCancel() {},
                    })
                  }
                 
                }>删除</Button>
                :null
              }
              
            </div>)
          }else{
            return (<Fragment>
              <Button type='primary' style={{marginLeft:'20px'}} onClick={()=>{this.props.history.push(`/supplychain/supplychaincompanyinfo?id=${row.id}`)}}>
                查看详情
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
    const list = this.state.data
    var data=[]
    if (list&&list.recordList) {
      data=list.recordList.map((item,index)=>{
        const obj={
          key: index+'',
          id:item.id,
          productId: item.productId,
          pname: item.pname,
          companyCurrent: item.companyCurrent,
          bankBranch: item.bankBranch,
          bankAccount: item.bankAccount,
          timeAdd: moment(item.timeAdd).format('YYYY-MM-DD hh:mm'),
          isValid:item.isValid,
          userId:item.userId,
          companyDivided:item.companyDivided,
          statustxt:item.isValid=='0'?'禁用':'启用',
        }
        return obj
      })
    }

    const { selectedRowKeys } = this.state;
    // const rowSelection = {
    //   onChange: this.onSelectChange,
    //   getCheckboxProps:record=>({
    //     disabled:record.status!='0',
    //   })
    // };
    // this.deletedisable()
    return (
      <PageHeaderLayout >
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
              columns={this.getColumns()}
              // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={data}
              onChange={(p)=>{this.setState({page:p.current,pagesize:p.pageSize},this.getlist.bind(this))}}
              scroll={{x:2000}}                            
              // rowSelection={rowSelection}
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
        </Card>
      </PageHeaderLayout>
    );
  }
}
