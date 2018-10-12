/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {getusermenu, deleterolecontrol, rolecontrollist, menuAll, createrolecontrol,impowerrolecontrol} from '../../../services/api';
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
  Tree,
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
const TreeNode = Tree.TreeNode;
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
    menulist:[],
    menuarr:[],
    founder:null,
    page:1,
    pagesize:10,
    rolename:undefined,
    status:null,
    data:null,
    clickId:undefined,
    confirmDirty: false,
    showedisablemodal:false,
    showeresetmodal:false,
    showeditmodal:false,
    showrootmodal:false,
    showaddusermodal:false,
    usermenu:[],
    checkedKeys:[],
    rootcheckedKeys:[],
    username:JSON.parse(window.localStorage.getItem('userInfo')).username,    
  };

  componentDidMount() {
    this.getlist();
    this.getmenulist()
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

  closeshowrootmodal=()=>{
    this.setState({
      showrootmodal:false,
      clickId:undefined,
    })
  }

  onSelectChange = (selectedRowKeys,selectedRows) => {
    var selectedids = []
    selectedids=selectedRows.map(item=>item.id)
    console.log('selectedRowKeys changed: ', selectedids);
    this.setState({ selectedids });
  };

  async getusermenufetch(id,obj){
    const res = await getusermenu({id})
    const arr = []
    res.forEach((item)=>{
      arr.push(item.id.toString())
      if (item.children.length>=1) {
        item.children.forEach((it)=>{
          arr.push(it.id.toString())
        })
      }
    })
    if (res) {
      this.setState({
        ...obj,
        usermenu:arr
      })
    }
  }

  async getlist(){
    const {page,pagesize,rolename} = this.state
    const obj={
      name:rolename
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

    const res = await rolecontrollist(params)
    if (res.success&&res) {
      this.setState({data:res.rows})
    }
  }

  async getmenulist(){
    const res = await menuAll({})
    console.log(res.rows)
    if (res) {
      var menuarr = [];
  
      res.rows.forEach((item,idx)=>{
        if (item.parentId==0) {
          menuarr.push({p:item})
        }
      })
      menuarr.forEach((item)=>{
        item.c=[]
        res.rows.forEach((it)=>{
          if (item.p.id==it.parentId) {
            item.c.push(it)
          }
        })
      })
      console.log(menuarr)

      this.setState({menulist:res.rows,menuarr})
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
          <Input style={{width:'200px'}} placeholder="输入角色名搜索" onBlur={(e)=>{this.setState({rolename:e.target.value})}}></Input>
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

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.setState({
      checkedKeys:checkedKeys.join('-')
    })
  }

  onCheckroot = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.setState({
      rootcheckedKeys:checkedKeys.join('-')
    })
  }

  addhandleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // console.log(moment(values.founddate).format('YYYY-MM-SS'))
        
        var params ={
          updateUser:this.state.username,
        };
        if (this.state.checkedKeys.length>=1) {
          params.menuId = this.state.checkedKeys
        }
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
        
        var params ={id:m,updateUser:username};
        for (const key in values) {
          if (obj[key]) {
            params[key] = values[key];
          }
        }
        this.editfetch(params)
      }
    });
  }

  async editfetch(params) {
    const res = await createrolecontrol(params)
    if (res&&res.success) {
      message.success('保存成功')      

    }
  }

  async impowerfetch(id) {

    var params = {id:id,menuId:this.state.rootcheckedKeys}
    const res = await impowerrolecontrol(params)
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
        title: '角色名',
        dataIndex: 'name',
      },
      {
        key: '3',
        title: '添加者',
        dataIndex: 'addUser',
      },
      {
        key: '4',
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '最后登录时间',
        key: '5',
        dataIndex: 'updateTime',
      },
      {
        title: '操作',
        key: '6',

        render: row => {
          console.log(row.name)
          return (<div style={{color:'#4b93cf'}}>
            <Modal
              visible={this.state.showeditmodal&&this.state.clickId==row.id}
              onCancel={this.closeshoweditmodal}
              title="编辑角色"
              footer={false}
            >
              <Form onSubmit={(e)=>{
                  e.preventDefault();
                  this.updatehandleSubmit(row.id)
                }}
                >
              <FormItem
              label="角色名称"
            >
              {getFieldDecorator('name', { 
                rules: [{ required: true, message: '请选择用户角色!' }], 
                initialValue:row.name           
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

            <Modal
              visible={this.state.showrootmodal&&this.state.clickId==row.id}
              onCancel={this.closeshowrootmodal}
              title="授权管理"
              footer={false}
            >
              <div><p style={{textAlign:'right',width:'100px',display:'inline-block'}}>角色名称:</p><span style={{marginLeft:'10px'}}>{row.name}</span></div>
              <div><p style={{textAlign:'right',width:'100px',display:'inline-block'}}>添加者:</p><span style={{marginLeft:'10px'}}>{row.addUser}</span></div>
              <div><p style={{textAlign:'right',width:'100px',display:'inline-block'}}>备注:</p><span style={{marginLeft:'10px'}}>{row.remark?row.remark:'无'}</span></div>
              <p style={{textAlign:'right',width:'100px'}}>选择菜单：</p>
              <Tree
                checkable
                defaultSelectedKeys={this.state.usermenu}
                onSelect={this.onSelectroot}
                onCheck={this.onCheckroot}
              >
                {
                  this.state.menuarr.map((item,index)=>{
                    return (<TreeNode key={item.p.id} title={item.p.name}>
                      {
                        item.c.map((it)=>{
                          return (<TreeNode key={it.id} title={it.name}>
                          </TreeNode>)
                        })
                      }
                    </TreeNode>)
                  })
                }
              </Tree>

              <Button onClick={(e)=>{
                  e.preventDefault();
                  this.impowerfetch(row.id)
                }} style={{margin:'0 auto'}} type="primary">确定</Button>            
            </Modal>

            <Popover 
              placement="bottom"
              content={<div style={{width:'60px'}}>
                <Button onClick={()=>{this.setState({showeditmodal:true,clickId:row.id})}}>编辑</Button>
                <Button onClick={()=>{
                  this.getusermenufetch(row.id,{showrootmodal:true,clickId:row.id})
                  // this.setState({showrootmodal:true,clickId:row.id})
                  }}>授权</Button>
                <Button onClick={
                  ()=>{
                    const self = this;
                    confirm({
                      title: '提示',
                      content: '您是否要删除当前记录？',
                      okText: "确认",
                      cancelText: "取消",
                      onOk:async function() {
                        const res = await deleterolecontrol({id:row.id})
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
          name:item.name,
          addUser:item.addUser,
          statustxt:item.status=='1'?'禁用':'启用',
          updateUser:item.updateUser,
          createTime:moment(item.createTime).format('YYYY-MM-DD hh:mm'),
          updateTime:moment(item.updateTime).format('YYYY-MM-DD hh:mm'),
          remark:item.remark,
        }
        return obj
      })
    }else{
      return (<div></div>)
    }
    const { selectedRowKeys } = this.state;


    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList} ref='table'>
            <div className={styles.tableListForm} style={{ marginBottom: '25px' }}>
              {this.renderForm()}
            </div>
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
              label="角色名称"
            >
              {getFieldDecorator('name', { 
                rules: [{ required: true, message: '请选择用户角色!' }],                
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
          <Tree
            checkable
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          >
            {
              this.state.menuarr.map((item,index)=>{
                return (<TreeNode key={item.p.id} title={item.p.name}>
                  {
                    item.c.map((it)=>{
                      return (<TreeNode key={it.id} title={it.name}>
                      </TreeNode>)
                    })
                  }
                </TreeNode>)
              })
            }
          </Tree>
        </Modal> 
        

      </PageHeaderLayout>
    );
  }
}
