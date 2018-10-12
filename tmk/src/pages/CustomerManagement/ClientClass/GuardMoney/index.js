import React from "react";
import FormComponent from "./FormComponent/FormComponent";
import TableComponent from "./TableComponent/TableComponent";
import {classManager,download} from "api/restApi";
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';
class BirthdayQueryManagement extends React.Component {
  state = {
    data:[],
    pagination:{
      page: 1,
      page_size:10,
      page_count: 10,
      total:0
    }
  };

  componentDidMount() {
    this.onSearch()
  }
  
  // 查询
  onSearch = (params) => {
    let query = Object.assign({},this.state);
    delete query.data;
    delete query.pagination;
    query.page = params ? params.page : this.state.pagination.page;
    query.pageSize = this.state.pagination.page_size;
    this.queryBirthday(query);
  };

  // 导出
  onExport = () => {
    let query = {
      isExport:1
    }
    LoadingBar.open('导出中...')
    download('classify/balance','站岗用户',query).then((res)=>{
      // Notice.open({message: res.msg});
      LoadingBar.close();
    })
  }

  handleChange = name => event => {
    let data =
      Object.prototype.toString.call(event) === "[object Date]"
        ? new Date(event).Format('yyyy-MM-dd')
        : event.target.value;
    this.setState({
      [name]: data
    });
  };

  // 电销业绩查询
  queryBirthday = (params) => {
      LoadingBar.open()
      classManager.queryPHP('balance',params).then(res=>{
          if(res.code !==0){
              LoadingBar.close();
              Notice.open({message:res.msg})
              return false;
          }
          this.setState({
              data:res.data.list,
              // pagination:Object.assign(this.state.pagination, pagination)
              pagination:{
                ...this.state.pagination,
                page: res.data.pagination.page,
                page_count: res.data.pagination.pageCount,
                total:res.data.pagination.rows
              }
          },LoadingBar.close)
      },()=>LoadingBar.close())
  }

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
      <div className="telemarketing_performance_management">
        <FormComponent
          data={this.state}
          onSearch={this.onSearch}
          onExport={this.onExport}
          handleChange={this.handleChange}
          resetForm={this.resetForm}/>
        <p><b style={{color:'red'}}>*</b>截至当前账户余额大于或等于100的所有用户</p>
        <TableComponent
        data={this.state.data}
          page={pagination.page}
          count={pagination.total}
          rowsPerPage={pagination.page_size}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize} />
      </div>
    );
  }
}

export default BirthdayQueryManagement;
