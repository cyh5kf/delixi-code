/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { insuranceinfo } from '../../../services/api'
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
    id: getParam(window.location.href, 'id'),
    data:null,
  };

  componentDidMount() {
    this.getinfo()
  };

  async getinfo(){

    const res = await insuranceinfo({id:parseInt(this.state.id)})
    if (res.success) {
      this.setState({data:res.data})
    }
  }

  render() {
    const {data} = this.state
    return (
      <PageHeaderLayout title="保险资产>保险资产详情">
        <div className={styles.info}>
          <div className={styles.conten} style={{borderRight:'1px dashed #aaa'}}>
            <h3 style={{lineHeight:'60px'}}>资产详细信息</h3>
            <div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>姓名：</p>
                <p className={styles.tal}>{data?data.realName:''}</p>
                <p className={styles.tar}><b>*</b>身份证号码：</p>
                <p className={styles.tal}>{data?data.identity:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>手机号码：</p>
                <p className={styles.tal}>{data?data.mobile:''}</p>
                <p className={styles.tar}><b>*</b>标的金额：</p>
                <p className={styles.tal}>{data?data.amount:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>期限：</p>
                <p className={styles.tal}>{data?data.timeLimit:''}</p>
                <p className={styles.tar}>期限类型：</p>
                <p className={styles.tal}>{data&&data.timeType==0?'月':'天'}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>期数：</p>
                <p className={styles.tal}>{data?data.period:''}</p>
                <p className={styles.tar}>收款开户行：</p>
                <p className={styles.tal}>{data?data.openBranch:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>收款开户账号：</p>
                <p className={styles.tal}>{data?data.withdrawAccount:''}</p>
                <p className={styles.tar}>账号类型：</p>
                <p className={styles.tal}>{data&&data.accountType==0?'企业':'个人'}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>开户名：</p>
                <p className={styles.tal}>{data?data.payeeName:''}</p>
                <p className={styles.tar}>标的利率（%）：</p>
                <p className={styles.tal}>{data?data.interestRate:''}</p>
              </div>
            </div>
          </div>
        </div>
          <div style={{backgroundColor:'#fff',padding:'50px 0 50px 100px'}}>
            <Button onClick={()=>{window.history.go(-1)}}>
              返回
            </Button>
          </div>
      </PageHeaderLayout>
    );
  }
}

