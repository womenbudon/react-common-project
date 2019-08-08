/**
 * @flow
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {
  LayoutRouter: any,
};
class AuthRoute extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    // FIXME 接
    const loginStatus = sessionStorage.getItem('loginStatus');
    if(loginStatus) { // 已经登录
      this.props.history.replace(`${ROUTE_PREFIX}/userManage`)
    }else { 
      this.props.history.replace(`${ROUTE_PREFIX}/login`)
    }
    // 获取用户信息
    // 是否登录
    // 现在的url地址  login是不需要跳转的
  }

  render() {
    return null;
  }
}

export default AuthRoute
