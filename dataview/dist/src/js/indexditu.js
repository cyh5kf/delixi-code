/**
 * Created by Administrator on 2017/1/10 0010.
 */
window.myChart =null;
window.oldData = [];
function resetoldDate(){
    window.oldData = [];
}
// function mapint(m){
//     mapupdate(m)
//     console.log(m)
// }
function init(){
    var dom = document.getElementById("mapcontainer");
    myChart = echarts.init(dom);
}

function setoldData(value){
    var data = [
        [{ name: '浙江' }, { name: '山东', value: 43 }],
        [{ name: '浙江' }, { name: '江苏', value: 47 }],
        [{ name: '浙江' }, { name: '上海', value: 48 }],
        [{ name: '浙江' }, { name: '浙江', value: 95 }],
        [{ name: '浙江' }, { name: '安徽', value: 42 }],
        [{ name: '浙江' }, { name: '福建', value: 45 }],
        [{ name: '浙江' }, { name: '江西', value: 31 }], //
        [{ name: '浙江' }, { name: '广东', value: 46 }],
        [{ name: '浙江' }, { name: '广西壮族自治区', value: 49 }],
        [{ name: '浙江' }, { name: '海南', value: 44 }],
        [{ name: '浙江' }, { name: '河南', value: 40 }],
        [{ name: '浙江' }, { name: '湖南', value: 38 }],
        [{ name: '浙江' }, { name: '湖北', value: 39 }],
        [{ name: '浙江' }, { name: '北京', value: 36 }],
        [{ name: '浙江' }, { name: '天津', value: 35 }],
        [{ name: '浙江' }, { name: '河北', value: 41 }],
        [{ name: '浙江' }, { name: '山西', value: 37 }],
        [{ name: '浙江' }, { name: '内蒙古自治区', value: 54 }],
        [{ name: '浙江' }, { name: '宁夏回族自治区', value: 53 }],
        [{ name: '浙江' }, { name: '青海', value: 57 }],
        [{ name: '浙江' }, { name: '陕西', value: 52 }],
        [{ name: '浙江' }, { name: '甘肃', value: 58 }],
        [{ name: '浙江' }, { name: '新疆维吾尔族自治区', value: 59 }],
        [{ name: '浙江' }, { name: '四川', value: 56 }],
        [{ name: '浙江' }, { name: '贵州', value: 50 }],
        [{ name: '浙江' }, { name: '云南', value: 55 }],
        [{ name: '浙江' }, { name: '重庆', value: 51 }],
        [{ name: '浙江' }, { name: '西藏自治区', value: 60 }],
        [{ name: '浙江' }, { name: '辽宁', value: 34 }],
        [{ name: '浙江' }, { name: '吉林', value: 33 }],
        [{ name: '浙江' }, { name: '黑龙江', value: 32 }],
        [{ name: '浙江' }, { name: '香港', value: 27 }],
        [{ name: '浙江' }, { name: '澳门', value: 29 }],
        [{ name: '浙江' }, { name: '台湾', value: 28 }],
    ];
    var hzdata = [];
    data.forEach((item,index)=>{
        value.forEach((it,idx)=>{
            if (item[1].name == it) {
                var cope = JSON.parse(JSON.stringify(item));
                cope.push(false) //0是新数据
                // CT.push(item)
                hzdata.push(cope)
            }
        })
    })

    oldData = hzdata
}

