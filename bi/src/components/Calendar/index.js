import React, { Component } from 'react'
import {connect} from 'dva'
import {DatePicker,Select,Button} from 'antd'
import moment from 'moment'
import styles from './index.less';
import classNames from 'classnames'
import {getTimeDistance,GetDateDiff,getnode} from '@/utils/utils';

const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD'

var status ={
    startchangerange:false, //有没有切换区域
    endchangerange:false,
}
export default class Calendar extends Component {
    constructor({cardInfo}){
        super()
        this.state={
            addcalendardate:false,
            starttime:cardInfo.rangePickerValue[0],
            endtime:cardInfo.rangePickerValue[1],
            title:cardInfo.timeFrame,
            select:{
                yesterday:'昨日',
                today:'今日',
                lastWeek:'上周',
                week:'本周',
                lastMonth:'上月',
                month:'本月',
                lastYear:'去年',
                year:'今年',
                past7days:'过去7天',
                past30days:'过去30天',
                upToDate:'上线至今'
            },
        }
    }

    componentDidMount(){
        const today = moment(new Date()).format('YYYY-MM-DD')
        this.setState({
            endtime:today
        })
        // document.addEventListener('click',this.event);
        // const inputs = this.refs.innercard.getElementsByClassName('ant-calendar-input-wrap')
        // Array.prototype.forEach.call(inputs,(item,index)=>{
        //     item.style.display='none !important';
        // })
    }

