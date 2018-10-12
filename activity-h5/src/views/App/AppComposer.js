import React from 'react';
import AppView from './AppView';
import _ from 'underscore';


export default class AppComposer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSideBarFold:false, //左侧菜单是否折叠
            menuCurrent: this.props.location.pathname
        };
    }

    toggleMenuFold=()=>{
        var isSideBarFold = this.state.isSideBarFold;
        this.setState({isSideBarFold:!isSideBarFold});
    };

    render() {
        var store = this.state;

        return (
            <AppView actions={this} store={store}>{this.props.children}</AppView>
        );
    }

}
