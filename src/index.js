import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
/* eslint camelcase: 0 */
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import configureStore from './redux/store/configureStore';
import Routers from './routers';
import env from 'utils/env';

/* $FlowFixMe */
import './styles/index.less';

window.ROUTE_PREFIX = env.ROUTE_PREFIX;
const store = configureStore();
if (process.env.NODE_ENV !== 'production') {
  window.React = React;
  sessionStorage.setItem('appId', 1962);
  sessionStorage.setItem('loginStatus','login');
}

ReactDOM.render(
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <LocaleProvider locale={zh_CN}>
        <Routers />
      </LocaleProvider>
    </div>
  </Provider>,
  document.getElementById('root'),
);
