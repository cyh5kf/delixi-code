import axios from 'axios';
import qs from 'qs';
import { Message } from 'iview';
import localstorage from '../../store/localstorage';

// const prefixApi = '/api';
const prefixApi = '/index.php?_url=';

class AjaxUtils {

    init(checkTokenRequest) {
        //用于遇到异常情况后检查Token是否已过期
        this.checkTokenRequest = checkTokenRequest;
    }

    doGetRequest(url) {
        return this._doRequest('get', url, null);
    }

    doPostRequest(url, data) {
        return this._doRequest('post', url, data);
    }

    doPutRequest(url, data){
        return this._doRequest('put', url, data);
    }

    doDeleteRequest(url, data){
        return this._doRequest('delete', url, data);
    }

    _doRequest(method, url, data) {
        let checkTokenRequest = this.checkTokenRequest;
        let token = localstorage.getToken();
        let dataObj = qs.stringify(data);
        url = prefixApi + url;
        return axios({
            method: method,
            url: url,
            data: dataObj,
            headers: { 'x-access-token': token}
        }).then( (response)=> {
            if (response.status == 200) {
                if(response.data.code === 1) {
                    return response;
                } else if(response.data.code === -1) {
                    //用户登录信息失效
                    checkTokenRequest();
                    localstorage.removeItem('userName');
                    localstorage.removeItem('token');
                    return Promise.reject(response);
                }
            } else {
                Message.error("Error Code :" + status);
                return Promise.reject(response);
            }
            
        })

    }

}


export default new AjaxUtils();