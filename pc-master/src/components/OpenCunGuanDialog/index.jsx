import React, {Component} from "react";
import Css from "./index.scss";

export default class OpenCunGuanDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            show:this.props.show||false
        }
    }
    componentWillReceiveProps(props){
        setTimeout(()=>{//延时执行 避免退出登录的时候因为清除store导致存管弹框闪现
            this.setState({
                show:props.show
            })
        },500)
    }
    componentWillMount(){

    }
    close(){
        this.props.close&&this.props.close()
        this.setState({
            show:false
        })
    }
    render(){
        const {
            show
        }=this.state;

        const style={
            display:show?'block':'none'
        }
        return (
            <div className={Css.cunGuanDialog} style={style}>
                <div className={Css.shade}></div>
                <div className={Css.content}>
                    <span className={Css.close} onClick={(e)=>{this.close(e)}}></span>
                    <a href="/openCunGuan.html">立即开通</a>
                </div>
            </div>
        );
    }
}
