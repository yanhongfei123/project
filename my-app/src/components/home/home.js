import React, { Component } from 'react';
import {  connect } from 'react-redux'
import { Link } from 'react-router';
import  store from '../../Redux/store'
import  * as  actions from  '../../Redux/action';

import '../../style/home.scss'
import Header from '../../common/head'
//import * as types from '../../service/getData'

import * as types from '../../service/api'

 class Home extends Component {
 constructor(props){
       super(props);
       this.state = {
        guessCity: '',   //当前城市
        guessCityid: '', //当前城市id
        hotcity: [],     //热门城市列表
        groupcity: {},   //所有城市列表
    }
 }
 sortgroup(group){
    let groupcity = Object.keys(group).sort() ;
    let newgroupcity = {};
    groupcity.forEach((val,key)=>{
        newgroupcity[val] = group[val]
    })
    return  newgroupcity
}
shouldComponentUpdate(nextProps, nextState) {
    return  true
}
componentWillUpdate(nextProps, nextState){
   console.log(nextState)
}

componentDidUpdate (prevProps,prevState){
    
}

  componentWillMount(){
      let _this  =this;
      // 由 react-redux 注入的 dispatch：
       let { dispatch } = this.props;
    
      types.hotcity().then(res =>{

           _this.setState({ hotcity:res.data});

           // _this.dispatch(actions.demo({a:400,b:500}))
           store.dispatch(actions.demo({a:400,b:500}));
           
     });
     
     
     setTimeout(()=>{
        types.hotcity().then(res =>{
              _this.setState({ hotcity:res.data});
        });
     },3000)

    // let  hotcity = await types.hotcity();
    // let  cityGuess = await types.cityGuess();
    // let groupcity =  this.sortgroup(await types.groupcity());//排好序的
    // let  guessCity = cityGuess.name;
    // let  guessCityid = cityGuess.id;
    // this.setState({ hotcity , guessCity ,guessCityid , groupcity ,a:500});
  
}
async test(){
    console.log("test")
}


componentDidMount(){
    this.test()
}
  render() {
    console.log(this.props)
    const { userInfo } = this.props;

    let cityListItems =   this.state.hotcity.map((item,index)=>
        <li key={item.name}><Link  to={{  pathname:'/city', query:{ city:encodeURIComponent(item.name), id:item.id }  }}>{item.name}</Link></li>
    )

  let groupListItems = [];

  for(var key in this.state.groupcity){
        groupListItems.push(
            <li key={key}  className="letter_classify_li">
                <h4 className="city_title">{key}
                    <span style={{display: key==='A'? 'blcok' :'none'}}>（按字母排序）</span>
                </h4>
                <ul className="groupcity_name_container citylistul clear">
                {
                    this.state.groupcity[key].map((item,index)=>
                       <li className="ellipsis" key={index}><Link to={{  pathname:'/city/', query:{ city:encodeURIComponent(item.name), id:item.id }  }}>{item.name}</Link></li>
                    )
                }
                </ul>
            </li>
        )
  }

    return (
      <div className="home">
          <Header> 
              <span  className="head_logo" >ele.me</span>  
                <Link to={userInfo ? '/profile':'/login'}  className="head_login">
                    <span className="login_span" >登录|注册</span>
                </Link>
           </Header>
        <nav className="city_nav">
            <div className="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <Link to={{  pathname:'/city/', query:{ city: encodeURIComponent(this.state.guessCity), id:this.state.guessCityid }  }} className="guess_city">
                <span>{ this.state.guessCity}</span>
            </Link>  
        </nav>

        <section id="hot_city_container">
            <h4 className="city_title">热门城市</h4>
            <ul className="citylistul clear"> 
                {cityListItems}
            </ul>
        </section>
        <section className="group_city_container">
            <ul className="letter_classify">
                {groupListItems}
            </ul>
        </section>

      </div>
    );
  }
}


  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
    userInfo:state.userInfo

})
 

 export default   connect(mapStateToProps)(Home)