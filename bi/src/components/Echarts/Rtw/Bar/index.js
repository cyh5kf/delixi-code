import React, { Component } from 'react'
import echarts from 'echarts/dist/echarts.common'
import {dateh,datem} from '../../../../services/datetype'

import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default class Line extends Component {
  constructor(){
    super()
    this.state={
      title:'',
      type:'hour',   //按小时还是分钟
    }
  }


  componentDidMount(){
    this.canvas(this.props) 
  }

  componentWillReceiveProps(nextp){
    if (nextp!=this.props) {
      this.canvas(nextp)
    }
  }

  canvas=(props)=>{
    // var datax = props.datax;
    var datay = props.datay;
    if(props.timetype=='H'){
      var datax = dateh
    }else{
      var datax = datem
    }
    const colors = ['#6695ec','#37d88a','#f6b24d','#fe8a6e','#ff7898','#f886ff','#67def5']
    var seriesarr=[];
    var legenddata=props.dataday;
    const unit = props.unit;
    var interval;
    var formatter = function(v,i){
      return v
    }
    if (props.showtype=='overlay'&&props.timetype=='H') {
      interval = 2
      datay.forEach((item,idx)=>{
          var seriesag={
              name:legenddata[idx],
              type:'bar',
              data:item,
              lineStyle:{
                color:colors[idx]
              },
              itemStyle:{
                borderColor:colors[idx],
                color:colors[idx]
              }
          }
          seriesarr.push(seriesag)
      })
    }else if (props.showtype=='overlay'&&props.timetype=='M') {
      interval = 359
      datay.forEach((item,idx)=>{
        var seriesag={
            name:legenddata[idx],
            type:'bar',
            data:item,
            lineStyle:{
              color:colors[idx]
            },
            itemStyle:{
              borderColor:colors[idx],
              color:colors[idx]              
            }
        }
        seriesarr.push(seriesag)
      })
    }else if (props.showtype=='tile'&&props.timetype=='H') {
      interval = 23
      var arry=[];
      formatter = function(v,i){
        // if (i%24==0&&i<=24) {
        //   return props.dataday[i/24]
        // }else if(i>24&&(i-1)%23==0){
        //   return props.dataday[(i-1)/23]
        // }
        if (i%24==0) {
          return props.dataday[i/24]
        }
      }
      datay.forEach((item,idx)=>{
        arry = arry.concat(item)
      });
      seriesarr.push({
        type:'bar',
        data:arry,
        lineStyle:{
          color:colors[0]
        },
        itemStyle:{
          borderColor:colors[0],
          color:colors[0]          
        }
      });

      var arrx=[];
      props.dataday.forEach((item,idx)=>{
        if(idx==(props.dataday.length-1)){
          arrx = arrx.concat(datax)
        }else{
          arrx=arrx.concat(datax.slice(0,-1))
        }
      })
      datax = arrx;
      legenddata=[''];
    }else if (props.showtype=='tile'&&props.timetype=='M') {
      interval = 1439
      formatter = function(v,i){
        if (i%1440==0) {
          return props.dataday[i/1440]
        }
        // if (i%1440==0&&i<=1440) {
        //   return props.dataday[i/24]
        // }else if(i>1440&&(i-1)%1439==0){
        //   return props.dataday[(i-1)/1439]
        // }
      }
      var arr=[];
      datay.forEach((item,idx)=>{
        arr = arr.concat(item)
      });
      seriesarr.push({
        type:'bar',
        data:arr,
        lineStyle:{
          color:colors[0]
        },
        itemStyle:{
          borderColor:colors[0],
          color:colors[0]          
        }
      });
      var arrx=[];
      props.dataday.forEach((item,idx)=>{
        if(idx==(props.dataday.length-1)){
          arrx = arrx.concat(datax)
        }else{
          arrx=arrx.concat(datax.slice(0,-1))
        }
      })

      datax = arrx;
      legenddata=[];
      
    }

    const mychart = echarts.init(this.refs.canvas)
    const self = this;
    var option = {
      tooltip:{
        trigger:'axis',
      },
      legend:{
        data:legenddata,
      },
      grid: {
        top: 80,
        bottom: 25,
        left: 50,
        right: 30
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: datax,
          splitLine: {
            show:false
          },
          axisLine: {
              symbol: ['none','arrow'],
              lineStyle: {
                  color: ['#5569cc']
              }
          },
          axisLabel: {
              color: function(value, index) {
                  return '#6c6c6c';
              },
              interval:interval,
              formatter:formatter
          },
      },
      yAxis: {
          type: 'value',
          name: unit,
          splitLine: {
              lineStyle: {
                  type: 'dashed'
              }
          },
          axisLine: {
              symbol: ['none','arrow'],
              symbolSize: [10, 12],
              lineStyle: {
                  color: ['#5569cc']
              }
          },
      },
      series: seriesarr
    }

    // mychart.clear();
    // mychart.showLoading('default', {
    //   text: 'Loading',
    //   color: '#2db7f5',
    //   textColor: '#2db7f5',
    //   maskColor: 'rgba(255, 255, 255, 0.8)',
    //   zlevel: 0
    // });
    // setTimeout(() => {
    //   mychart.hideLoading();
    // }, 1000);
    mychart.setOption(option,{
      notMerge:true
    });
    window.addEventListener('resize',()=>{
      mychart.resize()
    })
  }


  render() {
    const idName='id'+this.props.idx
    const height = this.props.height-20;
    return (
      <div style={{ height, position: 'relative' }}>
        {/* <div style={{ position: 'absolute', top: '-6px', left: 0, width: '100%' }}>
            {title && <h4 style={{ textAlign: 'center', color: '#0c5da3' }}>{title}</h4>}
        </div> */}
        <div ref='canvas' style={{ width: '100%', height}}></div> 
      </div>
    )
  }
}
