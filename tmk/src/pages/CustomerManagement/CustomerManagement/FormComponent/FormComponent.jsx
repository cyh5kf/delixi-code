import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";;
// import { DatePicker } from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import AssignCustomerService from "components/AssignCustomerService/AssignCustomerService";

import { getParameter } from "utils";

class FormComponent extends React.Component {

  render() {
    const { data,selected } = this.props;
    return (
      <div>
        <form action="">
          <Grid container spacing={24}>
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
                label="最新分配客服"
                className=""
                value={data.customer}
                onChange={this.props.handleChange("customer")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
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
                <InputLabel htmlFor="age-simple">是否投资</InputLabel>
                <Select
                  value={data.tender_status}
                  onChange={this.props.handleChange("tender_status")}
                >
                  <MenuItem value={""}>
                    <em>全部</em>
                  </MenuItem>
                  <MenuItem value={1}>是</MenuItem>
                  <MenuItem value={0}>否</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <InputLabel htmlFor="age-simple">来源</InputLabel>
                <Select
                  value={data.source}
                  onChange={this.props.handleChange("source")}
                >
                  <MenuItem value={0}>
                    <em>全部</em>
                  </MenuItem>
                  <MenuItem value={1}>电销划出</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <InputLabel htmlFor="age-simple">去向</InputLabel>
                <Select
                  value={data.gone}
                  onChange={this.props.handleChange("gone")}
                >
                  <MenuItem value="">
                    <em>全部</em>
                  </MenuItem>
                  <MenuItem value={1}>电销管理</MenuItem>
                  <MenuItem value={2}>专属客服管理</MenuItem>
                  <MenuItem value={3}>Vip客服</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
                <TextField
                    id="date"
                    label="变动时间/开始时间"
                    type="date"
                    value={data.update_begin || ""}
                    onChange={this.props.handleChange("update_begin")}
                    className={"fix_select"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={6} sm={3}>
                <TextField
                    id="date"
                    label="变动时间/结束时间"
                    type="date"
                    value={data.update_end || ""}
                    onChange={this.props.handleChange("update_end")}
                    className={"fix_select"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <Grid item xs={6} sm={3} />
            <Grid item xs={6} sm={3}>
              <FormControl className="fix_select">
                <Button
                  onClick={() => AssignCustomerService.open({user_ids:selected,queryMethod:'custom/vip','commandMethod':'allot/vip'})}
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
