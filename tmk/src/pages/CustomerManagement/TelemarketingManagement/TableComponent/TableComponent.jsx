import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableHead: {
        padding: 0
    },
    tableCell: {
        textAlign:'center'
    },
    button: {
        margin: theme.spacing.unit,
        minWidth:50,
        fontSize:12,
        minHeight: 20,
        padding: '6px 10px'
    },
    input: {
        display: 'none',
    }
});

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: '',
            orderBy: '',
            data: [],
            numSelected: '',
            open: false,
            snackBarStatus: false,
            selected:[]
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
    }

    isSelected = id => this.props.selected.indexOf(id) !== -1;

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleResetPassword = ()=>{
        this.props.resetPassword().then(()=>{
            this.setState({
                open: false,
                snackBarStatus: true
            })
        })
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
        const {snackBarStatus, order, orderBy, selected, rowsPerPage, page, numSelected, rowCount} = this.state;
        const {data, classes} = this.props;
        const columnData = [
            {id: 'uid', numeric: false, disablePadding: true, label: 'UID'},
            {id: 'tel', numeric: true, disablePadding: false, label: '手机号码'},
            {id: 'name', numeric: true, disablePadding: false, label: '客户名称'},
            {id: 'registrationTime', numeric: true, disablePadding: false, label: '注册时间'},
            {id: 'status', numeric: true, disablePadding: false, label: '状态'},
            {id: 'lastLoginTime', numeric: true, disablePadding: false, label: '最后登录时间'},
            {id: 'affiliatedChannels', numeric: true, disablePadding: false, label: '所属渠道'},
            {id: 'customer', numeric: true, disablePadding: false, label: '最新客服'},
            {id: 'lastAllocation', numeric: true, disablePadding: false, label: '最新分配时间'}
        ];
        return (
            <Paper className="table_component">
                <div className="table_wrapper">
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={data.length === this.props.selected.length}
                                        onChange={this.props.handleSelectAllClick}
                                    />
                                </TableCell>
                                {columnData.map(column => {
                                    return (
                                        <TableCell
                                            key={column.id}
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
                            {data.map(n => {
                                const isSelected = this.isSelected(n.uid);
                                return (
                                    <TableRow
                                        hover
                                        onClick={event => this.props.handleClick(event, n.uid)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.uid}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected}/>
                                        </TableCell>
                                        <TableCell
                      component="th"
                      scope="row"
                      padding="none"
                      className={classes.tableCell}
                    >
                      {n.uid}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      <Tooltip
                        id={n.uid}
                        placement="top"
                        title={`${n.mobile}  【点击可以复制】`}
                      >
                         <div onClick={()=>this.copyTel(n.mobile)}>{n.mobile ? n.mobile.desensitizationByTel() : ''}</div>
                      </Tooltip>
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
                      {n.reg_date}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.auth_status_name}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.login_date}
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
                      {n.customer}
                    </TableCell>
                    <TableCell
                      padding="none"
                      className={classes.tableCell}
                      numeric
                    >
                      {n.allot_date}
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
                        <Button onClick={this.handleResetPassword} color="primary" autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={snackBarStatus}
                    onClose={()=>this.setState({snackBarStatus: false})}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">重置登录密码成功，请及时查收短信获取密码</span>}
                />
            </Paper>
        )
    }
}

export default withStyles(styles)(TableComponent);
