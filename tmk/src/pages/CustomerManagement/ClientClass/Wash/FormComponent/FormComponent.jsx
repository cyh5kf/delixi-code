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

    onChange=(name,key,condition)=>e=>{
        var normvalue = e.target.value.replace("T"," ");
        if (normvalue.length==16) {
            normvalue += ':00'
        }
        if(key===0){
            this.setState({
                [name]:{
                    [condition]:[normvalue,this.state[name][condition][1]]
                }
            })
        } else if(key===1){
            this.setState({
                [name]:{
                    [condition]:[this.state[name][condition][0],normvalue]
                }
            })
        }
    }

    render() {
        const {data,classes} = this.props;
        const formatTime = (time)=>{
            return time ? time.replace(" ","T") : ""
        }
        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={6} sm={3}>
                            {/* <Button
                                onClick={()=>this.props.onSearch({page:1})}
                                variant="raised"
                                color="primary"
                            >
                                搜索
                            </Button> */}
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
