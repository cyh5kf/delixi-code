import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['login'], () => import('../layouts/BasicLayout')),
    },
    '/borrowcompany/managecompany':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany')),            
    },
    '/supplychain/supplychaincompany': {
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Company')),
    },
    '/supplychain/supplychaincompanyinfo':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Company/Info')),      
    },
    '/supplychain/supplychainprivate': {
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Private')),
    },
    '/supplychain/supplychainprivateinfo':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Private/Info')),      
    },
    '/supplychain/handlecompany':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Company/Handle')),      
    },
    '/supplychain/createcompany':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Company/Create')),      
    },
    '/supplychain/carpledge':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Carpledge')),      
    },
    '/supplychain/carpledgehandle':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Carpledge/Handle')),      
    },
    '/supplychain/carpledgeinfo':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Carpledge/Info')),      
    },
    '/supplychain/insurance':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Insurance')),      
    },
    '/supplychain/insurancehandle':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Insurance/Handle')),      
    },
    '/supplychain/insuranceinfo':{
      component: dynamicWrapper(app, [], () => import('../routes/Supplychain/Insurance/Info')),      
    },
    '/borrowcompany/addcompany':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany/AddCompany')),            
    },
    '/borrowcompany/handlecompany':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany/Handle')),            
    },
    '/borrowcompany/channelmanage':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany/Channelmanage')),            
    },
    '/borrowcompany/createchannelmanage':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany/Channelmanage/Create')),            
    },
    '/borrowcompany/handlechannelmanage':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany/Channelmanage/Handle')),            
    },
    '/borrowcompany/infochannelmanage':{
      component: dynamicWrapper(app, [], () => import('../routes/BorrowCompany/Channelmanage/Info')),            
    },
    '/expenditure/d01/process':{
      component: dynamicWrapper(app, [], () => import('../routes/Expenditure/D01')),            
    },
    '/expenditure/d02/property':{
      component: dynamicWrapper(app, [], () => import('../routes/Expenditure/D02')),            
    },
    '/expenditure/d02/propertyinfo':{
      component: dynamicWrapper(app, [], () => import('../routes/Expenditure/D02/Info')),            
    },
    '/systemManagement/menuManagement':{
      component: dynamicWrapper(app, ['system'], () => import('../routes/SystemManagement/MenuManagement/MenuManagement')),            
    },
    // '/systemManagement/usercontrol':{
    //   component: dynamicWrapper(app, ['system'], () => import('../routes/SystemManagement/Usercontrol')),            
    // },
    // '/systemManagement/rolecontrol':{
    //   component: dynamicWrapper(app, ['system'], () => import('../routes/SystemManagement/Rolecontrol')),            
    // },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/302': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/302')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    // '/user': {
    //   component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    // },
    // '/user/login': {
    //   component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
