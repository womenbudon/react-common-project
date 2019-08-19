import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png';
import './style.less';

export default class Logo extends Component {
    static propTypes = {
        min: PropTypes.bool,
    };
    static defaultProps = {
        logo: logo,
        title: '',
        min: false,
    };

    render() {
        const { min, title } = this.props;
        return (
            <div styleName="logo">
                <img src={logo} alt="logo" />
                <h1 className={min ? 'title-hide' : ''}>{title}</h1>
            </div>
        );
    }
}
