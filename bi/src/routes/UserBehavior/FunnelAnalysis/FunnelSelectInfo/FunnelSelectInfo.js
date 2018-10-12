import React from 'react';
import styles from './FunnelSelectInfo.less';
import CustomizeTime from "../CustomizeTime/CustomizeTime";
import {Icon, Select, Button, Tabs, Dropdown, Menu, Checkbox, DatePicker} from 'antd';
import {Tag} from "antd/lib/index";
import DateRangePicker from '../DateRangePicker/DateRangePicker';

const {RangePicker} = DatePicker;
const {CheckableTag} = Tag;
const TabPane = Tabs.TabPane;

export default class FunnelSelectInfo extends React.Component {
    state = {
        showDropdown: false
    };

    componentDidMount(){
        window.addEventListener('click',(e)=>{
            if(this.state.showDropdown && event.target.className.indexOf('ant-tag ant-tag-checkable') === -1) {
                this.isTargetRange(e,this.closeDropdown)
            }
        });
    }

    openDropdown = ()=> {
        event.stopPropagation();
        this.setState({
            showDropdown: true
        })
    };

    closeDropdown = (e)=>{
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        this.setState({
            showDropdown: false
        })
    };

    isTargetRange =(ele,cb) => {
        if (!this.dropdown) return false;
        let target = this.dropdown.getBoundingClientRect();
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();
        let mouse = event;
        if(mouse.clientX >= target.x &&
            mouse.clientX<=(target.x + target.width) &&
            mouse.clientY >= target.y &&
            mouse.clientY <= (target.y + target.height)
        ) {
            return true
        } else {
            cb()
            return false
        }

    };

    render() {
        const {showDropdown} = this.state;
        const {funnel,dispatch} = this.props;
        console.log(this.props)
        return (
            <div className={styles.funnelSelectInfo}>
                <DateRangePicker value={funnel.funnel.getIn(['funnelChartsSelectInfo','dateRange'])} {...this.props} />
                <span>窗口期</span>
                <Select defaultValue="7" size="small" style={{width: 110}} onChange={CustomizeTime.open}>
                    <Option value="7">最近7天</Option>
                    <Option value="30">最近30天</Option>
                </Select>
                <div className={styles.chartsInfoContainer}>
                    <CheckableTag checked={funnel.funnel.getIn(['funnelChartsSelectInfo','pattern']) === 'TREND'} onChange={()=>dispatch({type:'funnel/onChangeChartsPattern',value:'TREND'})}>趋势<Icon type="area-chart"/></CheckableTag><CheckableTag checked={funnel.funnel.getIn(['funnelChartsSelectInfo','pattern']) ==='COMPARED'} onChange={()=>dispatch({type:'funnel/onChangeChartsPattern',value:'COMPARED'})}>对比<Icon
                    type="bar-chart"/></CheckableTag>
                    <CheckableTag onChange={this.openDropdown}>趋势设置<Icon type="down" /></CheckableTag>
                    <div ref={r=>this.dropdown=r} className={showDropdown ? styles.dropdownContainer : styles.hideDropdownContainer}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="显示指标" key="1">
                                <div className={styles.displayIndicators}>
                                    <Checkbox>总体</Checkbox>
                                    <Checkbox>Mete7</Checkbox>
                                    <Checkbox>iphone6</Checkbox>
                                    <Checkbox>ipad Air2</Checkbox>
                                    <Checkbox>总体</Checkbox>
                                    <Checkbox>iphone6</Checkbox>
                                </div>
                            </TabPane>
                            <TabPane tab="显示分组" key="2">Content of Tab Pane 2</TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}