import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Select,
  Divider,
  Popover,
  Button,
  Modal,
  Popconfirm
} from 'antd';
import moment from 'moment';
import Line from '@/components/Echarts/Line';
import Bar from '@/components/Echarts/Bar';
import { getTimeDistance, getFormatTime, momentTime, getFormatTimeArray, getFormatTime2, convert, toQfw, GetDateDiff, trunToYi } from '@/utils/utils';
import { requestUrl } from '@/utils/const';
import Calendar from '@/components/Calendar'
import classNames from 'classnames'

import styles from './index.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const MenuItemGroup = Menu.ItemGroup;

@connect(({ bi, loading, global }) => ({
    bi,
    collapsed: global.collapsed,
    loading0: loading.effects['bi/fetch0'],
    loading1: loading.effects['bi/fetch1'],
    loading2: loading.effects['bi/fetch2'],
    loading3: loading.effects['bi/fetch3'],
    loading4: loading.effects['bi/fetch4'],
    loading5: loading.effects['bi/fetch5'],
    loading6: loading.effects['bi/fetch6'],
    loading7: loading.effects['bi/fetch7'],
    loading8: loading.effects['bi/fetch8'],
    loading9: loading.effects['bi/fetch9'],
    loading10: loading.effects['bi/fetch10'],
    loading11: loading.effects['bi/fetch11'],
    loading12: loading.effects['bi/fetch12'],
    loading13: loading.effects['bi/fetch13'],
    loading14: loading.effects['bi/fetch14'],
    loading15: loading.effects['bi/fetch15'],
    loading16: loading.effects['bi/fetch16'],
    loading17: loading.effects['bi/fetch17'],
    loading18: loading.effects['bi/fetch18'],
    loading19: loading.effects['bi/fetch19'],
    loading20: loading.effects['bi/fetch20'],
    loading21: loading.effects['bi/fetch21'],
    loading22: loading.effects['bi/fetch22'],
    loading23: loading.effects['bi/fetch23'],
    loading24: loading.effects['bi/fetch24'],
}))
export default class BasicCard extends PureComponent {

    state = {
        modalVisible: false,  // 弹窗显示隐藏，默认隐藏
        unit: '0', // 频率单位（0:天，1:周，2:月，3:年）
        isShowTotal: false, // 是否显示合计值
        activeKey: 'line', // tab切换状态
        endOpen: false,
    };

    componentDidMount() {
        const { cardInfo } = this.props;
        const type = cardInfo.type;
        const { unit } = this.state;
        const timeObj = getFormatTime(cardInfo.rangePickerValue);
        const params = {
            ...timeObj,
            type,
            unit
        }
        this.handleFetch(params);
    }

    handleFetch(params) {
        const { cardInfo, dispatch } = this.props;
        const type = cardInfo.type;
        dispatch({
            type: `bi/fetch${type}`,
            payload: params
        });
    }
    
    componentWillUnmount() {
        const { cardInfo, dispatch } = this.props;
        const type = cardInfo.type;
        dispatch({
            type: 'bi/clear',
            payload: {type}
        });
    }

    // 选择时间范围
    selectDate = (timeType) => {
        const { cardInfo, onChangeTime } = this.props;
        const type = cardInfo.type;
        const { unit } = this.state;
        const rangePickerValue = getTimeDistance(timeType);
        const timeArray = getFormatTimeArray(rangePickerValue);
        onChangeTime(type, timeArray, timeType);
        const timeObj = getFormatTime(rangePickerValue);
        const params = {
            ...timeObj,
            type,
            unit
        }
        this.handleFetch(params);
    };

    // 修改时间频率
    clickMenu = ({key}) => {
        if(key === 'total') {
            this.setState({
                unit: key,
                isShowTotal: true
            });
        } else {
            this.setState({
                unit: key,
                isShowTotal: false
            });
            const { cardInfo } = this.props;
            const { type, rangePickerValue } = cardInfo;
            const timeObj = getFormatTime(rangePickerValue);
            const params = {
                ...timeObj,
                type,
                unit: key
            }
            this.handleFetch(params);
        }
    };

    // 双击打开弹窗
    hangleDbclick = () => {
        this.setState({modalVisible: true});
    }

