/**
 * @flow
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'antd';

import { routerConfig } from '../../routers';

const { SubMenu } = Menu;

type Props = {
  collapsed: boolean,
  toggleCollapsed: Function,
}

type State = {
  currentkey: string,
}
class leftNav extends Component<Props, State> {
  defaultKey = 'overview';
  state = {
    currentkey: this.defaultKey,
  }

  // window.location变化的时候更新
  static getDerivedStateFromProps() {
    const { href } = window.location;
    let keypath = '';
    routerConfig.forEach(item => {
      if (item.name && item.router && href.indexOf(item.router.path) > -1) {
        keypath = item.router.path;
        item.children && item.children.forEach(child => {
          if (href.indexOf(child.router.path) > -1) {
            keypath = child.router.path;
          }
        });
      }
    });
    return {
      currentkey: keypath,
    }
  }

  handleSelect = (type: Object) => {
    this.setState({
      currentkey: type.key,
    })
  }
  render() {
    const { collapsed, toggleCollapsed } = this.props;
    let { currentkey } = this.state;
    if (!currentkey) currentkey = this.defaultKey;
    const outerClass = collapsed ? 'leftNav collapsed' : 'leftNav';
    return (
      <div className={outerClass}>
        <Button className="collapsed-btn" type="primary" onClick={toggleCollapsed}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          className="leftNav-menu"
          onSelect={this.handleSelect}
          defaultSelectedKeys={[currentkey]}
          defaultOpenKeys={['allwelllid']}
          mode="inline"
          inlineCollapsed={collapsed}
        >
          {routerConfig.map(item => (
            item.children ?
              <SubMenu
                key={item.router.path}
                title={<span>{item.image}<span className="title">{item.name}</span></span>}
              >
                {item.children && item.children.map(child => (
                  child.name ?
                    <Menu.Item key={child.router.path}>
                      <Link to={child.router.path ? `${ROUTE_PREFIX}/${child.router.path}` : `${ROUTE_PREFIX}/`}>
                        <span className="title">{child.name}</span>
                      </Link>
                    </Menu.Item> : null
                ))}
              </SubMenu> :
              <Menu.Item key={item.router.path}>
                <Link to={item.router.path ? `${ROUTE_PREFIX}/${item.router.path}` : `${ROUTE_PREFIX}/`}>
                  {item.image}
                  <span className="title">{item.name}</span>
                </Link>
              </Menu.Item>
          ))}
        </Menu>
      </div>
    )
  }
}

export default leftNav
