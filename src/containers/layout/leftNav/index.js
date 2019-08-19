/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

import { routerConfig, getRouterByPath } from '../../../routers';
import './index.less';

const { SubMenu } = Menu;

type Props = {
    breadcrumbs: Array<Object>,
    setBreadcrumbs: typeof setBreadcrumbs,
}

type State = {
    currentkey: string,
}
class LeftNav extends Component<Props, State> {
    state = {
        currentkey: '',
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.breadcrumbs !== this.props.breadcrumbs && this.props.breadcrumbs) {
            console.log(this.props.breadcrumbs);
            const { breadcrumbs } = this.props;
            this.setState({
                currentkey: breadcrumbs[breadcrumbs.length - 1].key
            });
        }
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
        };
    }

    handleSelect = (type: Object) => {

        const paths = getRouterByPath(type.key.split('/'));
        const breadcrumbs = paths.map(item => {
            return {
                key: item.router.path,
                text: item.name,
                path: item.router.path,
                icon: item.icon
            };
        });
        this.props.setBreadcrumbs(breadcrumbs);
        // 获取多个key
        this.setState({
            currentkey: type.key,
        });
    }
    render() {
        let { currentkey } = this.state;
        if (!currentkey) currentkey = this.defaultKey;
        return (
            <Menu
                theme="dark"
                className="left-nav"
                onSelect={this.handleSelect}
                defaultSelectedKeys={[currentkey]}
                // defaultOpenKeys={['allwelllid']}
                mode="inline"
            >
                {routerConfig.map(item => (
                    item.children ?
                        <SubMenu
                            key={item.router.path}
                            title={<span>{item.image}<span styleName="title">{item.name}</span></span>}
                        >
                            {item.children && item.children.map(child => (
                                child.name ?
                                    <Menu.Item key={child.router.path}>
                                        <Link to={child.router.path ? `${ROUTE_PREFIX}/${child.router.path}` : `${ROUTE_PREFIX}/`}>
                                            <span styleName="title">{child.name}</span>
                                        </Link>
                                    </Menu.Item> : null
                            ))}
                        </SubMenu> :
                        <Menu.Item key={item.router.path}>
                            <Link to={item.router.path ? `${ROUTE_PREFIX}/${item.router.path}` : `${ROUTE_PREFIX}/`}>
                                {item.image}
                                <span styleName="title">{item.name}</span>
                            </Link>
                        </Menu.Item>
                ))}
            </Menu>
        );
    }
}

export default connect(
    (state) => {
        const { systemReducer } = state;
        return ({ breadcrumbs: systemReducer.breadcrumbs });
    },
    (dispatch: Dispatch) => bindActionCreators(
        {
        }, dispatch,
    ),
)(LeftNav);
