import React,{Component} from 'react';
import {render} from 'react-dom';
import API from '@/api/api.js';
import entityToString from '@/util/entityToString.js';
class Protocol extends Component{
    constructor(){
        super();
        this.state={
            content: <div></div>,
            title:''
        }
    }
    async componentWillMount(){
      const id=location.href.split('=')[1];
      const obj=await API.post(API.protocol,{protocol:id},true);
      const el=obj.obj&&obj.obj.content;
      document.title = obj.obj&&obj.obj.name;
      // console.log(el.indexOf('<'))
        // entityToString(el)
      this.setState({
          content:el||<div></div>
      })
    }
    componentDidUpdate(){
        document.getElementById('protocol').innerHTML=this.state.content
    }
    render (){
        return (
            <div id="protocol" style={{width:'1200px',margin:'0 auto'}}></div>
        )
    }
}

render(<Protocol/>,document.getElementById('app'))
