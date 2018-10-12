import React, { Component } from 'react'
import {connect} from 'dva'
import {
  Tag,
  DatePicker,
  Button,
  Icon,
  message
} from 'antd'

import styles from './RtwCalendar.less'
import {getTimeDistance,GetDateDiff,getnode} from '@/utils/utils';
import moment from 'moment'


export default class RtwCalendar extends Component {
  constructor(props){
    super();
    this.state={
      hints:props.hints,
      disablestart:'2016-06-04',
    }
  }

  componentDidMount(){
    setTimeout(() => {
      const inputs = document.body.getElementsByClassName('ant-calendar-input-wrap');
      const l=inputs.length   //数组长度会变化所以弄出来
      for (let i = 0; i < l; i++) {
          const element = inputs[0];
          element.parentNode.removeChild(element)
      }
    }, 10);
    document.addEventListener('click',this.event)
  }
  componentWillUnmount(){
    document.removeEventListener('click',this.event)
  }

  event=(e)=>{
    if(!this.getnod(e.target,this.props.parent)){
      this.props.close()
    }
  }

  getnod=(node,oldnode)=>{
    if(!node){
        return true
    }if (node!=document.body&&node!=oldnode) {
      return this.getnod(node.parentNode,oldnode)
    }else if(node ==oldnode){
      return true
    }else if(node ==document.body){
      return false
    }
  }



  tagclose=(v)=>{
    this.setState({
      hints:this.state.hints.filter((item,idx)=>{
        return idx!=v
      })
    })
  }

  selectdate=(v)=>{
    if (this.state.hints.length>=7) {
      message.error('只能选择7天内哦! ^0^')
      return
    };
    const time = moment(v).format('YYYY-MM-DD')
    if (!this.state.hints.includes(time)) {
      var arr=this.state.hints
      arr.push(time)
      this.setState({
        hints:arr
      })
    }
  }

  disabledStartDate=(v)=>{
    const x = moment(v).format('YYYY-MM-DD')     
    const thistime = new Date(x).getTime()
    const m = moment(this.state.disablestart).format('YYYY-MM-DD')
    const starttime = new Date(m).getTime()
    const nowtime = new Date().getTime()
    return thistime<starttime||nowtime<thistime
  }

  addendnode=()=>{
    return this.props.appendnode
  }

  render() {

    return (
      <div className={styles.box} ref='innercard'>
        <div ref='endnode'></div>
        <div className={styles.date}>
          <DatePicker
            open={true}
            disabledDate={this.disabledStartDate}
            onChange={this.selectdate}
            getCalendarContainer={this.addendnode}  
            dateRender={(current) => {
              const style = {};
              if (this.state.hints.includes(moment(current).format('YYYY-MM-DD')) ) {
                style.border = '1px solid #1890ff';
                style.borderRadius = '50%';
              }
              return (
                <div className="ant-calendar-date" style={style}>
                  {current.date()}
                </div>
              );
            }}
          />
        </div>
        <div className={styles.tag}>
          <span style={{color:'#1890ff'}}>已选择</span>
          
          {
            this.state.hints.map((item,idx)=>{
              return (<div key={idx}>
                  <Button onClick={()=>{this.tagclose(idx)}}>
                    {item}
                    <Icon type="close-circle" />
                  </Button>
              </div>)
            })
          }
        </div>
        <div className={styles.btn}>

          <div>
              <Button type='primary' onClick={
                  ()=>{
                    this.props.ok(this.state.hints)
                  }
              }>确认</Button>
          </div>
          <div>
              <Button onClick={this.props.close}>取消</Button>
          </div>          
        </div>
      </div>
    )
  }
}
