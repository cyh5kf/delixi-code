import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Radio,
  Select,
  Button,
  message,
  Card,
  Modal,
  Input
} from 'antd';

import styles from './index.less';

const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class CustomUserGroupDialog extends Component {
  state = {

  }

  render() {

    const { customUserModalVisible, openCustomUserModal } = this.props;
    const data = [
        {
            name:'sfdsfd',
            card:'33065464****5464',
            mobile:'151****5464',
            uid: '4264678798'
        },{
            name:'sfdsfd',
            card:'33065464****5464',
            mobile:'151****5464',
            uid: '4264678798'
        },{
            name:'sfdsfd',
            card:'33065464****5464',
            mobile:'151****5464',
            uid: '4264678798'
        },{
            name:'sfdsfd',
            card:'33065464****5464',
            mobile:'151****5464',
            uid: '4264678798'
        }
    ]
    return (
      <div>
        <Modal
          title="自定义用户群"
          className={styles.customUserGroupDialog}
          wrapClassName="vertical-center-modal"
          visible={customUserModalVisible}
          onOk={() => openCustomUserModal(false)}
          okText="确认提交"
          onCancel={() => openCustomUserModal(false)}
        >
          <div className={styles.customTitleContainer}>
            <span className={styles.title}>自定义名称</span>
              <Input className={styles.inputContent} placeholder="Basic usage" />
              <div className={styles.radioGroup}>
                  <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio value={1}>EXCEL模板下载</Radio>
                      <Radio value={2}>数据上传</Radio>
                  </RadioGroup>
              </div>
          </div>
          <table>
              <thead>
              <tr>
                  <td>姓名</td>
                  <td>身份证号码</td>
                  <td>手机号码</td>
                  <td>UID</td>
              </tr>
              </thead>
              <tbody>
              {
                  data.map((item,key)=> <tr key={key}>
                      <td>{item.name}</td>
                      <td>{item.card}</td>
                      <td>{item.mobile}</td>
                      <td>{item.uid}</td>
                  </tr>)
              }
              </tbody>
          </table>
        </Modal>
      </div>
    );
  }
}
