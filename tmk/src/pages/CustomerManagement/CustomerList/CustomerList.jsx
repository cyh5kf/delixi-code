import React from "react";
import FormComponent from "./FormComponent/FormComponent";
import TableComponent from "./TableComponent/TableComponent";
import {adminManager, userManager} from "api/restApi";
import {objectToQueryString} from "utils";
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';

class CustomerList extends React.Component {
    state = {
        uid: "",
        mobile: "",
        realname: "",
        open_status: "",
        reg_begin: null,
        reg_end: null,
        channel: "",
        gone: "",
        allot_status: "",
        data: [],
        selected: [],
        pagination: {
            page: 1,
            page_size: 10,
            page_count: 10,
            total: 0
        }
    };

    componentWillMount() {
        this.onSearch();
    }

    onSearch = (params) => {
        let query = Object.assign({}, this.state);
        if(query.reg_begin){
            query.reg_begin = new Date(new Date(query.reg_begin).setHours(0,0,0)).Format('yyyy-MM-dd hh:mm:ss')
        }
        if(query.reg_end){
            query.reg_end = new Date(new Date(query.reg_end).setHours(23,59,59)).Format('yyyy-MM-dd hh:mm:ss')
        }
        delete query.data;
        delete query.pagination;
        query.page = params && params.page ? params.page : this.state.pagination.page;
        query.page_size = params && params.page_size ? params.page_size : this.state.pagination.page_size;
        this.findList(query);
    };

    handleChange = name => event => {
        let data =
            Object.prototype.toString.call(event) === "[object Date]"
                ? new Date(event).Format('yyyy-MM-dd')
                : event.target.value;
        this.setState({
            [name]: data
        },()=>{
            let start = this.state.reg_begin || new Date(this.state.reg_begin);
            let end = this.state.reg_end || new Date(this.state.reg_end);
            if (start && end && end < start) {
                Notice.open({message:'结束时间不能小于开始时间'});
                this.setState({
                    reg_end:null
                })
                return false;
            }
        });
    };

    // 客服专员列表
    findList = params => {
        let url = `${location.origin}${location.pathname}${objectToQueryString(
            params
        )}`;
        history.pushState({}, "", url);
        LoadingBar.open()
        adminManager.commandPHP("manage/self", params).then(res => {
            this.setState({
                data: res.data || [],
                pagination: Object.assign(this.state.pagination, res.pagination)
            }, LoadingBar.close);
        }, LoadingBar.close);
    };

    // 重置登录密码
    resetLoginPassword = (userId) => {
        return userManager.queryPHP('resetLogin', {userId}).then(res => {
            if (res.code === 0) {
                return Promise.resolve(res.msg);
            } else {
                return Promise.reject(res.msg);
            }
        })
    };

    // 重置支付密码
    resetPayPassword = (userId) => {
        return userManager.queryPHP('resetPay', {userId}).then(res => {
            if (res.code === 0) {
                return Promise.resolve(res.msg);
            } else {
                return Promise.reject(res.msg);
            }
        })
    };

    // 重置表单
    resetForm = () => {
        this.setState({
            uid: "",
            mobile: "",
            realname: "",
            open_status: "",
            reg_begin: null,
            reg_end: null,
            channel: "",
            gone: "",
            allot_status: "",
            data: [],
            pagination: {
                page: 1,
                page_size: 10,
                page_count: 10,
                total: 0
            }
        }, this.onSearch);
    };

    // 分页
    onChangePage = (page) => {
        this.setState({
            pagination: Object.assign(this.state.pagination, {page})
        }, this.onSearch)
    }

    // 显示行数
    onChangePageSize = (page_size) => {
        this.setState({
            pagination: Object.assign(this.state.pagination, {page_size})
        }, () => this.onSearch({page: 1, page_size}))
    }

    render() {
        const {pagination} = this.state;
        return (
            <div className="customer_management">
                <FormComponent
                    data={this.state}
                    onSearch={this.onSearch}
                    handleChange={this.handleChange}
                    resetForm={this.resetForm}
                    selected={this.state.selected}
                />
                <TableComponent
                    selected={this.state.selected}
                    data={this.state.data}
                    page={pagination.page}
                    count={pagination.total}
                    rowsPerPage={pagination.page_size}
                    onChangePage={this.onChangePage}
                    onChangePageSize={this.onChangePageSize}
                    resetLoginPassword={this.resetLoginPassword}
                    resetPayPassword={this.resetPayPassword}
                    {...this.props}
                />
            </div>
        );
    }
}

export default CustomerList;
