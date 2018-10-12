import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from '@material-ui/core/Tooltip';

import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1700
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
    };
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

  phoneFormat = (mobile) => {
    if(!mobile) {
      return false;
    }
    return <span>{mobile.substring(0,3)+"****"+mobile.substring(8,11)}</span>;
  }

  render() {

    const {
      order,
      orderBy,
    } = this.state;
    const { data, classes } = this.props;
    const columnData = [
      { id: "userId", numeric: true, disablePadding: false, label: "ID" },
      { id: "realName", numeric: true, disablePadding: false, label: "姓名" },
      { id: "cashMoneyNow", numeric: true, disablePadding: false, label: "提现金额" },
      { id: "cashCountNow", numeric: true, disablePadding: false, label: "提现次数" },
      { id: "balance", numeric: true, disablePadding: false, label: "站岗金额" },
      { id: "regMobile", numeric: true, disablePadding: false, label: "手机号码" },
      { id: "regTime", numeric: true, disablePadding: false, label: "注册时间" },
      { id: "registSourceType", numeric: true, disablePadding: false, label: "渠道来源" },
      { id: "tenderMoney", numeric: true, disablePadding: false, label: "投资总金额" },
      { id: "tenderCount", numeric: true, disablePadding: false, label: "投资总次数" },
      { id: "cashMoney", numeric: true, disablePadding: false, label: "提现总金额" },
      { id: "cashCount", numeric: true, disablePadding: false, label: "提现总次数" },
      { id: "repaymentAmount", numeric: true, disablePadding: false, label: "待收总金额" },
      { id: "firstTenderTime", numeric: true, disablePadding: false, label: "首投时间" },
      { id: "lastCashTime", numeric: true, disablePadding: false, label: "最近一次提现时间" },
      { id: "location", numeric: true, disablePadding: false, label: "地区" },
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
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={key}
                  >
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.userId}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.realName}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.cashMoneyNow}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.cashCountNow}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.balance}
                    </TableCell>

                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {
                        n.regMobile && (
                          <Tooltip title={n.regMobile} placement="right">
                            {this.phoneFormat(n.regMobile)}
                          </Tooltip>
                        )
                      }
                    </TableCell>

                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.regTime}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.registSourceType==0?'pc':n.registSourceType==1?'wap':n.registSourceType==2?'IOS':n.registSourceType==3?'android':'未知来源'}
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
                      {n.tenderCount}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.cashMoney}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.cashCount}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.repaymentAmount}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.firstTenderTime}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.lastCashTime}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.location}
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
      </Paper>
    );
  }
}

export default withStyles(styles)(TableComponent);
