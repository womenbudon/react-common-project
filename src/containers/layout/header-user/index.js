/**
 * @flow
 */
import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';

import './index.less';

const { Item } = Menu;

class HeaderUser extends Component {

    handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            this.logout();
        }

        // if (key === 'modifyPassword') {
        //     this.setState({ passwordVisible: true });
        // }
    };

    logout = () => {
        sessionStorage.removeItem('loginStatus');
        window.location.href = '/login';
    };
    render() {
        const menu = (
            <Menu styleName="menu" selectedKeys={[]} onClick={this.handleMenuClick}>
                <Item key="modifyPassword"><Icon type="edit" />修改密码</Item>
                <Menu.Divider />
                <Item key="logout"><Icon type="logout" />退出登录</Item>
            </Menu>
        );
        return (
            <div styleName="user-menu" >
                <Dropdown overlay={menu} overlayClassName="drop-menu-overlay">
                    <span >
                        <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                        管理员
                        <Icon type="caret-down" />
                    </span>
                </Dropdown>

            </div>
        );
    }

}

export default HeaderUser;
