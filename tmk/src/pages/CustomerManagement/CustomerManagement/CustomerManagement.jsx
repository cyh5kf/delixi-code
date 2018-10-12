import React from "react";
import FormComponent from "./FormComponent/FormComponent";
import TableComponent from "./TableComponent/TableComponent";
import {adminManager} from "api/restApi";
import {objectToQueryString} from "utils";
import AssignCustomerService from 'components/AssignCustomerService/AssignCustomerService';
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';

class CustomerManagement extends React.Component {
    state = {
        mobile: "", //手机
        realname: "", // 客户名称
        uid: "", // uid
        open_status: "", // 是否开户
        customer: "", // 最新分配客服
        reg_begin: null, // 注册开始时间l
        reg_end: null, // 注册结束时间
        tender_status: "", //是否投资
        source: "", // 来源
        gone: "", // 去向
        update_begin: null, // 变动开始时间
        update_end: null, // 变动结束时间
        selectedDate: null,
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
        if (query.reg_begin) {
            query.reg_begin = new Date(new Date(query.reg_begin).setHours(0, 0, 0)).Format('yyyy-MM-dd hh:mm:ss')
        }
        if (query.reg_end) {
            query.reg_end = new Date(new Date(query.reg_end).setHours(23, 59, 59)).Format('yyyy-MM-dd hh:mm:ss')
        }
        if(query.update_begin){
            query.update_begin = new Date(new Date(query.update_begin).setHours(0,0,0)).Format('yyyy-MM-dd hh:mm:ss')
        }
        if(query.update_end){
            query.update_end = new Date(new Date(query.update_end).setHours(23,59,59)).Format('yyyy-MM-dd hh:mm:ss')
        }
        delete query.data;
        delete query.pagination;
        query.page = params && params.page ? params.page : this.state.pagination.page;
        query.page_size = params && params.page_size ? params.page_size : this.state.pagination.page_size;
        this.findManageOwnList(query);
    };

    handleChange = name => event => {
        let data =
            Object.prototype.toString.call(event) === "[object Date]"
                ? new Date(event).Format('yyyy-MM-dd')
                : event.target.value;
        this.setState({
            [name]: data
        }, () => {
            let reg_begin = this.state.reg_begin ? new Date(this.state.reg_begin) : null;
            let reg_end = this.state.reg_end ? new Date(this.state.reg_end) : null;
            let change_start = this.state.update_begin ? new Date(this.state.update_begin) : null;
            let change_end = this.state.update_end ? new Date(this.state.update_end) : null;
            if (reg_begin && reg_end && reg_end < reg_begin) {
                Notice.open({message: '结束时间不能小于开始时间'})
                this.setState({reg_end: null})
                return false;
            }
            if (change_start && change_end && change_end < change_start) {
                Notice.open({message: '结束时间不能小于开始时间'})
                this.setState({update_end: null})
                return false;
            }
        });
    };

    // 客服管理
    findManageOwnList = params => {
        let url = `${location.origin}${location.pathname}${objectToQueryString(
            params
        )}`;
        history.pushState({}, "", url);
        LoadingBar.open()
        adminManager.commandPHP("manage/list", params).then(res => {
            this.setState({
                data: res.data || [],
                pagination: Object.assign(this.state.pagination, res.pagination)
            }, LoadingBar.close);
        }, () => LoadingBar.close);
    };
// 重置表单
    resetForm = () => {
        this.setState({
            mobile: "", //手机
            realname: "", // 客户名称
            uid: "", // uid
            open_status: "", // 是否开户
            customer: "", // 最新分配客服
            reg_begin: null, // 注册开始时间
            reg_end: null, // 注册结束时间
            tender_status: "", //是否投资
            source: "", // 来源
            gone: "", // 去向
            update_begin: null, // 变动开始时间
            update_end: null, // 变动结束时间
            selectedDate: null,
            data: [],
            selected: [],
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
    // 处理表格选项事件
    // --单选
    handleSelectAllClick = (event, checked) => {
        const {data} = this.state;
        if (checked) {
            this.setState({selected: data.map(n => n.uid)});
            return;
        }
        this.setState({selected: []});
    };

    // 全选
    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected});
    };

    render() {
        const {pagination} = this.state;
        return (
            <div className="customer_management">
                <AssignCustomerService/>
                <FormComponent
                    data={this.state}
                    onSearch={this.onSearch}
                    handleChange={this.handleChange}
                    selected={this.state.selected}
                    resetForm={this.resetForm}/>
                <TableComponent
                    {...this.props}
                    data={this.state.data}
                    page={pagination.page}
                    count={pagination.total}
                    rowsPerPage={pagination.page_size}
                    onChangePage={this.onChangePage}
                    onChangePageSize={this.onChangePageSize}
                    selected={this.state.selected}
                    handleClick={this.handleClick}
                    handleSelectAllClick={this.handleSelectAllClick}
                />
            </div>
        );
    }
}

export default CustomerManagement;
