import React from "react";
import FormComponent from "./FormComponent/FormComponent";
import TableComponent from "./TableComponent/TableComponent";
import {classManager,download} from "api/restApi";
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';
class BirthdayQueryManagement extends React.Component {
  state = {
    timeRange:{
      "startTime":"",
      "endTime":""
    },
    moneyRange:{
      "startMoney":"",
      "endMoney":""
    },
    data:[],
    pagination:{
      page: 1,
      page_size:10,
      page_count: 10,
      total:0
    }
  };

  componentDidMount() {
    // this.onSearch()
  }
  
  // 查询
  onSearch = (params) => {
    if (new Date(this.state.timeRange.endTime).getTime()-new Date(this.state.timeRange.startTime).getTime()>604800000) {
      Notice.open({message: '限制日期一周内'});
      return ;
    }
    let query = {
      timeRange:JSON.stringify(this.state.timeRange),
      moneyRange:JSON.stringify(this.state.moneyRange)
    }
    query.page = params ? params.page : this.state.pagination.page;
    query.pageSize = this.state.pagination.page_size;
    this.queryBirthday(query);
  };

  // 导出
  onExport = () => {
    let query = {
      timeRange:JSON.stringify(this.state.timeRange),
      moneyRange:JSON.stringify(this.state.moneyRange),
      isExport:1
    }
    LoadingBar.open('导出中...')
    download('classify/cash','提现用户',query).then((res)=>{
      // Notice.open({message: res.msg});
      LoadingBar.close();
    })
  }

  handleChange = (name,child) => (data,tslate) => {
    this.setState({
      [name]: {
        ...this.state[name],
        [child]:tslate?data:data.target.value
      }
    });
  };

  // 电销业绩查询
  queryBirthday = (params) => {
      LoadingBar.open()
      classManager.queryPHP('cash',params).then(res=>{
          if(res.code !==0){
              LoadingBar.close();
              Notice.open({message:res.msg})
              return false;
          }
          this.setState({
              data:res.data.list,
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
