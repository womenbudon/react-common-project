/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { loginPlarform } from 'modules/loginRedux';
import { LoginForm } from './form';

import './style/index.less';

type Props = {
  loginPlarform: typeof loginPlarform,
};
type State = {
  username: string,
  password: string,
};
class LoginPalatform extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.logOn = this.logOn.bind(this);
  }

  componentWillMount = () => {
    const loginStatus = sessionStorage.getItem('loginStatus');
    if (loginStatus) this.props.history.replace(`${ROUTE_PREFIX}`);
  }

  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  }

  onChangePassWord = (e) => {
    this.setState({ password: e.target.value });
  }

  logOn = () => {
    const { username, password } = this.state;
    if (username !== 'admin' && password !== '123456') {
      message.warning('用户名或密码错误');
    } else {
      this.props.loginPlarform({
        username: this.state.username,
        password: this.state.password,
      }).then(() => {
        sessionStorage.setItem('loginStatus', 'login');
        this.props.history.replace(`${ROUTE_PREFIX}`);
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="head">
          <div className="logo">新农通平台管理</div>
        </div>
        <div className="body">
          <div className="login-wraper">
            <div className="login-header">
              <div>新农通 logo</div>
            </div>
            <div className="login-content" >
              <LoginForm logOn={this.logOn} onChangeUserName={this.onChangeUserName} onChangePassWord={this.onChangePassWord} />
            </div>
          </div>
        </div>
        <div className="footer">
            Copyright © 2011-2018 xxx信息技术有限公司
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const { loginRedux } = state;
    return ({ ...loginRedux });
  },
  (dispatch: Dispatch) => bindActionCreators(
    { loginPlarform }, dispatch,
  ),
)(LoginPalatform);
