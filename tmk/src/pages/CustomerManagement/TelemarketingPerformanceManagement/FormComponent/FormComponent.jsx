import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

class FormComponent extends React.Component {

    render() {
        const {data} = this.props;
        return (
            <div>
                <form action="">
                    <Grid container spacing={24}>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                id="date"
                                label="开始时间"
                                type="date"
                                value={data.startTime || ""}
                                onChange={this.props.handleChange("startTime")}
                                className={"fix_select"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                id="date"
                                label="结束时间"
                                type="date"
                                value={data.endTime || ""}
                                onChange={this.props.handleChange("endTime")}
                                className={"fix_select"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl className="fix_select" style={{width:'90%'}}>
                                <InputLabel htmlFor="age-simple">客服部门</InputLabel>
                                <Select
                                    value={data.department}
                                    onChange={this.props.handleChange("department")}
                                >
                                    <MenuItem value={0}>全部</MenuItem>
                                    <MenuItem value={1}>VIP1客服部</MenuItem>
                                    <MenuItem value={2}>VIP2客户部</MenuItem>
                                    <MenuItem value={3}>电销客服</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControl className="fix_select">
                                <Button
                                    onClick={()=>this.props.onSearch({page:1})}
                                    variant="raised"
                                    color="primary"
                                    className=""
                                >
                                    查询
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default FormComponent;
