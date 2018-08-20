
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import route from './router/index'; //路由配置
import { Provider } from 'react-redux'
import store from './Redux/store'
import './config/rem.js';
import './index.scss';

import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

ReactDOM.render(
        <Provider store={store}>
           { route }
        </Provider>   
     , document.getElementById('root')
  );

