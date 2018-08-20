import React, { Component } from 'react';
 import { Provider } from 'react-redux'
 import store from './Redux/store'
 import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'


class App extends Component {
  componentDidMount(){
  //  store.dispatch(actions.demo({a:400,b:500}));
    console.log(this.props)//路由对象

}
  render() {
    return (
      <Provider store={store}>
        <ReactCSSTransitionGroup transitionName="showlist" transitionAppear={true}   transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppearTimeout={300}>
        <div className="App">
             
            {this.props.children}
        </div>
        </ReactCSSTransitionGroup>
    </Provider>
      
    );
  }
}

export default App;
