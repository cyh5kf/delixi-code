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
    type:'car',
  };

  componentDidMount() {
    
  };

 
  render() {
    return (
      <PageHeaderLayout title="资产详情">
        <div className={styles.info}>
          <div className={styles.conten} style={{borderRight:'1px dashed #aaa'}}>
            <table>
              <tbody>
              <tr>
                <td className={styles.tdl}>订单号</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>资产编号</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>资产平台</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>推送批次号</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>对应投资编号</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>对应投资系列名称</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>接收时间</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>订单到期日</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}></td>
                <td className={styles.tdr}></td>
                <td className={styles.tdl}>借款日期</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>借款期限（天）</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>借款金额</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>资产状态</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>描述</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>推送时间</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>满标时间</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>满标金额</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>入账金额</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>入账时间</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>最近一次已还款时间</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>累计还款金额（元）</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>借款人银行账号</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>借款人手掌账户开户行</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>借款人地址</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>借款人邮箱</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>存管开户状态</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>投资端借款期限</td>
                <td className={styles.tdr}>321</td>
                <td className={styles.tdl}>投资年化收益率</td>
                <td className={styles.tdr}>654</td>
              </tr>
              <tr>
                <td className={styles.tdl}>投资端借款协议</td>
                <td className={styles.tdr}><a href="" download>点击去下载</a></td>
                <td className={styles.tdl}>资产端借款协议</td>
                <td className={styles.tdr}><a href="" download="借款协议.pdf">借款协议.pdf</a></td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style={{paddingTop:'50px'}}>
          {
            this.state.type=='phone'?
            <div className={styles.conten}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.tdl}>是否为融资租凭</td>
                    <td className={styles.tdr}>是</td>
                    <td className={styles.tdl}>抵押产品</td>
                    <td className={styles.tdr}>手机</td>
                  </tr>
                  <tr>
                    <td className={styles.tdl}>手机商品名称</td>
                    <td className={styles.tdr}>苹果手机</td>
                    <td className={styles.tdl}>品牌</td>
                    <td className={styles.tdr}>苹果手机</td>
                  </tr>
                  <tr>
                    <td className={styles.tdl}>型号规格</td>
                    <td className={styles.tdr}>iphone 6s 32G</td>
                    <td className={styles.tdl}></td>
                    <td className={styles.tdr}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            :
            <div className={styles.conten}>
              <table>
                <tbody>
                  <tr>
                    <td className={styles.tdl}>是否为融资租凭</td>
                    <td className={styles.tdr}>是</td>
                    <td className={styles.tdl}>抵押产品</td>
                    <td className={styles.tdr}>汽车</td>
                  </tr>
                  <tr>
                    <td className={styles.tdl}>车辆型号</td>
                    <td className={styles.tdr}>奥拓</td>
                    <td className={styles.tdl}>车辆识别代码</td>
                    <td className={styles.tdr}>6565656</td>
                  </tr>
                  <tr>
                    <td className={styles.tdl}>发动机编号</td>
                    <td className={styles.tdr}>SB123</td>
                    <td className={styles.tdl}>分期总金额</td>
                    <td className={styles.tdr}></td>
                  </tr>
                  <tr>
                    <td className={styles.tdl}>车船税</td>
                    <td className={styles.tdr}></td>
                    <td className={styles.tdl}>交强险</td>
                    <td className={styles.tdr}></td>
                  </tr>
                  <tr>
                    <td className={styles.tdl}>商业险</td>
                    <td className={styles.tdr}>0.0</td>
                    <td className={styles.tdl}></td>
                    <td className={styles.tdr}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
        </div>
        <div style={{backgroundColor:'#fff',padding:'0 0 20px 30px'}}>
          <Button onClick={()=>{window.history.go(-1)}}>
            返回
          </Button>
        </div>
      </PageHeaderLayout>
    );
  }
}

