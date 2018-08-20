// Reducer
let _userInfo = sessionStorage.getItem('userInfo');
var initState={
    isFetching:false,
     userInfo: _userInfo? JSON.parse(_userInfo) :{
        "username": "",
        "user_id": '',
        "id": '',
        "city": "广州",
        "registe_time": "2017-10-23 16:17",
        "point": 0,
        "mobile": "",
        "is_mobile_valid": true,
        "is_email_valid": false,
        "is_active": 1,
        "gift_amount": 0,
        "email": "",
        "delivery_card_expire_days": 0,
        "current_invoice_id": 0,
        "current_address_id": 0,
        "brand_member_new": 0,
        "balance": 0,
        "avatar": "default.jpg",
        "__v": 0
    },
     //用户信息
     geohash:'',
     _recordAddress:{
         "latitude":'',
         "longitude":''
     },
     recordAddress:{
         "latitude":'',
         "longitude":''
     },
    //  music
    audioDom:null,
    musicData:[],
    audio:{
        musicImgSrc: '',
        musicSrc:''  ,
        musicName:'',
    },
    skinColor:'#B72712',
    isShowMiniMusic:true,
    isPlaying:true,
    currentMusicIndex:0,
    isShowIndex:true,
    animateCls: 'normal', //过渡动画样式

}
export const isShowIndex = (state = initState.isShowIndex, action={}) => {
    switch (action.type) {
        case "IS_SHOW_INDEX":
            return  action.isShowIndex;         
        default:
            return state
    }
}

export const animateCls = (state = initState.animateCls, action={}) => {
    switch (action.type) {
        case "CURRENT_ANIMATE":
            return  action.animateCls;         
        default:
            return state
    }
}


export  const currentMusicIndex= (state = initState.currentMusicIndex, action={})=> {
    switch (action.type) {
        case 'NEXT_MUSIC':
            return  action.index;
        default:
            return state
    }
  }

export  const musicData= (state = initState.musicData, action={})=> {
    switch (action.type) {
        case 'INIT_MUSIC_DATA':
            return  action.musicData;
        default:
            return state
    }
  }

export  const audio= (state = initState.audio, action={})=> {
    switch (action.type) {
        case 'INIT_MUSIC':
            return {
               ...state,
               'musicImgSrc':action.audio.musicImgSrc,
               'musicSrc':action.audio.src,
               'musicName':action.audio.name
            }

        default:
            return state
    }
  }

export  const skinColor= (state = initState.skinColor, action={})=> {
    switch (action.type) {
        case 'RECORD_USERINFO':
            return action.userinfo
        default:
            return state
    }
  }


export  const isShowMiniMusic= (state = initState.isShowMiniMusic, action={})=> {
    switch (action.type) {
        case 'RECORD_USERINFO':
            return action.userinfo
        default:
            return state
    }
  }



export  const isPlaying= (state = initState.isPlaying, action={})=> {
    switch (action.type) {
        case 'CHANGE_MUSIC_STATU':
            return action.statu
        default:
            return state
    }
  }



//  music 分界线

export  const userInfo= (state = initState.userInfo, action={})=> {
    switch (action.type) {
        case '':
            return action.userinfo
        default:
            return state
    }
  }

export  const  geohash = (state = initState.geohash , action={})=> {  
  switch (action.type) {
      case 'SAVE_GEOHASH':
          return action.geohash
      default:
          return state
  }
}

export  const  isFetching = (state = initState.isFetching , action={})=> {  
    switch (action.type) {
        case 'REQUEST_POSTS':
            return action.isFetching
        default:
            return state
    }
  }

  export  const  recordAddress = (state = initState.recordAddress , action={})=> {  
    switch (action.type) {
        case 'RECEIVE_POSTS':
            return {
               ...state , 
                "latitude" : action.latitude,
                "longitude": action.longitude
            }
        default:
            return state
    }
  }

export  const  _recordAddress = (state = initState._recordAddress , action={})=> {  
  switch (action.type) {
      case 'RECORD_ADDRESS':
          return {
             ...state , 
              "latitude" : action.latitude,
              "longitude": action.longitude
          }
      default:
          return state
  }
}
