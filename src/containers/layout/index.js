/**
 * @flow
 */
import React, { Component } from 'react';

import Header from './header';
import LeftNav from './leftNav';
import './index.less';

type Props = {
  children: any,
}

type State = {
  collapsed: boolean,
}

class app extends Component<Props, State> {
  state = {
    collapsed: false,
  }
  componentDidMount() {
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed } = this.state;
    const mainClass = collapsed ? 'main collapsed' : 'main';
    return (
      <div className="container">
        <Header />
        <div className="content">
          <LeftNav
            toggleCollapsed={this.toggleCollapsed}
            collapsed={collapsed}
          />
          <div className={mainClass}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default app
