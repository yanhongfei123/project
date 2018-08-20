import fetch from "isomorphic-fetch";

// Action
const SAVE_GEOHASH = "SAVE_GEOHASH";
const RECORD_ADDRESS = "RECORD_ADDRESS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const REQUEST_POSTS = "REQUEST_POSTS";
const RECEIVE_POSTS = "RECEIVE_POSTS";
const RECORD_USERINFO = "RECORD_USERINFO";
// music

export const isShowIndex = isShowIndex => {
  return {
    type: 'IS_SHOW_INDEX',
    isShowIndex
  }
}


export const currentAnimate = animateCls => {
    return {
      type: 'CURRENT_ANIMATE',
      animateCls
    }
}

export const initMusicData = musicData => {
  return {
    type: "INIT_MUSIC_DATA",
    musicData
  };
};

export const initFooterMusic = audio => {
  return {
    type: "INIT_MUSIC",
    audio
  };
};

export const changeMusicStatu = statu => {
  return {
    type: "CHANGE_MUSIC_STATU",
    statu
  };
};

export const setNextMusic = index => {
  return {
    type: "NEXT_MUSIC",
    index
  };
};

//开始获取数据 CHANGE_MUSIC_STATU
const requestPosts = isFetching => {
  return {
    type: REQUEST_POSTS,
    isFetching
  };
};

// 记录用户信息
export const recordUserInfo = userinfo => {
  return {
    type: RECORD_USERINFO,
    userinfo
  };
};

//获取数据成功
export const receivePosts = ({ latitude, longitude }) => {
  return {
    type: RECEIVE_POSTS,
    latitude,
    longitude
  };
};

export const recordAddress = ({ latitude, longitude }) => {
  return {
    type: RECORD_ADDRESS,
    latitude,
    longitude
  };
};

// 页面初次渲染时获取数据  /v2/pois/
export const fetchPosts = (path, geohash, callback) => {
  let url = "http://cangdu.org:8001" + path + geohash;
  return dispatch => {
    dispatch(requestPosts(true));
    return fetch(url, {
      mode: "cors",
      "Content-Type": "application/json"
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        callback && callback(json);
        dispatch(receivePosts(json));
      })
      .catch(error => console.log(error));
  };
};

export const saveGeohash = geohash => {
  return {
    type: SAVE_GEOHASH,
    geohash
  };
};

export const addToDo = item => {
  return {
    type: ADD_TODO,
    item
  };
};

export const deleteToDo = index => {
  return {
    type: DELETE_TODO,
    index
  };
};
