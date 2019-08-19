/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBreadcrumbs } from 'modules/systemRedux';
import { Layout, Icon, Row, Col } from 'antd';
import Link from '../page-link';
import Logo from '../logo';
import HeaderUser from '../header-user';
import LeftNav from '../leftNav';
import BreadcrumbComponent from '../breadcrumb';


import { routerConfig } from '../../../routers';

import './index.less';

const { Header, Sider, Content } = Layout;
type Props = {
    children: any,
    breadcrumbs: Array<Object>,
    setBreadcrumbs: typeof setBreadcrumbs,
}
type State = {
    collapsed: Boolean,
}
class Frame extends Component<Props, State> {
    state = {
        collapsed: false,
    };

    componentDidMount = () => {
        const defaultRouter = routerConfig.find(item => item.default);
        this.props.setBreadcrumbs([{
            key: defaultRouter.router.path,
            text: defaultRouter.name,
            path: defaultRouter.router.path,
            icon: 'user'
        }]);
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const { breadcrumbs } = this.props;
        return (
            <Layout styleName="base-frame">
                <Sider trigger={null} collapsible
                    collapsed={this.state.collapsed} width="256" styleName="sider">
                    <div styleName="logo-wraper" >
                        <Link to="/">
                            <Logo
                                min={this.state.collapsed}
                                title="慕思城后台管理"
                            />
                        </Link>
                    </div>
                    <LeftNav collapsed={this.state.collapsed}
                        setBreadcrumbs={this.props.setBreadcrumbs} />
                </Sider>
                <Layout>
                    <Header styleName="header" >
                        <Row>
                            <Col span={10} >
                                <Icon
                                    styleName="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <BreadcrumbComponent dataSource={breadcrumbs} />
                            </Col>
                            <Col span={14} style={{ textAlign: 'right' }}>
                                <HeaderUser />
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
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
            setBreadcrumbs
        }, dispatch,
    ),
)(Frame);