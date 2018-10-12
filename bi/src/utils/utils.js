import moment from 'moment';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = moment().format('YYYY-MM-DD');
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'yesterday') {
    const yesterday =  moment().subtract(1, 'days').format('YYYY-MM-DD');
    return [yesterday, yesterday];
  }

  if (type === 'today') {
    return [now, now];
  }

  if (type === 'lastWeek') {
    const lastWeek =  new Date(moment().subtract(1, 'weeks'));
    const beginTime = moment(lastWeek).startOf('week').format('YYYY-MM-DD');
    const endTime = moment(lastWeek).endOf('week').format('YYYY-MM-DD');
    return [beginTime, endTime];
  }

  if (type === 'week') {
    const beginTime = moment().startOf('week').format('YYYY-MM-DD');
    return [beginTime, now];
  }

  if (type === 'lastMonth') {
    const lastMonth =  new Date(moment().subtract(1, 'months'));
    const beginTime = moment(lastMonth).startOf('month').format('YYYY-MM-DD');
    const endTime = moment(lastMonth).endOf('month').format('YYYY-MM-DD');
    return [beginTime, endTime];
  }

  if (type === 'month') {
    const beginTime = moment().startOf('month').format('YYYY-MM-DD');
    return [beginTime, now];
  }

  if (type === 'nextMonth') {
    const endTime =  moment().add(1, 'months').format('YYYY-MM-DD');
    return [now, endTime];
  }

  if (type === 'lastYear') {
    const lastYear =  new Date(moment().subtract(1, 'years'));
    const beginTime = moment(lastYear).startOf('year').format('YYYY-MM-DD');
    const endTime = moment(lastYear).endOf('year').format('YYYY-MM-DD');
    return [beginTime, endTime];
  }

  if (type === 'year') {
    const beginTime = moment().startOf('year').format('YYYY-MM-DD');
    return [beginTime, now];
  }

  if (type === 'past7days') {
    const beginTime = moment().subtract(7, 'days').format('YYYY-MM-DD');
    return [beginTime, now];
  }

  if (type === 'past30days') {
    const beginTime = moment().subtract(30, 'days').format('YYYY-MM-DD');
    return [beginTime, now];
  }

  if (type === 'upToDate') {
    const beginTime = moment('2016-5-4').format('YYYY-MM-DD');
    return [beginTime, now];
  }
}

export function getFormatTime(rangePickerValue) {
  const result = {
    startTime: rangePickerValue[0],
    endTime: rangePickerValue[1]
  }
  return result;
}

export function getFormatTime2(rangePickerValue) {
  const startTime = moment(rangePickerValue[0]).format('YYYY-MM-DD');
  const endTime = moment(rangePickerValue[1]).format('YYYY-MM-DD');
  const result = {
    startTime,
    endTime
  }
  return result;
}

export function momentTime(rangePickerValue) {
  const startTime = moment(rangePickerValue[0]);
  const endTime = moment(rangePickerValue[1]);
  const result = [startTime, endTime];
  return result;
}

export function getFormatTimeArray(rangePickerValue) {
  const startTime = moment(rangePickerValue[0]).format('YYYY-MM-DD');
  const endTime = moment(rangePickerValue[1]).format('YYYY-MM-DD');
  const result = [startTime, endTime];
  return result;
}

// 时间间隔计算(间隔天数)
export function GetDateDiff(startDate,endDate) {  
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();   
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();     
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);     
    return  dates;
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}


function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!');  // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routePath !== path);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}


/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

// 转万元
export function convert(num) {
  if(num) {
      return (num*1/10000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
      return '';
  }
}

// 转万元不转千分位
export function convert2(num) {
  if(num) {
      return (num*1/10000).toFixed(2);
  } else {
      return '';
  }
}

// 转千分位
export function toQfw(num) {
  if(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
      return '';
  }
};

// 转亿元
export function trunToYi(num) {
  if(num) {
      return (num*1/100000000).toFixed(4).toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  } else {
      return '';
  }
}

// 转亿元不转千分位
export function trunToYi2(num) {
  if(num) {
      return (num*1/100000000).toFixed(4);
  } else {
      return '';
  }
}

// 获取滚动条宽度
export function getScrollbarWidth() {

    var scrollDiv = document.createElement("div");
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;

}

// 迭代找父节点

export function getnode(node,oldnode){
  if (node!=document.body&&node!=oldnode) {
    return getnode(node.parentNode,oldnode)
  }else if(node ==oldnode){
    return true
  }else if(node ==document.body){
    return false
  }
}

export function savestorage(name,value){
  if (typeof value=='object') {
    localStorage.setItem(name, JSON.stringify(value));
  }else{
    localStorage.setItem(name, value);    
  }
}

function toChineseNum(num){
    let dtext=['','十','百','千','万']
    let len=num.toString().length
    let numArr=num.toString().split('')
    let numTxt=''
    const toT=(numIndex)=>{
        const arr=['零','一','二','三','四','五','六','七','八','九']
        return arr[numIndex]
    }
    for(let i=1;i<=len;i++){
        if(len>5&&i<(len-3)){
            if(i==(len-4)){
                numTxt+=numArr[i-1]==0?'':toT(numArr[i-1])
                numTxt+='万'
            }else{
                if((numArr[i-2]==0&&numArr[i-1]==0)||((numArr[i-1]==0)&&(numArr[len-5]==0)&&numArr[i]==0)){
                    numTxt+=''
                }else{
                    numTxt+=(((numArr[i-1]==0)&&(numArr[len-5]!=0))||(numArr[i]!=0&&numArr[i-1]==0))?'零':(toT(numArr[i-1])+dtext[len-i-4])
                }
            }}else{
            if((numArr[i-1]==0&&i==len)||(numArr[i]==0&&numArr[i-1]==0)){
                numTxt+=''
            }else{
                numTxt+=numArr[i-1]==0?'零':(toT(numArr[i-1])+dtext[len-i])
            }
        }}
    return numTxt
}

export {toChineseNum}
