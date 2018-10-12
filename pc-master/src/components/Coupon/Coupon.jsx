import React, {Component} from "react";
import  coupon from "./Coupon.scss";

export default class Coupon extends Component {
    state = {
        show: false,
        couponValue: ''
    };
    open = () => {
        this.setState({
            show: true
        })
    };
    cancel = () => {
        this.setState({
            show: false
        })
    };

    onSelect=(couponValue)=>{
        this.setState({
            couponValue
        })
    };

    render() {
        const {show,couponValue} = this.state;
        const {cancelTitle} = this.props;
        return (
            <div className={coupon.coupon}>
                <div className={coupon.coupon_select}>
                    <div className={coupon.select_name}>优惠券选择</div>
                    <div className={coupon.select_value} onClick={this.open}>{couponValue}<span>&lt;</span></div>
                </div>
                {
                    show ? <div className={coupon.coupon_list}>
                        <div className={coupon.header}>
                            <span className={coupon.cancel} onClick={this.cancel}>{cancelTitle || "取消优惠券选择"}</span>
                        </div>
                        <div className={coupon.coupon_item_list}>
                            <div className={coupon.coupon_item}>
                                {/*<div className={coupon.coupon_item_header}>*/}
                                    {/*<div className={coupon.sector} />*/}
                                    {/*<div className={coupon.separate}></div>*/}
                                    {/*<div className={coupon.sector} />*/}
                                {/*</div>*/}
                                <div className={coupon.content}>
                                    <div><div>0.5%</div><div>加息券</div></div>
                                    <div>
                                        <div>投资8000</div>
                                        <div>投资90天以上</div>
                                        <div>有效期：</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
            </div>
        )
    }
}


