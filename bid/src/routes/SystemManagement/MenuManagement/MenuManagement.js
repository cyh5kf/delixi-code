/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Popconfirm,
  Table
} from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import AddEditeMenuDialog from './AddEditeMenuDialog';
import { copyArr } from '@/utils/utils';

import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class MenuManagement extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    rowData: {
      name: '',
      parentId: '',
      href: '',
      menu: '',
      remark: ''
    },
    dialogTitle: '' //弹窗标题
  };

  componentDidMount() {
    this.queryMenuAll();
  }

  queryMenuAll() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryMenuAll',
    });
  }

  handleModalVisible = (rowData, flag, dialogTitle) => {
    this.setState({
      modalVisible: !!flag,
      dialogTitle,
      rowData: {
        id: rowData? rowData.id: '',
        name: rowData? rowData.name : '',
        parentId: rowData? rowData.parentId : 0,
        href: rowData? rowData.href : '',
        remark: rowData? rowData.remark : '',
      },
    });
  };

  //添加菜单
  handleAdd = fields => {
    this.props.dispatch({
      type: 'system/saveSystemMenu',
      payload: fields,
    }).then(()=>{
      this.queryMenuAll();
    })
    this.setState({
      modalVisible: false,
    });
    
  };

  //删除菜单
  remove = fields => {
    this.props.dispatch({
      type: 'system/menuDelete',
      payload: {
        id: fields.id
      }
    }).then(()=>{
      this.queryMenuAll();
    })
  };

  reload = () => {
    window.location.reload();
  }

  //修改菜单
  handleEdit = (fields) => {
    this.props.dispatch({
      type: 'system/updateSystemMenu',
      payload: fields,
    }).then(()=>{
      this.queryMenuAll();
    })
    this.setState({
      modalVisible: false,
    });
  }

  getColumns = () => {
    const columns = [
      {
        title: '菜单名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '链接地址',
        dataIndex: 'href',
        key: 'href',
      },
      {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '操作',
        render: (row) => {
          const addRow = {
            name: '',
            parentId: row.id,
            href: '',
            remark: ''
          }
          return (
            <>
              <a href="javascript:;" onClick={() => this.handleModalVisible(row, true, 'edit')}>
                编辑
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title='您是否要删除当前记录？'
                onConfirm={() => this.remove(row)}
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
              {
                row.parentId === 0 && (
                  <>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => this.handleModalVisible(addRow, true, 'add')}>
                      添加下级菜单
                    </a>
                  </>
                )
              }
            </>
          )
        }
      },
    ];

    return columns;
  };

  getMenuData = (menuAll) => {
    if(!menuAll) {
      return false;
    }
    const obj = [].concat(JSON.parse(JSON.stringify(menuAll))); // 深拷贝数组
    let result = [];
    let parentIdArr = [];

    for(let i of obj) {
      i.key = i.id;
      if(i.parentId === 0) {
        parentIdArr.push(i.id);
        result.push(i);
      }
    }

    for(let i of obj) {
      if(i.parentId !== 0) {
        let index = parentIdArr.indexOf(i.parentId);
        if(index !== -1) {
          if(result[index].children) {
            result[index].children.push(i);
          } else {
            result[index].children = [i];
          }
        }
      }
    }

    return result;
  }

  render() {
    const { system, loading } = this.props;
    const { menuAll } = system;
    const menuData = this.getMenuData(menuAll); // 格式化数据
    const { modalVisible, rowData, dialogTitle } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="菜单管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm} style={{ marginBottom: '25px' }}>
              <Button type="primary" style={{ float: 'right' }} onClick={() => this.handleModalVisible(null, true, 'add')}>
                添加一级菜单
              </Button>
            </div>
            <Table
              loading={loading}
              rowKey={record => record.key}
              dataSource={menuData || []}
              columns={this.getColumns()}
              pagination={false}
            />
          </div>
        </Card>
        {
          modalVisible && <AddEditeMenuDialog {...parentMethods} dialogTitle={dialogTitle} {...rowData} />
        }
        
      </PageHeaderLayout>
    );
  }
}
