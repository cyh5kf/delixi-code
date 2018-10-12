import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from 'react-redux';
import store from "@/store/store.js";
import '@/assets/css/noviceGuide.scss';
import TopBar from '@/components/TopBar/TopBar.jsx';
import Bottom from '@/components/Bottom/Bottom.jsx';
class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0
        }
    }

    next = () => {
        const {step} = this.state
        this.setState({
            step: step + 1
        })
        if (step >= 7) {
            this.setState({
                step: 0
            })
        }

    }
    prev = () => {
        const {step} = this.state
        if (step == 0) {
            return
        }
        this.setState({
            step: step - 1
        })
    }

    render() {
        const {step} = this.state;
        const stepArr = [0, 1, 2, 3, 4, 5, 6, 7,].map((v, i) => {
            return <li key={i}><img src={"https://images.51rz.com/images/rebuild/pc/img/pxBz" + i + ".jpg"} alt=""/></li>
        })
        return (
            <div>
                <TopBar/>
                <div className="container">
                    <div className="content">
                        <section className="section1">
                            {!!this.props.store.userInfo.uid ? <img src="https://images.51rz.com/images/rebuild/pc/img/pcbtn1.png" alt=""/> :
                                <a target="_blank" href="/register.html"><img src="https://images.51rz.com/images/rebuild/pc/img/pcregister.png" alt=""/></a>}

                        </section>
                        <section className="section2"></section>
                        <section className="section3">
                            <div className="step">
                                <div className="stepDetail">
                                    <ul style={{marginLeft: -(this.state.step * 600) + 'px'}}>
                                        {stepArr}
                                    </ul>
                                </div>
                                <div style={{opacity: step == 0 ? '0.5' : '1'}}
                                     className="left"
                                     onClick={() => {
                                         this.prev()
                                     }}></div>
                                <div className="right" onClick={() => {
                                    this.next()
                                }}></div>
                            </div>
                        </section>
                        {/* <section className="section4">
                            <a target="_blank" href="/projectList.html"><img src="https://images.51rz.com/images/rebuild/pc/img/pcxs08.png" alt=""/></a>
                        </section> */}
                        <section className="section5"></section>
                    </div>
                </div>
                <Bottom/>
            </div>
        )
    }
}
Guide = connect((store) => ({store}))(Guide);
render(<Provider store={store}><Guide/></Provider>, document.getElementById('app'))
