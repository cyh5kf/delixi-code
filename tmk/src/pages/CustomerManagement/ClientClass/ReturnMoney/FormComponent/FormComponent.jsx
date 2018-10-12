import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';

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

    onChange=(name,key,v)=>e=>{
        var normvalue = e.target.value.replace("T"," ");
        if (normvalue.length==16) {
            normvalue += ':00'
        }
        if(v == 0){
            normvalue += ' 00:00:00'
        }else if(v == 1){
            normvalue += ' 23:59:59'
        }
        this.props.handleChange(name,key)(normvalue,true);
    }

    render() {
        const {data,classes} = this.props;
        const formatTime = (time)=>{
            // return time ? time.replace(" ","T") : ""
            return time.slice(0,10)
        }
        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item sm={3}>
                            <TextField
                                id="date"
                                label="回款时间（起始）"
                                type="date"
                                value={formatTime(this.props.data.timeRange.startTime)}
                                inputProps={{step:1}}
                                onChange={this.onChange('timeRange','startTime',0)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                id="date"
                                label="回款时间（结束）"
                                type="date"
                                value={formatTime(this.props.data.timeRange.endTime)}
                                inputProps={{step:1}}
                                onChange={this.onChange('timeRange','endTime',1)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                label="回款金额（起始）"
                                className={classes.textField}
                                value={this.props.data.moneyRange.startMoney}
                                onChange={this.props.handleChange("moneyRange","startMoney")}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <TextField
                                label="回款金额（结束）"
                                className={classes.textField}
                                value={this.props.data.moneyRange.endMoney}
                                onChange={this.props.handleChange("moneyRange","endMoney")}
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
