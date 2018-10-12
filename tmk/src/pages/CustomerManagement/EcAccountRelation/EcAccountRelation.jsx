import React from "react";
import TableComponent from "./TableComponent/TableComponent";
import { adminManager, userManager } from "api/restApi";
import { objectToQueryString } from "utils";
import LoadingBar from 'components/LoadingBar/LoadingBar';

class EcAccountRelation extends React.Component {
  state = {
    data: [],
    pagination:{
      page: 1,
      page_size:10,
      page_count: 10,
      total:0
    }
  };

  componentWillMount() {
    this.onSearch();
  }

  onSearch = (params) => {
    let query = Object.assign({},this.state);
    delete query.data;
    delete query.pagination;
    query.page = params ? params.page : this.state.pagination.page;
    query.page_size = params ? params.page_size : this.state.pagination.page_size;
    this.findList(query);
  };

  // 客服列表
  findList = params => {
    let url = `${location.origin}${location.pathname}${objectToQueryString(
      params
    )}`;
    history.pushState({}, "", url);
      LoadingBar.open()
    adminManager.commandPHP("custom/both", params).then(res => {
      this.setState({
        data: res.data || [],
        pagination:Object.assign(this.state.pagination,res.pagination)
      },LoadingBar.close);
    },()=>LoadingBar.close());
  };

  // 添加编辑客服
  handleEcedit = (param) => {
    return adminManager.queryPHP2('custom/ecedit', param).then(res=>{
      if(res.error_code===0){
        this.onSearch();
        return Promise.resolve(res.msg);
      } else{
        return Promise.reject(res.msg);
      }
    })
  };

  // 分页
  onChangePage = (page)=>{
    this.setState({
      pagination:Object.assign(this.state.pagination,{page})
    },this.onSearch)
  }

  // 显示行数
  onChangePageSize = (page_size)=>{
    this.setState({
      pagination:Object.assign(this.state.pagination,{page_size})
    },()=>this.onSearch({page:1,page_size}))
  }
  render() {
    const {pagination}=this.state;
    return (
      <div className="customer_management">
        <TableComponent
          selected={this.state.selected}
          data={this.state.data}
          page={pagination.page}
          count={pagination.total}
          rowsPerPage={pagination.page_size}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize}
          handleEcedit={this.handleEcedit}
          onSearch={this.onSearch}
          {...this.props}
        />
      </div>
    );
  }
}

export default EcAccountRelation;
