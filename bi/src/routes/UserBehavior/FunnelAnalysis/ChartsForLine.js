import React from 'react';
import ReactHighcharts from 'react-highcharts';

onmessage = function (message) {
    postMessage(message)
}
export default class ChartsForLine extends React.Component{
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
               type: 'line'
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
               max: 100,
               title: {
                   text: null
               },
               lineColor:'#e5e5e5',
               lineWidth: 1,
               gridLineDashStyle: 'longdash'
           },
           legend:{
               enabled:true,
               verticalAlign: 'top',
               align: 'left',
               squareSymbol: true,
               symbolHeight: 0,
               symbolWidth: 0
           },
           tooltip: {
               backgroundColor:'#f6b24d',
               pointFormat: `<b>{point.y}</b>`,
               shared: true
           },
           plotOptions: {
               series: {
                   marker: {
                       symbol: 'circle'
                   },
               }
           },
           series: [{
               color:'#6695ec',
               name: '总体',
               data: funelChat.map(item=>item.percentage * Math.random())
           }, {
               color:'#37d88a',
               name: 'Mete7',
               dataLabels:{
                   formatter:data=>{}
               },
               data: funelChat.map(item=>item.percentage * Math.random())
           }, {
               color:'#f6b24d',
               name: 'iphone6',
               data: funelChat.map(item=>item.percentage * Math.random())
           }, {
               color:'#fe8a6e',
               name: 'ipad Air2',
               data: funelChat.map(item=>item.percentage * Math.random())
           }]
       };
       return(
           <div style={{width: '100%',height: 'auto'}}>>
               <ReactHighcharts config={config}/>
           </div>
       )
   }
}