function mapint(valu,rem) {
    myChart.clear()
    var app = {};
    option = null;

    var geoCoordMap = {
        '新疆维吾尔族自治区': [81.9236, 41.5883],
        '西藏自治区': [89.1865, 30.1465],
        '甘肃': [95.4038, 39.8207],
        '青海': [95.8955, 36.1097],
        '四川': [102.0488, 31.0948],
        '云南': [101.5901, 24.3043],
        '内蒙古自治区': [103.7073, 40.5513],
        '宁夏回族自治区': [106.2126, 37.0232],
        '陕西': [107.6853, 33.8666],
        '重庆': [106.5518, 29.5725],
        '贵州': [106.0131, 26.8706],
        '广西壮族自治区': [108.479, 23.1152],
        '上海': [121.4648, 31.2891],
        '江苏': [120.4229, 32.478],
        '广东': [113.5107, 24.0196],
        '福建': [118.4229, 25.478],
        '海南': [109.5535, 18.8775],
        '江西': [115.8505, 28.7091],
        '山东': [117.4219, 36.4189],
        '安徽': [116.4229, 31.478],
        '河北': [114.4229, 38.478],
        '河南': [112.4229, 34.478],
        '湖北': [111.4229, 31.5478],
        '湖南': [111.0229, 27.5478],
        '山西': [111.3229, 36.478],
        '北京': [116.4229, 40.1478],
        '天津': [117.4229, 39.0478],
        '辽宁': [121.4229, 41.3478],
        '吉林': [125.4229, 43.3478],
        '黑龙江': [128.4229, 46.3478],
        '浙江': [120.6042, 29.1900],
    };

    var ZJData = [
        [{ name: '浙江' }, { name: '西藏自治区', value: 60 }],
        [{ name: '浙江' }, { name: '新疆维吾尔族自治区', value: 59 }],
        [{ name: '浙江' }, { name: '甘肃', value: 58 }],
        [{ name: '浙江' }, { name: '青海', value: 57 }],
        [{ name: '浙江' }, { name: '四川', value: 56 }],
        [{ name: '浙江' }, { name: '云南', value: 55 }],
        [{ name: '浙江' }, { name: '内蒙古自治区', value: 54 }],
        [{ name: '浙江' }, { name: '宁夏回族自治区', value: 53 }],
        [{ name: '浙江' }, { name: '陕西', value: 52 }],
        [{ name: '浙江' }, { name: '重庆', value: 51 }],
        [{ name: '浙江' }, { name: '贵州', value: 50 }],
        [{ name: '浙江' }, { name: '江西', value: 31 }], //        
        [{ name: '浙江' }, { name: '广西壮族自治区', value: 49 }],
        [{ name: '浙江' }, { name: '上海', value: 48 }],
        [{ name: '浙江' }, { name: '江苏', value: 47 }],
        [{ name: '浙江' }, { name: '广东', value: 46 }],
        [{ name: '浙江' }, { name: '福建', value: 45 }],
        [{ name: '浙江' }, { name: '海南', value: 44 }],
        [{ name: '浙江' }, { name: '山东', value: 43 }],
        [{ name: '浙江' }, { name: '安徽', value: 42 }],
        [{ name: '浙江' }, { name: '河北', value: 41 }],
        [{ name: '浙江' }, { name: '河南', value: 40 }],
        [{ name: '浙江' }, { name: '湖北', value: 39 }],
        [{ name: '浙江' }, { name: '湖南', value: 38 }],
        [{ name: '浙江' }, { name: '山西', value: 37 }],
        [{ name: '浙江' }, { name: '北京', value: 36 }],
        [{ name: '浙江' }, { name: '天津', value: 35 }],
        [{ name: '浙江' }, { name: '辽宁', value: 34 }],
        [{ name: '浙江' }, { name: '吉林', value: 33 }],
        [{ name: '浙江' }, { name: '黑龙江', value: 33 }],
        [{ name: '浙江' }, { name: '浙江', value: 95 }],
        [{ name: '浙江' }, { name: '香港', value: 27 }],
        [{ name: '浙江' }, { name: '澳门', value: 29 }],
        [{ name: '浙江' }, { name: '台湾', value: 28 }],
    ];

    var HZData = [[{ name: '浙江' }, { name: '浙江', value: 95 },true]]
    // var CT = []  //数据格式转换可用格式
    ZJData.forEach((item,index)=>{
        valu.forEach((it,idx)=>{
            if (item[1].name == it) {
                var cope = JSON.parse(JSON.stringify(item));
                cope.push(true) //0是新数据
                // CT.push(item)
                HZData.push(cope)
            }
        })
    })
    OUTData = HZData.concat(oldData);
    // var newoldData = []
    // CT.forEach((item,index)=>{
    //     var equal = false;
    //     oldData.forEach((it,idx)=>{
    //         if (item[1].name == it[1].name) {
    //             equal = true
    //         }
    //     })
    //     if (!equal) {
    //         var cope = item;
    //         cope.push(false)
    //         newoldData.push(cope)
    //     }
    // })

    // oldData = oldData.concat(newoldData)

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [toCoord, fromCoord]
                });
            }
        }
        return res;
    };
    var color = ['#ffa022', '#a6c84c', '#46bee9'];
    var series = [];
    [['浙江', HZData],].forEach(function (item, i) {
        series.push({
            name: item[0],
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 2,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 2
            },
            lineStyle: {
                normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: convertData(item[1])
        },
            {
                name: item[0],
                type: 'lines',
                zlevel: 2,
                effect: {
                    // show: true,
                    // period: 6,
                    // trailLength: 0,
                    // symbol: planePath,
                    // symbolSize: 20
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0.5,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            },
            {
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        fontSize:30*rem
                    },
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: OUTData.map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
                // item[1] 
            });
    });
    option = {
        backgroundColor: '',
        title: {
            text: '',
            //subtext: '数据覆盖率',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            top: 'bottom',
            left: 'right',
            //data:['北京 Top10', '上海 Top10', '广州 Top10'],
            textStyle: {
                color: '#fff'
            },
            selectedMode: 'single'
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            itemStyle: {
                normal: {//选取前颜色
                    areaColor: 'rgba(255,255,255,0)',
                    borderColor: '#5bf7c3',
                    borderWidth:1
                },
                emphasis: {//选取后颜色
                    areaColor: 'rgba(255,255,255,0)'
                }
            },
            // regions: [{
            //     name: '台湾',
            //     itemStyle: {
            //         areaColor: 'yellow',
            //         color: 'red'
            //     }
            // },]
        },
        series: series
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, {
            // notMerge:true,
            lazyUpdate:true
          });
    }

}
