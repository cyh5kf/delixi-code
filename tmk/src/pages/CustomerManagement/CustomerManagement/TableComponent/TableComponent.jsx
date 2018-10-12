import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

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
class TableComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            order:'',
            orderBy:'',
            snackBarStatus:false,
            message:'',
            data:[],
            numSelected:''
        }
    }

    copyTel=(tel)=>{
        var aux = document.createElement("input");

        // 获得需要复制的内容
        aux.setAttribute("value", tel);

        // 添加到 DOM 元素中
        document.body.appendChild(aux);

        // 执行选中
        // 注意: 只有 input 和 textarea 可以执行 select() 方法.
        aux.select();

        // 获得选中的内容
          var content = window.getSelection().toString();

        // 执行复制命令
        document.execCommand("copy");

        // 将 input 元素移除
        document.body.removeChild(aux);
        this.setState({
          snackBarStatus:true,
          message:'已经复制到剪切板'
        })
      }

  isSelected = id => this.props.selected.indexOf(id) !== -1;


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
    render(){
        const { data, classes } = this.props;

        let id = 0;
        function createData(name, calories, fat, carbs, protein) {
            id += 1;
            return { id, name, calories, fat, carbs, protein };
        }
        const { order, orderBy } = this.state;
        const columnData = [
            { id: 'uid', numeric: false, disablePadding: true, label: 'UID' },
            { id: 'mobile', numeric: true, disablePadding: false, label: '手机号码' },
            { id: 'realname', numeric: true, disablePadding: false, label: '客户名称' },
            { id: 'reg_date', numeric: true, disablePadding: false, label: '注册时间' },
            { id: 'tender_status', numeric: true, disablePadding: false, label: '是否投资' },
            { id: 'protein2', numeric: true, disablePadding: false, label: '状态' },
            { id: 'login_date', numeric: true, disablePadding: false, label: '最后登录时间' },
            { id: 'customer', numeric: true, disablePadding: false, label: '最后分配客服' },
            { id: 'allot_date', numeric: true, disablePadding: false, label: '最新分配时间' },
            { id: 'source', numeric: true, disablePadding: false, label: '来源' },
            { id: 'gone', numeric: true, disablePadding: false, label: '去向' },
            { id: 'update_date', numeric: true, disablePadding: false, label: '变动时间' },
            { id: 'control', numeric: true, disablePadding: false, label: '查看' }
        ];
        return(
            <Paper className="table_component">
                <div className="table_wrapper">
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"  className={classes.tableCell}>
                                    <Checkbox
                                        checked={data.length === this.props.selected.length}
                                        onChange={this.props.handleSelectAllClick}
                                    />
                                </TableCell>
                                {columnData.map(column => {
                                    return (
                                        <TableCell
                                            className={classes.tableCell}
                                            key={column.id}
                                            padding="none"
                                            sortDirection={orderBy === column.id ? order : false}
                                        >
                                            {column.label}
                                        </TableCell>
                                    );
                                }, this)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((n,k) => {
                                const isSelected = this.isSelected(n.uid);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.props.handleClick(event, n.uid)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={k}
                                        selected={isSelected}
                                    >
                                        <TableCell  className={classes.tableCell} padding="checkbox">
                                            <Checkbox checked={isSelected} />
                                        </TableCell>
                                        <TableCell  className={classes.tableCell} padding="none">{n.uid}</TableCell>
                                        <TableCell  className={classes.tableCell} padding="none">
                                        <Tooltip
                                            id={n.uid}
                                            placement="top"
                                            title={`${n.mobile}  【点击可以复制】`}
                                        >
                                            <div onClick={()=>this.copyTel(n.mobile)}>{n.mobile ? n.mobile.desensitizationByTel() : ''}</div>
                                        </Tooltip>
                                        </TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.realname}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.reg_date}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.tender_status}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.auth_status_name}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.login_date}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.customer}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.allot_date}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.source}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.gone}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none">{n.update_date}</TableCell>
                                        <TableCell className={classes.tableCell} padding="none"><Button
                                            variant="raised"
                                            color="primary"
                                            className={classes.button}
                                            onClick={() =>
                                                this.props.history.push(
                                                    `/view/customerManagement/customerDetail/${n.uid}`
                                                )
                                            }
                                        >
                                            查看详情
                                        </Button></TableCell>
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
                    open={this.state.snackBarStatus}
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
        )
    }
}

export default withStyles(styles)(TableComponent);
