import React, {Component} from "react";
import {connect} from "react-redux";
import Css from "@/components/Pagination/Pagination.scss";
import {withRouter} from 'react-router'

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            oldCurrentPage:1,
            pages: 0,
            loading:false
        };
    }
    async handleCurrentPage (currentPage) {
       if(this.state.loading){
           return;
       }
        this.setState({
            loading:true
        })
            this.props.onCurrentChange &&await this.props.onCurrentChange(currentPage);
            this.setState({
                loading:false
            })

    }
    onInputChange(e){
        let value=e.target.value;
        if(!/^\d+$/.test(value)){
            this.setState({
                currentPage:0
            })
            return false;
        }else{
            if(value<=this.props.pages){
                this.setState({
                    currentPage:value*1
                })
                if(value<=0){
                    this.setState({
                        currentPage:1
                    })
                }
            }else{
                this.setState({
                    currentPage:this.props.pages||1
                })
            }
        }
    }
    onInputBlur(e){

        let value=e.target.value
        // e.target.value=this.state.oldCurrentPage

        if(!value||value==0){
            this.setState({
                currentPage:1
            })
            this.handleCurrentPage(1);
        }else{
            // if(!(value==this.state.currentPage)){
                this.handleCurrentPage(this.state.currentPage);
            // }
        }
    }
    onInputKeyUp(e){
        let {keyCode}=e;
        if(keyCode==13){
            setTimeout(()=>{
                let nowPage = this.state.currentPage ;
                if(!nowPage||nowPage==0){
                    nowPage=1
                }
                this.setState({
                    currentPage: nowPage,
                    oldCurrentPage: nowPage,
                });
                this.handleCurrentPage(this.state.currentPage);
            },2)
        }
    }
    clickPrev() {
        if (this.state.currentPage == 1) {
            return false;
        }
        let nowPage = this.state.currentPage - 1;
        this.handleCurrentPage(nowPage);
        this.setState({
            currentPage: nowPage,
            oldCurrentPage: nowPage,
        });
    }

    clickNext() {
        if (this.state.currentPage == this.props.pages || !this.props.pages) {
            return false;
        }
        let nowPage = this.state.currentPage + 1;

        this.handleCurrentPage(nowPage);
        this.setState({
            currentPage: nowPage,
            oldCurrentPage: nowPage,
        });
    }
    clickFirst(){//首页
        let nowPage = this.state.currentPage;
        this.handleCurrentPage(1);
        this.setState({
            currentPage: 1,
            oldCurrentPage: nowPage,
        });
    }
    clickLast(){//尾页
        let nowPage = this.state.currentPage
        let pages=this.props.pages
        this.handleCurrentPage(pages);
        this.setState({
            currentPage: pages,
            oldCurrentPage: nowPage,
        });
    }
    componentWillReceiveProps(props){
        if(props.currentPage!=this.state.currentPage){
            this.setState({
                currentPage:props.currentPage
            })
        }
    }
    componentDidMount() {

    }

    render() {//pageSize => is required
        let self = this;
        let {pages,style={}}=this.props;
        let currentPage = this.state.currentPage;
        let config = {
            prevText: "上一页",
            nextText: "下一页",
        };

        let prevDisabled=this.state.currentPage==1?' disabled':''
        let nextDisabled=this.state.currentPage==this.props.pages?' disabled':''

        //上一页  下一页
        let prevBtn = <span className={"prev "+prevDisabled} >
            <i onClick={(e)=>{this.clickFirst(e)}}></i><strong onClick={(e)=>{this.clickPrev(e)}}>{config.prevText} </strong>
        </span>;
        let nextBtn = <span className={"next " +nextDisabled} >
            <strong onClick={(e)=>{this.clickNext(e)}}>{config.nextText}</strong> <i onClick={(e)=>{this.clickLast(e)}}></i>
        </span>;

        //前往
        let go = (
            <label className="go">
                <input type="text"
                       value={currentPage}
                       onBlur={(e)=>{this.onInputBlur(e)}}
                       onChange={(e)=>{this.onInputChange(e)}}
                       onKeyUp={(e)=>{this.onInputKeyUp(e)}}
                /> / <span>{pages}</span>
            </label>
        );

        return (
            <div className="pagination" style={style}>
                {prevBtn}
                {go}
                {nextBtn}
            </div>
        );
    }
}

// Pagination = connect((store) => ({store}))(Pagination);

export default Pagination;

