import React, { Component } from 'react';
import {  connect } from 'react-redux'
import { Link , browserHistory} from 'react-router'
import {imgBaseUrl} from '../config/env'
import BScroll from 'better-scroll'
import store from '../Redux/store'
import Loading from './loading'
import '../style/shopList.scss'
import * as types from '../service/getData'
class ShopList extends Component {
 constructor(props){
       super(props);
       this.state = {
            offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            shopListArr:[], // 店铺列表数据
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据
            imgBaseUrl

           
    }
 }

componentWillReceiveProps(nextProps){
  // restaurantCategoryIds, sortByType, deliveryMode, supportIds

    if(this.props.restaurantCategoryIds != nextProps.restaurantCategoryIds){
        this.listenPropChange(nextProps.restaurantCategoryIds, nextProps.sortByType, nextProps.deliveryMode, nextProps.supportIds)
    }
    if(this.props.sortByType != nextProps.sortByType){
        this.listenPropChange(nextProps.restaurantCategoryIds, nextProps.sortByType, nextProps.deliveryMode, nextProps.supportIds)       
    }
    if(this.props.confirmSelect != nextProps.confirmSelect){
        this.listenPropChange(nextProps.restaurantCategoryIds, nextProps.sortByType, nextProps.deliveryMode, nextProps.supportIds)     
        this.props.DidConfrim()
    }

}
shouldComponentUpdate(nextProps,nextState){

  return true
}

 componentWillMount(){
   this.initData()
 }
 componentDidMount(){
    this.initScroll();
 }
 componentWillUnMount(){
    window.onscroll = null
}  
 async initData(latitude,longitude){

    let  _geohash = this.props.$route.location.query.geohash;
    let _geohashArr = _geohash.split(',');
    this.setState({  geohash : _geohash   });

    let res = await  types.shopList(_geohashArr[0],_geohashArr[1],this.state.offset ,this.props.restaurantCategoryId);
   
    this.setState({ 
        shopListArr : res , 
        showLoading:false
    })
    
}
 initScroll(){

 }
  //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
 async listenPropChange(restaurantCategoryIds, sortByType, deliveryMode, supportIds){
    let _geohashArr = this.state.geohash.split(',');
     this.setState({ 
         offset : 0 , 
         showLoading:true
     })
     let res = await  types.shopList(_geohashArr[0], _geohashArr[1],this.state.offset, '',restaurantCategoryIds, sortByType, deliveryMode, supportIds);
      this.setState({ 
          shopListArr : res , 
          showLoading:false
      })
 
 }

 zhunshi(supports){
    let zhunStatus;
    if ((supports instanceof Array) && supports.length) {
         supports.forEach(item => {
             if (item.icon_name === '准') {
                 zhunStatus = true;
             }
         })
    }else{
        zhunStatus = false;
    }
    return zhunStatus
}

  render() {

     return (
         <div ref="wrapper" className="shoplist_container">
             <ul>
                 {
            this.state.shopListArr.map((item,index)=>{
            return (
                <li  key={index}><Link  className="shop_li" to={{pathname:'/shop',query:{ geohash:this.props.geohash,id:item.id  }}}>
                    <section>
                        <img src={this.state.imgBaseUrl + item.image_path} className="shop_img" />
                    </section>
                    <hgroup className="shop_right">
                        <header className="shop_detail_header">
                            <h4 className={item.is_premium? 'premium shop_title ellipsis': 'shop_title ellipsis' }>{item.name}</h4>
                            <ul className="shop_detail_ul">
                            {  item.supports.map((item,index)=>{
                                    return <li  key={item.id} className="supports">{item.icon_name}</li>
                                }) }
                            </ul>
                        </header>
                        <h5 className="rating_order_num">
                            <section className="rating_order_num_left">
                                <section className="rating_section">
                                    {/* <rating-star :rating='item.rating'></rating-star> */}
                                    <span className="rating_num">{item.rating}</span>
                                </section>
                                <section className="order_section">
                                    月售{item.recent_order_num}单
                                </section>
                            </section>
                            <section className="rating_order_num_right">
                                <span className="delivery_style delivery_left" style={{display:item.delivery_mode? 'block':'none'}}>{item.delivery_mode.text}</span>
                                <span className="delivery_style delivery_right" style={{display:this.zhunshi.bind(this,item.supports)? 'block':'none'}} >准时达</span>
                            </section>
				     	</h5>
                         <h5 className="fee_distance">
						<p className="fee">
							¥{item.float_minimum_order_amount}起送 
							<span className="segmentation">/</span>
							{item.piecewise_agent_fee.tips}
						</p>
						<p className="distance_time">
							<span style={{display:Number(item.distance)? 'block':'none'}} >{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}
								<span className="segmentation">/</span>
							</span>
							<span style={{display:Number(item.distance)? 'none':'block'}}>{item.distance}</span>
							<span className="segmentation">/</span>
							<span className="order_time">{item.order_lead_time}</span>
						</p>
					</h5>
                        
                    </hgroup>
                </Link>
                </li>
            )
            })
                 }
             </ul>
             { this.state.touchend ? <p  className="empty_data">没有更多了</p> :'' }

             <Loading showLoading={this.state.showLoading}></Loading>

         </div>
     )
  }
}

var res = /2(\@\d+\_\d+)\:?/;

  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
     __latitude:state._recordAddress.latitude,
     __longitude:state._recordAddress.longitude,
    __geohash:state.geohash

})
 

 export default   connect( mapStateToProps)(ShopList)