    componentWillUnMount(){
        document.removeEventListener('click',this.event)
    }
    event=(e)=>{
         if(!this.getnod(e.target,this.refs.innercard)){
                this.closecalendar()
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

    showcalendar=()=>{
        document.addEventListener('click',this.event)
        this.setState({
            addcalendardate:true
        })
    }

    closecalendar=()=>{
        document.removeEventListener('click',this.event)
        
        this.setState({
            addcalendardate:false
        })
    }
    savechange=(data)=>{
        this.setState(data,()=>{
            this.props.handlecalendar(this.state.starttime,this.state.endtime,this.state.title)
        })
    }

    render () {
        const {starttime,endtime,title,select} = this.state
        return (<div className={styles.calendar} ref='innercard'>
            <div ref='startnode'></div>
            <div ref='endnode'></div>
            {
                this.state.addcalendardate
                &&
                <CalendarDate 
                    nodes={this.refs.startnode}  
                    endnode={this.refs.endnode}
                    closecalendar={this.closecalendar}
                    endtime={this.state.endtime}
                    starttime={this.state.starttime}
                    savechange={this.savechange}
                    title={this.state.select[this.state.title]}
                    idx={this.props.idx}
                    innercard={this.refs.innercard}
                />
                
            }
                <div onClick={this.showcalendar} className={styles.view}>
                    <span>{starttime}至{endtime}</span>
                    <span>|</span>
                    <span>{Object.keys(select).includes(title)?select[title]:title}</span>
                </div>
            
        </div>)
    }
}




class CalendarDate extends Component {
    constructor(props){
        super();
        this.state={
            defaultstart:'2016/05/04',  //公司起始时间
            defaultend:'',  //今天时间
            starttime:props.starttime,   //选择开始时间
            endtime:props.endtime,  //选择结束时间
            selectstate:props.title,
            selectlist:[
                {
                    select:'昨日',
                    en:'yesterday',
                    class:'sml'
                },{
                    select:'今日',
                    en:'today',
                    class:'smr'
                },{
                    select:'上周',
                    en:'lastWeek',
                    class:'sml'
                },{
                    select:'本周',
                    en:'week',
                    class:'smr'
                },{
                    select:'上月',
                    en:'lastMonth',
                    class:'sml'
                },{
                    select:'本月',
                    en:'month',
                    class:'smr'
                },{
                    select:'去年',
                    en:'lastYear',
                    class:'sml'
                },{
                    select:'今年',
                    en:'year',
                    class:'smr'
                },{
                    select:'过去7天',
                    en:'past7days',
                    class:'sm'
                },{
                    select:'过去30天',
                    en:'past30days',
                    class:'sm'
                },{
                    select:'上线至今',
                    en:'upToDate',
                    class:'sm'
                }
            ],

        }
    }
    componentDidMount(){
        const x = moment().format('YYYY-MM-DD')
        this.setState({
            defaultend:x
        })
        setTimeout(() => {
            this.addrangeclass()
            this.endaddrangeclass()
        }, 10);
        // document.addEventListener('click',this.event);
        setTimeout(() => {
            const inputs = this.props.innercard.getElementsByClassName('ant-calendar-input-wrap');
            const l=inputs.length   //数组长度会变化所以弄出来
            for (let i = 0; i < l; i++) {
                const element = inputs[0];
                element.parentNode.removeChild(element)
            }
        }, 10);
        // document.addEventListener('click',this.removed)
        // this.refs.box.addEventListener('click',this.remove)
    }

    // componentWillUnMount(){
    //     this.refs.box.removeEventListener('click',this.remove)
    //     document.removeEventListener('click',this.removed)
        
    // }
    // remove=(e)=>{
    //     e.stopPropagation()
    // }
    // removed=()=>{
    //     this.props.closecalendar()
    // }
    onStartChange=(v)=>{
        const time = moment(v).format('YYYY-MM-DD')
        if (this.state.selectstate!='') {
            this.setState({
                starttime:time,
                selectstate:'',
            },()=>{this.addrangeclass()})
        }else{
            this.setState({
                starttime:time,
            },()=>{this.addrangeclass()})
        }
    }
    onEndChange=(v)=>{
        const time = moment(v).format('YYYY-MM-DD')
        if (this.state.selectstate!='') {
            this.setState({
                endtime:time,
                selectstate:'',
            },()=>this.endaddrangeclass())
        }else{
            this.setState({
                endtime:time
            },()=>this.endaddrangeclass())            
        }
    }
    disabledStartDate= (v)=>{
        const x = moment(v).format('YYYY-MM-DD')     
        if (x.slice(8)==15) {
            status.startchangerange=false;
            if(x.slice(0,4)==this.state.starttime.slice(0,4)&&x.slice(5,7)==this.state.starttime.slice(5,7)){
                status.startchangerange=true;
            }
            setTimeout(() => {
                this.addrangeclass()
                this.endaddrangeclass()
            }, 10);
        }
        const thistime = new Date(x).getTime()
        const m = moment(this.state.defaultstart).format('YYYY-MM-DD')
        const starttime = new Date(m).getTime()
        const endtime = new Date(this.state.endtime).getTime()
        return thistime<starttime||endtime<thistime
    }
    disabledEndDate=(v)=>{
        const x = moment(v).format('YYYY-MM-DD')
        if (x.slice(8)==15) {
            status.endchangerange=false;
            if(x.slice(0,4)==this.state.endtime.slice(0,4)&&x.slice(5,7)==this.state.endtime.slice(5,7)){
                status.endchangerange=true;
            }
            setTimeout(() => {
                this.addrangeclass()
                this.endaddrangeclass()
            }, 10);
        }
        
        const thistime = new Date(x).getTime()
        const m = moment(this.state.starttime).format('YYYY-MM-DD')
        const starttime = new Date(m).getTime()
        const endtime = new Date(this.state.defaultend).getTime()
        return thistime<starttime||endtime<thistime
    }

    addstartnode=(trig)=>{
        return this.props.nodes
    }
    addendnode=()=>{
        return this.props.endnode
    }

    addrangeclass=()=>{
        const tdarray = this.props.nodes.getElementsByClassName('ant-calendar-date')
        var week = (new Date(this.state.starttime.slice(0,8)+'01')).getDay()
        var month=(new Date(parseInt(this.state.starttime.slice(0,4)),parseInt(this.state.starttime.slice(5,7)),0)).getDate()
        const {starttime,endtime} = this.state
        week = week===0?7:week;
        Array.prototype.forEach.call(tdarray,(item,index)=>{
            if (item.parentNode.className.match(/range/)) {
                item.parentNode.className=item.parentNode.className.replace('range', "")
            }
        });
        if (!status.startchangerange) return;
        for (let i = 0; i < tdarray.length; i++) {
            const element = tdarray[i];
            
            if (i<(month+week)&&i>=week&&starttime.slice(0,7)!=endtime.slice(0,7)&&element.innerHTML>parseInt(starttime.slice(8))) {
                //如果不是同一个月那么后面都可以加颜色
                element.parentNode.className +=' range'

            }else if(starttime.slice(0,7)==endtime.slice(0,7)&&i<(month+week)&&i>=week&&element.innerHTML>parseInt(starttime.slice(8))&&element.innerHTML<=parseInt(endtime.slice(8))){
                element.parentNode.className +=' range'

            }

        }
       
    }

    endaddrangeclass=()=>{
        const endarray = this.props.endnode.getElementsByClassName('ant-calendar-date')
        var endweek = (new Date(this.state.endtime.slice(0,8)+'01')).getDay()
        const {starttime,endtime} = this.state        
        var endmonth = (new Date(parseInt(this.state.endtime.slice(0,4)),parseInt(this.state.endtime.slice(5,7)),0)).getDate()
        endweek = endweek===0?6:endweek-1;
        Array.prototype.forEach.call(endarray,(item,index)=>{
            if (item.parentNode.className.match(/range/)) {
                item.parentNode.className=item.parentNode.className.replace('range', "")
            }
        })
        if (!status.endchangerange) return;
        for (let j = 0; j < endarray.length; j++) {
            const endelement = endarray[j];
            if (j<(endmonth+endweek)&&j>=endweek&&starttime.slice(0,7)!=endtime.slice(0,7)&&endelement.innerHTML<parseInt(endtime.slice(8))) {
                endelement.parentNode.className +=' range'
            }else if(starttime.slice(0,7)==endtime.slice(0,7)&&j<(endmonth+endweek)&&j>=endweek&&endelement.innerHTML<parseInt(endtime.slice(8))&&endelement.innerHTML>=parseInt(starttime.slice(8))){
                endelement.parentNode.className +=' range'
            }
        } 
    }

    quickselect=(data)=>{
        if(data.select!==this.selectstate){
            const timearray = getTimeDistance(data.en);
            this.setState({
                selectstate:data.select,
                starttime:timearray[0],
                endtime:timearray[1]
            },()=>{
                this.addrangeclass()
                this.endaddrangeclass()                
            })            
        }

    }
    showtitle(){
        if (this.state.selectstate=='') {
            const startTime = moment(this.state.starttime).format('YYYY-MM-DD');
            const endTime = moment(this.state.endtime).format('YYYY-MM-DD');
            const now = moment().format('YYYY-MM-DD');
            const startFromNow = GetDateDiff(startTime, now);
            const endFromNow = GetDateDiff(endTime, now);
            let startText = '';
            let endText = '';
            if(startFromNow === 0) {
                startText = '今天';
            } else {
                startText = `过去${startFromNow}天`;
            }
            if(endFromNow === 0) {
                endText = '今天';
            } else {
                endText = `过去${endFromNow}天`;
            }
            const timeFrame = startText + ' - ' + endText;
            return timeFrame
        }else{
            return this.toen(this.state.selectstate)
        }
    }
    toen=(m)=>{
        const sele = this.state.selectlist
        for (let i = 0; i < sele.length; i++) {
            if (m==sele[i].select) {
                return sele[i].en
            }
            
        }
    }

    render() {
        const timeFrame= 'upToDate'
        const type='12'
        return (
            <div ref='box' className={classNames({[styles.box]:(this.props.idx+1)%3!=0,[styles.abr]:(this.props.idx+1)%3==0})}>
                <div className={styles.box_contentc}>
                    <div className={styles.fl_1}>
                        <p>
                            时间范围
                        </p>
                        <div className={styles.select}>
                            {
                                this.state.selectlist.map((item,index)=>{
                                    return <p key={index} 
                                    className={classNames({[styles[item.class]]:true,[styles.co]:item.select===this.state.selectstate})} 
                                    onClick={()=>{this.quickselect(item)}}
                                    >{item.select}</p>
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.fl_2} ref='startdd'>
                        <p>
                            起始时间
                        </p>
                        <DatePicker
                            defaultValue={moment(this.state.starttime,dateFormat)}
                            format={dateFormat}
                            value={moment(this.state.starttime)}
                            allowClear={false}
                            open={true}
                            onChange={this.onStartChange}
                            disabledDate={this.disabledStartDate}
                            getCalendarContainer={this.addstartnode}
                            style={{position:'absolute',top:40,left:0,width:100,height:200}}
                        />
                    </div>
                    <div className={styles.fl_2}>
                        <p>
                            结束时间
                        </p>
                        <DatePicker
                            defaultValue={moment(this.state.endtime,dateFormat)}
                            value={moment(this.state.endtime)}
                            format={dateFormat}
                            allowClear={false}
                            open={true}
                            onChange={this.onEndChange}
                            disabledDate={this.disabledEndDate}      
                            getCalendarContainer={this.addendnode}                                                  
                            style={{position:'absolute',top:40,left:0}}
                        />
                    </div>
                </div>
                <div className={styles.btn}>
                <div>
                    <Button onClick={this.props.closecalendar}>取消</Button>
                </div>
                <div>
                    <Button type='primary' onClick={
                        ()=>{
                            this.props.savechange({
                                starttime:this.state.starttime,
                                endtime:this.state.endtime,
                                title:this.showtitle(),
                                addcalendardate:false,
                            })
                        }
                    }>确认</Button>
                </div>
                </div>
            </div>
        )
    }
}
