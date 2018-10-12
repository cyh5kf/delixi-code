import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TableComponent from "./TableComponent/TableComponent";

import {userManager} from "api/restApi";
import {data as config} from "./accountInfoConfig";

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import LoadingBar from 'components/LoadingBar/LoadingBar';

import RecordDetail from './RecordDetail/RecordDetail';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3
    }),
    bottomNavigation:{
      // width:500,
        justifyContent: 'flex-start',
        marginTop:10,
    },
    bottomNavigationAction:{
        // background:'red',
        '& span span':{
            background: '#ddd',
            padding: 5,
            borderRadius: 10,
            width: 120,
            height: 25,
            display: 'flex',
            justifyContent:'center',
            alignItems:'center'
        }
    },
    gridRow: {
        height: 40
    }
});

function TabContainer(props) {
    return <Typography component="div">{props.children}</Typography>;
}

// 表格二级选项

class SecondTab extends React.Component{
    state = {
        value:'',
        rPlanTenderList:[{status:1,label:'投标成功'},{status:2,label:'投标失败'},{status:"",label:'全部'}],
        singleTenderList:[{status:0,label:'投标待处理'},{status:1,label:'投标成功'},{status:2,label:'投标失败'},{status:"",label:'全部'}],
        rPlanCollectionList:[{status:0,label:'待收'},{status:1,label:'已收'},{status:"",label:'全部'}],
        raiseInterestPkgList:[{status:0,label:'可使用'},{status:1,label:'已使用'},{status:2,label:'未启用'},{status:3,label:'已过期'},{status:6,label:'审核中'},{status:7,label:'未激活'},{status:"",label:'全部'}],
        singleCollectionList:[{status:0,label:'待收'},{status:1,label:'已收'},{status:"",label:'全部'}],
        redPkgList:[{status:0,label:'可使用'},{status:1,label:'已使用'},{status:2,label:'未启用'},{status:3,label:'已过期'},{status:'',label:'全部'}]
    }
    handleChange = (event, value) => {
        this.setState({ value },()=>this.props.onChange(value));
    };
    render(){
        let label = this.props.label;
        const { classes } = this.props;
        const {value} = this.state;
        return (
            this.state[label] ? <BottomNavigation
                value={value}
                showLabels
                onChange={this.handleChange}
                className={classes.bottomNavigation}
            >
                {this.state[label].map((item,key)=><BottomNavigationAction key={key} value={item.status} label={item.label} className={classes.bottomNavigationAction}/>)}
            </BottomNavigation> : null
        )
    }
}


