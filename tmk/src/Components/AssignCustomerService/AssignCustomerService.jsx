import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {withStyles} from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import "../../styles/AssignCustomerService/assignCustomerService.less";

import {adminManager} from "api/restApi";

const styles = theme => ({
    root: {
        width: "100%",
        maxWidth: 900,
        backgroundColor: theme.palette.background.paper
    },
    dialog: {
        width: "80%",
        maxHeight: 600,
        maxWidth: 800
    },
    table: {
        minWidth: 700,
        "& tr th": {
            "&:nth-of-type(1)": {
                maxWidth: 30
            }
        },
        "& tr td": {
            "&:nth-of-type(1)": {
                maxWidth: 30
            }
        }
    },
    tableHead: {
        padding: 0
    },
    tableBody: {
        tr: {
            "& td:nth-of-type(1)": {
                width: 30
            }
        }
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
let assignCustomerService;

class AssignCustomerService extends React.Component {
    state = {
        open: false,
        name: "",
        selected: [],
        data: [],
        openSnackbar:false,
        snackbarMsg: ''
    };

    componentWillMount() {
        assignCustomerService = this;
    }

    handleSelectAllClick = (event, checked) => {
        const {data} = this.state;
        if (checked) {
            this.setState({selected: data.map(n => n.custom_id)});
            return;
        }
        this.setState({selected: []});
    };

    isSelected = id => {
        return this.state.selected.indexOf(id) !== -1;
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected.push(id)
        } else {
            newSelected = []
        }
        this.setState({selected: newSelected});
    };

    // 查找客服列表
    findCustomList = () => {
        let params = {
            realname: this.state.name
        }
        adminManager.commandPHP(this.state.queryMethod, params).then(res => {
            this.setState({
                data: res.data
            });
        });
    };

    // 重置
    resetForm = () => {
        this.setState({
            name: ""
        },this.findCustomList);
    };

    handleChange = name => e => {
        this.setState({
            [name]: e.target.value
        });
    };

    static open = (params) => {
        let user_ids = params.user_ids;
        let queryMethod = params.queryMethod;
        let commandMethod = params.commandMethod;

        assignCustomerService.setState({
            open: true,
            user_ids,
            queryMethod,
            commandMethod
        }, assignCustomerService.findCustomList)
    };

    static close = () => {
        assignCustomerService.setState({
            open: false
        });
    };

    // 分配客服
    allotCustomeService = () => {
        let params = {
            user_ids: this.state.user_ids.toString(),
            custom_id: this.state.selected.toString()
        }
        let _this = this;
        adminManager.commandPHP(this.state.commandMethod, params).then(res => {
            if (res.error_code === 0) {
                _this.setState({openSnackbar: true, snackbarMsg: "分配成功",open:false})
            } else {
                _this.setState({openSnackbar: true, snackbarMsg: res.msg,open:false})
            }
        },err=>{
            _this.setState({openSnackbar: true, snackbarMsg: err.msg,open:false})
        });
    };

    render() {
        const {open, data, openSnackbar, snackbarMsg} = this.state;
        const {classes} = this.props;
        const columnData = [
            {id: "uid", numeric: false, disablePadding: true, label: "id"},
            {id: "tel", numeric: true, disablePadding: false, label: "客服名称"},
            {id: "name", numeric: true, disablePadding: false, label: "部门"}
        ];
        return (
            <div className="assign_customer_service">
                <Snackbar
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    autoHideDuration={2000}
                    open={openSnackbar}
                    onClose={()=>this.setState({openSnackbar:false})}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackbarMsg}</span>}
                />
                <Dialog
                    classes={{
                        paper: classes.dialog
                    }}
                    open={open}
                    onClose={assignCustomerService.close}
                >
                    <DialogTitle id="alert-dialog-title">{"分配客服"}</DialogTitle>
                    <DialogContent>
                        <form action="">
                            <Grid container spacing={24} alignItems="center">
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="name"
                                        label="客服名称"
                                        className=""
                                        fullWidth
                                        value={this.state.name}
                                        onChange={this.handleChange("name")}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item xs={4} sm={2}>
                                    <FormControl className="fix_select">
                                        <Button
                                            onClick={this.findCustomList}
                                            variant="raised"
                                            color="primary"
                                            className=""
                                        >
                                            搜索
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} sm={2}>
                                    <FormControl className="fix_select">
                                        <Button
                                            onClick={this.resetForm}
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
                        <div>
                            <Paper className="table_component">
                                <div className={classes.root}>
                                    <Table className={classes.table} aria-labelledby="tableTitle">
                                        <TableHead className={classes.tableBody}>
                                            <TableRow>
                                                <TableCell padding="checkbox">

                                                </TableCell>
                                                {columnData.map((column, k) => {
                                                    return (
                                                        <TableCell
                                                            key={k}
                                                            padding="none"
                                                            className={classes.tableCell}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    );
                                                }, this)}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className={classes.tableBody}>
                                            {data.map((n, i) => {
                                                const isSelected = this.isSelected(n.custom_id);
                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={event => this.handleClick(event, n.custom_id)}
                                                        role="checkbox"
                                                        aria-checked={isSelected}
                                                        tabIndex={-1}
                                                        key={i}
                                                        selected={isSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox checked={isSelected}/>
                                                        </TableCell>
                                                        <TableCell
                                                            padding="none"
                                                            className={classes.tableCell}
                                                        >
                                                            {n.custom_id}
                                                        </TableCell>
                                                        <TableCell
                                                            padding="none"
                                                            className={classes.tableCell}
                                                        >
                                                            {n.realname}
                                                        </TableCell>
                                                        <TableCell
                                                            padding="none"
                                                            className={classes.tableCell}
                                                        >
                                                            {n.deptname}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </Paper>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={AssignCustomerService.close}
                            variant="raised"
                            color="primary"
                            className=""
                        >
                            取消
                        </Button>
                        <Button
                            onClick={this.allotCustomeService}
                            variant="raised"
                            color="primary"
                            className=""
                        >
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AssignCustomerService);
