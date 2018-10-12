import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    placeholder: {
        height: 80,
    },
});

let loadingBar;
class LoadingBar extends React.Component{
    state = {
        open:false,
        tipText: '', //提示语
    }
    componentWillMount(){
        loadingBar = this;
    }
    static open=(tipText='')=>{
        loadingBar.setState({open:true, tipText})
    };
    static close =()=>{
        loadingBar.setState({open:false, tipText: ''})
    };
    render(){
        const { open, tipText } = this.state;
        return (
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="simple-dialog-title">
                <DialogContent>
                    <CircularProgress />
                    {tipText && <p style={{margin: '10px 0 0'}}>{tipText}</p>}
                </DialogContent>
            </Dialog>
        )
    }
}

export default withStyles(styles)(LoadingBar);
