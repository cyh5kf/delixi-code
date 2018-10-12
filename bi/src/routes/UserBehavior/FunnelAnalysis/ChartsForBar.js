import React from 'react';
import ReactHighcharts from 'react-highcharts';

export default class ChartsForColumnBar extends React.Component {
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
                type: 'bar',
                credits: {
                    enabled: false
                },
                title: {
                    text: '推广转化漏斗'
                },
            },
            xAxis: {
                labels: {
                    enabled: false
                },
                visible: false
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                visible: false
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
            plotOptions: {
                bar: {
                    stacking: 'normal',
                }
            },
            series: [
                {
                    name: '百度',
                    color: '#fff7d9',
                    data: funelChat.map(item => item.percentage)
                }, {
                    name: '好搜',
                    color: '#54adff',
                    data: funelChat.map(item => item.difference)
                }]
        };
        return (
            <div style={{width: '100%', height: 'auto'}}>
                <ReactHighcharts config={config}/>
            </div>
        )
    }
}