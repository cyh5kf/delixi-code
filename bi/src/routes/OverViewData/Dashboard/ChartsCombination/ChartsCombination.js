import React from 'react';
import Column from '../Charts/Column';
import LineArea from '../Charts/LineArea';
import ChartsFoTable from '../ChartsForTable/ChartsForTable';
import {Icon, DatePicker, Card, Select} from 'antd';
import styles from './ChartsCombination.less';

const Option = Select.Option

export default class ChartsCombination extends React.Component {
    state = {
        type: 'LINE'
    }

    onChange = (value) => {
        this.setState({
            type: value
        })
    }

    render() {
        const {type} = this.state;
        const {title, data} = this.props;
        return (
            <Card className={styles.chartsCombination} title={<span className={styles.titleContainer}>{title}<Select defaultValue={"data"}>
                <Option value="data">
                    按天
                </Option>
            </Select></span>}>
                <Icon type="close" className={styles.closeCombination} onClick={this.props.removeCombination}/>
                <div className={styles.selectInfo}>
                    <div className={styles.dateGroup}>
                        <DatePicker/><DatePicker/>
                    </div>
                    <div className={styles.chartGroup}>
                        <Icon type="area-chart" className={type === 'LINE' ? styles.activeIcon : ''}
                              onClick={() => this.onChange('LINE')}/><Icon
                        className={type === 'COLUMN' ? styles.activeIcon : ''} onClick={() => this.onChange('COLUMN')}
                        type="bar-chart"/><Icon className={type === 'TABLE' ? styles.activeIcon : ''} type="table"
                                                onClick={() => this.onChange('TABLE')}/>
                    </div>
                </div>
                {
                    type === 'LINE' ? <LineArea/> : (type === 'COLUMN' ? <Column/> :
                        <ChartsFoTable />)
                }
            </Card>
        )
    }
}