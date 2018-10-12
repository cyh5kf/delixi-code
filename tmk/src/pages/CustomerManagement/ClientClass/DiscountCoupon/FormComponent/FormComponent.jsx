import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import { toQueryString} from "api/restApi";

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });
  

class FormComponent extends React.Component {

    onChange=(name)=>e=>{
        var normvalue = e.target.value.replace("T"," ");
        if (normvalue.length==16) {
            normvalue += ':00'
        }
        this.props.handleChange(name)(normvalue,true);
    }
    
    dowl = ()=> {
        this.props.data
    }

    render() {
        const {data,classes} = this.props;
        const formatTime = (time)=>{
            // return time ? time.replace(" ","T") : ""
            return time
        }
        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item sm={3}>
                            <TextField
                                id="date"
                                label="优惠券可用时间（起始）"
                                type="date"
                                value={formatTime(this.props.data.startTime)}
                                inputProps={{step:1}}
                                onChange={this.onChange('startTime')}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                label="优惠券名称"
                                className={classes.textField}
                                value={this.props.data.couponName}
                                onChange={this.props.handleChange("couponName")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Button
                                onClick={()=>this.props.onSearch({page:1})}
                                variant="raised"
                                color="primary"
                            >
                                搜索
                            </Button>
                            <Button
                                onClick={()=>this.props.onExport({page:1})}
                                variant="raised"
                                color="primary"
                                style={{marginLeft: '30px'}}
                            >
                                导出
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(FormComponent);
