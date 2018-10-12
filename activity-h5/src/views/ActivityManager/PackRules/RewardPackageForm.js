import React from 'react';
import RewardFormOuter from './RewardFormOuter';

export default class RewardPackageForm extends React.Component {

    render() {
        const {store, actions} = this.props;
        return <RewardFormOuter ref="rewardFormOuter" rewardType="package" actions={actions} store={store} />
    }
    
}