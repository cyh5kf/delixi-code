import { isUrl } from '../utils/utils';
import { getmenu } from '../services/api.js';
import { getMenu,gettoken } from '../utils/authority.js';



function setmenu(){
  var menu = JSON.parse(getMenu());
  var menuData = [];
  if (menu) {
    menuData = menu.list.map((item)=>{
      return {
        name: item.name,
        path: item.url.match(/\#\/(\w+)/)[1],
        icon: 'folder',
        children:item.list.map((it)=>{
          return {
            name:it.name,
            path:it.url.match(/(\w+)$/)[1]
          }
        })
      }
    })
    
  }
  return menuData;
}
// const menuData = setmenu()
// const menuData = [
//   {
//     name: '借款企业管理',
//     path: 'borrowcompany',
//     icon: 'folder',
//     children: [
//       {
//         name: '企业列表',
//         path: 'managecompany',
//       },{
//         name: '项目渠道管理',
//         path: 'channelmanage',
//       }
//     ],
//   },{
//     name: '供应链',
//     path: 'supplychain',
//     icon: 'folder',
//     children: [
//       {
//         name: '供应链（企业）业务列表',
//         path: 'supplychaincompany',
//       },
//       // {
//       //   name: '供应链（个人）业务列表',
//       //   path: 'supplychainprivate',
//       // }
//     ],
//   },
//   // {
//   //   name: '消费金融（个人）',
//   //   path: 'expenditure',
//   //   icon: 'folder',
//   //   children: [
//   //     {
//   //       name: 'D01-01全局',
//   //       path: 'd01',
//   //       icon:'folder',
//   //       children:[{
//   //         name:'D01-01业务总流程',
//   //         path:'process',
//   //       }]
//   //     },{
//   //       name: 'D02资产管理',
//   //       path: 'd02',
//   //       icon:'folder',
//   //       children:[{
//   //         name:'D02-01资产列表',
//   //         path:'property',
//   //       }]
//   //     }
//   //   ],
//   // },
//   {
//     name: '系统管理',
//     path: 'systemManagement',
//     icon: 'setting',
//     children: [
//       {
//         name: '菜单管理',
//         path: 'menuManagement',
//       }
//       // ,{
//       //   name: '用户管理',
//       //   path: 'usercontrol',
//       //   icon: "user",
//       // },{
//       //   name: '角色管理',
//       //   path: 'rolecontrol',
//       // }
//     ],
//   },
// ];

function formatter(data, parentPath = '/', parentAuthority) {

  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}


export const getMenuData = () =>{
  const menuData = setmenu()
  
  return formatter(menuData);
} 
