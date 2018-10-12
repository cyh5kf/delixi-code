import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts.common';
// 引入折线图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { convert, toQfw, trunToYi, convert2, trunToYi2 } from '@/utils/utils';

class Bar extends Component {
  state = {
    title: ''
  };

  componentDidMount() {
    const {
      data,
      type,
      unit
    } = this.props;
    let dataX = [];
    let dataY = [];

    if(data) {
        const dataLength = data.length;
        if(dataLength !== 0) {
            for(let i of data) {
                dataX.push(i.x);
                if(unit === '亿元') {
                    dataY.push(trunToYi2(i.y));
                } else if(unit === '万元') {
                    dataY.push(convert2(i.y));
                } else if(unit === '人') {
                    dataY.push(i.y);
                } else {
                    dataY.push((i.y).toFixed(2));
                }
            }
        } else {
            this.setState({ title: '暂无数据' });
        }
    }

    const idName = `chartBar${type}`;

    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(idName));

    // 指定图表的配置项和数据
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 30,
            bottom: 25,
            left: 50,
            right: 12
        },
        xAxis: {
            type: 'category',
            data: dataX,
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                symbol: ['none','arrow'],
                symbolSize: [10, 12],
                lineStyle: {
                    color: ['#5569cc']
                }
            },
            axisLabel: {
                color: function(value, index) {
                    return '#6c6c6c';
                }
            }
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
        series: [{
            data: dataY,
            type: 'bar',
            symbol: 'circle',
            symbolSize: 4,
            sampling: 'average',
            barWidth: '40%',
            lineStyle: {
                normal: {
                    color: '#e0e4f6',
                    opacity: 0.2
                }
            },
            itemStyle: {
                normal: {
                    color: '#0c5da3'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#e0e4f6'
                    }, {
                        offset: 1,
                        color: '#f5f7fc'
                    }])
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    window.addEventListener('resize', ()=> {
        myChart.resize();
    });
  }

  render() {
    const {
      height,
      type
    } = this.props;
    const { title } = this.state;
    const idName = `chartBar${type}`;
    
    return (
        <div style={{ height, position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-6px', left: 0, width: '100%' }}>
              {title && <h4 style={{ textAlign: 'center', color: '#0c5da3' }}>{title}</h4>}
            </div>
            <div id={idName} style={{ width: '100%', height}}></div>
        </div>
    );
  }
}

export default Bar;
