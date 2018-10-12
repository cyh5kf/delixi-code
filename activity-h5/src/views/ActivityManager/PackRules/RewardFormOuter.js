import React from 'react';
import { Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber, Switch } from 'antd';
import moment from 'moment';
const Option = Select.Option;
import RewardFormInner from './RewardFormInner';

import '../ActivityListView.less';


export default class RewardFormOuter extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        const { store, actions, rewardType } = this.props;
        const { packInfo } = store;
        const rewardList = packInfo ? packInfo.rules.reward : [];
        const packsList = packInfo ? packInfo.rules.packs : [];

        if (packInfo && rewardList.length !== 0) { //如果列表存在数据
            let map = {},
                rewardOutArray = [];
            if(rewardType === 'times') { // 按次数获取数据
                for (let i = 0; i < rewardList.length; i++) {
                    if(rewardList[i].source_id === "0") { // source_id为0则将该组数据添加到按次数数据里
                        let ai = rewardList[i];
                        let map_length = Object.keys(map).length;
                        if (map_length === 0 || map.start_num !== ai.start_num && map.end_num !== ai.end_num) {
                            rewardOutArray.push({
                                rewardList: [ai]
                            });
                            map = ai;
                        } else {
                            for (let j = 0; j < rewardOutArray.length; j++) {
                                let dj = rewardOutArray[j];
                                if (dj.rewardList[0].start_num === ai.start_num && dj.rewardList[0].end_num === ai.end_num) {
                                    dj.rewardList.push(ai);
                                    break;
                                }
                            }
                        }
                    }
                }
            } else if(rewardType === 'package') { // 按礼包获取数据
                for (let i = 0; i < rewardList.length; i++) {
                    if(rewardList[i].source_id !== "0") { // source_id不为0则将该组数据添加到按礼包数据里
                        let ai = rewardList[i];
                        let map_length = Object.keys(map).length;
                        if (map_length === 0 || map.source_id !== ai.source_id) {
                            rewardOutArray.push({
                                rewardList: [ai]
                            });
                            map = ai;
                        } else {
                            for (let j = 0; j < rewardOutArray.length; j++) {
                                let dj = rewardOutArray[j];
                                if (dj.rewardList[0].source_id === ai.source_id) {
                                    dj.rewardList.push(ai);
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            // 如果是根据礼包数据，且礼包规则集合有数据，那么需要将礼包规则的礼包编号id和奖励规则里根据礼包数据集合的礼包编号id保持一致
            if(rewardType === 'package' && packsList.length !== 0) {
                if(rewardOutArray.length === 0) { // 如果奖励规则数据为空
                    packsList.forEach((value, index) => {
                        let packsId = value.id;
                        rewardOutArray.push({
                            rewardList: [{reward_type: '1', source_id: packsId}]
                        });
                    }) 
                } else { // 奖励规则有数据
                    packsList.forEach((value, index) => {
                        let packsId = value.id;
                        if(rewardOutArray[index]) {
                            rewardOutArray[index].rewardList[0].source_id = packsId;
                        } else {
                            rewardOutArray.push({rewardList:[
                                {
                                    reward_type: '1',
                                    source_id: packsId
                                }
                            ]})
                        }
                    }) 
                }
                
            }
            
            // 如果按次数或者按礼包的数据为空，则添加一个默认值
            if(rewardOutArray.length === 0) {
                rewardOutArray = [
                    {rewardList:[
                        {
                            reward_type: '1'
                        }
                    ]}
                ]
            }
            actions.handleChangeRewardArray(rewardOutArray, rewardType);
            
        }
    }

    remove = (outerIndex) => {
        const { store, actions, rewardType } = this.props;
        let { reward_times } = store;
        if (reward_times.length === 1) {
            return;
        }
        reward_times.splice(outerIndex, 1);
        actions.handleChangeRewardArray(reward_times, rewardType);
    }

    add = () => {
        const { store, actions, rewardType } = this.props;
        let { reward_times } = store;
        reward_times.push({rewardList:[{}]});
        actions.handleChangeRewardArray(reward_times, rewardType);
    }

    innerAdd = (index) => {
        const { store, actions, rewardType } = this.props;
        let { reward_times, reward_package } = store;
        let rewardOutArray = rewardType === 'times'? reward_times: reward_package;
        rewardOutArray[index].rewardList.push({reward_type: '1'});
        actions.handleChangeRewardArray(rewardOutArray, rewardType);
    }

    innerRemove = (outerIndex, innerIndex) => {
        const { store, actions, rewardType } = this.props;
        let { reward_times, reward_package } = store;
        let rewardOutArray = rewardType === 'times'? reward_times: reward_package;
        if (rewardOutArray[outerIndex].rewardList.length === 1) {
            return;
        }
        rewardOutArray[outerIndex].rewardList.splice(innerIndex, 1);
        actions.handleChangeRewardArray(rewardOutArray, rewardType);
    }

    render() {
        const { store, actions, rewardType } = this.props;
        const { reward_times, reward_package } = store;
        const rewardOutArray = rewardType === 'times'? reward_times: reward_package;

        return (
            <Row>
                <Col style={{textAlign: 'left', paddingRight: '10px'}} span={2}>
                {
                   rewardType === 'times'? "奖励领取规则(根据次数)": "奖励领取规则(根据礼包)"
                }
                
                </Col>
                <Col span={22}>
                    {
                        rewardType === 'times'?
                            <span style={{display: 'inline-block', width: '210px', textAlign: 'center'}}>次数范围</span>
                            :<span style={{display: 'inline-block', width: '70px', textAlign: 'center'}}>礼包编号</span>
                    }
                    <span style={{display: 'inline-block', width: '132px', textAlign: 'center'}}>奖励编号</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励类型</span>
                    <span style={{display: 'inline-block', width: '250px', textAlign: 'center'}}>选择奖励规则</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励数值</span>
                    <span style={{display: 'inline-block', width: '130px', textAlign: 'center'}}>奖励名称</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>概率</span>
                    <div className="clear20"></div>
                    {rewardOutArray.map((k, index) => {
                        const refName = `rewardFormInner-${index}`;
                        return (
                            <div key={index}>
                                <RewardFormInner rewardTypeModule={rewardType} parentActions={this} outerIndex={index} rewardInnerArray={k.rewardList} ref={refName} actions={actions} store={store} />
                                <div className="clear10"></div>
                                <Button type="dashed" onClick={() => {this.innerAdd(index)}} style={{ width: '140px' }}>
                                    <Icon type="plus" /> 添加一行表单
                                </Button>
                                <div className="clear10"></div>
                                {
                                    rewardType === 'times' && (  
                                        rewardOutArray.length > 1 ? (
                                            <Button type="dashed" onClick={() => this.remove(index)} style={{ width: '140px' }}>
                                                <Icon type="minus" /> 删除表单
                                            </Button>
                                        ) : null
                                    )
                                }
                                
                                <div className="clear20"></div>
                            </div>
                        )
                    })}
                </Col>
                <div className="clear20"></div>
                {
                    rewardType === 'times' && (
                        <Col style={{marginLeft: '50px'}}>
                            <Button type="dashed" onClick={this.add} style={{ width: '140px' }}>
                                <Icon type="plus" /> 添加表单
                            </Button>
                        </Col>
                    )
                }
            </Row>
        );
    }
}
