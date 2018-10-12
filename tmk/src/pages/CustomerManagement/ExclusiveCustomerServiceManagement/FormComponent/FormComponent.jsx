import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import { DatePicker } from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import AssignCustomerService from "components/AssignCustomerService/AssignCustomerService";

import { getParameter } from "utils";
import { ENODATA } from "constants";

class FormComponent extends React.Component {

  render() {
    const { state } = this;
    const { data,selected } = this.props;
    return (
      <div>
        <form action="">
          <Grid container spacing={24}>
            <Grid item xs={6} sm={3}>
              <TextField
                id="name"
                label="客户名称"
                className=""
                value={data.realname}
                onChange={this.props.handleChange("realname")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                id="name"
                label="手机号码"
                className=""
                value={data.mobile}
                onChange={this.props.handleChange("mobile")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                id="name"
                label="UID"
                className=""
                value={data.uid}
                onChange={this.props.handleChange("uid")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <InputLabel htmlFor="age-simple">是否开户</InputLabel>
                <Select
                  value={data.open_status}
                  onChange={this.props.handleChange("open_status")}
                >
                  <MenuItem value="">全部</MenuItem>
                  <MenuItem value={0}>未开户</MenuItem>
                  <MenuItem value={1}>已开户</MenuItem>
                  <MenuItem value={2}>开户失败</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                id="name"
                label="渠道名称"
                className=""
                value={data.channel}
                onChange={this.props.handleChange("channel")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              {/*<DatePicker*/}
                {/*label="注册时间/开始时间"*/}
                {/*className="fix_select"*/}
                {/*value={data.reg_begin}*/}
                {/*format={new Date(data.reg_begin).Format('yyyy-MM-dd')}*/}
                {/*okLabel="确定"*/}
                {/*cancelLabel="取消"*/}
                {/*onChange={this.props.handleChange("reg_begin")}*/}
                {/*animateYearScrolling={false}*/}
              {/*/>*/}
                <TextField
                    id="date"
                    label="注册时间/开始时间"
                    type="date"
                    value={data.reg_begin || ""}
                    onChange={this.props.handleChange("reg_begin")}
                    className={"fix_select"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={6} sm={3}>
              {/*<DatePicker*/}
                {/*label="注册时间/结束时间"*/}
                {/*className="fix_select"*/}
                {/*value={data.reg_end}*/}
                {/*format={new Date(data.reg_end).Format('yyyy-MM-dd')}*/}
                {/*okLabel="确定"*/}
                {/*cancelLabel="取消"*/}
                {/*onChange={this.props.handleChange("reg_end")}*/}
                {/*animateYearScrolling={false}*/}
              {/*/>*/}
                <TextField
                    id="date"
                    label="注册时间/结束时间"
                    type="date"
                    value={data.reg_end || ""}
                    onChange={this.props.handleChange("reg_end")}
                    className={"fix_select"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <InputLabel htmlFor="age-simple">是否已分配客服</InputLabel>
                <Select
                  value={data.allot_status}
                  onChange={this.props.handleChange("allot_status")}
                >
                    <MenuItem value="">全部</MenuItem>
                    <MenuItem value={0}>未分配</MenuItem>
                    <MenuItem value={1}>已分配</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3} />
            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <Button
                  onClick={() => AssignCustomerService.open({user_ids:selected,queryMethod:'custom/own','commandMethod':'allot/own'})}
                  variant="raised"
                  color="primary"
                  className=""
                >
                  分配客服
                </Button>
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
                  搜索
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <Button
                  onClick={this.props.resetForm}
                  variant="raised"
                  color="primary"
                  className=""
                >
                  重置
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
