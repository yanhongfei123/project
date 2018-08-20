import React from 'react';
import App from '../App';
import {
  Router,
  browserHistory,
 } from 'react-router';


 const Home = (location, cb) => {  require.ensure([], require => {  cb(null, require('../components/home/home').default)},'Home')}
 const Login = (location, cb) => { require.ensure([], require => {  cb(null, require('../components/login/login').default) },'Login')}
 const City = (location, cb) => { require.ensure([], require => {  cb(null, require('../components/city/city').default)},'City')}
 const Msite = (location, cb) => {require.ensure([], require => {cb(null, require('../components/msite/msite').default)},'Msite')}
 const Food = (location, cb) => {require.ensure([], require => {cb(null, require('../components/food/food.jsx').default)},'Food')}
 const Profile= (location, cb) => {require.ensure([], require => {cb(null, require('../components/profile/profile.jsx').default)},'Profile')}
 const Service= (location, cb) => {require.ensure([], require => {cb(null, require('../components/service/service.jsx').default)},'Service')}
 const QuestionDetail= (location, cb) => {require.ensure([], require => {cb(null, require('../components/service/children/questionDetail.jsx').default)},'QuestionDetail')}
 
//  music
const MusicList= (location, cb) => {require.ensure([], require => {cb(null, require('../page/musicList/music.jsx').default)},'MusicList')}
 const Footer= (location, cb) => {require.ensure([], require => {cb(null, require('../page/footer/footer.jsx').default)},'Footer')}
 const Play= (location, cb) => {require.ensure([], require => {cb(null, require('../page/play/play.jsx').default)},'Play')}


// 异步组件用 getComponent 
const  routerMap = [
    { path: '/',
      component: App,
      indexRoute: { getComponent: MusicList },
      childRoutes: [
        {
          path:'play',
          getComponent:Play
        },
        {
          path:'home',
          getComponent:Home
        },
        { path: 'city',
           getComponent: City       
        },
        { path: 'login',
          getComponent: Login
        },
        { path: 'msite',
          getComponent: Msite
        }, 
        { path: 'food',
          getComponent: Food
        },
        { path: 'profile',
          getComponent: Profile
       },
       { path: 'service',
         getComponent: Service,
         childRoutes:[
            { path: 'questionDetail',
              getComponent: QuestionDetail
            }
         ]
       },




      ]
    }
  ]
  
const RouteConfig = (
    <Router history={browserHistory}   routes={routerMap} ></Router>
)
export default RouteConfig;