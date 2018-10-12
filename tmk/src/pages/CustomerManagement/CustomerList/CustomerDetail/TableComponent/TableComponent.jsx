import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import RecordDetail from '../RecordDetail/RecordDetail';

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

class TableComponent extends React.Component {
  state = {
    page: 0,
    rows: 10
  };
  // enumerate 枚举值过滤
  filterEnumerate = (name, value) => {
    console.info(value)
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
        }else if (value == "9") {
            result = "转让银行受理中";
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

        case "rPlanTenderStatus":
          console.log(value)
            if (value == "0") {
                result = "待处理";
            } else if (value == "1") {
                result = "成功";
            } else if (value == "2") {
                result = "失败";
            }
            break;
        case "bondTenderStatus":
            if (value == "0") {
                result = "失败";
            } else if (value == "1") {
                result = "成功";
            } else if (value == "2") {
                result = "放款成功/还款中";
            } else if (value == "3") {
                result = "已回款";
            }
            break;
        case "singleCollectionStatus":
            if (value == "0") {
                result = "待收";
            } else if (value == "1") {
                result = "已收";
            }
            break;
        case "singleTenderStatus":
            if (value == "0") {
                result = "待处理";
            } else if (value == "1") {
                result = "成功";
            } else if (value == "2") {
                result = "失败";
            }
            break;
        case "raiseInterestPkgStatus":
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
    const { classes, data,currentMethod } = this.props;
    const tableHead = data.labels.map(item => item.value) || [];
    const tableBody = data.items || [];
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
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
                      {n.name === 'control' ?  <Button
                          variant="raised"
                          color="primary"
                          className={classes.button}
                          onClick={() => RecordDetail.open({bigBorrowId:item.bigBorrowId,parentId:item.id,method:currentMethod})}
                      >
                          查看详情
                      </Button> : this.filterEnumerate(n.name, item[n.name])}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={this.props.count}
          rowsPerPage={this.props.rowsPerPage}
          page={Number(this.props.page) - 1}
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
