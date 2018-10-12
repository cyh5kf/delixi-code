import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import * as config from "./recordDetailConfig";
import './RecordDetail.less';
import LoadingBar from 'components/LoadingBar/LoadingBar';
import {userManager} from "api/restApi";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        whiteSpace: "nowrap",
        minWidth: "700"
    }
});

let recordDetail;
class RecordDetail extends React.Component {
    state = {
        open:false,
        page: 0,
        rows: 10,
        userInfo: {},
        accountInfo: {},
        data: config.data,
        currentMethod:'',
        status:'',
        pagination: {
            currentPage: 1,
            pageSize: 10,
            pageCount: 0,
            rows: 0
        }
    };

    componentWillMount(){
        recordDetail=this;
    }
    static open=(params)=>{
        console.info(params)
        recordDetail.setState({open:true,parentId:params.parentId,bigBorrowId:params.bigBorrowId,currentMethod:params.method},()=>recordDetail.findRecordDetail(params.method,{}))
    };
    close=()=>{
        recordDetail.setState({open:false})
    };

    //账户详情
    findRecordDetail = (key, params) => {
        let userId = this.props.match.params.id;
        let method = config.data[key || 0].method;
        const {currentMethod,bigBorrowId,parentId} = this.state;
        let query = {
            userId,
            bigBorrowId,
            parentId,
            currentPage: (params && params.currentPage) ? params.currentPage : this.state.pagination.currentPage,
            pageSize: (params && params.pageSize) ? params.pageSize : this.state.pagination.pageSize
        };
        LoadingBar.open();
        userManager.queryPHP(method, query).then(res => {
            let currentData = config.data[key || 0];
            currentData.items = res.data.list;
            this.setState({
                value: key || 0,
                data: currentData,
                parentMethod:key,
                currentMethod:method,
                pagination: Object.assign(this.state.pagination, res.data.pagination)
            },LoadingBar.close);
        },()=>LoadingBar.close());
    };
    // enumerate 枚举值过滤
    filterEnumerate = (name, value) => {
        console.info(name,value)
        let result;
        switch (name) {
            case "cgOpenAccountStatus":
                if (value == "1") {
                    result = "已开户";
                } else if (value == "2") {
                    result = "开户失败";
                }
                break;

            case "borrowTimeType":
                if (value == "0") {
                    result = "月标";
                } else if (value == "1") {
                    result = "天标";
                }
                break;

            case "rPlanCollectionStatus":
                if (value == "0") {
                    result = "待收";
                } else if (value == "1") {
                    result = "已收";
                }
                break;
            case "bondType":
                if (value == "0") {
                    result = "投资转让";
                } else if (value == "1") {
                    result = "债权再转让";
                }
                break;

            case "awardType":
                if (value == "1") {
                    result = "红包";
                } else if (value == "2") {
                    result = "加息券";
                }
                break;

            case "bondStatus":
                if (value == "0") {
                    result = "发布";
                } else if (value == "1") {
                    result = "初审通过";
                } else if (value == "2") {
                    result = "初审不通过";
                } else if (value == "3") {
                    result = "转让完成";
                } else if (value == "4") {
                    result = "自动撤回";
                } else if (value == "5") {
                    result = "后台撤回";
                } else if (value == "6") {
                    result = "用户撤回";
                } else if (value == "7") {
                    result = "募集完成";
                }
                break;

            case "rechargeStatus":
                if (value == "0") {
                    result = "创建";
                } else if (value == "1") {
                    result = "充值成功";
                } else if (value == "2") {
                    result = "充值失败";
                } else if (value == "3") {
                    result = "处理中";
                }
                break;

            case "raiseInterestPkg":
                if (value == "0") {
                    result = "可使用";
                } else if (value == "1") {
                    result = "已使用";
                } else if (value == "2") {
                    result = "未启用";
                } else if (value == "3") {
                    result = "已过期";
                } else if (value == "6") {
                    result = "审核中";
                } else if (value == "7") {
                    result = "未激活";
                }

                break;

            case "borrowTimeType":
                if (value == "0") {
                    result = "投资转让";
                } else if (value == "1") {
                    result = "债权再转让";
                }
                break;

            case "cashStatus":
                if (value == "0") {
                    result = "申请提现";
                } else if (value == "1") {
                    result = "成功";
                } else if (value == "2") {
                    result = "失败";
                } else if (value == "3") {
                    result = "审核通过";
                } else if (value == "4") {
                    result = "审核失败";
                } else if (value == "5") {
                    result = "已经提交到三方 ";
                } else if (value == "6") {
                    result = "用户自行取消 ";
                }
                break;

            case "redPkgType":
                if (value == "1") {
                    result = "现金红包";
                } else if (value == "2") {
                    result = "虚拟红包";
                }
                break;

            case "redPkgStatus":
                if (value == "0") {
                    result = "可使用";
                } else if (value == "1") {
                    result = "已使用";
                } else if (value == "2") {
                    result = "未启用";
                } else if (value == "3") {
                    result = "已过期";
                } else if (value == "4") {
                    result = "本地执行失败";
                } else if (value == "5") {
                    result = "北京银行执行失败";
                } else if (value == "6") {
                    result = "审核中 ";
                } else if (value == "7") {
                    result = "未激活/待激活 ";
                }
                break;

            case "communicationType":
                if (value == "1") {
                    result = "电话沟通";
                } else if (value == "2") {
                    result = "微信沟通";
                } else if (value === "3") {
                    result = "QQ沟通";
                } else if (value === "4") {
                    result = "UDESK沟通";
                }
                break;

            case "cgBindStatus":
                if (value === "0") {
                    result = "未绑定";
                } else if (value === "1") {
                    result = "已绑定";
                } else if (value === "2") {
                    result = "绑定处理中";
                } else if (value === "3") {
                    result = "绑定失败";
                } else if (value === "4") {
                    result = "已解绑";
                }
                break;

            case "masterCard":
                if (value == "0") {
                    result = "主卡";
                } else if (value == "1") {
                    result = "非主卡";
                }
                break;

            case "rechargeType":
                if (value == "1") {
                    result = "快捷充值";
                } else if (value == "2") {
                    result = "网银充值";
                }
                break;
            case "cashingStatus":
                if (value == "0") {
                    result = "待收";
                } else if (value == "1") {
                    result = "已收";
                }
                break;
            case "status":
                if (value == "0") {
                    result = "待收";
                } else if (value == "1") {
                    result = "已收";
                }
                break;

            default:
                result = value;
        }
        if(value == "0000-00-00 00:00:00"){
            result = "";
          }
        return result;
    };

