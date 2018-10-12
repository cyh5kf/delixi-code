import ReactDOM from 'react-dom';
import React from 'react';
import RootRouter from './RootRouter';
import './styles/index.less';
import './common/google/google.css';

// import MomentUtils from 'material-ui-pickers/utils/moment-utils';
// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
// import LuxonUtils from 'material-ui-picker/luxon-utils';
// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// import moment from 'moment';
// import cnLocale from 'moment/locale/zh-cn';
// import cnLocale from 'date-fns/locale/zh-CN';
import {getParameterByName} from 'utils';
import RestApi,{indexManager} from 'api/restApi';
// moment.locale('zh-cn');

// localStorage.username ?　ReactDOM.render(
//     <MuiPickersUtilsProvider utils={DateFnsUtils} locale={cnLocale}>
//         <RootRouter />
//     </MuiPickersUtilsProvider>,
//     document.getElementById("root"),
// ) : location.href = '/login.html';

// 获取token
const getToken =()=>{
    if(!sessionStorage['access-token']){
        let token = getParameterByName('token') || '1a711946-45c4-4937-90a8-02c5647dd144';
        sessionStorage['access-token'] = token;
    }
    return Promise.resolve()
}

// 获取用户信息
const getUserInfo = ()=>{
    const user = indexManager.queryPHP('access').then(res=>{
        if(res.code ===0 && res.data){
            let menus = res.data.sysUserDto.sysMenuDtoList.find(item=>item.name==='客服系统');
            sessionStorage.setItem('menus',JSON.stringify(menus.list));
            return Promise.resolve(res);
        } else{
            return Promise.reject(res);
        }

    })
    return user;
}
// 渲染页面
const render = ()=>{
    ReactDOM.render(
        <RootRouter />,
        document.getElementById("root"),
    )
}
getToken()
.then(getUserInfo)
.then(render,(rej)=>{
    let login = rej.data.sysUserDto.adminSystemDomain;
    let url = `${login}/index.html`;
    if(sessionStorage.debug){
        setTimeout(()=>{
            sessionStorage.clear();
            location.href = url;
        },5000)
    } else {
        sessionStorage.clear();
        location.href = url;
    }

});
// render()

