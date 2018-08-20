import React, { Component } from 'react';
import {  connect } from 'react-redux'
import { Link } from 'react-router';
import {imgBaseUrl} from '../../config/env'
import '../../style/profile.scss'
import Header from '../../common/head'
import * as types from '../../service/getData'
 class Profile extends Component {
 constructor(props){
       super(props);
       this.state = {
            profiletitle: '我的',
            username: '登录/注册',           //用户名
            resetname: '',
            mobile: '暂无绑定手机号',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址

    }
 }
 
 componentWillMount(){
     this.initData()
}
initData(){
    const { userInfo } = this.props;
    if (userInfo && userInfo.user_id) {
        let avatar = userInfo.avatar;
        let username = userInfo.username;
        let mobile = userInfo.mobile ;
        let balance = userInfo.balance;
        let count = userInfo.gift_amount;
        let pointNumber = userInfo.point;

        this.setState({ avatar , username , mobile, balance , count, pointNumber })

    }else{
        this.username = '登录/注册';
        this.mobile = '暂无绑定手机号';
    }
}
  render() {
    const { userInfo } = this.props
    return (
      <div className="profile_page">
          <Header goBack={true}  headTitle="我的"> </Header>
          <section className="profile-number">
                <Link to={userInfo&&userInfo.user_id? '/profile/info' : '/login'} className="profile-link">
                    <img src={imgBaseUrl + userInfo.avatar} className="privateImage" />
                    {/* <span className="privateImage" >

                       
                    </span> */}
                    <div className="user-info">
                        <p>{this.state.username}</p>
                        <p>
                            <span className="user-icon">
                               
                            </span>
                            <span className="icon-mobile-number">{this.state.mobile}</span>
                        </p>
                    </div>
                   
                </Link>
            </section>
            <section className="info-data">
                <ul className="clear">
                    <Link to="/balance"  className="info-data-link">
                        <span className="info-data-top"><b>{parseInt(this.state.balance).toFixed(2)}</b>元</span>
                        <span className="info-data-bottom">我的余额</span>
                    </Link>
                    <Link to="/benefit"  className="info-data-link">
                        <span className="info-data-top"><b>{this.state.count}</b>个</span>
                        <span className="info-data-bottom">我的优惠</span>
                    </Link>
                    <Link to="/points"  className="info-data-link">
                        <span className="info-data-top"><b>{this.state.pointNumber}</b>分</span>
                        <span className="info-data-bottom">我的积分</span>
                    </Link>
                </ul>
            </section>
            <section className="profile-1reTe">
                <Link to='/service' className="myorder">
                    <div className="myorder-div">
                        <span>服务中心</span>   
                    </div>
               </Link>
            </section>
      
      </div>
    );
  }
}


  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
    userInfo:state.userInfo

})
 

 export default   connect(  mapStateToProps)(Profile)