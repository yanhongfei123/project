import fetch from 'isomorphic-fetch'

// Action
const SAVE_GEOHASH = 'SAVE_GEOHASH'
const RECORD_ADDRESS = 'RECORD_ADDRESS'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'
const RECORD_USERINFO = 'RECORD_USERINFO'

const DEMO = 'DEMO'

//开始获取数据  store.dispatch(action.demo({a:400,b:500}))
export const demo = ({a,b}) => {
    return {
      type: DEMO,
      a,
      b
    }
  }


//开始获取数据
const requestPosts = (isFetching) => {
    return {
      type: REQUEST_POSTS,
      isFetching
    }
  }

// 记录用户信息
export const recordUserInfo = (userinfo) => {
    return {
      type: RECORD_USERINFO,
      userinfo
    }
  }


//获取数据成功
export  const receivePosts = ({latitude ,longitude}) => {
    return {
          type: RECEIVE_POSTS,
          latitude ,
          longitude
      }
  }

  export  const recordAddress = ({latitude ,longitude  }) => {
    return {
          type: RECORD_ADDRESS ,
          latitude,
          longitude
      }
  }


  export const editCase = () => (dispatch, getState) => {
    //　let state = jquery.extend(true, {}, getState().caseDetail.caseObject)
     //　dispatch(editCaseWithData(state))
     //　dispatch(fetchPlatform(true))
   }


// action可以返回一个对象，也可以返回一个函数

// 页面初次渲染时获取数据  /v2/pois/
// 类似于vue的action，在里面commit一个方法
// 一些全局通用的方法可以这样封装，比如登录 注册 等

export const fetchPosts = (path, geohash,callback) => {
    let url = 'http://cangdu.org:8001' + path + geohash;
    return (dispatch,getState)=> {
        dispatch(requestPosts(true));
        return fetch(url,{
             mode: 'cors',
            // "Content-Type": "application/json",
            　method: 'GET',
            　cache: 'default',
            　credentials: 'include'
        }).then(response => {
            if (response.ok) {
               return  response.json()
            }
        }).then(json =>{
            typeof callback  === 'function' && callback(json);
             dispatch(receivePosts(json));
        })
        .catch(error => console.log(error))
    }
}



 export  const saveGeohash = (geohash) => {
    return {
          type: SAVE_GEOHASH,
          geohash
      }
  }

  export  const addToDo = (item) => {
    return {
          type: ADD_TODO,
          item
      }
  }

  export  const deleteToDo = (index) => {
    return {
          type: DELETE_TODO,
          index
      }
    }


