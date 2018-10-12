import React from "react";
import classNames from "classnames";
// import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from '@material-ui/core/Input';
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    whiteSpace: "nowrap",
    "& tr th": {
      "&:last-child": {
        width: 300,
      }
    },
    "& tr td": {
      "&:last-child": {
        width: 300,
      }
    }
  },
  tableHead: {
    padding: 0
  },
  tableCell: {
    textAlign: "center",
  },
  button: {
    margin: theme.spacing.unit,
    minWidth: 50,
    fontSize: 12,
    minHeight: 20,
    padding: "6px 10px"
  },
  input: {
    display: "none"
  }
});

class TableComponent extends React.Component {
  state = {
    message:'',
    pageCount: 10,
    editingKey: '', // 当前编辑的key值
    isEditing: false, // 是否处于编辑状态
    snackBarStatus: false, // 弹窗提示显示隐藏
    ecMobile: '', // 编辑的ecMobile
  };
  
  // 点击添加按钮
  handleAddEcmobile = (custom_id) => {
      this.setState({
        editingKey: custom_id,
        isEditing: true,
        ecMobile: ''
      });
  };

  // 点击编辑按钮
  handleEditEcmobile = (item) => {
    this.setState({
      editingKey: item.custom_id,
      ecMobile: item.ec_mobile,
      isEditing: true
    });
  };

  // 添加状态下点击保存按钮
  handleAddSaveEcmobile = (custom_id) => {
    const ecMobile = this.state.ecMobile;
    if(ecMobile) {
      const param = {
        ec_mobile: ecMobile,
        custom_id
      }
      this.props.handleEcedit(param).then((success) => {
        this.setState({
          editingKey: '',
          isEditing: false,
          ecMobile: '',
          message: success,
          snackBarStatus: true
        });
      }, rej=>{
        this.setState({
          message: rej,
          snackBarStatus: true
        });
      });
    } else {  // 无内容，回到初始状态
      this.setState({
        editingKey: '',
        isEditing: false,
        ecMobile: '',
      });
    }
  };

  // 编辑状态下点击保存按钮
  handleEditSaveEcmobile = (item) => {
    const ecMobile = this.state.ecMobile;
    const param = {
      ec_mobile: ecMobile == item.ec_mobile? '': ecMobile, // 未修改，直接删除为空，回到初始状态,
      custom_id: item.custom_id
    }
    this.props.handleEcedit(param).then((success) => {
      this.setState({
        editingKey: '',
        isEditing: false,
        ecMobile: '',
        message: success,
        snackBarStatus: true
      });
    }, rej=>{
      this.setState({
        message: rej,
        snackBarStatus: true
      });
    });
  };

  // 修改编辑状态下的ecMobile
  changeEcMobile = (e) => {
    this.setState({ecMobile: e.target.value});
  }

  // 页数
  onChangePage = (event,page) => {
    this.props.onChangePage(page+1)
  };

  // 每页行数
  onChangeRowsPerPage = event => {
    this.setState({
      pageCount: event.target.value
    });
    this.props.onChangePageSize(event.target.value)
  };

  // EC手机号列表项渲染逻辑
  handleEcmobile = (item) => {
    const {
      editingKey,
      isEditing,
    } = this.state;
    const { classes } = this.props;
    if(item.ec_mobile) {
      if(isEditing && item.custom_id === editingKey) {
        return (
          <div>
            <Input
              inputProps={{
                'aria-label': 'Description',
              }}
              defaultValue={item.ec_mobile}
              onChange={(e) => {this.changeEcMobile(e)}}
            />
            <Button
              onClick={()=>this.handleEditSaveEcmobile(item)}
              color="primary"
              className={classes.button}
            >
              保存
            </Button>
          </div>

        )
      } else {
        return (
          <div>
            <span>{item.ec_mobile}</span>
            <Button
              onClick={()=>this.handleEditEcmobile(item)}
              color="primary"
              className={classes.button}
            >
              编辑
            </Button>
          </div>
        )
      }
    } else {
      if(isEditing && item.custom_id === editingKey) {
        return (
          <div>
            <Input
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={(e) => {this.changeEcMobile(e)}}
            />
            <Button
              onClick={()=>this.handleAddSaveEcmobile(item.custom_id)}
              color="primary"
              className={classes.button}
            >
              保存
            </Button>
          </div>
        )
      } else {
          return (
          <Button
            onClick={()=>this.handleAddEcmobile(item.custom_id)}
            color="primary"
            className={classes.button}
          >
            添加
          </Button>
        )
      }

    }
  }

  render() {
    let id = 0;

    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }

    const {
      snackBarStatus,
    } = this.state;
    const { classes, data } = this.props;
    // const data = [
    //   {
    //     realname: "韩梅梅",
    //     custom_id: "1",
    //     mobile: "17755110109",
    //     ec_mobile: "17755110109",
    //     deptname: ""
    //   },
    //   {
    //     realname: "小明",
    //     custom_id: "2",
    //     mobile: "11111111111",
    //     ec_mobile: "11111111111",
    //     deptname: ""
    //   },
    //   {
    //     realname: "小宇",
    //     custom_id: "3",
    //     mobile: "22222222222",
    //     ec_mobile: "",
    //     deptname: ""
    //   },
    // ]
    const columnData = [
      { id: "realname", numeric: true, disablePadding: false, label: "姓名" },
      { id: "deptname", numeric: true, disablePadding: false, label: "角色" },
      { id: "mobile", numeric: true, disablePadding: false, label: "统一平台手机号" },
      { id: "ec_mobile", numeric: true, disablePadding: false, label: "EC手机号" },
    ];
    return (
      <Paper className="table_component">
        <div className="table_wrapper">
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {columnData.map(column => {
                  return (
                    <TableCell
                      key={column.id}
                      numeric={column.numeric}
                      padding="none"
                      className={classes.tableCell}
                    >
                      {column.label}
                    </TableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(n => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={n.custom_id}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      className={classes.tableCell}
                    >
                      {n.realname}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.deptname}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.mobile}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {this.handleEcmobile(n)}
                      
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.props.count}
          rowsPerPage={this.props.rowsPerPage}
          page={Number(this.props.page) -1}
          labelRowsPerPage="每页行数"
          backIconButtonProps={{
            "aria-label": "上一页"
          }}
          nextIconButtonProps={{
            "aria-label": "下一页"
          }}
          onChangePage={this.onChangePage}
          onChangeRowsPerPage={this.onChangeRowsPerPage}
        />

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackBarStatus}
          autoHideDuration={2000}
          onClose={() => this.setState({ snackBarStatus: false })}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.state.message}
            </span>
          }
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TableComponent);
