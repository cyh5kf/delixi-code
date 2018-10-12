import React from 'react';
import {DatePicker, Button, Checkbox} from 'antd';
import styles from './DateRangePicker.less';
import {Tag} from "antd/lib/index";
import moment from 'moment';

const {RangePicker} = DatePicker;
const {CheckableTag} = Tag;

export default class DateRangePicker extends React.Component {

    state = {
        date: {
            name: 'NOW',
            value: [moment(), moment()]
        }
    };

    onSelect = (date) => {
        this.setState({
            date
        })
    };

    onClose = () => {
        let elem=document.querySelector('.ant-calendar-picker-container');
        let className=`${elem.className} slide-up-leave slide-up-leave-active`;
        elem.className=className;
    };

    getDate = () => {
        const {dispatch} =this.props;
        dispatch({type:'funnel/onChangeDateRange',value:this.state.date.value})
    };

    render() {
        const {date} = this.state;
        console.log(this.props.value.toJS())
        return (
        <div className={styles.outrange}>
        <RangePicker ref={r => this.rangePicker = r} onOk={this.getDate} showTime className={styles.rangePicker}
                            defaultValue={this.props.value.toJS()} value={date.value} size="small" onChange={() => {
        }} renderExtraFooter={() => <div className="range_container">
            <div className="range_title">时间范畴</div>
            <div>
                <div>
                    <CheckableTag
                        checked={date.name === 'YESTERDAY'}
                        onChange={() => this.onSelect({
                        name: 'YESTERDAY',
                        value: [moment().subtract(1, 'days'), moment().subtract(1, 'days')]
                    })}>昨日</CheckableTag>
                    <CheckableTag checked={date.name === 'NOW'} onChange={() => this.onSelect({
                        name: 'NOW',
                        value: [moment(), moment()]
                    })}>今日</CheckableTag>
                </div>
                <div>
                    <CheckableTag checked={date.name === 'LAST_WEEK'} onChange={() => this.onSelect({
                        name: 'LAST_WEEK',
                        value: [moment().subtract(7, 'days'), moment().subtract(14, 'days')]
                    })}>上周</CheckableTag>
                    <CheckableTag checked={date.name === 'THIS_WEEK'} onChange={() => this.onSelect({
                        name: 'THIS_WEEK',
                        value: [moment(), moment().subtract(7, 'days')]
                    })}>本周</CheckableTag>
                </div>
                <div>
                    <CheckableTag checked={date.name === 'LAST_MONTH'} onChange={() => this.onSelect({
                        name: 'LAST_MONTH',
                        value: [moment().subtract(1, 'month'), moment().subtract(1, 'month')]
                    })}>上月</CheckableTag>
                    <CheckableTag checked={date.name === 'THIS_MONTH'} onChange={() => this.onSelect({
                        name: 'THIS_MONTH',
                        value: [moment(), moment().subtract(1, 'month')]
                    })}>本月</CheckableTag>
                </div>
                <div>
                    <CheckableTag checked={date.name === 'LAST_YEAR'} onChange={() => this.onSelect({
                        name: 'LAST_YEAR',
                        value: [moment().subtract(1, 'year'), moment().subtract(1, 'year')]
                    })}>去年</CheckableTag>
                    <CheckableTag checked={date.name === 'THIS_YEAR'} onChange={() => this.onSelect({
                        name: 'THIS_YEAR',
                        value: [moment(), moment().subtract(1, 'year')]
                    })}>本年</CheckableTag>
                </div>
                <CheckableTag checked={date.name === 'LAST_7_DAY'} onChange={() => this.onSelect({
                    name: 'LAST_7_DAY',
                    value: [moment(), moment().subtract(7, 'days')]
                })}>过去7天</CheckableTag>
                <CheckableTag checked={date.name === 'LAST_30_DAY'} onChange={() => this.onSelect({
                    name: 'LAST_30_DAY',
                    value: [moment(), moment().subtract(30, 'days')]
                })}>过去30天</CheckableTag>
                <CheckableTag checked={date.name === 'ONLINE_TO_NOW'} onChange={() => this.onSelect({
                    name: 'ONLINE_TO_NOW',
                    value: [moment(), moment().subtract(10000, 'days')]
                })}>上线至今</CheckableTag>
            </div>
            <div className="dateRangeTip">
                <Checkbox>
                    限制窗口期在时间区间内
                </Checkbox>
            </div>
            <div className="dateRangeBtnGroup">
                <Button onClick={this.onClose}>取消</Button>
            </div>
        </div>}/>
        </div>
        )
    }
}