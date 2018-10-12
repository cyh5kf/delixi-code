import moment from 'moment';

//遍历导航菜单，找出当前路由所在的SubMenu，即openKeys
export const getCurrentOpenKeys = (menuCurrent, menuList) => {
    let currentOpenKeys = [];
    for( let sub of menuList) {
        for( let item of sub.menuItem) {
            let itemPath = item.path;
            if (itemPath.indexOf(menuCurrent) !== -1) {
                currentOpenKeys.push(sub.subKey);
                break;
            }
        }
    }
    return currentOpenKeys;
}

// 表格数据格式
export const createColumn =(title,key,render) =>{
    return {
        title: title,
        dataIndex: key,
        key: key,
        render:render
    };
}

// 格式化表单提交的数据
export const getFormArray = (fieldsValue) => {
    const format = 'HH:mm';
    let newValue = [];
    let dataObj = {};
    for(let key in fieldsValue) {
        let str = key; // 原始key值字符串
        let i = str.indexOf("-"); //下标
        let keyObj = str.substring(0, i); // key值
        let num = str.substring(i+1);  //序号
        let value = fieldsValue[key]; //value值
        if(keyObj === "startTime" || keyObj === "endTime") {  // 转换时间格式
            value = moment(value).format(format);
        }
        if(dataObj[num]) {  // 格式化对象，变成{1: {}, 2: {}, ...}的格式
            dataObj[num][keyObj] = value;
        } else {
            dataObj[num] = {}
            dataObj[num][keyObj] = value;
        }
     }
    Object.keys(dataObj).forEach(function(i){  // 将对象转成数组  {1: {}, 2: {}, ...}  =》 [0: {}, 1: {}, ...]
        newValue.push(dataObj[i]);
    });
    return newValue;
}


/**
 * @method
 * @param {Type} data={} 目标对象
 *  {
 *      fieldsValue: 表单值
 *      rewardFormValue：最终结果值
 *      isError：校验是否成功，true为不成功
 *  }
 * @returns 返回获取值和是否校验成功
 * @desc 格式化奖励规则表单数据
 */
export const getRewardArray = (fieldsValue, rewardFormValue, isError) => {
    let dataObj = {};
    for(let key in fieldsValue) {
        let str = key; // 原始key值字符串
        let i = str.indexOf("-"); //下标
        let keyObj = str.substring(0, i); // key值
        let num = str.substring(i+1);  //序号
        let value = fieldsValue[key]; //value值
        if(dataObj[num]) {  // 格式化对象，变成{1: {}, 2: {}, ...}的格式
            dataObj[num][keyObj] = value;
        } else {
            dataObj[num] = {}
            dataObj[num][keyObj] = value;
        }
    }
    Object.keys(dataObj).forEach(function(i){  // 将对象转成数组  {1: {}, 2: {}, ...}  =》 [0: {}, 1: {}, ...]
        dataObj[i].rewardMoney = !dataObj[i].rewardRuleCustom? 0: dataObj[i].rewardRuleCustom.rewardMoney;
        dataObj[i].rewardName = !dataObj[i].rewardRuleCustom? "": dataObj[i].rewardRuleCustom.rewardName;
        dataObj[i].rewardRuleId = !dataObj[i].rewardRuleCustom? "": dataObj[i].rewardRuleCustom.rewardRuleId;
        dataObj[i].rewardType = dataObj[i].rewardTypeCustom.rewardType;
        dataObj[i].rewardProbability = dataObj[i].rewardProbabilityCustom.rewardProbability;
        delete dataObj[i].rewardRuleCustom;
        delete dataObj[i].rewardTypeCustom;
        delete dataObj[i].rewardProbabilityCustom;
        const { rewardMoney, rewardName, rewardRuleId, rewardProbability, rewardType } = dataObj[i];
        if(rewardType === "4" || rewardType === "5" || rewardType === "6") { // 校验奖励类型为现金，金币，积分相关选项是否为空
            if( rewardMoney === undefined || rewardProbability === undefined ) {
                isError = true;
            }
        } else if(rewardType === "99") { // 校验奖励类型为谢谢惠顾相关选项是否为空
            if( rewardProbability === undefined ) {
                isError = true;
            }
        } else { // 校验奖励类型为红包/加息券/任务相关选项是否为空
            if( rewardMoney === undefined || rewardName === undefined || rewardRuleId === undefined || rewardProbability === undefined ) {
                isError = true;
            }
        }
        
        rewardFormValue.push(dataObj[i]);
    });
    const result = {
        rewardFormValue,
        isError
    }
    return result;
}