import React, { Component } from 'react';
import {  connect } from 'react-redux'
import { Link } from 'react-router';
import ReactCSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup'
import ShopList from '../../common/shopList'
import '../../style/food.scss'
import Header from '../../common/head'
import { getImgPath } from '../../config/env'
import * as types from '../../service/getData'
export  default class Food extends Component {
 constructor(props){
       super(props);
       this.state = {
        geohash: '', // city页面传递过来的地址geohash
        headTitle: '', // msiet页面头部标题
        foodTitle: '11', // 排序左侧头部标题
        restaurant_category_id: '', // 食品类型id值
        restaurant_category_ids: '', //筛选类型的id
        sortBy: '', // 筛选的条件
        shopListArr:[],//传给shopList的数据
        category: [], // category分类左侧数据
        categoryDetail: [], // category分类右侧的详细数据
        sortByType:null, // 根据何种方式排序
        Delivery: [], // 配送方式数据
        Activity: [], // 商家支持活动数据
        delivery_mode: null, // 选中的配送方式
        support_ids: [], // 选中的商铺活动列表
        filterNum: 0, // 所选中的所有样式的集合
        confirmStatus: false, // 确认选择
    }
 }
 componentWillMount(){
     console.log(this.props)
   this.initData()
 }
async initData(){
         //获取从msite页面传递过来的参数     
            let _query = this.props.location.query;
            let geohash = _query.geohash;
            let _geohash = geohash.split(',');
            let  headTitle = _query.title;
            let foodTitle = headTitle;
            let restaurant_category_id = _query.restaurant_category_id;
            this.setState({ geohash , headTitle , foodTitle ,  restaurant_category_id})

           let res = await types.foodCategory(_geohash[0], _geohash[1]);
            this.setState({ category : res })
            
           	// 页面刷新时，默认选中地址栏带过来的restaurant_category_id这一项
			this.state.category.forEach(item => {
				if (restaurant_category_id == item.id) {
					// 根据地址栏带过来的restaurant_category_id这一项，显示这一项的右侧二级栏目                 
                    this.setState({ categoryDetail :  item.sub_categories })
				}
            });

            //获取筛选列表的配送方式
			let Delivery = await  types.foodDelivery(_geohash[0], _geohash[1]);
			//获取筛选列表的商铺活动
            let  _Activity = await  types.foodActivity(_geohash[0], _geohash[1]);

            //记录support_ids的状态，默认不选中，点击状态取反，status为true时为选中状态
           let Activity  =  _Activity.map((item,index)=>{
                   item.status = false ;
                   return item 
            })


           this.setState({Delivery ,  Activity})
 }
 chooseType(type){
    if(this.state.sortBy != type){  // 展开

      let _foodTitle =  type == 'food'? '分类' : this.state.headTitle;   // 如果展开的是food一栏  
      this.setState({ sortBy : type , foodTitle: _foodTitle },()=>{
          console.log(this.state.sortBy)
      });
      
    }else{  // 收起

        let _foodTitle =  type == 'food'?  this.state.headTitle : this.state.headTitle;   // // 如果收起的是food一栏
        this.setState({ sortBy : '' , foodTitle: _foodTitle });

    }
 }
 selectCategoryName(id,index){
    index? this.setState({   restaurant_category_id :id ,  categoryDetail :  this.state.category[index].sub_categories})
          //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
          //改变restaurant_category_id，子组件componentWillReceiveProps周期监听变化，重新请求数据
      :this.setState({  restaurant_category_ids :null ,  sortBy : ''     })
     
 }
 getCategoryIds(id){
    this.setState({
         sortBy:'',
         restaurant_category_ids :id 
     })
 }
 sortList(event){
    this.setState({ 
        sortByType: event.target.getAttribute('data'),
        sortBy:''
     })
 }
 selectDeliveryMode(id){
     let _filterNum = 0;
     let _id  = this.state.delivery_mode == id ? '' : id;
     _id ? ++ _filterNum : --_filterNum;
    _filterNum += this.state.filterNum;
    this.setState({ delivery_mode :_id , filterNum:_filterNum })
    
 }
 selectSupportIds(item,oindex,id){
     let _filterNum = 0;
    let  _Activity  =  this.state.Activity.map((item,index)=>{
        (oindex == index) &&  (item.status = !item.status) ;  
        return item 
    })
    
    _Activity.forEach((item,index)=>{
        item.status && ++_filterNum
    })
    this.state.delivery_mode && ++_filterNum ;
    this.setState({ Activity: _Activity ,filterNum:_filterNum })
 }
 clearSelect(){
    let  _Activity  =  this.state.Activity.map((item,index)=>{
        item.status = false ;  
        return item 
    })

    this.setState({ Activity: _Activity ,delivery_mode:false , filterNum:0 })
   
 }
 confirmSelectFun(){
    this.setState({ 
        confirmStatus:!this.state.confirmStatus, 
        sortBy:''
    })
 }
 clearAll(){
     alert('您点击了确认按钮')
 }
 render(){
     return (
        <div className="food_container">
            <Header headTitle={this.state.headTitle}  goBack={true}>   </Header>
            <section className="sort_container">
                <div className={this.state.sortBy == 'food'? 'sort_item choose_type' :'sort_item'  }>
                    <div className="sort_item_container" onClick={this.chooseType.bind(this,'food')}>
                        <div className="sort_item_border">
                            <span className={this.state.sortBy == 'food'? 'category_title' :''  }>{this.state.foodTitle}</span>
                        
                        </div>
                    </div>
                    <ReactCSSTransitionGroup  transitionName="showlist"  transitionEnterTimeout={300} transitionLeaveTimeout={300} >
                        {/* style={{display:this.state.sortBy == 'food'?'block':'none'}} */}
                    <section   className={this.state.sortBy=='food'? 'category_container sort_detail_type active' :'category_container sort_detail_type'}>
	    				<section className="category_left">
	    					<ul> {
                                this.state.category.map((item,index)=>{
                                  return  <li className={this.state.restaurant_category_id == item.id? 'category_active category_left_li' :'category_left_li' }  key={index} onClick={this.selectCategoryName.bind(this,item.id, index)}>
                                    <section>
										<img src={getImgPath(item.image_url)} style={{display:index?'inlineBlock':'none'}} className="category_icon"/>
										<span>{item.name}</span>
									</section>
                                    <section>
	    								<span className="category_count">{item.count}</span>
	    							
									</section>
                                    </li>
                                }) }
	    					</ul>
	    				</section>
	    				<section className="category_right">
	    					<ul>
                              {
                                this.state.categoryDetail.map((item,index)=>{
                                  return  <li  className={this.state.restaurant_category_ids == item.id ? 'category_right_choosed category_right_li' :'category_right_li' }  key={item.id} onClick={this.getCategoryIds.bind(this,item.id, item.name)}>
                                        <span>{item.name}</span>
                                        <span>{item.count}</span>
                                    </li>
                                })
                              }  
	    					</ul>
	    				</section>
	    			</section>
                    </ReactCSSTransitionGroup>
                </div>    
                <div className={this.state.sortBy == 'sort'? 'sort_item choose_type' :'sort_item'  }>
                    <div className="sort_item_container" onClick={this.chooseType.bind(this,'sort')}>
                        <div className="sort_item_border">
                            <span className={ this.state.sortBy == 'sort' ? 'category_title':''}>排序</span>	
                        </div>
                    </div>
                    <ReactCSSTransitionGroup  transitionName="showlist" transitionEnterTimeout={300} transitionLeaveTimeout={300} >
                    <section  className={this.state.sortBy == 'sort'?'sort_detail_type active':'sort_detail_type'} >
	    				<ul className="sort_list_container" onClick={this.sortList.bind(this)}>
	    					<li className="sort_list_li">	    						
	    						<p data="0"  className={this.state.sortByType == 0 ? 'sort_select' :''  }>
	    							<span>智能排序</span>		
	    						</p>
	    					</li>
	    					<li className="sort_list_li">
	    						<p data="5"  className={this.state.sortByType == 5 ? 'sort_select' :''  }>
	    							<span>距离最近</span>	    							
	    						</p>
	    					</li>
	    					<li className="sort_list_li">
	    					
	    						<p data="6"  className={this.state.sortByType == 6 ? 'sort_select' :''  }>
	    							<span>销量最高</span>
	    						
	    						</p>
	    					</li>
	    					<li className="sort_list_li">
	    						
	    						<p data="1"  className={this.state.sortByType == 1 ? 'sort_select' :''  }>
	    							<span>起送价最低</span>
	    						
								</p>
	    					</li>
	    					<li className="sort_list_li">
	    						
	    						<p data="2"  className={this.state.sortByType == 2 ? 'sort_select' :''  }>
	    							<span>配送速度最快</span>
	    							
	    						</p>
	    					</li>
	    					<li className="sort_list_li">
	    						
	    						<p data="3"  className={this.state.sortByType == 3 ? 'sort_select' :''  }>
	    							<span>评分最高</span>
	    							
	    						</p>
	    					</li>
	    				</ul>
	    			</section>
                        
                    </ReactCSSTransitionGroup>
                    
                </div>         
                <div className={this.state.sortBy == 'activity'? 'sort_item choose_type' :'sort_item'  }>
                   <div className="sort_item_container" onClick={this.chooseType.bind(this,'activity')}>
                      <span className={ this.state.sortBy == 'activity' ? 'category_title':''}>筛选</span>	   
                    </div> 
                    <ReactCSSTransitionGroup transitionName="showlist" transitionEnterTimeout={300} transitionLeaveTimeout={300} >
                    <section  className={this.state.sortBy == 'activity'?'sort_detail_type filter_container active':'sort_detail_type filter_container'}  >
                       <section style={{width: '100%'}}>
	    					<header className="filter_header_style">配送方式</header>
	    					<ul className="filter_ul">
                               {
                                   this.state.Delivery.map((item,index)=>{
                                       return  <li key={item.id} className="filter_li" onClick={this.selectDeliveryMode.bind(this,item.id)}>
                                           <span style={{display:this.state.delivery_mode == item.id?'block':'none'}}  className={this.state.delivery_mode == item.id?'selected_filter':''}>√</span>
                                        <span className={this.state.delivery_mode == item.id?'selected_filter':''} >{item.text}</span>
                                       </li>
                                       
                                   })
                               } 
	    					</ul>
	    				</section>
                        <section style={{width:' 100%'}}>
	    					<header className="filter_header_style">商家属性（可以多选）</header>
	    					<ul className="filter_ul" style={{paddingBottom: '.5rem'}}>
                            {
                                   this.state.Activity.map((item,index)=>{
                                    return (
                                        <li key={item.id} className="filter_li" onClick={this.selectSupportIds.bind(this,item,index, item.id)}>  
                                          <span style={{display:item.status?'block':'none'}} className="activity_svg">√</span>                                      
	    							      <span className="filter_icon" style={{color: '#' + item.icon_color, borderColor: '#' + item.icon_color,display:!item.status?'block':'none'}} >{item.icon_name}</span>
	    							      <span className={item.status?'selected_filter':''} >{item.name}</span>
                                       </li>
                                    )
                                                                       
                                   })
                               } 
	    					</ul>
	    				</section>
                        <footer className="confirm_filter">
	    					<div className="clear_all filter_button_style" onClick={this.clearSelect.bind(this)}>清空</div>
	    					<div className="confirm_select filter_button_style" onClick={this.confirmSelectFun.bind(this)} >确定{ this.state.filterNum?   <span>({this.state.filterNum})</span> :'' }</div>
	    				</footer>
                    </section>
                    </ReactCSSTransitionGroup>

                </div>
            
            </section>
            <ReactCSSTransitionGroup transitionName="showcover" transitionEnterTimeout={300} transitionLeaveTimeout={300} >
                <div className="back_cover"   style={{display:this.state.sortBy? 'block':'none'}}></div>
            </ReactCSSTransitionGroup>
            <section className="shop_list_container">
                <ShopList $route={this.props} shopListArr={this.state.shopListArr} geohash={this.state.geohash} restaurantCategoryId={this.state.restaurant_category_id} restaurantCategoryIds={this.state.restaurant_category_ids} sortByType={this.state.sortByType} deliveryMode={this.state.delivery_mode}  confirmSelect={this.state.confirmStatus}   supportIds={this.state.support_ids}  DidConfrim={this.clearAll.bind(this)} > </ShopList>
            </section>

            <p style={{display:this.state.touchend? 'block':'none'}}  className="empty_data">没有更多了</p>

        </div>
     )

 }



}