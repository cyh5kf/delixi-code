import React from 'react';
import ReactHighCharts from 'react-highcharts';
import moment from 'moment';

export default class Column extends React.Component{
    render() {
        const data = [1.4,1.1612,1.598,1.498,1.632];
        const average = data.reduce((a,sum)=>sum+a,0) / data.length
        const config = {
            chart: {
                type: 'column',
                width: 470,
                // height: 180
            },
            title: {
                text: ''
            },
            subtitle:{
                text:'单位：亿',
                align:'left'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type:'datetime',
                // categories: ['2017-10-09','2017-10-08','2017-10-07','2017-10-06','2017-10-05'],
                lineColor:'#e5e5e5',
                lineWidth: 1,
                tickWidth: 1,
                tickLength: 0,
                crosshair: {
                    width: 1,
                    color: '#6eb6f9'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                lineColor:'#e5e5e5',
                lineWidth: 1,
                tickAmount:4,
                gridLineDashStyle: 'longdash',
                plotLines: [{
                    color: '#6eb6f9',
                    width: 1,
                    value: average
                }]
            },
            tooltip: {
                backgroundColor: '#4d5d7a',
                borderWidth: 0,
                borderColor: 'rgba(0,0,0,0)',
                shadow: false,
                useHTML: true,
                formatter: function () {
                    return `<span style="color:#1890ff">${this.y}</span><br><span style="color:#fff">${moment(new Date(this.x)).format('YYYY-MM-DD')}</span>`
                }
            },
            plotOptions: {
                series: {
                    pointStart: Date.UTC(2017, 5, 28),
                    pointInterval: 24 * 3600 * 1000,
                    lineColor: '#6eb6f9',
                    dataLabels: {
                        align: 'left',
                        enabled: true
                    },
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 1,
                        lineColor: '#6eb6f9'
                    }
                },
                area: {
                    marker: {
                        enabled: true,
                        symbol: 'circle',
                        radius: 4,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'normal',
                            color: '#6eb6f9',
                            fontSize:10,
                            textAlign: 'center'
                        },
                        useHTML: true,
                    }
                }
            },
            series: [{
                name: '',
                label: {
                    text: null
                },
                color: '#b9ddff',
                data: data
            }]
        }
        return (
            <div style={{width: '100%',height: 'auto'}}>
                <ReactHighCharts config={config} />
            </div>
        )
    }
}