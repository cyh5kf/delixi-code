import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class ChartsForColumn extends React.Component{
   render(){
       const funelChat = [
           {title:'下载成功',percentage:100,number:2000,difference:0},
           {title:'激活成功',percentage:75,number:1500,difference:25},
           {title:'注册成功',percentage:60,number:1500,difference:20},
           {title:'实名成功',percentage:55,number:1500,difference:15},
           {title:'投资成功',percentage:50,number:1500,difference:10}
       ];
       const config = {
           chart: {
               type: 'column',
               // margin:0,
               // width:1187,
               // height: 419,
           },
           credits:{
               enabled: false
           },
           title: {
               text: '推广转化漏斗'
           },
           xAxis: {
               categories: funelChat.map(item=>item.title),
               title: {
                   text: null
               },
               lineColor:'#e5e5e5',
               lineWidth: 1,
               tickLength: 0
           },
           yAxis: {
               min: 0,
               title: {
                   text: null
               },
               max:100,
               tickAmount:6,
               lineColor:'#e5e5e5',
               lineWidth: 1,
               gridLineDashStyle: 'longdash',
               labels: {
                   format: '{value}'
               }
           },
           legend:{
               enabled:false
           },
           tooltip: {
               backgroundColor:'#f6b24d',
               pointFormat: `<b>{point.y}</b>`,
               enabled: false
           },
           plotOptions: {
               column: {
                   stacking: 'normal',
                   dataLabels: {
                       enabled: true,
                       inside: true,
                       style:{
                           fontWeight:'normal',
                           textOutline:'1px'
                       }

                   }
               }
           },
           series: [{
               type:'area',
               color:'#fef4e4',
               marker: {
                   enabled: false
               },
               dataLabels:{
                   enabled: true,
                   style: {
                       fontWeight: 'normal',
                       color: '#fff',
                       fontSize:10,
                       textAlign: 'center'
                   },
                   useHTML: true,
                   x:-100,
                   y: 100,
                   formatter:function () {
                       if(this.point.index > 0) {
                        return `<div style="background: url('data:image/png;base64,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');background-size: 100%;width: 64px;height: 20px">${this.y}%</div>`
                       }
                   }
               },
               data: funelChat.map(item=>item.percentage)
           }, {
               color:'#cadaf8',
               dataLabels:{
                   formatter:data=>{}
               },
               data: funelChat.map(item=>item.difference)
           }, {
               color:'#6695ec',
               dataLabels: {
                   enabled: true,
                   formatter: function () {
                       let data = funelChat.map(item=>item.number)[this.point.index];
                       return `<span>${data}人</span><br/><span>${this.y}%</span>`
                   }
               },
               data: funelChat.map(item=>item.percentage)
           }]
       };
       return(
           <div style={{width: '100%',height: 'auto'}}>
               <ReactHighcharts config={config}/>
           </div>
       )
   }
}