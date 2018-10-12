import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import '@/assets/css/welfare.scss';
import store from '@/store/store.js';
import TopBar from '@/components/TopBar/TopBar.jsx';
import Bottom from '@/components/Bottom/Bottom.jsx';
import API from '@/api/api.js'
class Welfare extends Component {
    constructor(props) {
        super(props);
        this.state={
            packList:[1,2,3,4]
        }
    }

    async componentWillMount(){
        if(this.props.store.userInfo.uid){
            const packObj=await API.get(API.growPack,{sourceType:6},true);
            const {recordList=[]}=packObj.obj;
            if(recordList.length){
                this.setState({
                    packList:recordList
                })
            }
        }
    }

    render() {
        const {packList=[]}=this.state;
        const {uid}=this.props.store.userInfo;
        const welfareArr = packList.map((v, i) => {
            return <li key={i}>
                <div style={{backgroundImage:'url(https://images.51rz.com/images/rebuild/pc/img/welfare'+i+'.png)'}} className={`img ${!!uid&&v.status==0||v.status==1?'active':''}`}><img src="https://images.51rz.com/images/rebuild/pc/img/get_welfare.png" alt=""/></div>
            </li>
        })
        return (
            <div>
                <TopBar/>
                <div className="container">
                    <div className="banner"></div>
                    <div className="content">
                        <section className="section1">
                            <div className="redpack">
                                <p>5元红包</p>
                            </div>
                            <div className="redpack">
                                <p>25元红包</p>
                            </div>
                            <div className="redpack">
                                <p>120元红包</p>
                            </div>
                            {!this.props.store.userInfo.uid ?
                                <a href="/register.html"><img src="https://images.51rz.com/images/rebuild/pc/img/welfarebtn.png" alt=""/></a> :
                                <img src="https://images.51rz.com/images/rebuild/pc/img/pcbtn1.png" alt=""/>}
                        </section>
                        <section className="section2"></section>
                        <section className="section3">
                            <ul className="pack">
                                {welfareArr}
                            </ul>
                        </section>
                        <section className="section4">
                            <p>1、新手标为新手用户专属特权，每位用户最多仅可投资1次新手标；<br/>2、红包不可用于投资抵扣，以返现的方式发放到帐户；<br/>3、红包不可累计使用，每单笔投资最多可使用一张；<br/>4、投资红包均设有有效期限，过期则失效；<br/>5、红包不能用于新手标和债权转让标；<br/>6、本活动最终解释权在法律范围内归人众金服所有。</p>
                        </section>
                    </div>
                </div>
                <Bottom/>
            </div>

        )
    }
}
Welfare = connect((store) => ({store}))(Welfare);
render(<Provider store={store}>
    <Welfare/>
</Provider>, document.getElementById('app'));