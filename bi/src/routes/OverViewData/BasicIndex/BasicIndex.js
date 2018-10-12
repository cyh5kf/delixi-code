import React, { Component } from 'react';
import {
  Row,
  Col,
  Icon,
  Radio,
  Select,
  Button,
  message
} from 'antd';
import BasicCard from '@/components/BasicCard';
import SelectMultiple from '@/components/SelectMultiple';
import { getTimeDistance } from '@/utils/utils';

import styles from './index.less';

const Option = Select.Option;

export default class BasicIndex extends Component {
  state = {
    selectInfo: [],
  }

  componentWillMount() {
    // 先从本地存储获取选择的卡片数据，如果没有数据，则初始化九个卡片数据
    let selectInfo = localStorage.getItem('selectInfo');
    const rangePickerValue = getTimeDistance('upToDate');
    if(!selectInfo) {
      selectInfo = [
        {type: '7', rangePickerValue, timeFrame: 'upToDate'},
        {type: '1', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '0', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '6', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '4', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '17', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '18', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '21', rangePickerValue,  timeFrame: 'upToDate'},
        {type: '20', rangePickerValue,  timeFrame: 'upToDate'}
      ];
      this.setState({selectInfo});
      localStorage.setItem('selectInfo', JSON.stringify(selectInfo));
    } else {
      selectInfo = JSON.parse(selectInfo);
      this.setState({selectInfo});
    }
  }

  // 修改复选框选项
  selectCard = (cardArray) => {
    const { selectInfo } = this.state;
    
    let newSlectInfo = [];
    for(let i of cardArray) {
      for (let j of selectInfo) {
        if(j.type === i) {
          newSlectInfo.push(j);
        } else {
          let rangePickerValue = null;
          if(i === '12' || i === '22') { // 预计还款金额和预计还款人数默认选择未来一个月的时间，其他数据默认选择上线至今的时间
            rangePickerValue = getTimeDistance('nextMonth');
            newSlectInfo.push({type: i, rangePickerValue, timeFrame: 'nextMonth'});
          } else {
            rangePickerValue = getTimeDistance('upToDate');
            newSlectInfo.push({type: i, rangePickerValue, timeFrame: 'upToDate'});
          }
        }
        break;
      }
    }
    this.setState({selectInfo: newSlectInfo});
    localStorage.setItem('selectInfo', JSON.stringify(newSlectInfo));
  }

  // 关闭卡片
  onCloseCard = (type) => {
    const { selectInfo } = this.state;
    const selectInfoLength = selectInfo.length;
    if(selectInfoLength === 1) {
      message.warning('至少要保留一个选项！');
      return false;
    }
    const newCardArray = selectInfo.filter((item) => {
      return item.type !== type;
    })
    this.setState({selectInfo: newCardArray});
    localStorage.setItem('selectInfo', JSON.stringify(newCardArray));
  }

  // 获取当前复选框的值
  getSelectArray = (selectInfo) => {
    let selectArray = [];
    for(let i of selectInfo) {
      selectArray.push(i.type);
    }
    return selectArray;
  }

  // 修改时间值，并存到本地存储
  onChangeTime = (type, rangePickerValue, timeFrame) => {
    const { selectInfo } = this.state;
    for(let i of selectInfo) {
      if(i.type === type) {
        i.rangePickerValue = rangePickerValue;
        i.timeFrame = timeFrame;
      }
    }
    this.setState({selectInfo});
    localStorage.setItem('selectInfo', JSON.stringify(selectInfo));
  }


  render() {
    const { chart, loading } = this.props;
    const { selectInfo } = this.state;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };
    const selectArray = this.getSelectArray(selectInfo);

    return (
      <div className={styles.contentWrapper}>
        <div className={styles.selectCard}>
          <SelectMultiple
            value={selectArray}
            onChange={this.selectCard}
            style={{ float: 'right', width: '250px' }}
          >
            <div key='0'>复投金额</div>
            <div key='1'>待收金额</div>
            <div key='2'>注册-实名转换率</div>
            <div key='3'>注册-投资转换率</div>
            <div key='4'>注册人数</div>
            <div key='5'>用户账户金额</div>
            <div key='6'>站岗金额</div>
            <div key='7'>累计交易规模</div>
            <div key='8'>资金净流入</div>
            <div key='9'>到期回款金额</div>
            <div key='10'>充值金额</div>
            <div key='11'>提现金额</div>
            <div key='12'>预计还款金额</div>
            <div key='13'>R计划回款人数</div>
            <div key='14'>到期回款人数</div>
            <div key='15'>充值人数</div>
            <div key='16'>复投人数</div>
            <div key='17'>开通存管人数</div>
            <div key='18'>投资人数</div>
            <div key='19'>提现人数</div>
            <div key='20'>新增投资人数</div>
            <div key='21'>日均登录人数</div>
            <div key='22'>预计还款人数</div>
            <div key='23'>R计划续投回款金额</div>
            <div key='24'>新增用户7日留存率</div>
          </SelectMultiple>
          {/* <Select
            mode="multiple"
            style={{ width: '600px', float: 'right' }}
            placeholder="请选择"
            value={selectArray}
            onChange={this.selectCard}
          >
            <Option key='0'>复投金额</Option>
            <Option key='1'>待收金额</Option>
            <Option key='2'>注册-实名转换率</Option>
            <Option key='3'>注册-投资转换率</Option>
            <Option key='4'>注册人数</Option>
            <Option key='5'>用户账户金额</Option>
            <Option key='6'>站岗金额</Option>
            <Option key='7'>累计交易规模</Option>
            <Option key='8'>资金净流入</Option>
            <Option key='9'>到期回款金额</Option>
            <Option key='10'>充值金额</Option>
            <Option key='11'>提现金额</Option>
            <Option key='12'>预计还款金额</Option>
            <Option key='13'>R计划回款人数</Option>
            <Option key='14'>到期回款人数</Option>
            <Option key='15'>充值人数</Option>
            <Option key='16'>复投人数</Option>
            <Option key='17'>开通存管人数</Option>
            <Option key='18'>投资人数</Option>
            <Option key='19'>提现人数</Option>
            <Option key='20'>新增投资人数</Option>
            <Option key='21'>日均登录人数</Option>
            <Option key='22'>预计还款人数</Option>
            <Option key='23'>R计划续投回款金额</Option>
            <Option key='24'>新增用户7日留存率</Option>
          </Select> */}
        </div>
        <Row gutter={24} style={{ paddingTop: '52px'}}>
          {
            selectInfo.length > 0 && (
              selectInfo.map((item, index) => {
                return (
                  <Col key={item.type} {...topColResponsiveProps}>
                    <BasicCard idx={index} cardInfo={item} onCloseCard={this.onCloseCard} onChangeTime={this.onChangeTime} />
                  </Col>
                )
              })
            )
          }
        </Row>
      </div>
    );
  }
}
