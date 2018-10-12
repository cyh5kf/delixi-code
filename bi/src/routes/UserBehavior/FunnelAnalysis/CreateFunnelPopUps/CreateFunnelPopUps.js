import React from 'react';
import {Card, Input, Select, Divider, Button, Icon} from 'antd';
import styles from './CreateFunnelPopUps.less';
import {fromJS,Map} from 'immutable';
import {toChineseNum} from '@/utils/utils';

const Option = Select.Option;
let createFunnelPopUps;
export default class CreateFunnelPopUps extends React.Component {
    state = {
        open: false,
        data: fromJS({
            funnelName: '', windowPeriod: '', funnelStep: [
                {date: 0, condition: 0, content: 0, show: true},
                {date: 0, condition: 0, content: 0, show: false},
                {date: 0, condition: 0, content: 0, show: false},
                {date: 0, condition: 0, content: 0, show: false},
                {date: 0, condition: 0, content: 0, show: false}
            ]
        })
    };

    componentDidMount() {
        createFunnelPopUps = this;
    }

    static open = () => {
        createFunnelPopUps.setState({open: true})
    };

    close = () => {
        createFunnelPopUps.setState({open: false})
    };

    addCondition = (key)=> {
        const {data} = this.state;
        let newData = data.updateIn(['funnelStep',key,'show'],val=>true);
        this.setState({
            data: newData
        })

    };

    removeCondition = (key)=> {
        const {data} = this.state;
        let newData = data.updateIn(['funnelStep',key,'show'],val=>false);
        this.setState({
            data: newData
        })

    };

    addStep = () => {
        const {data} = this.state;
        let Data = data.updateIn(['funnelStep'],list=>list.push(Map({date: 0, condition: 0, content: 'test', show: false})))
        this.setState({
            data: Data
        })
    }

    render() {
        const {open, data} = this.state;
        const funnelStep = data.toJS().funnelStep;
        return (
            open ? <div className={styles.createFunnelPopUps}>
                <Icon onClick={this.close} className={styles.closeFunnelPopUps} type="close" />
                <Card title="创建漏斗">
                    <Divider/>
                    <div><span className={styles.itemTitle}>漏斗名称</span><Input/></div>
                    <div><span className={styles.itemTitle}>窗口期</span>
                        <Select defaultValue={7} className={styles.stepDateSelect}>
                            <Option className="Option" value={7}>最近7天</Option>
                        </Select></div>
                    <Divider/>
                    <div className={styles.funnelStep}>漏斗步骤</div>
                    {
                        funnelStep.map((item, key) => <div key={key} className={styles.funnelStepItemContainer}>
                            <div><span className={styles.itemTitle}>第{toChineseNum(key + 1)}步</span>
                                <Select defaultValue={7} className={styles.stepDateSelect}>
                                    <Option className="Option" value={7}>最近7天</Option>
                                </Select>
                                <Button className={styles.triggerLimit} onClick={() =>this.addCondition(key)}><Icon type="plus"/>触发限定条件</Button>
                            </div>
                                {
                                    item.show ? <div>
                                        <Select defaultValue={7} className={styles.stepDateSelectCondition}>
                                            <Option className="Option" value={7}>渠道</Option>
                                        </Select>
                                        <Select defaultValue={7} className={styles.stepDateSelectCondition}>
                                            <Option className="Option" value={7}>等于</Option>
                                        </Select>
                                        <Select defaultValue={7} className={styles.stepDateSelectCondition}>
                                            <Option className="Option" value={7}>今日头条</Option>
                                        </Select><Icon onClick={()=>this.removeCondition(key)} className={styles.removeCondition} type="close" />
                                    </div> : null
                                }
                            <Divider/>
                        </div>)
                    }
                    <Button className={styles.addStepBtn} onClick={this.addStep}><Icon type="plus"/>增加步骤</Button>
                    <div className={styles.funnelStepBtnGroup}>
                        <Button className={styles.closeBtn} onClick={this.close}>取消</Button><Button className={styles.submitBtn}>确定</Button>
                    </div>

                </Card>
            </div> : null
        )
    }
}