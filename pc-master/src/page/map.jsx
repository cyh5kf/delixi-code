import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider,connect} from 'react-redux';
import Aboutcss from '@/assets/css/aboutus.scss';
import store from "@/store/store.js";
class Map extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        function initMap() {
            createMap();//创建地图
            setMapEvent();//设置地图事件
            addMapControl();//向地图添加控件
            addMapOverlay();//向地图添加覆盖物
        }

        function createMap() {
            map = new BMap.Map("map");
            map.centerAndZoom(new BMap.Point(120.138245, 30.280855), 16);
        }

        function setMapEvent() {
            map.enableScrollWheelZoom();
            map.enableKeyboard();
            map.enableDragging();
            map.enableDoubleClickZoom()
        }

        function addClickHandler(target, window) {
            target.addEventListener("click", function () {
                target.openInfoWindow(window);
            });
        }

        function addMapOverlay() {
            var markers = [
                {
                    content: "杭州市学院路28号德力西大厦1号楼25层。",
                    title: "浙江人众金融服务股份有限公司",
                    imageOffset: {width: 0, height: 0},
                    position: {lat: 30.279202, lng: 120.137419},
                    position1: {lat: 30.279202, lng: 120.137419},
                }
            ];
            for (var index = 0; index < markers.length; index++) {
                var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                var point1 = new BMap.Point(markers[index].position1.lng, markers[index].position1.lat);
                var marker = new BMap.Marker(point, {
                    icon: new BMap.Icon("https://images.51rz.com/images/rebuild/pc/img/map.gif", new BMap.Size(90, 90), {
                        imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
                    })
                });

                var marker1 = new BMap.Marker(point, {
                    icon: new BMap.Icon("https://images.51rz.com/images/rebuild/pc/img/map1.png", new BMap.Size(500, 160), {
                        imageOffset: new BMap.Size(300, 0)
                    })
                });
                // var label = new BMap.Label(markers[index].title, {offset: new BMap.Size(25, 5)});
                // var label = new BMap.Label(<img src="https://images.51rz.com/images/rebuild/pc/img/map1.png" alt=""/>, {offset: new BMap.Size(25, 5)});
                var opts = {
                    width: 200,
                    title: markers[index].title,
                    enableMessage: false
                };
                var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
                // marker.setLabel(label);
                addClickHandler(marker, infoWindow);
                map.addOverlay(marker);
                addClickHandler(marker1, infoWindow);
                map.addOverlay(marker1);
            }
            ;
        }

        //向地图添加控件
        function addMapControl() {
            var scaleControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
            scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
            map.addControl(scaleControl);
            var navControl = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: BMAP_NAVIGATION_CONTROL_LARGE
            });
            map.addControl(navControl);
            var overviewControl = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true});
            map.addControl(overviewControl);
        }

        var map;
        initMap();
    }
    render(){
        return (
            <div className="map" style={{width: '100%', height: 351}}>
                <div id="map" style={{width: '100%', height: 351}}></div>
                <div className="zhe"></div>
            </div>
        )
    }
}
Map = connect((store) => ({store}))(Map);
render(<Provider store={store}><Map/></Provider>, document.getElementById('app'));