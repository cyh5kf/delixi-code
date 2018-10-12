import React from 'react';
import styles from './index.less';

export default class ChartsForStepArrow extends React.Component{
    render(){
        const {data} = this.props;
        const funnelCartComponent = (key,props) => <div key={key} className={styles.funnelChatItem}>
            <div className={styles.arrowLight}>
                <span className={styles.percentage}>{props.percentage}</span>
            </div>
            <div className={styles.stepContainer}>
                <div className={styles.stepTextContainer}>
                    <span className={styles.stepName}>{`${key + 2}.${props.title}`}</span>
                    <span className={styles.stepContent}>{props.number}人</span>
                </div>
            </div>
        </div>
        return(
            <div className={styles.funnelChat}>
                <div className={styles.funnelChatItem}>
                    <span className={styles.funnelChatTitle}>总转化率</span>
                    {/*<div className={styles.arrowLight}>*/}
                        {/*<span className={styles.percentage}>50.00%</span>*/}
                    {/*</div>*/}
                    {/*<div className={styles.stepContainer}>*/}
                        {/*<div className={styles.stepTextContainer}>*/}
                            {/*<span className={styles.stepName}>1.下载成功</span>*/}
                            {/*<span className={styles.stepContent}>2000人</span>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
                {
                    data.map((item,key)=>funnelCartComponent(key,item))
                }
            </div>
        )
    }
}