class CustomerDetail extends React.Component {
    state = {
        value: 0,
        userInfo: {},
        accountInfo: {},
        data: config[0],
        currentMethod:'',
        status:'',
        pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 0,
            rows: 0
        }
    };

    componentWillMount() {
        this.findUserInfo()
            .then(this.findAccountInfo)
            .then(this.findAccountDetail);
    }

    componentWillReceiveProps(nextPro){
        console.log(nextPro)
    }

    // 客户信息
    findUserInfo = () => {
        let userId = this.props.match.params.id;
        LoadingBar.open();
        return userManager.queryPHP("info", {userId}).then(
            res => {
                this.setState({
                    userInfo: res.data
                },LoadingBar.close);
            },
            rej => {
                LoadingBar.close()
                return rej;
            }
        );
    };

    // 资金账户信息
    findAccountInfo = () => {
        let userId = this.props.match.params.id;
        LoadingBar.open();
        return userManager.queryPHP("accountInfo", {userId}).then(res => {
            this.setState({
                accountInfo: res.data
            },LoadingBar.close);
        },LoadingBar.close);
    };

    //账户详情
    findAccountDetail = (key, params) => {
        let userId = this.props.match.params.id;
        let method = config[key || 0].method;
        const {status,currentMethod} = this.state;
        let query = {
            userId,
            status,
            page: (params && params.currentPage) ? params.currentPage : this.state.pagination.page,
            pageSize: (params && params.pageSize) ? params.pageSize : this.state.pagination.pageSize
        };
        LoadingBar.open();
        userManager.queryPHP(method, query).then(res => {
            let currentData = config[key || 0];
            currentData.items = res.data.list;
            this.setState({
                value: key || 0,
                data: currentData,
                currentMethod:method,
                pagination: Object.assign(this.state.pagination, res.data.pagination)
            },LoadingBar.close);
        },LoadingBar.close);
    };

    handleChange = (event, key) => {
        if(key !== this.state.value){
            this.findAccountDetail(key,{currentPage:1});
        } else {
            this.findAccountDetail(key);
        }

    };
    // 分页
    onChangePage = (currentPage) => {
        this.setState({
            pagination: Object.assign(this.state.pagination, {page:currentPage})
        }, () => this.findAccountDetail(this.state.value, {page:currentPage}))
    }

    // 显示行数
    onChangePageSize = (pageSize) => {
        this.setState({
            pagination: Object.assign(this.state.pagination, {pageSize})
        }, () => this.findAccountDetail(this.state.value, {page: 1, pageSize}))
    }

    // 表格二级状态
    onChangeStatus =(status)=>{
        this.setState({status,pagination:{page: 1,
                pageSize: 10,
                pageCount: 0,
                rows: 0}},()=>this.findAccountDetail(this.state.value))
    }

    render() {
        const {classes} = this.props;
        const {userInfo, accountInfo, value, pagination,currentMethod} = this.state;
        return (
            <div>
                <RecordDetail {...this.props} />
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        客户信息
                    </Typography>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>客户姓名：</span>
                                <span>{userInfo.realName}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>开户状态：</span>
                                <span>
                  {userInfo.cgOpenAccountStatus === "1"
                      ? "已开户"
                      : userInfo.cgOpenAccountStatus === "2"
                          ? "开户失败"
                          : "未开户"}
                </span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>身份证号：</span>
                                <span>{userInfo.cardId}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>银行卡号：</span>
                                <span>{userInfo.bankNo}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>开户时间：</span>
                                <span>{userInfo.cgOpenAccountTime}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>最近登录时间：</span>
                                <span>{userInfo.loginTime}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>注册时间：</span>
                                <span>{userInfo.createTime}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>申请端：</span>
                                <span>{
                                    userInfo.registSourceType === "0" ?
                                        "pc" : (
                                            userInfo.registSourceType === "1" ?
                                                "wap" : (userInfo.registSourceType === "2" ? "ios" : (
                                                    userInfo.registSourceType === "3" ? "android" : ""
                                                ))
                                        )}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>所属客服：</span>
                                <span>{userInfo.customerUserName}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>注册渠道：</span>
                                <span>{userInfo.ext2}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>邀请人：</span>
                                <span>{userInfo.inviteUserName}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        资金账户信息
                    </Typography>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>资产总额：</span>
                                <span>¥{accountInfo.accountAmount}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>可用余额：</span>
                                <span>¥{accountInfo.availableBalance}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>提现冻结：</span>
                                <span>¥{accountInfo.withdrawalFreeze}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>待收总额：</span>
                                <span>¥{accountInfo.waitCollectionAmount}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>待收本金：</span>
                                <span>¥{accountInfo.waitCollectionCapital}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>待收利息：</span>
                                <span>¥{accountInfo.waitCollectionInterest}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>总投资额：</span>
                                <span>¥{accountInfo.tenderAmount}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>已收本金：</span>
                                <span>¥{accountInfo.collectionCapital}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>已收利息：</span>
                                <span>¥{accountInfo.collectionInterest}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>活动奖励：</span>
                                <span>¥{accountInfo.activityAward}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>红包奖励：</span>
                                <span>¥{accountInfo.redAward}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>加息券奖励：</span>
                                <span>¥{accountInfo.raiseInterest}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spcing={24}
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>可提现金额：</span>
                                <span>¥{accountInfo.allowWithdraw}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Typography component="p">
                                <span>待入账金额：</span>
                                <span>¥{accountInfo.waitAccount}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.root} elevation={4}>
                    <Typography variant="headline" component="h3">
                        账户详情
                    </Typography>
                    <div>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                scrollable
                                scrollButtons="auto"
                            >
                                <Tab label="绑卡记录"/>
                                <Tab label="R计划投资记录"/>
                                <Tab label="单标投资记录"/>
                                <Tab label="R计划待收记录"/>
                                <Tab label="单标待收记录"/>
                                <Tab label="债权转让"/>
                                <Tab label="债权承接"/>
                                <Tab label="充值记录"/>
                                <Tab label="提现记录"/>
                                <Tab label="红包列表"/>
                                <Tab label="加息券列表"/>
                                <Tab label="奖励记录"/>
                                <Tab label="登陆日志"/>
                                <Tab label="维护记录"/>
                            </Tabs>
                        </AppBar>
                        <SecondTab
                            {...this.props}
                            label={currentMethod}
                            onChange={this.onChangeStatus}
                        />
                        <TabContainer>
                            <TableComponent
                                data={this.state.data}
                                page={pagination.page}
                                currentMethod={this.state.currentMethod}
                                count={pagination.rows}
                                rowsPerPage={pagination.pageSize}
                                onChangePage={this.onChangePage}
                                onChangePageSize={this.onChangePageSize}
                            />
                        </TabContainer>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerDetail);
