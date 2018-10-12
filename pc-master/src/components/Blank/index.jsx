import React, {Component} from "react";
import Btn from '@/components/Btn/index.jsx'
class Blank extends Component {
    render() {
        return (
            <div className="noredpack">
                <img src={this.props.url || "https://images.51rz.com/images/rebuild/pc/img/empty/no_coupon_lists.png"} alt=""
                     style={{display: 'block', margin: '50px auto 15px', height: '78px'}}/>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontSize: '14px',
                    color: '#999',

                }}>{this.props.text || '优惠券准备中，会尽快送到这里来'}</p>
                <Btn text={this.props.btntext || "活动中心"}
                     style={{width: '125px', height: '38px', margin: '0 auto', lineHeight: '38px'}}
                     href={this.props.href || "/activecenter.html"}/>
            </div>
        )
    }
}
export default Blank;