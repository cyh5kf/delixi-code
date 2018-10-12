
/**
 * @props
 * date          String
 * onSelectDate  Function
 * maxDate       String
 * minDate       String
 * **/

import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'

import Css from "./index.scss";
import fullNum from '@/util/fullNum.js'
import dateFormat from '@/util/dateFormat.js'

import store from "@/store/store.js";

const H = (function() {

    // 一些私有变量

    // 一些公有变量、函数

    /**
     *
     * 判断这一年是闰年还是平年
     * @param year {String/Number} 年份
     * @returns {boolean}
     */

    function isLeapYear(year) {
        if (!typeof +year === 'number') {
            throw new Error("年份格式不正确");
        }

        if (+year < 1790) {
            throw new Error("年份不能低于1790年");
        }

        // 计算闰年方法
        // 1.能被4整除而不能被100整除
        // 2.能被400整除

        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * 返回月份中的第一天是星期几
     * @returns {number}
     * 1 星期一
     * 2 星期二
     * 3 星期三
     * 4 星期四
     * 5 星期五
     * 6 星期六
     * 0 星期天
     */
    function weekOfMonth(date) {
        if (!date) date = new Date();
        return new Date(getFullYear(date), getMonth(date), 1).getDay();
    }

    /**
     * 获取月份
     * @param date
     * @returns {*|number}
     */
    function getMonth(date) {
        if (!date) date = new Date();
        return date.getMonth();
    }

    /**
     * 获取年份
     * @param date
     * @returns {number}
     */
    function getFullYear(date) {
        if (!date) date = new Date();
        return date.getFullYear();
    }

    /**
     * 获取一月中的某一天
     * @param date
     * @returns {number}
     */
    function getDate(date) {
        if (!date) date = new Date();
        return date.getDate();
    }

    // 暴露需要提供的方法
    return {
        isLeapYear : isLeapYear,
        weekOfMonth : weekOfMonth,
        getFullYear : getFullYear,
        getMonth : getMonth,
        getDate : getDate
    }

})();


class Callender extends Component{
    constructor(props){
        super(props);
        this.state={
            showBox:false,//显示日历
            defaultDate:dateFormat(new Date()),

            current_year : H.getFullYear(),
            current_month : H.getMonth(),
            current_day : H.getDate(),
            select_year : H.getFullYear(),
            select_month : H.getMonth(),
            select_day : H.getDate(),
            history_year : '',
            history_month : '',
            history_day :'',
            date_num_array : []
        }
    }
    handleFocus(e){
        this.setState({
            showBox:true
        })
    }
    handleBlur(e){

    }
    hideCallender(){
        this.setState({
            showBox:false
        })
    }
    /**
     * 给月份数组附上每月天数
     * @param year 年份
     * @private
     */
    _initMonthDayNumber(year) {
        let _date_array = [];

        for (var i = 0; i < 12; i++) {
            switch (i + 1) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    _date_array.push(31);
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    _date_array.push(30);
                    break;
                case 2:
                    if (H.isLeapYear(year)) {
                        _date_array.push(29);
                    } else {
                        _date_array.push(28);
                    }
                    break;
                default:
                    break;
            }
        }
        return _date_array;
    }
    /**
     * 日期选择
     * @param s_day
     */
    selectDate(s_day) {
        let { select_year, select_month} = this.state;
        let {
            onSelectDate=()=>{}
        }=this.props;

        this.setState({
            history_year : select_year,
            history_month : select_month,
            history_day : s_day,
            select_day : s_day,
        }, () => {
            setTimeout(()=>{
                this.setState({
                    showBox:false
                })
            },100)
            onSelectDate(`${select_year}-${fullNum(select_month + 1)}-${fullNum(s_day)}`);
        });
    }
    /**
     * 前一年
     */
    previousYear(){
        let {
            select_year, select_month, date_num_array, first_day} = this.state;
        select_year=select_year-1;

        date_num_array = this._initMonthDayNumber(select_year);
        first_day = H.weekOfMonth(new Date(select_year, select_month));
        this.setState({
            select_year ,
            date_num_array : date_num_array,
            first_day : first_day
        })
    }
    /**
     * 前一个月
     */
    previousMonth() {
        let { current_year, current_month, current_day,
            select_year, select_month, select_day, date_num_array, first_day} = this.state;

        if (select_month === 0) {
            select_year = +select_year - 1;
            select_month = 11;
            date_num_array = this._initMonthDayNumber(select_year);
        } else {
            select_month = +select_month - 1;
        }

        first_day = H.weekOfMonth(new Date(select_year, select_month));

        if (current_year === select_year &&
            current_month === select_month) {
            select_day = current_day;
        } else {
            select_day = undefined;
        }

        this.setState({
            select_year : select_year,
            select_month : select_month,
            select_day : select_day,
            date_num_array : date_num_array,
            first_day : first_day
        })
    }
    /**
     * 之后一个月
     */
    nextMonth() {
        let { current_year, current_month, current_day,
            select_year, select_month, select_day, date_num_array, first_day} = this.state;

        if (select_month === 11) {
            select_year = +select_year + 1;
            select_month = 0;
            date_num_array = this._initMonthDayNumber(select_year);
        } else {
            select_month = +select_month + 1;
        }

        first_day = H.weekOfMonth(new Date(select_year, select_month));

        if (current_year === select_year &&
            current_month === select_month) {
            select_day = current_day;
        } else {
            select_day = undefined;
        }

        this.setState({
            select_year : select_year,
            select_month : select_month,
            select_day : select_day,
            date_num_array : date_num_array,
            first_day : first_day
        })
    }
    /**
     * 之后一年
     */
    nextYear(){
        let {
            select_year, select_month, date_num_array, first_day} = this.state;
        select_year=select_year*1+1;

        date_num_array = this._initMonthDayNumber(select_year);
        first_day = H.weekOfMonth(new Date(select_year, select_month));
        this.setState({
            select_year ,
            date_num_array : date_num_array,
            first_day : first_day
        })
    }
    /**
     * 组件将要挂载
     * 设置月份数组以及计算出每月的第一天星期几
     */
    componentWillMount() {
        let date_num_array = this._initMonthDayNumber(this.state.current_year),
            first_day = H.weekOfMonth();

        this.setState({date_num_array : date_num_array, first_day : first_day});
    }
    componentDidMount() {

        let {date='',
            onSelectDate=()=>{}
        } = this.props;
        let dateArr=date.split('-');

        // 初始化状态
        if(date) {
            let year=dateArr[0];
            let month=dateArr[1]-1;
            let day=dateArr[2];
            let date_num_array = this._initMonthDayNumber(year);
            let first_day = H.weekOfMonth(new Date(year, month - 1));

            this.setState({
                select_year : year,
                select_month : month ,
                select_day : day,
                history_year : year,
                history_month : month ,
                history_day : day,
                date_num_array : date_num_array,
                first_day : first_day
            });
        }
        // onSelectDate(year,month,day);
    }
    resetDate(e){
        let {
            onSelectDate=()=>{}
        }=this.props;
        this.setState({
            history_year : '',
            history_month : '',
            history_day : '',
        })
        onSelectDate(false,false,false);
    }
    render(){
        let { row_number=6, col_number=7, tags=[] ,maxDate=undefined,minDate=''} = this.props;
        let { current_year, current_month, current_day,
            select_year, select_month, select_day,
            history_year, history_month, history_day,
            date_num_array, first_day,showBox} = this.state;


        let month_day = date_num_array[select_month],
            n_day = row_number * col_number - first_day - month_day,
            previous_month_days = undefined,
            previous_days = [],
            current_days = [],
            next_days = [],
            total_days = [],
            previous_month = undefined;

        if (select_month === 0) {
            previous_month = 11;
        } else {
            previous_month = select_month - 1;
        }

        previous_month_days = date_num_array[previous_month];
        for (let i = 0; i < first_day; i++) {
            let previous_link = (<td className={Css.itemGray} key={'previous'+i}>
                <a href="javascript:;">{previous_month_days - (first_day - i) + 1}</a>
            </td>);
            previous_days.push(previous_link);
        }

        let currentClassName = '',
            currentText = '';
        for (let i = 0; i < month_day; i++) {

            // 今天样式
            if (current_year == select_year && current_month == select_month && current_day == (i + 1)) {
                currentClassName =  `${Css.itemCurrent} ${Css.itemActive}`;
                currentText = '今天';
                // currentText = i + 1;
            } else {
                currentText = i + 1;

                // 判断选择样式与历史样式是否相等，相等激活
                if (select_year == history_year && select_month == history_month && history_day == (i + 1)) {
                    currentClassName = Css.itemActive;
                } else {
                    currentClassName = '';
                }
            }

            // 添加tag样式
            if (tags.length > 0) {
                for (let j = 0; j < tags.length; j++) {
                    if ((i + 1) === tags[j]) {
                        currentClassName += 'item-tag';
                        break;
                    }
                }
            }
            let current_link= (<td className={currentClassName} key={'current'+i}>
                <a href="javascript:;" onClick={this.selectDate.bind(this, i + 1)}>
                    {currentText}
                </a>
            </td>);
            let itemDateTime=new Date(`${select_year}-${select_month*1+1}-${i+1}`);
            let maxDateTime=maxDate&&new Date(maxDate);
            let minDateTime=minDate&&new Date(minDate);

            if((minDateTime && itemDateTime<=minDateTime)|| (maxDateTime && itemDateTime>=maxDateTime)){
                current_link = (<td className={Css.itemGray} key={'current'+i}>
                    <a href="javascript:;">
                        {currentText}
                    </a>
                </td>);
            }

            current_days.push(current_link);
        }

        for (let i = 0; i < n_day; i++) {
            let next_link = (<td className={Css.itemGray} key={'next'+i}>
                <a href="javascript:;">{i + 1}</a>
            </td>);
            next_days.push(next_link);
        }

        total_days = previous_days.concat(current_days, next_days);

        let ul_list = [];
        if (total_days.length > 0) {
            for (let i = 0; i < row_number; i++) {
                let li_list = [],
                    start_index = i * col_number,
                    end_index = (i + 1) * col_number;
                for (let j = start_index; j < end_index; j++) {
                    li_list.push(total_days[j]);
                }
                ul_list.push(li_list);
            }
        }

        return (
            <div className={Css.callender}>
                <input type="text"
                       className={Css.calInput}
                       onFocus={(e)=>{this.handleFocus(e)}}
                       onBlur={(e)=>{this.handleBlur(e)}}
                       value={history_day&&`${history_year}-${fullNum(history_month+1)}-${fullNum(history_day)}`}
                       onChange={(e)=>{this.resetDate(e)}}
                />
                <div className={`${Css.calContainer} ${showBox&&Css.show}`}>
                    <div className={Css.shade} onClick={()=>{this.hideCallender()}}></div>
                    <div className={Css.calWraper}>
                        <h5 className={Css.header}>
                            <span className={Css.prevYear} onClick={()=>{this.previousYear()}}></span>
                            <label className={Css.prevMonth} onClick={()=>{this.previousMonth()}}></label>
                            <p className={Css.text}>{select_year} 年 {select_month + 1} 月</p>
                            <label className={Css.nextMonth} onClick={()=>{this.nextMonth()}}></label>
                            <span className={Css.nextYear} onClick={()=>{this.nextYear()}}></span>
                        </h5>
                        <table >
                            <thead >
                            <tr>
                                <td>日</td>
                                <td>一</td>
                                <td>二</td>
                                <td>三</td>
                                <td>四</td>
                                <td>五</td>
                                <td>六</td>
                            </tr>
                            </thead>
                            <tbody className="c-body-content">
                            {
                                ul_list.map((u, index) => {
                                    return (<tr key={'ul'+index} className="content-row">{u}</tr>);
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }
}

Callender = connect((store) => ({store}))(Callender);
export default withRouter(Callender);