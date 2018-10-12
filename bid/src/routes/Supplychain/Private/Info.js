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
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';

import styles from './index.less';
import { getParam } from '@/utils/utils.js';

@connect(({ integralRecord, loading }) => ({
  integralRecord,
  loading: loading.models.integralRecord,
}))
@Form.create()
export default class IntegralRecord extends PureComponent {
  state = {
    formValues: {},
    uid: getParam(window.location.href, 'uid'),
  };

  componentDidMount() {
    
  };

 
  render() {
    return (
      <PageHeaderLayout title="业务合同>业务合同详情">
        <div className={styles.info}>
          <h3 style={{lineHeight:'60px',marginLeft:'100px'}}>资产详细信息</h3>
          <div className={styles.conten}>
            <div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>姓名：</p>
                <p className={styles.tal}>深圳大熊</p>
                <p className={styles.tar}><b>*</b>身份证号码：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>手机号：</p>
                <p className={styles.tal}>王八</p>
                <p className={styles.tar}><b>*</b>标的总额：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>期限：</p>
                <p className={styles.tal}>123456</p>
                <p className={styles.tar}><b>*</b>期限类型：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>期数：</p>
                <p className={styles.tal}>2136</p>
                <p className={styles.tar}><b>*</b>收款开户行：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>收款开户账号：</p>
                <p className={styles.tal}>231</p>
                <p className={styles.tar}><b>*</b>账号类型：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>开户名：</p>
                <p className={styles.tal}>浙江杭州</p>
                <p className={styles.tar}><b>*</b>协议编号：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>品牌型号：</p>
                <p className={styles.tal}>2017、10</p>
                <p className={styles.tar}><b>*</b>颜色：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>车架号：</p>
                <p className={styles.tal}>xxx</p>
                <p className={styles.tar}><b>*</b>发动机号：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>数量：</p>
                <p className={styles.tal}>1000</p>
                <p className={styles.tar}><b>*</b>单价：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>总计金额：</p>
                <p className={styles.tal}>2017、12</p>
                <p className={styles.tar}><b>*</b>首付人民币：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>余额人民币：</p>
                <p className={styles.tal}>7天</p>
                <p className={styles.tar}><b>*</b>共同还款人姓名：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>共同还款人身份证号：</p>
                <p className={styles.tal}>一次性</p>
                <p className={styles.tar}><b>*</b>公司全称：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>组织机构代码：</p>
                <p className={styles.tal}>工行</p>
                <p className={styles.tar}><b>*</b>签约日期：</p>
                <p className={styles.tal}>123456</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>保理公司名称：</p>
                <p className={styles.tal}>浙江链钱信息技术有限公司</p>
                <p className={styles.tar}><b>*</b>是否融资人分账：</p>
                <p className={styles.tal}>123456</p>
              </div>
            </div>
          </div>
          <div style={{backgroundColor:'#fff',padding:'50px 0 50px 100px'}}>
            <Button onClick={()=>{window.history.go(-1)}}>
              返回
            </Button>
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}

