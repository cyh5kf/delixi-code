import React, {Component} from "react";
import {connect} from "react-redux";
import LayerCss from "./Layer.scss";
import {render} from "react-dom";
import store from "@/store/store.js";
import {setLayerStatus} from "@/store/action.js";

class Layer extends Component {
    constructor(props) {
        super(props);
        this.closeLayer=this.closeLayer.bind(this);
    }
    componentWillReceiveProps(props){


    }
    componentDidMount() {
        let self=this;


    }
    componentDidUpdate(){
        let self=this;

    }
    closeLayer(){
        this.props.dispatch(setLayerStatus(false));
    }
    render() {
        let {show,time,type,content,title,btns}=this.props.store.layerConfig;
        const showClassName=show?'':' hide';
        const typeClass=type?' '+type:'';

        // this.props.dispatch(setLayerStatus(true));
        if(show&&time){//需要关闭
            setTimeout(() => {
                this.props.dispatch(setLayerStatus(false));
            },time);
        }

        const Title=!title?'':(
            <div className="text-center layer-title">
                {title}
            </div>
        );
        const Content=!content?'':(
            <div className="layer-content" >
                {content}
            </div>
        );
        const Btns=!btns||type=='msg'?'':(
            <div className="layer-btn-groups">
                <p className="layer-btn-item">
                    <span className="layer-btn" onClick={this.closeLayer}>{btns.cancel?btns.cancel.text:''}</span>
                </p>
                <p className="layer-btn-item">
                    <span className="layer-btn" onClick={btns.ok.fn}>{btns.ok?btns.ok.text:''}</span>
                </p>
            </div>
        );

        return (
            <div className={'layer-wraper'+showClassName+typeClass}>
                {Title}
                {Content}
                {Btns}
            </div>
        );
    }
}

Layer=connect((store) => ({store:store}))(Layer);

export default  Layer;


