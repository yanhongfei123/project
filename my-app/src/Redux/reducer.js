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
        "column_desc": {
            "gift_mall_desc": "0元好物在这里",
            "game_link": "https://gamecenter.faas.ele.me",
            "game_is_show": 1,
            "game_image_hash": "05f108ca4e0c543488799f0c7c708cb1jpeg",
            "game_desc": "玩游戏领红包"
        },
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
    //  recordAddress:{
    //      "latitude":'',
    //      "longitude":''
    //  }
}

export  const userInfo= (state = initState.userInfo, action={})=> {
    switch (action.type) {
        case 'RECORD_USERINFO':
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

//   export  const  recordAddress = (state = initState.recordAddress , action={})=> {  
//     switch (action.type) {
//         case 'RECEIVE_POSTS':
//             return {
//                ...state , 
//                 "latitude" : action.latitude,
//                 "longitude": action.longitude
//             }
//         default:
//             return state
//     }
//   }

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


