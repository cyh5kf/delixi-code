/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {updateusercontrol, respwdusercontrol, disableusercontrol, addusercontrol, rolecontrollist, usercontrollist } from '../../../services/api';
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
  Popover,
  Radio,
  Modal,
  message,
  Badge,
  Checkbox,
  Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const confirm = Modal.confirm;
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
    rolelist:[],
    founder:null,
    page:1,
    pagesize:10,
    username:undefined,
    status:null,
    data:null,
    confirmDirty: false,
    clickId:undefined,
    showedisablemodal:false,
    showeresetmodal:false,
    showeditmodal:false,
    showaddusermodal:false,
  };

  componentDidMount() {
    this.getlist();
    this.getrolelist()
  }

  componentDidUpdate() {
  }

  closeshowaddusermodal=()=>{
    this.setState({
      showaddusermodal:false
    })
  }

  closeshowedisablemodal=()=>{
    this.setState({
      showedisablemodal:false
    })
  }

  closeshoweresetmodal=()=>{
    this.setState({
      showeresetmodal:false
    })
  }

  closeshoweditmodal=()=>{
    this.setState({
      showeditmodal:false,
      clickId:undefined,
    })
  }

  onSelectChange = (selectedRowKeys,selectedRows) => {
    var selectedids = []
    selectedids=selectedRows.map(item=>item.id)
    console.log('selectedRowKeys changed: ', selectedids);
    this.setState({ selectedids });
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
      endTime:b[1].format('YYYY-MM-DD')
    })
  }

  async onlypush(ag){
    const params={
      ids:ag.join()
    }
    const res = await pushcompany(params)
    console.log(params,res)
    if (res.success) {
      message.success('上标成功')
      window.location.reload()
    }
  }

  async deletes(ag){
    console.log(34)
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
    const {page,pagesize,username} = this.state
    const obj={
      searchName:username
    };
    var params ={
      pageNum:page,
      numPerPage:pagesize,
    };
    for (const key in obj) {
      if (obj[key]) {
        params[key] = obj[key];
      }
    }

    const res = await usercontrollist(params)
    console.log(params,res.rows)
    this.setState({data:res.rows})
  }

  async getrolelist(){
    const res = await rolecontrollist({})
    if (res.success) {
      this.setState({rolelist:res.rows})
    }
  }







  handleCurrencyChange=(v)=>{
    console.log(v)
    this.setState({
      status:v
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  renderForm() {
    
    return (
      <div className={styles.header} style={{ position: 'reletive' }}>
        <div>
          
          <Input style={{width:'200px'}} placeholder="输入用户名/姓名搜索" onBlur={(e)=>{this.setState({username:e.target.value})}}></Input>
          <Button  type="primary" onClick={this.getlist.bind(this)}>
            查询
          </Button>
          <Button onClick={()=>{this.setState({showaddusermodal:true})}} style={{ float: 'right' }} type="primary">
            添加
          </Button>
        </div>
      </div>
    );
  }







  addhandleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        
        var params ={};
        for (const key in values) {
          if (obj[key]) {
            params[key] = values[key];
          }
        }
        this.addfetch(params)  
      }
    });
  }

  async addfetch(params) {
    const res = await addusercontrol(params)
    if (res&&res.success) {
      message.success('保存成功')      

    }
  }

  updatehandleSubmit=(m)=>{
    console.log(m,23)
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(err,values)
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        
        var params ={id:m};
        for (const key in values) {
          if (obj[key]) {
            params[key] = values[key];
          }
        }
        // this.updatefetch(params)  
        console.log(params)
      }
    });
  }

  async updatefetch(params) {
    const res = await updateusercontrol(params)
    if (res&&res.success) {
      message.success('保存成功')      

    }
  }

  async disablefetch(params){
    console.log(params,12)
    const res = await disableusercontrol(params)
    return new Promise((resolve, reject) => {
      if (res&&res.success) {
        resolve()
      }else{
        reject()
      }
    }).catch(() => console.log('Oops errors!'));
  }

  getColumns = () => {
    const { getFieldDecorator } = this.props.form;
    const self = this;
    const columns = [
      
      {
        key: '1',
        title: '编号',
        dataIndex: 'id',
      },
      {
        key: '2',
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        key: '3',
        title: '用户姓名',
        dataIndex: 'name',
      },
      {
        key: '5',
        title: '角色',
        dataIndex: 'rolename',
      },
      {
        key: '6',
        title: '状态',
        dataIndex: 'statustxt',
      },
      {
        key: '7',
        title: '部门',
        dataIndex: 'officeId',
      },
      {
        key: '8',
        title: '工号',
        dataIndex: 'no',
      },
      {
        key: '9',
        title: '手机',
        dataIndex: 'mobile',
      },
      {
        title: '最后登录时间',
        key: '10',
        dataIndex: 'loginTime',
      },
      {
        title: '其他信息',
        key: '11',
        render: row => {
          return (<div style={{color:'#4b93cf'}}>
            <Popover 
              placement="bottom"
              title="操作员信息"
              content={<div style={{width:'500px'}}>
                <div style={{display:'flex'}}>
                  <p className={styles.tal}>电话：</p>
                  <p className={styles.tar}>{row.phone}</p>
                  <p className={styles.tal}>QQ：</p>
                  <p className={styles.tar}>{row.qq}</p>
                </div>
                <div style={{display:'flex'}}>
                  <p className={styles.tal}>邮箱：</p>
                  <p className={styles.tar}>{row.email}</p>
                  <p className={styles.tal}>添加时间:</p>
                  <p className={styles.tar}>{row.addTime}</p>
                </div>
                <div style={{display:'flex'}}>
                  <p className={styles.tal}>备注：</p>
                  <p className={styles.tar}>{row.remark}</p>
                  <p className={styles.tal}></p>
                  <p className={styles.tar}></p>
                </div>
              </div>}
            >
              <Button>
                查看
              </Button>
            </Popover>
          </div>)
        },
      },
      {
        title: '操作',
        key: '12',

        render: row => {
          return (<div style={{color:'#4b93cf'}}>
            <Modal
              visible={this.state.showeditmodal&&this.state.clickId==row.id}
              onCancel={this.closeshoweditmodal}
              title="编辑操作员"
              footer={false}
            >
              <Form onSubmit={(e)=>{
                  e.preventDefault();
                  this.updatehandleSubmit(row.id)
                }}
                >
                <FormItem
                  label="用户角色"
                >
                  {getFieldDecorator('rulename',{
                    rules: [{ required: true, message: '请选择用户角色!' }],
                    initialValue:row.sroleList.length>=1?row.sroleList[0].rolename:null
                  })(
                    <RadioGroup>
                      {
                        this.state.rolelist.map((item,index)=>{
                          return (<Radio key={index} value={item.name}>{item.name}</Radio>)
                        })
                      }
                    </RadioGroup>
                  )}
                </FormItem>
                <FormItem
                  label="姓名"
                >
                  {getFieldDecorator('name', { 
                    rules: [{ required: true, message: '请选择用户角色!' }],    
                    initialValue:row.name                                
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="用户名"
                >
                  {getFieldDecorator('userName', { 
                    rules: [{ required: true, message: '请选择用户角色!' }],
                    initialValue:row.userName                                
                  })(
                    <Input />
                  )}
                </FormItem>

                <FormItem
                  label="手机"
                >
                  {getFieldDecorator('mobile', { 
                    rules: [{ required: true, message: '请选择用户角色!' }],   
                    initialValue:row.mobile                                 
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="部门"
                >
                  {getFieldDecorator('officeId', { 
                    initialValue:row.officeId                    
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="工号"
                >
                  {getFieldDecorator('no', { 
                    initialValue:row.no                    
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="电话"
                >
                  {getFieldDecorator('phone', { 
                    initialValue:row.phone                    
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="qq"
                >
                  {getFieldDecorator('qq', { 
                    initialValue:row.qq                    
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="邮箱"
                >
                  {getFieldDecorator('email', { 
                    initialValue:row.email                    
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  label="备注"
                >
                  {getFieldDecorator('remark', { 
                    initialValue:row.remark                    
                  })(
                    <TextArea></TextArea>  
                  )}
                </FormItem>
                <Button htmlType='submit' style={{margin:'0 auto'}} type="primary">确定</Button>            
              </Form>
            </Modal>
            <Popover 
              placement="bottom"
              content={<div style={{width:'60px'}}>
                <Button onClick={()=>{this.setState({showeditmodal:true,clickId:row.id})}}>编辑</Button>
                <Button onClick={
                  ()=>{
                    const self = this;
                    confirm({
                      title: '提示',
                      content: '是否要禁用',
                      okText: "确认",
                      cancelText: "取消",
                      onOk:async function() {
                        const res = await disableusercontrol({id:row.id,status:row.status})
                        return new Promise((resolve, reject) => {
                          if (res&&res.success) {
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
                 
                }>禁用</Button>
                {/* <Button onClick={()=>{this.setState({showeresetmodal:true})}}>重置</Button> */}
                <Button onClick={
                  ()=>{
                    const self = this;
                    confirm({
                      title: '提示',
                      content: '是否确定要重置该账号密码？&nbsp;(重置后的密码为a1234567)',
                      okText: "确认",
                      cancelText: "取消",
                      onOk:async function() {
                        const res = await respwdusercontrol({id:row.id,pwd:'a1234567'})
                        return new Promise((resolve, reject) => {
                          if (res&&res.success) {
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
                 
                }>重置</Button>
              </div>}
            >
              <Button>
                详情
              </Button>
            </Popover>
          </div>)
        },
      },
    ];

    return columns;
  };

  render() {
    const { userIntegralQuery, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const list = this.state.data
    var data=[]
    if (list) {
      data=list.map((item,index)=>{
        const obj={
          key: index+'',
          id:item.id,
          userName:item.userName,
          name:item.name,
          sroleList:item.sroleList,
          statustxt:item.status=='1'?'禁用':'启用',
          officeId:item.officeId,
          no:item.no,
          mobile:item.mobile,
          loginTime:moment(item.loginTime).format('YYYY-MM-DD hh:mm'),
          qq:item.qq,
          phone:item.phone,
          email:item.email,
          addTime:item.addTime,
          remark:item.remark,
          status:item.status,
        }
        return obj
      })
    }else{
      return (<div></div>)
    }

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
      getCheckboxProps:record=>({
        disabled:record.currentPage=='1',
        // display:'none',
      })
    };
    return (
      <PageHeaderLayout>
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
        <Modal 
          visible={this.state.showaddusermodal}
          onCancel={this.closeshowaddusermodal}
          title="添加操作员"
          footer={false}
        >
          <Form onSubmit={this.addhandleSubmit.bind(this)}>
            <FormItem
              label="用户角色"
            >
              {getFieldDecorator('rulename',{
                rules: [{ required: true, message: '请选择用户角色!' }],
              })(
                <RadioGroup>
                  {
                    this.state.rolelist.map((item,index)=>{
                      return (<Radio key={index} value={item.name}>{item.name}</Radio>)
                    })
                  }
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              label="姓名"
            >
              {getFieldDecorator('name', { 
                rules: [{ required: true, message: '请选择用户角色!' }],                
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="用户名"
            >
              {getFieldDecorator('userName', { 
                rules: [{ required: true, message: '请选择用户角色!' }],                
               })(
                <Input />
              )}
            </FormItem>

            <FormItem
              label="密码"
            >
              {getFieldDecorator('pwd', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </FormItem>
            <FormItem
              label="确认密码"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>


            <FormItem
              label="手机"
            >
              {getFieldDecorator('mobile', { 
                rules: [{ required: true, message: '请选择用户角色!' }],                
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="部门"
            >
              {getFieldDecorator('officeId', { 
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="工号"
            >
              {getFieldDecorator('no', { 
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="电话"
            >
              {getFieldDecorator('phone', { 
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="qq"
            >
              {getFieldDecorator('qq', { 
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="邮箱"
            >
              {getFieldDecorator('email', { 
               })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="备注"
            >
              {getFieldDecorator('remark', { 
               })(
                <TextArea></TextArea>  
              )}
            </FormItem>
            <Button htmlType='submit' style={{margin:'0 auto'}} type="primary">确定</Button>            
          </Form>
        </Modal> 
        

      </PageHeaderLayout>
    );
  }
}
