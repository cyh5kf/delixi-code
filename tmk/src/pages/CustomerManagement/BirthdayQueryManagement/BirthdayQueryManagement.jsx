import React from "react";
import FormComponent from "./FormComponent/FormComponent";
import TableComponent from "./TableComponent/TableComponent";
import {adminManager} from "api/restApi";
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';

class BirthdayQueryManagement extends React.Component {
  state = {
    birthday:null,
    data:[],
    pagination:{
      page: 1,
      page_size:10,
      page_count: 10,
      total:0
    }
  };

  componentWillMount(){
    const date = new Date();
    let month = date.getMonth() + 1;
    if(month < 10) {
      month = '0' + month;
    }
    const day = date.getDate();
    this.setState({ birthday:  `${month}${day}`}, () => {
      this.onSearch()
    })
  }

  // 查询
  onSearch = (params) => {
    const birthday = this.state.birthday;
    if(!birthday) {
      Notice.open({message: '请输入生日！'})
      return false;
    }
    let query = Object.assign({},this.state);
    delete query.data;
    delete query.pagination;
    query.page = params ? params.page : this.state.pagination.page;
    query.page_size = this.state.pagination.page_size;
    this.queryBirthday(query);
  };

  // 导出
  onExport = () => {
    const birthday = this.state.birthday;
    if(!birthday) {
      Notice.open({message: '请输入生日！'})
      return false;
    }
    LoadingBar.open('导出中...')
    var xhr = new XMLHttpRequest()
    xhr.responseType = "blob"
    xhr.onload = () => {
      if (xhr.status === 304 || xhr.status === 200) {
        var blob = new Blob([xhr.response], {type: 'text/xls'});
        var csvUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = csvUrl;
        a.download = birthday + ".csv";
        setTimeout(() => {
          a.click(); 
          LoadingBar.close()
        }, 100);
      }
    }
    xhr.open("GET", `/index.php?_url=/admin/manage/exportBirthday&birthday=${birthday}`)
    xhr.send()
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
      adminManager.queryPHP('manage/birthday',params).then(res=>{
          if(res.error_code !==0){
              LoadingBar.close();
              Notice.open({message:res.msg})
              return false;
          }
          this.setState({
              data:res.data,
              pagination:Object.assign(this.state.pagination, res.pagination)
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
