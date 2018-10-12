import React from 'react';
import { Modal,Tag, Input, Button } from 'antd';
import styles from './CustomizeTime.less';

const { CheckableTag } = Tag;

let customizeTime;
export default class CustomizeTime extends React.Component{
    constructor(){
        super();
        this.state = {
            open: false,
            checkItem: 7
        };
        this.onCheck = this.onCheck.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    componentDidMount(){
        customizeTime = this;
    }

    static open(){
        customizeTime.setState({
            open: true
        })
    }

    onCheck(value){
        this.setState({
            checkItem: value
        })
    }

    handleOk(){
        this.setState({
            open: false
        })
        this.props.handleOk(this.state.checkItem)
    }

    render(){
        const {checkItem} = this.state;
        return (
            <Modal
                title="自定义"
                className={styles.customizeTime}
                visible={this.state.open}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className={styles.customizeTimeTag}>
                    <CheckableTag checked={checkItem===7} onChange={()=>this.onCheck(7)}>最近7天</CheckableTag>
                    <CheckableTag checked={checkItem===14} onChange={()=>this.onCheck(14)}>最近14天</CheckableTag>
                    <CheckableTag checked={checkItem===30} onChange={()=>this.onCheck(30)}>最近30天</CheckableTag>
                    <div className={styles.customizeTimeInputContainer}>
                        <span>近</span><Input onChange={e=>this.onCheck(e.target.value)}/><span>天</span><Button onClick={this.handleOk}>确认</Button>
                    </div>
                </div>
            </Modal>
        )
    }
}