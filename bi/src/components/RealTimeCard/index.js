import React, { Component } from 'react'
import {connect} from 'dva'
import moment from 'moment'
import Line from '@/components/Echarts/Rtw/Line'
import Bar from '@/components/Echarts/Rtw/Bar'
import RtwCalendar from '@/components/Calendar/RtwCalendar'
import {dateh,datem} from '../../services/datetype'
import { datetoidx } from '../../services/handle'
import {
  Card,
  Tabs,
  Icon,
  Select,
  Switch,
  Table,
  Button,
  Modal,
} from 'antd'
import styles from './index.less'

import request from '../../utils/request';


const TabPane = Tabs.TabPane
const Option = Select.Option
class RealTimeCard extends Component {
  constructor({dispatch,rtw,idx}){
    super()
    this.state={
      data:null,
      timetype:'H',   //选择时间类型  H/M
      showcalendar:false,
      modalVisible:false,
      defaultdate:[moment(new Date()).subtract(1,'day').format('YYYY-MM-DD'),moment(new Date()).format('YYYY-MM-DD')]
    }
  }
  componentDidMount() {
    // const tabs = this.refs.outcard.getElementsByClassName('ant-tabs-tab');
    // setTimeout(()=>{
    //   Array.prototype.forEach.call(tabs,(item)=>{
    //     item.style.margin = 0;
    //   });
    // },10)
    // this.getdata()
    var data = this.props.rtw.data[this.props.idx]
    if (Object.keys(data).length==0) {
      this.refs.none.parentNode.style.display = "none"
    }
    this.ok(this.state.defaultdate)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.load!=this.props.load) {
      this.getdata()
      return
    }
    if (nextProps.rtw.timetypes[this.props.idx]!=this.props.rtw.timetypes[this.props.idx]) {
      this.props.dispatch({'type':`rtw/getdata${this.props.idx}`,'payload':{idx:this.props.idx,dateTime:this.props.rtw.dates[this.props.idx].join(),unit:nextProps.rtw.timetypes[this.props.idx]=='H'?'4':'5'}})
    }else if (nextProps.rtw.dates[this.props.idx]!=this.props.rtw.dates[this.props.idx]) {
      this.props.dispatch({'type':`rtw/getdata${this.props.idx}`,'payload':{idx:this.props.idx,dateTime:nextProps.rtw.dates[this.props.idx].join(),unit:this.props.rtw.timetypes[this.props.idx]=='H'?'4':'5'}})      
    }

  }

  getdata(){
    this.props.dispatch({'type':`rtw/getdata${this.props.idx}`,'payload':{idx:this.props.idx,dateTime:this.props.rtw.dates[this.props.idx].join(),unit:this.props.rtw.timetypes[this.props.idx]=='H'?'4':'5'}})
  }

  selecthandleChange=(v)=>{
    this.props.dispatch({'type':`rtw/getdata${this.props.idx}`,'payload':{idx:this.props.idx,dateTime:this.props.rtw.dates[this.props.idx].join(),unit:v=='H'?'4':'5'}})
    this.props.dispatch({type:'rtw/timetypechange',idx:this.props.idx,v})    
  }
  
  showtypechange=(bool)=>{
    if (bool) {
      this.props.dispatch({type:'rtw/showtypeschange',idx:this.props.idx,v:'tile'})
    }else {
      this.props.dispatch({type:'rtw/showtypeschange',idx:this.props.idx,v:'overlay'})      
    }
  }

  tabChange=(key)=>{
    this.props.dispatch({type:'rtw/tabkeyschange',idx:this.props.idx,key})          
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
    // this.props.dispatch({'type':`rtw/getdata${this.props.idx}`,'payload':{idx:this.props.idx,startTime:'2018-05-09',endTime:'2018-05-11',unit:this.props.rtw.timetypes[this.props.idx]=='H'?'4':'5'}})
    this.props.dispatch({'type':'rtw/changedate',idx:this.props.idx,data})
    
    this.close()
  }

  hangleDbclick=()=>{
    this.setState({
      modalVisible:true
    })
  }

  handleCancel=()=>{
    this.setState({
      modalVisible:false
    })
  }

  setdatax = (data)=> {
    
  }

  render() {
    if(this.refs.outcard){
      var tabs = this.refs.outcard.getElementsByClassName('ant-tabs-tab');
      setTimeout(() => {
          Array.prototype.forEach.call(tabs,(item)=>{
          item.style.margin = '0';          
          item.style.margin = '0px !important';
        }, 10);

      });
    }

    const clientHeight = document.documentElement.clientHeight;
    const tabheight = this.state.modalVisible?clientHeight-300:290

    var data = this.props.rtw.data[this.props.idx]
    if (Object.keys(data).length==0) {
      data=null;
      return <div ref="none"></div>
    }
    const showtype=this.props.rtw.showtypes[this.props.idx]
    const tabkey = this.props.rtw.tabkeys[this.props.idx]
    // const dataday = this.props.rtw.dates[this.props.idx]

    const loading = this.props[`loading${this.props.idx}`]
    const timetype = this.props.rtw.timetypes[this.props.idx]
    const vl=this.props.rtw.timetypes[this.props.idx].toString()
    var extra = (          
    <div className={styles.header}>
      <Select value={vl} style={{width:120,marginRight:'15px'}} onChange={this.selecthandleChange}>
        <Option value='H'>小时</Option>
        <Option value='M'>分钟</Option>
      </Select>

    </div>)

    const tabBarExtraContent = (<div className={styles.ab}></div>)
    

    var datay=[]
    var datax=[]
    var dataSource=[]
    var dataday=[]
    var columns=[{
      title:'时间',
      dataIndex:'time'
    }]
    var countdatay=[]
    var showtxt = ''
    if (data) {
      if(timetype=='H'){
        datax = dateh
      }else{
        datax = datem
      }


      

      data.list.forEach((item)=>{
        dataday.push(item.dateTime)
        if (timetype=="H") {
          var arr = new Array(24)
          arr.fill(0)
          item.dataList.forEach((it)=>{
            arr[parseInt(it.x)] = it.y
          })
          datay.push(arr)
        }else{
          var arr = new Array(1440)
          arr.fill(0)
          item.dataList.forEach((it)=>{
            arr[datetoidx(it.x)] = it.y            
          })
          datay.push(arr)          
        }
      })
//列表中
      

      dataday.forEach((item)=>{
        columns.push({
          title:item,
          dataIndex:item
        })
      })
      
      datax.forEach((item,idx)=>{
        var obj={
          'key':idx,
          'time':item,
        }
        dataday.forEach((day,i)=>{
          obj[day]=datay[i][idx]
        })
        dataSource.push(obj)
      })


      //综合
      datax.forEach((item,index)=>{
        var n = 0
        dataday.forEach((ite,inde)=>{
          n += parseInt(datay[inde][index])
        })
        countdatay.push(n)
      })
      
      showtxt=dataday.join('&&')+''
    }

    // const dataday=data.list

    // if(!data){
    //   return <div></div>
    // }


    const cardRender =(
      <div className={styles.outcard} ref='outcard'>
        <div className={styles.select}>
          <div className={styles.rtwc} ref='parent'>
            <div ref='appendnode'></div>
            {
              !this.state.showcalendar?
              <Button onClick={this.selectcalendar}>
                <Icon type="calendar" />日期选择
              </Button>
              :
              <RtwCalendar
                close={this.close}
                ok={this.ok}
                parent={this.refs.parent}
                appendnode={this.refs.appendnode}
                hints={this.props.rtw.dates[this.props.idx].concat()}
              />
            }
          </div>
          <div className={styles.sele}>
            <span>叠加</span>
            <Switch checkedChildren="平" defaultChecked={showtype=='tile'} unCheckedChildren="叠" onChange={this.showtypechange} />
            <span>平铺</span>
          </div>

        </div>
        <Card loading={loading} title={this.props.data} extra={extra} onDoubleClick ={() => this.hangleDbclick()} bordered={true} bodyStyle={{padding:0}}>
        {
        data&&

          <Tabs defaultActiveKey={tabkey} onChange={this.tabChange} tabBarStyle={{float:'right'}} >
            <TabPane tab={<span><Icon type="line-chart" style={{fontSize:'16px'}} /></span>} key="1">
              <div style={{height:tabheight}}>
                <Line 
                  showtype={showtype}  
                  timetype={timetype}
                  // datax={data.datax}
                  datay={datay}
                  dataday={dataday||[]}
                  height={tabheight}
                  idx={this.props.idx}
                  unit={'万元'}
                />
              </div>
            </TabPane>
            <TabPane tab={<span><Icon type="bar-chart" style={{fontSize:'16px',width:16}} /></span>} key="2">
              <div style={{height:tabheight}}>
                <Bar
                  showtype={showtype}  
                  timetype={timetype}
                  // datax={data.datax}
                  datay={datay}
                  dataday={dataday||[]}
                  height={tabheight}
                  idx={this.props.idx}
                  unit={'万元'}
                />
              </div>
            </TabPane>
            <TabPane tab={<span><Icon type="table" style={{fontSize:'16px'}} /></span>} key="3">
              <div style={{height:tabheight,padding:10}}>
              {
                data&&<Table
                  rowKey={record=>record.key}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={{
                    style:{marginBottom:0},
                    pageSize:this.state.modalVisible?10:3
                  }}
                  scroll={{y:tabheight-100}}
                />
              }
     
              </div>
            </TabPane>
            <TabPane tab={<span><Icon type="area-chart" style={{fontSize:'16px'}} /></span>} key="4">
            <div style={{height:tabheight}}>
                <Line 
                  showtype={'overlay'}  
                  timetype={timetype}
                  datax={datax}
                  datay={[countdatay]}
                  dataday={['所选日期时间段总和']}
                  height={tabheight}
                  idx={this.props.idx}
                  unit={'万元'}
                />
              </div>
            </TabPane>
          </Tabs>
        }
        </Card>
      </div>
    )

   

    const layoutContent = document.querySelector(".ant-layout-content");
    let layoutContentWidth = 0
    if(layoutContent) {
        layoutContentWidth = layoutContent.offsetWidth;
    }

    
    return (
      <>
      {
        this.state.modalVisible? (
          <Modal
              title=""
              visible={true}
              style={{ top: '124px', left: this.props.collapsed? '140px': '316px', height: tabheight + 'px', padding: 0, margin: 0 }}
              bodyStyle={{padding: '0'}}
              footer={null}
              onCancel={this.handleCancel}
              width={layoutContentWidth-100 + 'px'}
              maskStyle={{top: '64px', left: this.props.collapsed? '80px': '256px'}}
          >
              {cardRender}
          </Modal>
      ): cardRender 
      }
      </>
    )
  }
}

export default connect(
  ({rtw,loading,global})=>{
    return {
      rtw,
      collapsed: global.collapsed,
      loading0: loading.effects['rtw/getdata0'],
      loading1: loading.effects['rtw/getdata1'],
      loading2: loading.effects['rtw/getdata2'],
      loading3: loading.effects['rtw/getdata3'],
      loading4: loading.effects['rtw/getdata4'],
      loading5: loading.effects['rtw/getdata5'],
      loading6: loading.effects['rtw/getdata6'],
      loading7: loading.effects['rtw/getdata7'],
      loading8: loading.effects['rtw/getdata8'],
    }
  }
)(RealTimeCard)