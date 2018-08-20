// Store
import {applyMiddleware,createStore, combineReducers,bindActionCreators} from 'redux';
//import * as reducer from './reducer';
import  reducer from './reducer2';

 import thunk from 'redux-thunk';


console.log(Object.keys(reducer))


//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
var store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk),
    //  applyMiddleware(thunk, promise, logger)
);


console.log(store.getState())

store.subscribe(() => { //监听state变化
    console.log('state变化=>' , store.getState());
    
});


export default store;

