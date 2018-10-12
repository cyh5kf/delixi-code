/**
 * 登录用户的信息,是全局性信息.单独存储.
 * 界面各自的数据,直接使用State存储
 */

const TOKEN = 'token';
const USERNAME  = 'userName';

class LoginStore {

    constructor(props) {
        let token = localStorage.getItem(TOKEN);
        let userName = localStorage.getItem(USERNAME);
        
        if(token) {
            this.token = token;
        }else {
            this.token = null;
        }
        if(userName) {
            this.userName = userName;
        }else {
            this.userName = null;
        }
    }

    getToken(){
        return this.token;
    }

    setToken(token){
        localStorage.setItem(TOKEN, token);
        this.token = token;
    }

    getUserName(){
        return this.userName;
    }

    setUserName(userName){
        localStorage.setItem(USERNAME, userName);
        this.userName = userName;
    }
    
}

export default new LoginStore();