/**
 * 这里是全局性信息.单独存储.
 */

const TOKEN = 'token';
const USERNAME  = 'userName';
const QUERYDATA = 'queryData';
const PART3FORMDATA = 'part3FormData';
const INTEREST = 'interest';
const USERID = 'userId';
const QUEUE = 'queue';

class localStorage {

    getToken(){
        return window.localStorage.getItem(TOKEN);
    }

    setToken(token){
        window.localStorage.setItem(TOKEN, token);
    }

    getUserName(){
        return window.localStorage.getItem(USERNAME);
    }

    setUserName(userName){
        window.localStorage.setItem(USERNAME, userName);
    }

    removeItem(key) {
        window.localStorage.removeItem(key);
    }

    setQueryData(queryData){
        window.localStorage.setItem(QUERYDATA,queryData);
    }
    
    getQueryData(){
        return window.localStorage.getItem(QUERYDATA)
    }

    getPart3FormData(){
        return window.localStorage.getItem(PART3FORMDATA);
    }

    setPart3FormData(data){
        window.localStorage.setItem(PART3FORMDATA, data);
    }

    getInterest(){
        return window.localStorage.getItem(INTEREST);
    }

    setInterest(data){
        window.localStorage.setItem(INTEREST, data);
    }

    getUserId(){
        return window.localStorage.getItem(USERID);
    }

    setUserId(data){
        window.localStorage.setItem(USERID, data);
    }

    getQueue(){
        return window.localStorage.getItem(QUEUE);
    }

    setQueue(data){
        window.localStorage.setItem(QUEUE, data);
    }
    

}

export default new localStorage();