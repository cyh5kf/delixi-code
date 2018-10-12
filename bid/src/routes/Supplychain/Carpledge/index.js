/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { carlist ,cardelete,cancelCar ,getfile} from '../../../services/api'
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
import { gettoken } from '../../../utils/authority';

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
    selectpages: [],
    founder:null,
    page:1,
    pagesize:10,
    startTime:undefined,
    endTime:undefined,
    batchNo:undefined,
    companyName:undefined,
    status:null,
    selectedRowKeys:[],
    data: null,
    total:1,
  };

  componentDidMount() {
    // menubutton = getbutton(window.location.href)
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
        selectpages:[],  //如果有全选的这时候肯定空        
      })
    }
    // this.setState
  }

  allSelect=(e)=>{
    
    var nowpageids = []
    var page = this.state.page
    var sel = JSON.parse(JSON.stringify(this.state.selectpages))
    this.state.data.forEach((item,index)=>{
      if (item.status=='5'||item.status=='2') {
        nowpageids.push(item.id)
      }
    })
    var selectedids = JSON.parse(JSON.stringify(this.state.selectedids));
    console.log(selectedids)
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

  async deleteing(id){
    const res = await cardelete({id})
    if (res&&res.success) {
      message.success('成功')
      this.getlist()      
    }else{
      message.error('失败')
    }
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

  async submit(fi){
    const formData=new FormData()
    formData.append('file', fi.files[0])
    formData.append('token', JSON.parse(gettoken()).token)
    
    const res = await fetch('app/asset/car/import',{
        method:"POST",
        body:formData
    }).then((data)=>{return data.json()})
    fi.value = null ;
    if(res&&res.href){
      window.location.href = res.href;
    }
    if (res&&res.success) {
      message.success(res.msg)
      this.getlist()
    }else{
      message.error(res.msg)      
    }
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
  //撤销上标
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
    const res = await cancelCar(params)
    if (res.success) {
      message.success('撤标成功')
      this.getlist()
    }
  }
  //批量删除弹窗
  showConfirm = ()=> {
    const amount = this.state.selectedids.length
    var self = this
    confirm({
      title: '确定删除?',
      content: `共${amount}条`,
      onOk() {
        // this.deletes(this.state.selectedids);    
        self.state.selectedids.forEach((item)=>{
          self.deleteing(item)
        })
      },
      onCancel() {
        message.info('撤销删除')
      },
    });
  }

  async getlist(){
    const {status,page,pagesize,batchNo,endTime,startTime} = this.state
    const obj={
      batchNo,endTime,startTime,status
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
    
    const res = await carlist(params);
    if (res&&res.success) {
      this.setState({data:  res.rows,total:res.total,selectedids:[]}); //批量删除之后清空
      
    }
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
          <span>导入时间：</span>
          <RangePicker
            style={{ position: 'reletive' }}
            placeholder={['开始日期', '结束日期']}
            onChange={this.timeChange}
          />
          <span style={{margin:'0 10px 0 30px'}}>批次号：</span>
          <Input style={{width:'120px'}} onBlur={(e)=>{this.setState({batchNo:e.target.value,page:1})}}></Input>
          <span style={{margin:'0 10px 0 30px'}}>状态：</span>
          <Select
            defaultValue={''}
            
            style={{ width: '100px' }}
            onChange={this.handleCurrencyChange}
          >
            <Option value="">全部</Option>
            <Option value="0">处理中</Option>
            <Option value="1">上标成功</Option>
            <Option value="2">上标失败</Option>
            <Option value="3">推送成功</Option>
            <Option value="4">推送失败</Option>
            <Option value="5">已撤标</Option>
          </Select>
 
          <Button style={{ float: 'right' }} type="primary" onClick={this.getlist.bind(this)}>
            查询
          </Button>
          <Button style={{marginRight:'100px',float:'right'}} type="primary" onClick={()=>{
            getfile({
              url:"/asset/car/excel",
              batchNo:this.state.batchNo,
              status:this.state.status,
              startTime:this.state.startTime,
              endTime:this.state.endTime
            })
          }
          }>
            导出列表
          </Button>
        </div>
        <div style={{ margin: '10px 0' }}>
          {/* <Checkbox onChange={() => {}}>全选</Checkbox> */}
          {
            // menubutton.includes('bid.asset.put')||true
            // ?
            // <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {
            //   if(this.state.selectedids.length<1){
            //     return
            //   }
            //   this.onlypush(this.state.selectedids);
            //   }}>
            //   批量上标
            // </Button>
            // :null
          }
          
          {
            // menubutton.includes('bid.asset.batchdelete')||true
            // ?
            // <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {
            //   if(this.state.selectedids.length<1){
            //     return
            //   }
            //   this.deletes(this.state.selectedids);
            // }}>
            //   批量删除数据
            // </Button>
            // :null
          }
          
          {
            menubutton.includes('bid.asset.add')||true
            ?
            <div>
              {/* <label htmlFor="upload_file" style={{padding:'5px 10px',border:'1px dashed #aaa'}}> */}
          <Checkbox key={new Date().getTime()} defaultChecked={this.state.selectpages.includes(this.state.page)} onChange={this.allSelect}>选择此页</Checkbox>               
              <Button style={{ margin: '0 10px' }} type="primary" onClick={() => {
                if(this.state.selectedids.length<1){
                  return
                }
                // this.deletes(this.state.selectedids);
                this.showConfirm()
              }}>
                批量删除数据
              </Button>
                <Button style={{ float: 'right' }} type="primary" onClick={()=>{console.log('load');this.refs.refString.click()}}>
                  导入数据
                </Button>
              <a style={{ float: 'right',marginRight:'97px' }} href="/template.xlsx" download='templ.xlsx'>
              下载模板
              </a>
              {/* </label> */}
              <form action=""></form>
             <input type="file" ref="refString" accept=".xlsx" id="upload_file" style={{display:'none'}} name="file"  onChange={(e)=>{
              if(e.target.value){
                this.submit(e.target)
              
              }
            }} />
            </div>
            
            
            :null
          }
          
        </div>
      </div>
    );
  }

  getColumns = () => {
    const columns = [
      {
        title: '选择',
        key: '50',
        render: row => {
          if (row.status=='5'||row.status=='2') {
            return (<div>
              <Checkbox  key={new Date().getTime()} defaultChecked={this.state.selectedids.includes(row.id)?true:false} onChange={(e)=>{this.select(e.target.checked,row.id)}}></Checkbox>
            </div>)
          }else{
            return null
          }
        },
      },
      {
        key: '44',
        title: '批次号',
        dataIndex: 'batch_no',
      },
      {
        key: '2',
        title: '导入时间',
        dataIndex: 'create_time',
      },
      {
        key: '3',
        title: '姓名',
        dataIndex: 'real_name',
      },
      {
        key: '4',
        title: '身份证号码',
        dataIndex: 'identity',
      },
      {
        title: '手机号码',
        key: '5',

        dataIndex: 'mobile',
      },
      {
        title: '标的金额',
        key: '6',

        dataIndex: 'amount',
      },
      {
        title: '期限',
        key: '7',

        dataIndex: 'time_limit',
      },
      {
        title: '期限类型',
        key: '8',

        dataIndex: 'time_type',
      },
      {
        title: '期数',
        key: '9',

        dataIndex: 'period',
      },
      {
        title: '收款开户行',
        key: '10',

        dataIndex: 'open_branch',
      },
      {
        title: '收款开户账号',
        key: '11',

        dataIndex: 'withdraw_account',
      },
      {
        title: '账号类型',
        key: '12',

        dataIndex: 'account_type',
      },
      {
        title: '开户名',
        key: '13',

        dataIndex: 'payee_name',
      },
      {
        title: '协议编号',
        key: '14',

        dataIndex: 'protocol_number',
      },
      {
        title: '品牌型号',
        key: '15',

        dataIndex: 'brand_version',
      },
      {
        title: '颜色',
        key: '16',

        dataIndex: 'color',
      },
      {
        title: '车架号',
        key: '17',

        dataIndex: 'frame_card',
      },
      {
        title: '发动机号',
        key: '18',

        dataIndex: 'engine_card',
      },
      {
        title: '数量',
        key: '19',

        dataIndex: 'count_number',
      },
      {
        title: '单价',
        key: '20',

        dataIndex: 'unit_price',
      },
      {
        title: '总计金额',
        key: '111',

        dataIndex: 'total_amount',
      },
      {
        title: '首付人民币',
        key: '112',

        dataIndex: 'down_payment',
      },
      {
        title: '余额人民币',
        key: '113',

        dataIndex: 'left_payment',
      },
      {
        title: '共同还款人姓名',
        key: '114',

        dataIndex: 'same_repayment_name',
      },
      {
        title: '共同还款人身份证号码',
        key: '115',

        dataIndex: 'same_repayment_identity',
      },
      {
        title: '公司全称',
        key: '116',

        dataIndex: 'company_name',
      },
      {
        title: '组织机构代码',
        key: '117',

        dataIndex: 'organization_code',
      },
      {
        title: '签约日期',
        key: '118',

        dataIndex: 'sign_date',
      },
      {
        title: '保理公司名称',
        key: '241',

        dataIndex: 'factor_name',
      },
      {
        title: '居住地',
        key: '242',

        dataIndex: 'residencePlace',
      },
      {
        title: '状态',
        key: '411',

        dataIndex: 'statustxt',
      },
      {
        title: '描述',
        key: '412',

        dataIndex: 'description',
      },
      {
        title: '操作',
        key: '125',

        render: row => {
          return (<div>
            {
              row.status=='2'||row.status=='5'?
              <Button type='danger' onClick={()=>{this.deleteing(row.id)}}>
                删除
              </Button>
              :null
            }
            <Button type='primary' style={{marginLeft:'20px'}} onClick={()=>{this.props.history.push(`/supplychain/carpledgeinfo?id=${row.id}`)}}>
              查看详情
            </Button>
            {
              !(row.status=='0'||row.status=='2'||row.status=='5')?
              <Button type='danger' onClick={()=>{this.showcancelConfirm(row.id)}}>
                撤标
              </Button>
              :null
            }
          </div>)
          // if (row.status=='4') {
          //   return (<div>
          //     {
          //       menubutton.includes('bid.asset.syncronize')||true
          //       ?
          //       <Button onClick={()=>{this.onlypush([row.id])}} type='primary'>同步</Button>
          //       :null
          //     }
              
          //   </div>)
          // }else if (row.status=='0'||row.status=='2') {
          //   return (<div>
          //     {
          //       menubutton.includes('bid.asset.modify')||true
          //       ?
          //       <Button type='danger' onClick={()=>{
          //         this.props.history.push(`/supplychain/carpledgehandle?uid=${row.id}`)
          //         }}>
          //         修改    
          //       </Button>
          //       :null
          //     }
          //     {
          //       row.status=='2'?
          //       <Button type='danger' onClick={()=>{this.deleteing(row.id)}}>
          //         删除
          //       </Button>
          //       :null
          //     }
          //     {
          //       menubutton.includes('bid.asset.put')||true
          //       ?
          //       <Button onClick={()=>{this.onlypush([row.id])}} type='primary'>上标</Button>
          //       :null
          //     }
              
          //   </div>)
          // }else{
          //   return (<Fragment>
          //     <Button type='primary' style={{marginLeft:'20px'}} onClick={()=>{this.props.history.push(`/supplychain/carpledgeinfo?id=${row.id}`)}}>
          //       查看详情
          //     </Button>
          //   </Fragment>)
          // }
        },
      },
    ];

    return columns;
  };

  render() {
    const { userIntegralQuery, loading } = this.props;
    const list = this.state.data;
    var data=[]
    if (list) {
      data=list.map((item,index)=>{
        const obj={
          key: index+'',
          id: item.id,
          batch_no: item.batchNo,
          real_name: item.realName,
          create_time: moment(item.createTime).format('YYYY-MM-DD'),
          identity: item.identity,
          mobile: item.mobile,
          amount: item.amount,
          time_limit: item.timeLimit,
          time_type: item.timeType==0?'月':'天',
          period:item.period,
          open_branch:item.openBranch,
          withdraw_account:item.withdrawAccount,
          account_type:item.accountType==0?'企业':'个人',
          payee_name:item.payeeName,
          protocol_number:item.protocolNumber,
          brand_version:item.brandVersion,
          color:item.color,
          frame_card:item.frameCard,
          engine_card:item.engineCard,
          count_number:item.countNumber,
          unit_price:item.unitPrice,
          total_amount:item.totalAmount,
          down_payment:item.downPayment,
          left_payment: item.leftPayment,
          same_repayment_name: item.sameRepaymentName,
          same_repayment_identity: item.sameRepaymentIdentity,
          company_name: item.companyName,
          organization_code: item.organizationCode,
          sign_date: moment(item.signDate).format('YYYY-MM-DD'),
          factor_name: item.factorName,
          status: item.status,
          description: item.description,
          residencePlace: item.residencePlace,
          // borrowDate: moment(item.borrowDate).format('YYYY-MM-DD'),
          statustxt:item.status=='0'?'处理中':item.status=='1'?'上标成功':item.status=='2'?'上标失败':item.status=='3'?'推送成功':item.status=='5'?'已撤标':'推送失败', //4
        }
        return obj
      })
    }

    const { selectedRowKeys } = this.state;
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
              columns={this.getColumns()}
              // expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
              dataSource={data}
              onChange={(p)=>{this.setState({page:p.current,pagesize:p.pageSize,selectpages:[]},this.getlist.bind(this))}}
              // rowSelection={rowSelection}
              scroll={{x:5000}}
              pagination={{
                total:this.state.total,
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
