import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import errorTipCss from "@/assets/css/errorTip.scss";
import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";
import store from "@/store/store.js";
class ErrorTip extends Component {
    render() {
        return (
            <div style={{background: '#fff'}}>
                <TopBar/>
                <div className={errorTipCss.errorTip}>
                    <img src="https://images.51rz.com/images/pc/error/errorPc.png" />
                </div>
                <Bottom/>
            </div>
        )
    }
}

ErrorTip = connect((store) => ({store}))(ErrorTip);

render(<Provider store={store}>
    <ErrorTip/>
</Provider>, document.getElementById('app'));