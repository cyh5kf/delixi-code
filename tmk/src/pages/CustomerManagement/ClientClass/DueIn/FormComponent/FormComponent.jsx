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

    state={
        timeRange:{
            bt:[]
        }
    }

    render() {
        const {data,classes} = this.props;
        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item sm={3}>
                            <TextField
                                label="待收总额（起始）"
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
                                label="待收总额（结束）"
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
