import HttpClient from "./http_client";
// import constants from 'constants';
// import CookieApi from './cookieApi';
// import queryParser from './queryParser';

// const host = constants.apiHost;
// const servicePath = host + '/api';
const servicePath = "/index.php";

const getSecurityToken = () => {
  return sessionStorage.getItem("access-token");
};

const getHeaders = () => {
  let headers = { "Content-Type": "application/json; charset=utf-8" };
  let securityToken = getSecurityToken();
  if (securityToken) {
    headers["access-token"] = securityToken;
  }

  return headers;
};

const toQueryString = obj => {
  if (obj == null) return "";
  let str = [];
  for (let p in obj) {
    if (obj[p] != null) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join("&");
};

const formDataObj = obj => {
  for (var propName in obj) {
    if (
      obj[propName] === "" ||
      obj[propName] === null ||
      obj[propName] === undefined
    ) {
      delete obj[propName];
    }
  }
};

// const download = (url,name,query)=>{
//   return new Promise((resove,reject)=>{
//     formDataObj(query)
//     let params= toQueryString(query)
//     var xhr = new XMLHttpRequest()
//     var token = sessionStorage.getItem("access-token");
//     xhr.responseType = "blob"
//     xhr.onload = () => {
//       if (xhr.status === 304 || xhr.status === 200) {
//         var m = xhr.getResponseHeader('content-disposition').match(/filename=(.+);/)[1]
//         var blob = new Blob([xhr.response], {type: 'text/xls'});
//         var csvUrl = URL.createObjectURL(blob);
//         var a = document.createElement('a');
//         a.href = csvUrl;
//         // a.target = '_blank';
//         a.download = m;
//         setTimeout(() => {
//           a.click(); 
//         }, 100);
//         resove({msg:'下载成功'})
//       }else{
//         reject({msg:'下载失败'})
//       }
//     }
//     xhr.open("GET", `/index.php?_url=/${url}&${params}`)
//     xhr.setRequestHeader('access-token', token)
//     xhr.send()
//   })
// }

const download = (url,name,query)=>{
  var a = document.createElement('a');
  query.token = sessionStorage.getItem("access-token");
  formDataObj(query)
  let params= toQueryString(query)
  a.href = `${location.origin}/index.php?_url=/${url}&${params}`;
  a.target = '_blank';
  // a.download = m;
  setTimeout(() => {
    a.click(); 
  }, 100);
  return Promise.resolve({msg:'下载成功'})
}

class EntityManager {
  constructor(entityName, path) {
    const serverApiPath = path ? path : servicePath;
    this.entityName = entityName;

    this.redirectLogin = () => {
      let url = `login.html?${location.pathname}`;
      location.href = url;
    };

    this.restitute = () => {
      let url = location.search;
      location.href = url;
    };

    this.retrieve = id => {
      let url = `${serverApiPath}/${this.entityName}/${id}`;
      return HttpClient.get(url, getHeaders()).then(resp => {
        return JSON.parse(resp);
      });
    };

    this.save = entity => {
      let url = `${serverApiPath}/${this.entityName}`;
      return HttpClient.post(url, JSON.stringify(entity), getHeaders()).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.update = (id, entity) => {
      let url = `${serverApiPath}/${this.entityName}/${id}`;
      return HttpClient.put(url, JSON.stringify(entity), getHeaders()).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.delete = id => {
      let url = `${serverApiPath}/${this.entityName}/${id}`;
      return HttpClient.delete(url, getHeaders()).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.find = query => {
      let url = `${serverApiPath}/${this.entityName}?${toQueryString(query)}`;
      return HttpClient.get(url, getHeaders()).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.count = query => {
      let url = `${serverApiPath}/${this.entityName}/count?${toQueryString(
        query
      )}`;
      return HttpClient.get(url, getHeaders()).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.query = (method, query) => {
      formDataObj(query);
      let url = `${serverApiPath}/${this.entityName}/${method}?${toQueryString(
        query
      )}`;
      return HttpClient.get(url, getHeaders()).then(
        resp => {
          let json = JSON.parse(resp);
          if (josn.code === 0) {
            return Promise.resolve(json);
          } else if (json.error_code === 201) {
            this.redirectLogin();
            return false;
          }
        },
        rej => {
          return Promise.reject(rej);
        }
      );
      // .then(res=>res,rej=>rej)
    };

    this.queryPHP = (method, query, type) => {
      formDataObj(query);
      let url = '';
      if(query){
        url = `${serverApiPath}?_url=/${ this.entityName}/${method}&${toQueryString(query)}`;
      } else{
        url = `${serverApiPath}?_url=/${ this.entityName}/${method}`;
      }
      if (type === "string") {
        return HttpClient.get(url, getHeaders());
      } else {
        return HttpClient.get(url, getHeaders()).then(
          resp => JSON.parse(resp),
          resp => resp
        );
      }
    };

    this.queryPHP2 = (method, query, type) => {
      let url = '';
      if(query){
        url = `${serverApiPath}?_url=/${ this.entityName}/${method}&${toQueryString(query)}`;
      } else{
        url = `${serverApiPath}?_url=/${ this.entityName}/${method}`;
      }
      if (type === "string") {
        return HttpClient.get(url, getHeaders());
      } else {
        return HttpClient.get(url, getHeaders()).then(
          resp => JSON.parse(resp),
          resp => Promise.reject(JSON.parse(resp))
        );
      }
    };

    this.commandPHP = (method, query) => {
      formDataObj(query);
      let url = `${serverApiPath}?_url=/${this.entityName}/${method}`;
      let headers = getHeaders();
      headers["Content-Type"] = "application/x-www-form-urlencoded";
      return HttpClient.post(url, toQueryString(query), headers).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.command = (method, params) => {
      let url = `${serverApiPath}/${this.entityName}/command/${method}`;
      let formData = toQueryString(params);

      let headers = getHeaders();
      headers["Content-Type"] = "application/x-www-form-urlencoded";

      return HttpClient.post(url, formData, headers).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.commandFunc = (method, entity, header) => {
      let url = `${serverApiPath}/${this.entityName}/command/${method}`;
      formDataObj(entity);
      let headers = getHeaders();
      headers["Content-Type"] = header ? header : "application/json";

      if (header && header.indexOf("form-data") !== -1) {
        return HttpClient.post(url, entity).then(
          resp => JSON.parse(resp),
          resp => Promise.reject(JSON.parse(resp))
        );
      }

      return HttpClient.post(url, JSON.stringify(entity), headers).then(
        resp => (resp ? JSON.parse(resp) : null),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.submit = (method, entity, header) => {
      let url = `${serverApiPath}/${this.entityName}/${method}`;
      // let jsonData = toQueryString(entity);
      formDataObj(entity);
      let headers = getHeaders();
      headers["Content-Type"] = header ? header : "application/json";

      if (header && header.indexOf("form-data") !== -1) {
        return HttpClient.post(url, entity).then(
          resp => JSON.parse(resp),
          resp => Promise.reject(JSON.parse(resp))
        );
      }

      return HttpClient.post(url, JSON.stringify(entity), headers).then(
        resp => JSON.parse(resp),
        resp => Promise.reject(JSON.parse(resp))
      );
    };

    this.customFormData = (method, data) => {
      let url = `${serverApiPath}/${this.entityName}/${method}`;
      // let jsonData = toQueryString(entity);

      let headers = getHeaders();
      headers["Content-Type"] = "application/json";

      return HttpClient.post(url, JSON.stringify(data), headers).then(resp =>
        JSON.parse(resp)
      );
    };
  }
}

class RestApi {
  static getEntityManager(entityName, path) {
    return new EntityManager(entityName, path);
  }

  static findVerificationCode() {
    // let header = {
    //     'Content-Type': 'image/*',
    // };
    return HttpClient.get("/api/auth/verify_code").then(resp => resp);
  }

  static login(data) {
    return HttpClient.post("/api/auth/login", data).then(resp =>
      JSON.parse(resp)
    );
  }

  static loginDo(data) {
    return HttpClient.post("/api/auth/logindo", data).then(resp =>
      JSON.parse(resp)
    );
  }

  static logout(data) {
    return HttpClient.post("/api/auth/logout", data).then(resp =>
      JSON.parse(resp)
    );
  }

  static getUserInfo(){
    let headers = getHeaders();
    return HttpClient.get("/index/access",headers).then(resp => resp);
  }
}

export default RestApi;

const userManager = RestApi.getEntityManager("user");
const saleManager = RestApi.getEntityManager("sale");
const adminManager = RestApi.getEntityManager("admin");
const classManager = RestApi.getEntityManager("classify");
const indexManager = RestApi.getEntityManager("index");
// const checkOutManager = RestApi.getEntityManager('InventoryCheckOut', '/Inventory');

export { userManager, saleManager, adminManager, indexManager, classManager,toQueryString,download};
