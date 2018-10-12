import React, { Component } from 'react'
import {connect} from 'dva'
import RtwCalendar from '@/components/Calendar/RtwCalendar'
import RealTimeCard from '@/components/RealTimeCard'
import {
  Select,
  Button,
  Icon,
  Row,
  Col
} from 'antd'
import styles from './index.less';

const Option = Select.Option


class RealTimeWatcher extends Component {
  constructor({rtw}){
    super();
    this.state={
      showcalendar:false,
      hints:['2018-04-06'],
      load:false, //状态改变就会刷新
    }
  }
  componentDidMount(){
  }
  selecthandleChange=(v)=>{
    this.props.dispatch({type:'rtw/timetypeschange',v})
  }
  reload=()=>{
    this.setState({
      load:!this.state.load
    })
  }

  selectcalendar=()=>{
    this.setState({
      showcalendar:true
    })
  }

  close=()=>{
    this.setState({
      showcalendar:false
    })    
  }
  ok=(data)=>{
    // this.reload()
    this.close()
    this.props.dispatch({'type':'rtw/changedates',data})
  }

  render() {
    const selectInfo = ['实时交易额','充值金额','提现金额','站岗资金','代收金额','资金净流入','PV','UV']
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 ,minWidth:500},
    };
    const datas = this.props.rtw.data
    return (
      <div>
        <header className={styles.zindex}>
          <h2 className={styles.hh2}>实时监测</h2>
          <div className={styles.rtwc} ref='parent'>
            <div ref='appendnode'></div>
            {
              !this.state.showcalendar?
              <Button onClick={this.selectcalendar}>
                <Icon type="calendar" />日期选择
              </Button>
              :
              <RtwCalendar
                appendnode={this.refs.appendnode}
                parent={this.refs.parent}                
                close={this.close}
                ok={this.ok}
                hints={[]}
              />
            }
          </div>
          <div className={styles.hupdate}>
          <Button onClick={this.reload}>
            <Icon type="reload" />
          </Button>
          </div>
          <div className={styles.sele}>
            <Select defaultValue='H' style={{width:120}} onChange={this.selecthandleChange}>
              <Option value='H'>小时</Option>
              <Option value='M'>分钟</Option>
            </Select>
          </div>
        </header>
        <Row gutter={24} style={{ paddingTop: '52px'}}>
          {
            selectInfo.length > 0 && (
              selectInfo.map((item, index) => {
                return (
                  <Col key={index} {...topColResponsiveProps}>
                    <RealTimeCard load={this.state.load} idx={index} data={item}></RealTimeCard>
                  </Col>
                )
              })
            )
          }
        </Row>
      </div>
    )
  }
}

export default connect(
  ({rtw})=>{
    return {
      rtw
    }
  }
)(RealTimeWatcher)