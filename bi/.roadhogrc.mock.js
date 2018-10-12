import mockjs from 'mockjs';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {

  'POST /api/fake_chart_data': (req, res) => {
    res.send({
      "success":true,
      "data":{
        "list":[{"x":"2018-02-25","amount":600.00,"y":"600.00"},{"x":"2018-02-26","amount":600.00,"y":"600.00"},{"x":"2018-02-28","amount":500.00,"y":"500.00"},{"x":"2018-03-01","amount":600.00,"y":"600.00"},{"x":"2018-03-02","amount":5500.00,"y":"5,500.00"}],
      "total":"5,500.00"
      }
    });
    return;
  },
  'POST /apiPc/*': 'http://10.1.14.7:8091',
  'POST /apiPc/login': (req, res) => {
    const { userName, code, isRemember } = req.body;
    if(userName === '18657631531' && code === '123456'){
      res.send({ 
        "success": true,
        "msg": "",
        "data": { "id": "1", "access_token": "qel5048r45ig5l2j3so2cogho6" } });
      return ;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest'
    });
  },
  'POST /login': 'http://10.1.14.7:8091',
  'POST /apiPc/app/loginOut.html': (req, res) => {
      res.send({ 
        "error_code": 0,
        "msg": "",
        "data": {} 
      });
      return;
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      "timestamp": 1513932555104,
      "status": 500,
      "error": "error",
      "message": "error",
      "path": "/base/category/list"
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      "timestamp": 1513932643431,
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/base/category/list/2121212"
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      "timestamp": 1513932555104,
      "status": 403,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      "timestamp": 1513932555104,
      "status": 401,
      "error": "Unauthorized",
      "message": "Unauthorized",
      "path": "/base/category/list"
    });
  },
};

export default noProxy ? {} : delay(proxy, 1000);
