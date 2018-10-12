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
    let id = 0;

    function createData(name, calories, fat, carbs, protein) {
      id += 1;
      return { id, name, calories, fat, carbs, protein };
    }

    const {
      order,
      orderBy,
    } = this.state;
    const { data, classes } = this.props;
    const columnData = [
      { id: "uid", numeric: true, disablePadding: false, label: "UID" },
      { id: "mobile", numeric: true, disablePadding: false, label: "手机号码" },
      { id: "realname", numeric: true, disablePadding: false, label: "客户名称" },
      { id: "channel", numeric: true, disablePadding: false, label: "所属渠道" },
      { id: "collection", numeric: true, disablePadding: false, label: "当前待收" },
      { id: "balance", numeric: true, disablePadding: false, label: "账户余额" },
      { id: "customer", numeric: true, disablePadding: false, label: "所属客服" },
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
                      {n.uid}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {
                        n.mobile && (
                          <Tooltip title={n.mobile} placement="right">
                            {this.phoneFormat(n.mobile)}
                          </Tooltip>
                        )
                      }
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.realname}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.channel}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.collection}
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
                      {n.customer}
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
