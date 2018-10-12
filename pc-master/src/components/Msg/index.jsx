import React, {Component} from "react";
import {connect} from "react-redux";
import store from "@/store/store.js";
import {setMsg} from "@/store/action.js";
import Css from "./index.scss";

class Msg extends Component {
    constructor(props) {
        super(props);
        this.state={
            show:false
        }
    }
    componentWillReceiveProps(props){
        if(props.store.errorMsg){
            this.setState({
                show:true
            })
            setTimeout(()=>{
                this.setState({
                    show:false
                })
                store.dispatch(setMsg(''));
            },2000)
        }
    }
    componentDidMount() {

    }
    closeMsg(e){
        this.setState({
            show:false
        })
    }
    render() {
        const {
            show
        }=this.state;

        const {
            errorMsg
        }=this.props.store;

        const isShow=show && Css.show;

        return (<div className={`${Css.msg} ${isShow}`}>
            {/*<div className={Css.shade} onClick={(e)=>{this.closeMsg(e)}}></div>*/}
            <p className={Css.content}>
                {errorMsg}
            </p>
        </div>);
    }
}

Msg = connect((store) => ({store}))(Msg);
export default Msg;