    // 关闭弹窗
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }

    // 提示关闭卡片
    confirm = () => {
        const { cardInfo, onCloseCard } = this.props;
        onCloseCard(cardInfo.type);
    }

    // 修改切换tab面板回调
    onChangeActiveKey = (activeKey) => {
        this.setState({activeKey});
    }

    // 日期选择框方法
    disabledStartDate = (startValue) => {
        const { cardInfo, onChangeTime } = this.props;
        const { rangePickerValue } = cardInfo;
        const endValue = moment(rangePickerValue[1]);
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }
    
    disabledEndDate = (endValue) => {
        const { cardInfo, onChangeTime } = this.props;
        const { rangePickerValue, type } = cardInfo;
        const startValue = moment(rangePickerValue[0]);
        if (!endValue || !startValue) {
          return false;
        }
        if(type === '12' || type === '22') { // 预计还款金额和预计还款人数结束时间范围，可选未来一个月
            return endValue.valueOf() < startValue.valueOf() || endValue.valueOf() > moment().add(1, 'months').valueOf();
        } else {
            return endValue.valueOf() < startValue.valueOf() || endValue.valueOf() > moment().valueOf();
        }
        
    }
    
    onStartChange = (value) => {
        const { cardInfo, onChangeTime } = this.props;
        const { type, rangePickerValue, timeFrame } = cardInfo;
        const startTime = moment(value).format('YYYY-MM-DD');
        const endTime = rangePickerValue[1];
        onChangeTime(type, [startTime, endTime], timeFrame);
    }
    
    onEndChange = (value) => {
        const { cardInfo, onChangeTime } = this.props;
        const { type, rangePickerValue } = cardInfo;
        const { unit } = this.state;
        const startTime = rangePickerValue[0];
        const endTime = moment(value).format('YYYY-MM-DD');
        const now = moment().format('YYYY-MM-DD');
        const startFromNow = GetDateDiff(startTime, now);
        const endFromNow = GetDateDiff(endTime, now);
        let startText = '';
        let endText = '';
        if(startFromNow === 0) {
            startText = '今天';
        } else {
            startText = `过去${startFromNow}天`;
        }
        if(endFromNow === 0) {
            endText = '今天';
        } else {
            endText = `过去${endFromNow}天`;
        }
        const timeFrame = startText + ' - ' + endText;

        onChangeTime(type, [startTime, endTime], timeFrame);
        const timeObj = getFormatTime2([startTime, endTime]);
        const params = {
            ...timeObj,
            type,
            unit
        }
        this.handleFetch(params);
    }
    
    handleStartOpenChange = (open) => {
        if (!open) {
          this.setState({ endOpen: true });
        }
    }
    
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    handlecalendar=(startTime,endTime,timeFrame)=>{
        const { unit } = this.state;
        const {cardInfo:{type},onChangeTime}=this.props;
        const timeObj = getFormatTime2([startTime,endTime]);
        onChangeTime(type,[startTime,endTime],timeFrame)
        const params = {
            ...timeObj,
            type,
            unit
        }
        this.handleFetch(params)
    }


    getContainer = () => {
        return document.querySelector('.ant-layout-content');
    }

  render() {
    const { unit, modalVisible, isShowTotal, activeKey, endOpen } = this.state;
    const { bi, cardInfo, collapsed } = this.props;
    const { rangePickerValue, type, timeFrame } = cardInfo;
    const loading = this.props[`loading${type}`];
    const rangePickerMoment = momentTime(rangePickerValue);
    const clientHeight = document.documentElement.clientHeight;
    const warperHeight = clientHeight - 400;
    const chartHeight = modalVisible? warperHeight: 192;
    let chartData = {};
    let cardTitle = '';
    let countUnit = '';
    let totalTitle = '';
    let tableTitle = '';

    switch (type) {
        case requestUrl.repeatMoney:
          chartData = bi.repeatMoneyData;
          cardTitle = '复投金额-以资金为维度';
          countUnit = '万元';
          totalTitle = '当前复投金额';
          tableTitle = '复投金额（万）';
          break;
        case requestUrl.collectionTotal:
          chartData = bi.collectionTotalData;
          cardTitle = '待收金额';
          countUnit = '亿元';
          totalTitle = '当前代收';
          tableTitle = '待收金额（亿）';
          break;
        case requestUrl.registRealNameRate:
          chartData = bi.registRealNameRateData;
          cardTitle = '注册-实名转换率';
          countUnit = '%';
          totalTitle = '合计值';
          tableTitle = '注册-实名转化率（%）';
          break;
        case requestUrl.registTenderRate:
          chartData = bi.registTenderRateData;
          cardTitle = '注册-投资转换率';
          countUnit = '%';
          totalTitle = '合计值';
          tableTitle = '注册-投资转化率（%）';
          break;
        case requestUrl.registrations:
          chartData = bi.registrationsData;
          cardTitle = '注册人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '已注册（人）';
          break;
        case requestUrl.acountMoney:
          chartData = bi.acountMoneyData;
          cardTitle = '用户账户金额';
          countUnit = '万元';
          totalTitle = '当前账户总额';
          tableTitle = '用户账户（万）';
          break;
        case requestUrl.stationFund:
          chartData = bi.stationFundData;
          cardTitle = '站岗金额';
          countUnit = '万元';
          totalTitle = '当前站岗资金';
          tableTitle = '站岗资金（万）';
          break;
        case requestUrl.grandAvgTotal:
          chartData = bi.grandAvgTotalData;
          cardTitle = '累计交易规模';
          countUnit = '亿元';
          totalTitle = '合计值';
          tableTitle = '交易规模（亿）';
          break;
        case requestUrl.plantInMoney:
          chartData = bi.plantInMoneyData;
          cardTitle = '资金净流入';
          countUnit = '万元';
          totalTitle = '合计值';
          tableTitle = '资金净流入（万）';
          break;
        case requestUrl.repaymentMoney:
          chartData = bi.repaymentMoneyData;
          cardTitle = '到期回款金额';
          countUnit = '万元';
          totalTitle = '合计值';
          tableTitle = '到期回款（万）';
          break;
        case requestUrl.rechargeMoney:
          chartData = bi.rechargeMoneyData;
          cardTitle = '充值金额';
          countUnit = '万元';
          totalTitle = '合计值';
          tableTitle = '充值（万）';
          break;
        case requestUrl.extractMoney:
          chartData = bi.extractMoneyData;
          cardTitle = '提现金额';
          countUnit = '万元';
          totalTitle = '合计值';
          tableTitle = '提现（万）';
          break;
        case requestUrl.predict:
          chartData = bi.predictData;
          cardTitle = '预计还款金额';
          countUnit = '万元';
          totalTitle = '合计值';
          tableTitle = '预计还款（万）';
          break;
        case requestUrl.repeatPeopleNumber:
          chartData = bi.repeatPeopleNumberData;
          cardTitle = 'R计划回款人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = 'R计划回款人数（人）';
          break;
        case requestUrl.repaymentPeopleNumber:
          chartData = bi.repaymentPeopleNumberData;
          cardTitle = '到期回款人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '到期回款（人）';
          break;
        case requestUrl.rechargeNumber:
          chartData = bi.rechargeNumberData;
          cardTitle = '充值人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '充值人数（人）';
          break;
        case requestUrl.reInvestmentNumber:
          chartData = bi.reInvestmentNumberData;
          cardTitle = '复投人数-(用资金复投去重统计)';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '复投人数（人）';
          break;
        case requestUrl.accountNumber:
          chartData = bi.accountNumberData;
          cardTitle = '开通存管人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '开通存管（人）';
          break;
        case requestUrl.investmentNumber:
          chartData = bi.investmentNumberData;
          cardTitle = '投资人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '投资人数（人）';
          break;
        case requestUrl.cashNumber:
          chartData = bi.cashNumberData;
          cardTitle = '提现人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '提现人数（人）';
          break;
        case requestUrl.newInvestmentNumber:
          chartData = bi.newInvestmentNumberData;
          cardTitle = '新增投资人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '新增投资（人）';
          break;
        case requestUrl.logonNumber:
          chartData = bi.logonNumberData;
          cardTitle = '日均登录人数';
          countUnit = '人';
          totalTitle = '';
          tableTitle = '日均登录（人）';
          break;
        case requestUrl.repaymentNumber:
          chartData = bi.repaymentNumberData;
          cardTitle = '预计还款人数';
          countUnit = '人';
          totalTitle = '合计值';
          tableTitle = '预计还款人数（人）';
          break;
        case requestUrl.recoverSumList:
          chartData = bi.recoverSumListData;
          cardTitle = 'R计划续投回款金额';
          countUnit = '万元';
          totalTitle = '合计值';
          tableTitle = 'R计划回款（万）';
          break;
        case requestUrl.remainRateList:
          chartData = bi.remainRateListData;
          cardTitle = '新增用户7日留存率';
          countUnit = '%';
          totalTitle = '';
          tableTitle = '七日留存（%）';
          break;
    }

    const list = chartData? chartData.list: [];
    let total = chartData? chartData.total: '';
    if(countUnit === '亿元') {
        total = trunToYi(total);
    } else if(countUnit === '万元') {
        total = convert(total);
    } else if(countUnit === '人') {
        total = toQfw(total);
    } else {
        total = total;
    }

    let unitText = '';
    switch(unit) {
        case 'total':
            unitText = totalTitle;
            break;
        case '0':
            unitText = '按天';
            break;
        case '1':
            unitText = '按周';
            break;
        case '2':
            unitText = '按月';
            break;
        case '3':
            unitText = '按年';
            break;
    }

    // 根据时间差来判断时间频率禁用范围
    const startTime = rangePickerValue[0];
    const endTime = rangePickerValue[1];
    const diffDays = GetDateDiff(startTime, endTime);
    let disabledObj = [];
    if(diffDays < 6) {
        disabledObj =  [false, true, true, true];
    } else if(diffDays >= 6 && diffDays < 27) {
        disabledObj =  [false, false, true, true];
    } else if(diffDays >= 27 && diffDays < 364) {
        disabledObj =  [false, false, false, true];
    } else if(diffDays >= 364) {
        disabledObj =  [false, false, false, false];
    } else {
        disabledObj =  [false, false, false, false];
    }

    let menu = null;
    if(type === '12' || type === '22') { // 预计还款金额和预计还款人数只有按天的频率
        menu = (
            <Menu selectedKeys={[unit]} onClick={(e) => {this.clickMenu(e)}}>
                <Menu.Item key="total">{totalTitle}</Menu.Item>
                <Menu.Divider />
                <MenuItemGroup title="频率：">
                <Menu.Item key="0">按天</Menu.Item>
                </MenuItemGroup>
            </Menu>
        )
    } else {
        menu = (
            totalTitle? (
                <Menu selectedKeys={[unit]} onClick={(e) => {this.clickMenu(e)}}>
                    <Menu.Item key="total">{totalTitle}</Menu.Item>
                    <Menu.Divider />
                    <MenuItemGroup title="频率：">
                    <Menu.Item key="0" disabled={disabledObj[0]}>按天</Menu.Item>
                    <Menu.Item key="1" disabled={disabledObj[1]}>按周</Menu.Item>
                    <Menu.Item key="2" disabled={disabledObj[2]}>按月</Menu.Item>
                    <Menu.Item key="3" disabled={disabledObj[3]}>按年</Menu.Item>
                    </MenuItemGroup>
                </Menu>
            ): (
                <Menu selectedKeys={[unit]} onClick={(e) => {this.clickMenu(e)}}>
                    <MenuItemGroup title="频率：">
                    <Menu.Item key="0" disabled={disabledObj[0]}>按天</Menu.Item>
                    <Menu.Item key="1" disabled={disabledObj[1]}>按周</Menu.Item>
                    <Menu.Item key="2" disabled={disabledObj[2]}>按月</Menu.Item>
                    <Menu.Item key="3" disabled={disabledObj[3]}>按年</Menu.Item>
                    </MenuItemGroup>
                </Menu>
            )
        );
    }


    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <a href="javascript:;">{unitText}<Icon type="down" /></a>
        </Dropdown>
        { !modalVisible && (
            <span className={styles.closeIcon}>
                <Popconfirm title="确定关闭吗?" onConfirm={() => {this.confirm()}}>
                    <Icon type="close-square-o"/>
                </Popconfirm>
            </span>
        )}
      </span>
    );

    const salesExtra = (
        <div className={styles.salesExtraWrap}>
            <DatePicker
                disabledDate={this.disabledStartDate}
                allowClear={false}
                format="YYYY-MM-DD"
                value={rangePickerMoment[0]}
                placeholder="开始时间"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
                style={{ width: 120, marginRight: '10px' }}
            />
            <DatePicker
                disabledDate={this.disabledEndDate}
                allowClear={false}
                format="YYYY-MM-DD"
                value={rangePickerMoment[1]}
                placeholder="结束时间"
                onChange={this.onEndChange}
                open={endOpen}
                onOpenChange={this.handleEndOpenChange}
                style={{ width: 120, marginRight: '10px' }}
            />
            {
                timeFrame && (
                    type === '12' || type === '22'? ( // 预计还款金额和预计还款人数可以选择未来一个月的时间
                        <Select value={timeFrame} style={{ width: 200 }} onChange={this.selectDate}>
                            <Option value="nextMonth">距今一月内</Option>
                            <Option value="yesterday">昨日</Option>
                            <Option value="today">今日</Option>
                            <Option value="lastWeek">上周</Option>
                            <Option value="week">本周</Option>
                            <Option value="lastMonth">上月</Option>
                            <Option value="month">本月</Option>
                            <Option value="lastYear">去年</Option>
                            <Option value="year">本年</Option>
                            <Option value="past7days">过去7天</Option>
                            <Option value="past30days">过去30天</Option>
                            <Option value="upToDate">上线至今</Option>
                        </Select>
                    ): (
                        <Select value={timeFrame} style={{ width: 200 }} onChange={this.selectDate}>
                            <Option value="yesterday">昨日</Option>
                            <Option value="today">今日</Option>
                            <Option value="lastWeek">上周</Option>
                            <Option value="week">本周</Option>
                            <Option value="lastMonth">上月</Option>
                            <Option value="month">本月</Option>
                            <Option value="lastYear">去年</Option>
                            <Option value="year">本年</Option>
                            <Option value="past7days">过去7天</Option>
                            <Option value="past30days">过去30天</Option>
                            <Option value="upToDate">上线至今</Option>
                        </Select>
                    )
                )
            }
    
        </div>
    );

    const salesextra = (
        <div className={styles.salesExtraWrap}>
        </div>
    )
    
    const columns = [
      {
        title: '日期',
        dataIndex: 'x',
        key: 'x',
      },
      {
        title: tableTitle,
        dataIndex: 'y',
        key: 'y',
        render: (text, record, index) => {
            if(countUnit === '亿元') {
                return trunToYi(text);
            } else if(countUnit === '万元') {
                return convert(text);
            } else if(countUnit === '人') {
                return toQfw(text);
            } else {
                return text.toFixed(2);
            }
        }
      },
    ];

    const idx = this.props.idx
    const cardRender = (
        <div  className={styles.outcard}>

        <Card loading={loading} bordered={false} hoverable={modalVisible? false: true} title={cardTitle} extra={iconGroup} bodyStyle={{ padding: 0 }} onDoubleClick ={() => this.hangleDbclick()}>
            <div className={styles.salesCard}>
                {
                    isShowTotal? (
                        <div className={styles.totalCount}>{total + countUnit}</div>
                    ): (
                        <Tabs activeKey={activeKey}  tabBarExtraContent={salesextra} size="small" tabBarStyle={{ marginBottom: 10 }} onChange={this.onChangeActiveKey}>
                            <TabPane tab={<Icon type="line-chart" style={{ fontSize: '16px'}} />} key="line">
                                <div className={styles.salesBar}>
                                    <Line type={type} height={chartHeight} data={list} unit={countUnit} />
                                </div>
                            </TabPane>
                            <TabPane tab={<Icon type="bar-chart" style={{ fontSize: '16px'}} />} key="bar">
                                <div className={styles.salesBar}>
                                    <Bar type={type} height={chartHeight} data={list} unit={countUnit} />
                                </div>
                            </TabPane>
                            <TabPane style={{ height: modalVisible? chartHeight+20: '212px', overflow: 'auto' }}  tab={<Icon type="table" style={{ fontSize: '16px'}} />} key="table">
                                <div className={styles.salesBar}>
                                    <Table
                                        rowKey={record => record.x}
                                        size="small"
                                        columns={columns}
                                        dataSource={list}
                                        pagination={{
                                            style: { marginBottom: 0 },
                                            pageSize: modalVisible? 10: 3,
                                        }}
                                    />
                                </div>
                            </TabPane>
                        </Tabs>
                    )
                }
            </div>
        </Card>
        <div className={styles.innercard}>
            <Calendar idx={idx} cardInfo={cardInfo} handlecalendar={this.handlecalendar}></Calendar>
        </div>        
        </div>
    )


    const layoutContent = document.querySelector(".ant-layout-content");
    let layoutContentWidth = 0
    if(layoutContent) {
        layoutContentWidth = layoutContent.offsetWidth;
    }

    return (
        <>
            {
                modalVisible? (
                    <Modal
                        title=""
                        visible={true}
                        style={{ top: '124px', left: collapsed? '140px': '316px', height: clientHeight*0.8 + 'px', paddingBottom: 0, margin: 0 }}
                        bodyStyle={{padding: '0 24px 24px'}}
                        footer={null}
                        onCancel={this.handleCancel}
                        width={layoutContentWidth-60 + 'px'}
                        maskStyle={{top: '64px', left: collapsed? '80px': '256px'}}
                    >
                        {cardRender}
                    </Modal>
                ): cardRender 
            }
        </>
    );
  }
}
