import React, {Component} from 'react';
import ChartsForColumn from './ChartsForColumn';
import ChartsForColumnGroup from './ChartsForColumnGroup';
import ChartsForLine from './ChartsForLine';
import ChartsForBar from './ChartsForBar';
import ChartsForStepArrow from './ChartsForStepArrow';
import CustomizeTime from './CustomizeTime/CustomizeTime';
import CreateFunnelPopUps from './CreateFunnelPopUps/CreateFunnelPopUps';
import UserDetail from './UserDetail/UserDetail';
import {Link} from 'dva/router';

const ReactHighcharts = require('react-highcharts');
import {
    Icon,
    Select,
    Button,
    Card,
    Divider
} from 'antd';
import CustomUserGroupDialog from './CustomUserGroupDialog';
import FunnelSelectInfo from './FunnelSelectInfo/FunnelSelectInfo';
import styles from './index.less';
import {connect} from "dva";

const Option = Select.Option;

@connect(({funnel, loading}) => ({
    funnel
}))
export default class FunnelAnalysis extends Component {
    state = {
        customUserModalVisible: false,
        showDropdown: false
    }

    openCustomUserModal = (customUserModalVisible) => {
        this.setState({customUserModalVisible});
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'funnel/findList',
            payload: {text: '这是测试数据'}
        });
    }

    // 获取窗口期自定义时间
    handleCustomTime = (value) => {
        const {dispatch} = this.props;
        dispatch({type:'funnel/onChangeDays',value})
    }


    render() {
        console.log(this.props.funnel.funnel.toJS());
        const {customUserModalVisible, showDropdown} = this.state;
        const {funnel,dispatch} = this.props;
        const chartsPatter = funnel.funnel.getIn(['funnelChartsSelectInfo','pattern']);
        const funelChat = [
            {title: '下载成功', percentage: '100.00%', number: 2000, difference: 0},
            {title: '激活成功', percentage: '75.00%', number: 2000, difference: 0},
            {title: '注册成功', percentage: '75.00%', number: 1500, difference: 500},
            {title: '实名成功', percentage: '80.00%', number: 1500, difference: 200},
            {title: '投资成功', percentage: '75.00%', number: 1000, difference: 100}
        ];
        const {data} = funnel;

        return (
            <div className={styles.contentWrapper}>
                <Card bordered={false} hoverable={true} bodyStyle={{padding: '20px 64px 20px 30px'}}>
                    <div className={styles.groupSelection}>
                        <div className={styles.bodyLeft}>
                            <span className={styles.title}>用户分群</span>
                            {
                                funnel.funnel.get('userGroup').toJS().map((item, key) => <div className={styles.userGroupSelectContainer} key={key}>
                                    <Select onChange={value=>this.props.dispatch({type:'funnel/updateUserGroup',key,value})} defaultValue="0" size="small" style={{width: 110}}>
                                        <Option value="0">所有用户</Option>
                                        <Option value="1">流失用户</Option>
                                        <Option value="2">实名用户</Option>
                                        <Option value="3">高价值用户</Option>
                                        <Option value="4">最近活跃但未购买用户</Option>
                                        <Option value="5">有站岗资金用户</Option>
                                    </Select>
                                    <div className={styles.closeIcon} onClick={()=>dispatch({type:'funnel/removeUserGroup',key})}></div>
                                    <Divider type="vertical"/>
                                </div>)
                            }
                            <div className={styles.addPlus}
                                 onClick={() => this.props.dispatch({type: 'funnel/addUserGroup'})}>
                                <Icon type="plus" className={styles.plusIcon}/>
                                <span>增加用户组</span>
                            </div>

                        </div>
                        <div className="bodyRight">
                            <Button style={{marginRight: '10px', width: 120}}
                                    onClick={() => this.openCustomUserModal(true)}>自定义用户群</Button>
                            <Button type="primary" style={{width: 120}}>确定</Button>
                        </div>
                    </div>
                </Card>
                <Card bordered={false} hoverable={true} bodyStyle={{padding: '20px 0', marginTop: '10px'}}>
                    <div className={styles.selectionFunnel}>
                        <div className={styles.top}>
                            <span className={styles.title}>选择漏斗</span>
                            <Select defaultValue="0" style={{width: 110}}>
                                <Option value="0">推广转化</Option>
                                <Option value="1">激友转化</Option>
                                <Option value="2">投资漏斗</Option>
                                <Option value="3">实名漏斗</Option>
                                <Option value="4">加息卷使用</Option>
                                <Option value="5">红包使用</Option>
                            </Select>
                            <span style={{margin: '0 10px'}}>按</span>
                            <Select defaultValue="lucy" style={{width: 110}}>
                                <Option value="jack">事件[推广转化]属性</Option>
                                <Option value="lucy">无</Option>
                                <Option value="disabled">渠道</Option>
                                <Option value="Yiminghe">事件[xx]属性</Option>
                            </Select>
                            <span style={{marginLeft: '10px'}}>查看</span>
                        </div>
                        <div className={styles.middle}>
                            <div className={styles.verticalLine}></div>
                            <div className={styles.lineText}>且</div>
                            <div className={styles.maskTop}></div>
                            <div className={styles.maskBottom}></div>
                            {
                                funnel.funnel.getIn(['funnelGroup','filter']).toJS().map((item,key) => <div key={key} className={styles.aline}>
                                    <div className={styles.line}></div>
                                    <Select defaultValue={item.target} size="small" onChange={value=>dispatch({type:'funnel/updateFilterCondition',key,item:'target',value})} className={styles.selectStyle}
                                            style={{width: 110}}>
                                        <Option value="0">渠道</Option>
                                        <Option value="1">渠道2</Option>
                                        <Option value="2">渠道3</Option>
                                        <Option value="3">渠道4</Option>
                                    </Select>
                                    <Select defaultValue={item.judgment} size="small" onChange={value=>dispatch({type:'funnel/updateFilterCondition',key,item:'judgment',value})} className={styles.selectStyle}
                                            style={{width: 110}}>
                                        <Option value="EQUAL">等于</Option>
                                        <Option value="MORE_THAN">大于</Option>
                                        <Option value="LESS_THAN">小于</Option>
                                    </Select>
                                    <Select defaultValue={item.source} size="small" onChange={value=>dispatch({type:'funnel/updateFilterCondition',key,item:'source',value})} className={styles.selectStyle}
                                            style={{width: 110}}>
                                        <Option value="0">所有用户</Option>
                                        <Option value="1">流失用户</Option>
                                        <Option value="2">实名用户</Option>
                                        <Option value="3">高价值用户</Option>
                                        <Option value="4">最近活跃但未购买用户</Option>
                                        <Option value="5">有站岗资金用户</Option>
                                    </Select>
                                    <div className={styles.closeIcon} onClick={()=>dispatch({type:'funnel/removeFilterCondition',key})}></div>
                                </div>)
                            }
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.addPlus} onClick={()=>dispatch({type:'funnel/addFilterCondition'})}>
                                <Icon type="plus" className={styles.plusIcon}/>
                                <span>筛选条件</span>
                            </div>
                            <Button type="primary" onClick={CreateFunnelPopUps.open} style={{width: 120}}>新增漏斗</Button>
                        </div>

                    </div>
                    <Divider/>
                    <FunnelSelectInfo {...this.props}/>
                    <div className={styles.funnelChatContainer}>
                        <ChartsForStepArrow data={data}/>
                        {
                            chartsPatter === 'TREND' ?　<ChartsForLine /> : (chartsPatter === 'COMPARED' ?　<ChartsForColumn /> : <ChartsForBar/>)
                        }
                        {/*<ChartsForColumn />*/}
                        {/*<ChartsForLine />*/}
                        {/*<ChartsForColumnGroup />*/}
                        <ChartsForStepArrow data={data}/>
                        <ChartsForBar/>
                    </div>
                    <div className={styles.funnelTableContainer}>
                        <table className={styles.table_full}>
                            <thead>
                            <tr>
                                <td></td>
                                <td>总体转化</td>
                                <td>下载成功<span className={styles.arrow}></span></td>
                                <td>流失</td>
                                <td>激活成功<span className={styles.arrow}></span></td>
                                <td>流失</td>
                                <td>注册成功<span className={styles.arrow}></span></td>
                                <td>流失</td>
                                <td>实名成功<span className={styles.arrow}></span></td>
                                <td>流失</td>
                                <td>投资成功</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>总体</td>
                                <td><Link to={"funnelUserDetail"}><u>1000000</u><br/>50.00%</Link></td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                            </tr>
                            <tr>
                                <td>今日头条</td>
                                <td><u>1000000</u><br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                                <td>1000000<br/>50.00%</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className={styles.table_other}>
                            <thead>
                            <tr>
                                <td></td>
                                <td>激活成功(人)</td>
                                <td>第2步转化率</td>
                                <td>流失用户(人)</td>
                                <td>转化时间平均数</td>
                                <td>注册成功(人)</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>总体</td>
                                <td>1000</td>
                                <td>50.00%</td>
                                <td>1000</td>
                                <td>25分钟</td>
                                <td>1200</td>
                            </tr>
                            <tr>
                                <td>今日头条</td>
                                <td>1000</td>
                                <td>50.00%</td>
                                <td>1000</td>
                                <td>25分钟</td>
                                <td>1200</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                <CustomizeTime handleOk={this.handleCustomTime}/>
                <CreateFunnelPopUps/>
                <CustomUserGroupDialog customUserModalVisible={customUserModalVisible}
                                       openCustomUserModal={this.openCustomUserModal}/>
            </div>
        );
    }
}
