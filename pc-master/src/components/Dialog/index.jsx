import React,{Component} from 'react'
import {render} from 'react-dom'
import Css from './index.scss'

class Dialog extends Component {
    componentWillReceiveProps(props){
        this.setState({
            show: props.show
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show
        }
    }
    render() {
        const {
            style={},
            onClose=()=>{}
        }=this.props;

        return (
            <div style={{display:this.state.show ? 'block' : 'none'}}>
                <div className={Css.mask} onClick={this.hide_dialog}>
                </div>
                <div className={Css.dialog} style={style}>
                    <div className={Css.close} onClick={()=>{onClose()}}></div>
                    {this.props.children}
                </div>
            </div>
        )
    }
    hide_dialog = () => {
        // const {
        //     close=()=>{}
        // }=this.props;
        //
        // close();
        // this.setState({
        //     show: false
        // })
    }
}

export default Dialog