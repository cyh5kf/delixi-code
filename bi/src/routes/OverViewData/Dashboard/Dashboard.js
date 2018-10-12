import React from 'react';
import {Card} from 'antd';
import styles from './Dashboard.less';
import ChartsCombination from './ChartsCombination/ChartsCombination';

export default class Dashboard extends React.Component {
    state = {
        data: [
            {
                title:'累计交易规模（万）'
            },{
                title:'待收金额（万）'
            },{
                title:'资金净注入（万）'
            },{
                title:'资金复投金额（万）'
            },{
                title:'站岗资金金额（万）'
            },{
                title:'用户账户金额（万）'
            },{
                title:'注册人数（万）'
            },{
                title:'开通存管人数（人）'
            },{
                title:'投资人数（人）'
            }
        ]
    }
    removeCombination = (key) => {
        let data = this.state.data;
        data.splice(key,1);
        this.setState({
            data
        })
    }
    render() {
        const {data} = this.state;
        return (
            <div className={styles.dashboard}>
                {
                    data.map((item,key)=><ChartsCombination key={key} removeCombination={()=>this.removeCombination(key)} title={item.title} data={{}}/>)
                }
            </div>
        )
    }
}