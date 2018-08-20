import React from 'react';
import App from '../App';
import {
  Router,
  browserHistory,
} from 'react-router';


const Home = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/home/home').default)
  }, 'Home')
}
const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/login/login').default)
  }, 'Login')
}
const City = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/city/city').default)
  }, 'City')
}
const Msite = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/msite/msite').default)
  }, 'Msite')
}
const Food = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/food/food.jsx').default)
  }, 'Food')
}
const Profile = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/profile/profile.jsx').default)
  }, 'Profile')
}
const Service = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/service/service.jsx').default)
  }, 'Service')
}
const QuestionDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../components/service/children/questionDetail.jsx').default)
  }, 'QuestionDetail')
}



// 异步组件用 getComponent 
const routerMap = [{
  path: '/',
  component: App,
  indexRoute: {
    getComponent: Home
  },
  childRoutes: [{
      path: 'home',
      getComponent: Home
    },
    {
      path: 'city',
      getComponent: City
    },
    {
      path: 'login',
      getComponent: Login
    },
    {
      path: 'msite',
      getComponent: Msite
    },
    {
      path: 'food',
      getComponent: Food
    },
    {
      path: 'profile',
      getComponent: Profile
    },
    {
      path: 'service',
      getComponent: Service,
      childRoutes: [{
        path: 'questionDetail',
        getComponent: QuestionDetail
      }]
    },


  ]
}]

const RouteConfig = (

<Router history = { browserHistory }
  routes = { routerMap } > 
</Router>
)
export default RouteConfig