import React from "react";
import FormComponent from "./FormComponent/FormComponent";
import TableComponent from "./TableComponent/TableComponent";
import {saleManager} from "api/restApi";
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';

class TelemarketingPerformanceManagement extends React.Component {
  state = {
    startTime:null,
    endTime:null,
    department:0,
    data:[],
    pagination:{
      page: 1,
      page_size:10,
      page_count: 10,
      rows:0
    }
  };

  componentWillMount(){
    // this.onSearch()
  }

  onSearch = (params) => {
    let query = Object.assign({},this.state);
      if (query.startTime) {
          query.startTime = new Date(new Date(query.startTime).setHours(0, 0, 0)).Format('yyyy-MM-dd hh:mm:ss')
      }
      if (query.endTime) {
          query.endTime = new Date(new Date(query.endTime).setHours(23, 59, 59)).Format('yyyy-MM-dd hh:mm:ss')
      }
    delete query.data;
    delete query.pagination;
    query.page = params ? params.page : this.state.pagination.page;
    query.page_size = params ? params.page_size : this.state.pagination.page_size;
    this.findSaleList(query);
  };


  handleChange = name => event => {
    let data =
      Object.prototype.toString.call(event) === "[object Date]"
        ? new Date(event).Format('yyyy-MM-dd')
        : event.target.value;
    this.setState({
      [name]: data
    },()=>{
        let start = this.state.startTime || new Date(this.state.startTime);
        let end = this.state.endTime || new Date(this.state.endTime);
        if (start && end && end < start) {
            Notice.open({message:'结束时间不能小于开始时间'});
            this.setState({
                endTime:null
            })
            return false;
        }
    });
  };

  // 电销业绩查询
  findSaleList = (params) => {
      LoadingBar.open()
      saleManager.queryPHP('list',params).then(res=>{
          if(res.code !==0){
              LoadingBar.close();
              Notice.open({message:res.msg})
              return false;
          }
          this.setState({
              data:res.data.list,
              pagination:Object.assign(this.state.pagination,res.data.pagination)
          },LoadingBar.close)
      },()=>LoadingBar.close())
  }

     // 重置表单
  resetForm = () => {
    this.setState({
      startTime:null,
      endTime:null,
      data:[],
      pagination:{
        page: 1,
        page_size:10,
        page_count: 10,
        rows:0
      }
    },this.onSearch);
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
      <div className="telemarketing_performance_management">
        <FormComponent
        data={this.state}
          onSearch={this.onSearch}
          handleChange={this.handleChange}
          resetForm={this.resetForm}/>
        <TableComponent
        data={this.state.data}
          page={pagination.page}
          count={pagination.rows}
          rowsPerPage={pagination.page_size}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize} />
      </div>
    );
  }
}

export default TelemarketingPerformanceManagement;
