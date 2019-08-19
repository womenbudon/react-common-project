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
            <div styleName="container">
                <div styleName="head">
                    <div styleName="logo">慕思城后台管理</div>
                </div>
                <div styleName="body">
                    <div styleName="login-wraper">
                        <div styleName="login-header">
                            <div>慕思城后台 logo</div>
                        </div>
                        <div styleName="login-content" >
                            <LoginForm logOn={this.logOn} onChangeUserName={this.onChangeUserName} onChangePassWord={this.onChangePassWord} />
                        </div>
                    </div>
                </div>
                <div styleName="footer">
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
