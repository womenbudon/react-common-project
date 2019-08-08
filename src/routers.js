/**
 * @flow
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Icon } from 'antd';
import App from './containers';
import User from './pages/user';
import Login from './containers/login';
import Authenticate from './component/authroute';
import Authority from './pages/authority';
import Role from './pages/role';

export const routerConfig: RouterConfig = [
  {
    name: '用户管理',
    image: <i className="icon iconfont icon-gailan" />,
    router: { path: 'userManage', component: User },
  },
  {
    name: '权限管理',
    image: <i className="icon iconfont icon-jingbao" />,
    router: { path: 'authorityManage', component: Authority },
  },
  {
    name: '角色管理',
    image: <i className="icon iconfont icon-tongji" />,
    router: { path: 'roleManage', component: Role },
  },
];

 const getRouters = (config: RouterConfig) => config.map((items) => {
    const { children } = items;
    let routers = [];
    if (children) {
      routers = children.map(child => setRoute(child));
    } else {
      routers = setRoute(items);
    }
    return routers;
  });

  const setRoute = (item: Object) => {
    const { router, subRouter } = item;
    const routers = subRouter ?
      subRouter.map(route => <Route key={route.path} path={`${ROUTE_PREFIX}/${route.path}`} exact component={route.component} />) :
      [];
    router && routers.push(<Route key={router.path} path={`${ROUTE_PREFIX}/${router.path}`} exact component={router.component} />);
    return routers;
  };

  const jumpToLogin = withRouter(({ history }) => {
    const loginStatus = sessionStorage.getItem('loginStatus');
    console.log(loginStatus);
    if (!loginStatus) {
      history.replace(`${ROUTE_PREFIX}/login`);
    }
    return null;
  });

  const routes = () => {
    return (
      <Router>
        <Switch>
          <Route path={`${ROUTE_PREFIX}/login`} component={Login} />
          <Route  path={`${ROUTE_PREFIX}`} render={() => (
              <App>
                <Switch>
                  {getRouters(routerConfig)}
                  <Route
                    path={`${ROUTE_PREFIX}`}
                    exact
                    component={Authenticate}
                  />
                  <Redirect from={`${ROUTE_PREFIX}`} to={`${ROUTE_PREFIX}/userManage`} />
                  <Route component={() => <div>加载中...</div>} />
                </Switch>
                <Route component={jumpToLogin} />
              </App>
            )} />
        </Switch>
      </Router>
    );
  };

export default routes;
