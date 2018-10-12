import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class ChartsForColumnGroup extends React.Component {
    render() {
        const funelChat = [
            {title: '下载成功', percentage: 100, number: 2000, difference: 0},
            {title: '激活成功', percentage: 75, number: 1500, difference: 25},
            {title: '注册成功', percentage: 60, number: 1500, difference: 20},
            {title: '实名成功', percentage: 55, number: 1500, difference: 15},
            {title: '投资成功', percentage: 50, number: 1500, difference: 10}
        ];
        const config = {
            chart: {
                type: 'column',
                // margin:0,
                // width:1187,
                // height: 419,
            },
            credits: {
                enabled: false
            },
            title: {
                text: '推广转化漏斗'
            },
            xAxis: {
                categories: funelChat.map(item => item.title),
                title: {
                    text: null
                },
                lineColor: '#e5e5e5',
                lineWidth: 1,
                tickLength: 0
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                max: 100,
                tickAmount: 6,
                lineColor: '#e5e5e5',
                lineWidth: 1,
                gridLineDashStyle: 'longdash',
                labels: {
                    format: '{value}'
                }
            },
            legend: {
                enabled: true,
                verticalAlign: 'top',
                align: 'left',
                squareSymbol: true,
                symbolHeight: 0,
                symbolWidth: 0
            },
            tooltip: {
                backgroundColor: '#4d4f70',
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [
                {
                    name: '百度',
                    color: '#6695ec',
                    data: funelChat.map(item => item.percentage)
                }, {
                    name: '好搜',
                    color: '#37d88a',
                    data: funelChat.map(item => item.difference)
                }, {
                    name: '推广',
                    color: '#f6b24d',
                    data: funelChat.map(item => item.percentage)
                }, {
                    name: '网贷天下',
                    color: '#fe8a6e',
                    data: funelChat.map(item => item.percentage)
                }, {
                    name: '视通',
                    color: '#ff7898',
                    data: funelChat.map(item => item.percentage)
                }, {
                    name: '人众答题',
                    color: '#f886ff',
                    data: funelChat.map(item => item.percentage)
                }, {
                    name: '无渠道',
                    color: '#67def5',
                    data: funelChat.map(item => item.percentage)
                }]
        };
        return (
            <div style={{width: '100%',height: 'auto'}}>
                <ReactHighcharts config={config}/>
            </div>
        )
    }
}