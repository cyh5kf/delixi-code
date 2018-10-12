/**
 * Created by wy on 2018/2/7 0007.
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { companydetaleinfo } from '../../../services/api'
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
    console.log(this.state.id)
    var params ={
      id:parseInt(this.state.id)
    };
    const res = await companydetaleinfo(params)
    this.setState({data:res.backObj})
  }

  render() {
    const {data} = this.state
    return (
      <PageHeaderLayout title="业务合同>业务合同详情">
        <div className={styles.info}>
          <div className={styles.conten} style={{borderRight:'1px dashed #aaa'}}>
            <h3 style={{lineHeight:'60px'}}>借款企业工商信息</h3>
            <div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>全称或简称：</p>
                <p className={styles.tal}>{data?data.companyName:''}</p>
                <p className={styles.tar}><b>*</b>营业执照编号：</p>
                <p className={styles.tal}>{data?data.companyRegNo:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>法定代表人：</p>
                <p className={styles.tal}>{data?data.frdbName:''}</p>
                <p className={styles.tar}><b>*</b>办公地点：</p>
                <p className={styles.tal}>{data?data.workAddress:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>机构联系人手机：</p>
                <p className={styles.tal}>{data?data.linkmanPhone:''}</p>
                <p className={styles.tar}>所属行业：</p>
                <p className={styles.tal}>{data?data.industry:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>统一社会信用代码：</p>
                <p className={styles.tal}>{data?data.taxRegNo:''}</p>
                <p className={styles.tar}>实缴资本（万元）：</p>
                <p className={styles.tal}>{data?data.actualCapital:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>注册资本（万元）：</p>
                <p className={styles.tal}>{data?data.regCapital:''}</p>
                <p className={styles.tar}>法定代表人信用信息：</p>
                <p className={styles.tal}>{data?data.fddbrCreditInfo:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>注册地址：</p>
                <p className={styles.tal}>{data?data.regAddress:''}</p>
                <p className={styles.tar}>经营状况及财务状况：</p>
                <p className={styles.tal}>{data?data.financialStanding:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>成立时间：</p>
                <p className={styles.tal}>{data?data.foundingTime:''}</p>
                <p className={styles.tar}>资金运用情况：</p>
                <p className={styles.tal}>{data?data.capitalSituation:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}>借款用途：</p>
                <p className={styles.tal}>{data?data.loanUsage:''}</p>
                <p className={styles.tar}>股东信息：</p>
                <p className={styles.tal}>{data?data.partnerInfo:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>借款金额（元）：</p>
                <p className={styles.tal}>{data?data.borrowMoney:''}</p>
                <p className={styles.tar}>经营区域：</p>
                <p className={styles.tal}>{data?data.operateArea:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>借款日期：</p>
                <p className={styles.tal}>{data?data.borrowDate:''}</p>
                <p className={styles.tar}>涉诉情况：</p>
                <p className={styles.tal}>{data?data.caseComplaint:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>借款期限：</p>
                <p className={styles.tal}>{data?data.borrowDeadline+data.borrowDeadlineTypeStr:''}</p>
                <p className={styles.tar}>行政处罚情况：</p>
                <p className={styles.tal}>{data?data.administrativeSanction:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>还款方式：</p>
                <p className={styles.tal}>{data?data.repayTypeStr:''}</p>
                <p className={styles.tar}>还款来源：</p>
                <p className={styles.tal}>{data?data.repaySource:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>收款银行名称：</p>
                <p className={styles.tal}>{data?data.openBranch:''}</p>
                <p className={styles.tar}>还款保障措施：</p>
                <p className={styles.tal}>{data?data.repayGuarantee:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>收款帐户名：</p>
                <p className={styles.tal}>{data?data.payeeName:''}</p>
                <p className={styles.tar}>借款人征信报告情况：</p>
                <p className={styles.tal}>{data?data.creditReport:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>收款银行账号：</p>
                <p className={styles.tal}>{data?data.withdrawAccount:''}</p>
                <p className={styles.tar}><b>*</b>出账至：</p>
                <p className={styles.tal}>{data?data.outTypeStr:''}</p>
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.tar}><b>*</b>借款合同编号：</p>
                <p className={styles.tal}>{data?data.contractNo:''}</p>
                <p className={styles.tar}><b>*</b>借款来源：</p>
                <p className={styles.tal}>{data?data.source:''}</p>
              </div>
            </div>
          </div>
          <div className={styles.accessory}>
            <h3 style={{lineHeight:'60px'}}>合同附件</h3>
            <div style={{paddingLeft:'20px'}}>
              <div style={{display:'flex'}}>
                <p className={styles.flex1}>融资服务居间协议：</p>
                {
                  data&&data.agreementUrl?
                  <a className={styles.width100} target="_blank" href={data.agreementUrl} download>点击下载</a>
                  :
                  <p className={styles.width100}>暂无合同</p>
                }
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.flex1}>销售合同：</p>
                {
                  data&&data.saleContractUrl?
                  <a className={styles.width100} href={data.saleContractUrl} download>点击下载</a>
                  :
                  <p className={styles.width100}>暂无合同</p>
                }
              </div>
              <div style={{display:'flex'}}>
                <p className={styles.flex1}>担保合同：</p>
                {
                  data&&data.contractUrl?
                  <a className={styles.width100} href={data.contractUrl} download>点击下载</a>
                  :
                  <p className={styles.width100}>暂无合同</p>
                }
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

