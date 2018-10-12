import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableHead: {
    padding: 0
  },
  tableCell: {
    textAlign: "center"
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
  constructor(props) {
    super(props);
    this.state = {
      order: "",
      orderBy: "",
      data: [],
      numSelected: "",
      open: false,
      snackBarStatus: false
    };
  }

  isSelected = () => {
    return false;
  };

  handleClick = () => {};

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleResetPassword = () => {
    this.props.resetPassword().then(() => {
      this.setState({
        open: false,
        snackBarStatus: true
      });
    });
  };

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

  render() {
    let id = 0;

    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }

    const {
      snackBarStatus,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      numSelected,
      rowCount
    } = this.state;
    const { data, classes } = this.props;
    const columnData = [
      { id: "uid", numeric: false, disablePadding: true, label: "序号" },
      { id: "tel", numeric: true, disablePadding: false, label: "所属客服" },
      { id: "name", numeric: true, disablePadding: false, label: "投资金额" },
      {
        id: "registrationTime",
        numeric: true,
        disablePadding: false,
        label: "年化投资额"
      },
      // { id: "status", numeric: true, disablePadding: false, label: "历史代收" },
      {
        id: "lastLoginTime",
        numeric: true,
        disablePadding: false,
        label: "实时待收"
      },
      {
        id: "affiliatedChannels",
        numeric: true,
        disablePadding: false,
        label: "客户数"
      }
    ];
    return (
      <Paper className="table_component">
        <div className="table_wrapper">
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {columnData.map((column,key) => {
                  return (
                    <TableCell
                      key={key}
                      numeric={column.numeric}
                      padding="none"
                      className={classes.tableCell}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      {column.label}
                    </TableCell>
                  );
                }, this)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((n,key) => {
                const isSelected = this.isSelected(n.csId);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={key}
                    selected={isSelected}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      className={classes.tableCell}
                    >
                      {n.csId}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.csName}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.tenderMoney}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.tenderYearMoney}
                    </TableCell>
                    {/*<TableCell*/}
                      {/*padding="none"*/}
                      {/*className={classes.tableCell}*/}
                      {/*numeric*/}
                    {/*>*/}
                      {/*{n.repaymentAmount}*/}
                    {/*</TableCell>*/}
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.repaymentAmountRealTime}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.userCount}
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

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              确认重置该账户的登录密码
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              取消
            </Button>
            <Button
              onClick={this.handleResetPassword}
              color="primary"
              autoFocus
            >
              确认
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackBarStatus}
          onClose={() => this.setState({ snackBarStatus: false })}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              重置登录密码成功，请及时查收短信获取密码
            </span>
          }
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TableComponent);
