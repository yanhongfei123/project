import React, { Component } from 'react';
import { Link , browserHistory} from 'react-router'
import ReactCSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup'

import '../../style/city.scss'
import Header from '../../common/head'
import * as types from '../../service/getData'
export default class City extends Component {
 constructor(props){
       super(props);
       this.state = {
        animation:false,
        headTitle:'',//头部标题
        inputVaule:'', // 搜索地址
        cityid:'', // 当前城市id
        cityname:'', // 当前城市名字
        placelist:[], // 搜索城市列表
        placeHistory:[], // 历史搜索记录
        historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false, // 搜索无结果，显示提示信息
    }
 }
 componentWillMount(){
     console.log(this.props);
     let  _placelist = localStorage.getItem('searchHistory');
          _placelist = _placelist? JSON.parse(_placelist):[]
     this.setState({
        placelist:_placelist ,
        headTitle:decodeURIComponent(this.props.location.query.city)
     })
 }
//  componentDidMount(){
//     this.setState({ animation:true  })
//  }
//  componentWillUnmount(){
//     this.setState({ animation:false  })
//  }

 postpois(){
      //输入值不为空时才发送信息
      if(this.inputVaule.value == ''){
        alert('请输入搜索关键字');
        return
     }
     types.searchplace(this.props.location.query.id, this.inputVaule.value).then(res => {
          let historytitle = false;
          let placelist = res ;
          let placeNone = res.length? false : true;
         
        this.setState({ historytitle , placelist , placeNone })

     })
 }

 nextpage(item, geohash){
     console.log(item)
    let _history = localStorage.getItem('searchHistory') ;
    if(_history){
        _history =  JSON.parse(_history)  ;
        let isExist = _history.some((item,index)=> item.geohash == geohash );
        !isExist && _history.push(item);     
    }else{
        _history =  [] ;
        _history.push(item);
    }
    localStorage.setItem('searchHistory',JSON.stringify(_history));
    
    browserHistory.push({ pathname:'/msite',query:{geohash : item.latitude + ','  + item.longitude  } })
    
 }
 clearAll(){
    this.setState({ 
         placelist:[] ,
         historytitle:true    
      });
    localStorage.removeItem('searchHistory',);
 }
  render() {
      let  listItem = this.state.placelist.map((item,index)=>
        <li onClick={this.nextpage.bind(this,item, item.geohash)} key={index}>
            <h4 className="pois_name ellipsis">{item.name}</h4>
            <p className="pois_address ellipsis">{item.address}</p>
      </li>
    
   )
    return (
        <ReactCSSTransitionGroup transitionName="showlist" transitionAppear={true}   transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppearTimeout={300}>
      <div  className={this.state.animation?'city_container city_container_active':'city_container'}>
          <Header headTitle={this.state.headTitle}  goBack={true}> 
             <Link  to="/home"  className="change_city">切换城市</Link>
           </Header>
           <form onSubmit={(e)=>{ e.preventDefault() }} className="city_form">
                 <div>
                     <input type="input" name="city" placeholder="输入学校、商务楼、地址" className="city_input input_style"  ref={(inputVaule)=>{ this.inputVaule = inputVaule }} />
                </div>
                <div>
                    <input type="button" name="submit" className="city_submit input_style" onClick={this.postpois.bind(this)} value="提交" />
                </div>
           </form>
        <header style={{display:this.state.historytitle?'block':'none'}}  className="pois_search_history">搜索历史</header>
        <ul className="getpois_ul">
            {listItem}
        </ul>
        <footer style={{display:this.state.historytitle&&this.state.placelist.length?'block':'none'}}  className="clear_all_history" onClick={this.clearAll.bind(this)}>清空所有</footer>
        <div className="search_none_place" style={{display:this.state.placeNone?'block':'none'}}>很抱歉！无搜索结果</div>
          
      </div>
      </ReactCSSTransitionGroup>
    )

  }
}

