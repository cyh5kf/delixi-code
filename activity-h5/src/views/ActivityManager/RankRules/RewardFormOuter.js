import React from 'react';
import { Row, Col, Input, message, Icon, Button, Select, TimePicker, InputNumber, Switch } from 'antd';
import classNames from 'classnames';
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
        const { store, actions } = this.props;
        let { rankInfo, rewardOutArray } = store;
        let rewardList = rankInfo ? rankInfo.rules.reward : [];
        if (rankInfo && rewardList.length !== 0) { //如果列表存在数据

            let map = {},
            rewardOutArray = [];
            for (let i = 0; i < rewardList.length; i++) {
                let ai = rewardList[i];
                let map_length = Object.keys(map).length;
                if (map_length === 0 || map.No !== ai.No) {
                    rewardOutArray.push({
                        rewardList: [ai]
                    });
                    map = ai;
                } else {
                    for (let j = 0; j < rewardOutArray.length; j++) {
                        let dj = rewardOutArray[j];
                        if (dj.rewardList[0].No === ai.No) {
                            dj.rewardList.push(ai);
                            break;
                        }
                    }
                }
            }
            actions.handleChangeRewardOutArray(rewardOutArray);
            
        }
        
    }

    remove = (outerIndex) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        if (rewardOutArray.length === 1) {
            return;
        }
        rewardOutArray.splice(outerIndex, 1);
        actions.handleChangeRewardOutArray(rewardOutArray);
    }

    add = () => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        rewardOutArray.push({rewardList:[{}]});
        actions.handleChangeRewardOutArray(rewardOutArray);
    }

    innerAdd = (index) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        rewardOutArray[index].rewardList.push({reward_type: '1'});
        actions.handleChangeRewardOutArray(rewardOutArray);
        
    }

    innerRemove = (outerIndex, innerIndex) => {
        const { store, actions } = this.props;
        let { rewardOutArray } = store;
        if (rewardOutArray[outerIndex].rewardList.length === 1) {
            return;
        }
        rewardOutArray[outerIndex].rewardList.splice(innerIndex, 1);
        actions.handleChangeRewardOutArray(rewardOutArray);
    }

    render() {
        const { store, actions } = this.props;
        const { rewardOutArray, send_reward_type } = store;
        const showOrHidden = classNames({
            'showOpen': send_reward_type === "0",
            'hidden': send_reward_type === "1"
        })

        return (
            <Row className={showOrHidden}>
                <Col style={{textAlign: 'right', paddingRight: '10px'}} span={2}>
                奖励领取规则：
                </Col>
                <Col span={22}>
                    <span style={{display: 'inline-block', width: '80px', textAlign: 'center'}}>排名位置</span>
                    <span style={{display: 'inline-block', width: '132px', textAlign: 'center'}}>奖励编号</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励类型</span>
                    <span style={{display: 'inline-block', width: '275px', textAlign: 'center'}}>选择奖励规则</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励数值</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>奖励名称</span>
                    <span style={{display: 'inline-block', width: '100px', textAlign: 'center'}}>概率</span>
                    <div className="clear20"></div>
                    {rewardOutArray.map((k, index) => {
                        const refName = `rewardFormInner-${index}`;
                        return (
                            <div key={index}>
                                <RewardFormInner parentActions={this} outerIndex={index} rewardInnerArray={k.rewardList} ref={refName} actions={actions} store={store} />
                                <div className="clear10"></div>
                                <Button type="dashed" onClick={() => {this.innerAdd(index)}} style={{ width: '140px' }}>
                                    <Icon type="plus" /> 添加一行表单
                                </Button>
                                <div className="clear10"></div>
                                {rewardOutArray.length > 1 ? (
                                    <Button type="dashed" onClick={() => this.remove(index)} style={{ width: '140px' }}>
                                        <Icon type="minus" /> 删除表单
                                    </Button>
                                ) : null}
                                <div className="clear20"></div>
                            </div>
                        )
                    })}
                </Col>
                <div className="clear20"></div>
                <Col style={{marginLeft: '50px'}}>
                    <Button type="dashed" onClick={this.add} style={{ width: '140px' }}>
                        <Icon type="plus" /> 添加表单
                    </Button>
                </Col>
            </Row>
        );
    }
}
