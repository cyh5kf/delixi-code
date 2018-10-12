import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

let notice;
export default class Notice extends React.Component{
    state = {
        open: false,
        message:'',
        autoHideDuration:2000
    }

    componentWillMount(){
        notice = this;
    }

    static open =({message,autoHideDuration})=>{
        notice.setState({
            open:true,
            message,
            autoHideDuration
        })
    }
    close=()=>{
        this.setState({ open: false })
    }
    render(){
        const {open,message,autoHideDuration} = this.state;
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                autoHideDuration={autoHideDuration}
                onClose={this.close}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={
                    <span id="message-id">
              {message}
            </span>
                }
            />
        )
    }
}
