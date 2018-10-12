/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { channelcompanyinfo } from '../../../services/api'
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
    id: getParam(window.location.href, 'uid'),
    data:null,
  };

  componentDidMount() {
    this.getinfo()
  };

  async getinfo(){
    const obj = {
      id:this.state.id
    }
    const res = await channelcompanyinfo(obj)
    if (res&&res.success) {
      this.setState({
        data:res.data
      })
    }
  }

  render() {
    const {data} = this.state
    return (
      <PageHeaderLayout title="项目渠道详情">
        <div className={styles.info}>
          <div className={styles.conten} style={{borderRight:'1px dashed #aaa'}}>
            <h3 style={{lineHeight:'60px'}}>项目渠道信息</h3>
            <div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>项目名称：</p>
                <p className={styles.tal}>{data?data.pname:''}</p>
                <p className={styles.tar}><b>*</b>产品编号：</p>
                <p className={styles.tal}>{data?data.productId:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>公司名称：</p>
                <p className={styles.tal}>{data?data.companyCurrent:''}</p>
                <p className={styles.tar}><b>*</b>保理公司名称：</p>
                <p className={styles.tal}>{data?data.companyDivided:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>开户银行：</p>
                <p className={styles.tal}>{data?data.bankBranch:''}</p>
                <p className={styles.tar}><b>*</b>银行账户：</p>
                <p className={styles.tal}>{data?data.bankAccount:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>银行编码：</p>
                <p className={styles.tal}>{data?data.codeBank:''}</p>
                <p className={styles.tar}><b>*</b>大额行号：</p>
                <p className={styles.tal}>{data?data.bankBigNumber:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>城市编码：</p>
                <p className={styles.tal}>{data?data.cityCode:''}</p>
                <p className={styles.tar}><b>*</b>开户行所在省编码：</p>
                <p className={styles.tal}>{data?data.codeProvince:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>userId：</p>
                <p className={styles.tal}>{data?data.userId:'无'}</p>
                <p className={styles.tar}></p>
                <p className={styles.tal}></p>
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

