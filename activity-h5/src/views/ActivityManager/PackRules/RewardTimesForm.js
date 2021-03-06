import React from 'react';
import RewardFormOuter from './RewardFormOuter';

export default class RewardTimesForm extends React.Component {

    render() {
        const {store, actions} = this.props;
        return <RewardFormOuter ref="rewardFormOuter" rewardType="times" actions={actions} store={store} />
    }
    
}