import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

class FormComponent extends React.Component {

    render() {
        const {data} = this.props;
        return (
            <div>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={6} sm={3}>
                            <TextField
                                id="number"
                                label="生日日期"
                                type="number"
                                placeholder="格式：0808"
                                value={data.birthday || ""}
                                onChange={this.props.handleChange("birthday")}
                                className={"fix_select"}
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

export default FormComponent;