    onChangePage = (event, page) => {
        this.props.onChangePage(page + 1);
    };

    onChangeRowsPerPage = event => {
        this.props.onChangePageSize(event.target.value);
    };

    render() {
        const { classes,key } = this.props;
        const {parentMethod,currentMethod} = this.state;
        let data = this.state.data;
        const tableHead = parentMethod ? data.labels.map(item => item.value) : [];
        const tableBody = parentMethod ? data.items : [];
        return (
            <Dialog
                open={this.state.open}
                onBackdropClick={this.close}
                className={"recordDetail"}>
                <DialogContent className={"dialogContent"}>
                    <Paper className={"paper"}>
                        <Table className={"table"}>
                            <TableHead>
                                <TableRow>
                                    {tableHead.map((item, key) => (
                                        <TableCell key={key}>{item}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableBody.map((item, key) => {
                                    return (
                                        <TableRow key={key}>
                                            {data.labels.map((n, k) => (
                                                <TableCell key={k} component="td" scope="row">
                                                    {this.filterEnumerate(n.name, item[n.name])}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {/*<TablePagination*/}
                            {/*component="div"*/}
                            {/*count={this.props.count}*/}
                            {/*rowsPerPage={this.props.rowsPerPage}*/}
                            {/*page={Number(this.props.page) - 1}*/}
                            {/*labelRowsPerPage="每页行数"*/}
                            {/*backIconButtonProps={{*/}
                                {/*"aria-label": "上一页"*/}
                            {/*}}*/}
                            {/*nextIconButtonProps={{*/}
                                {/*"aria-label": "下一页"*/}
                            {/*}}*/}
                            {/*onChangePage={this.onChangePage}*/}
                            {/*onChangeRowsPerPage={this.onChangeRowsPerPage}*/}
                        {/*/>*/}
                    </Paper>
                </DialogContent>
            </Dialog>
        );
    }
}

export default RecordDetail;
