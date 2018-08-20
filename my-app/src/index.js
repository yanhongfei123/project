
import ReactDOM from 'react-dom';
import route from './router/index'; //路由配置
import './config/rem.js';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

ReactDOM.render(
        route
     , document.getElementById('root')
  );


