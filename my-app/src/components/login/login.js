import React, { Component } from 'react';
import '../../style/login.scss'
import Header from '../../common/head'
import store from '../../Redux/store'
import * as types from '../../service/getData'
import  * as  actions from  '../../Redux/action'
export default class LoginWay extends Component {
 constructor(props){
       super(props);
       this.state = {
        loginWay: true, //登录方式，默认短信登录
        showPassword: false, // 是否显示密码
        phoneNumber: null, //电话号码
        mobileCode: null, //短信验证码
        validate_token: null, //获取短信时返回的验证值，登录时需要
        computedTime: 0, //倒数记时
        userInfo: null, //获取到的用户信息
        userAccount: null, //用户名
        passWord: null, //密码
        captchaCodeImg: null, //验证码地址
        codeNumber: null, //验证码
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        isPassWord:true
    }
 }
 changeLoginWay(){
     this.setState({
        loginWay:!this.state.loginWay
     })
 }
 changePhoneNumber(e){
     let isRigthPhone = /^1\d{10}$/gi.test(e.target.value);
    this.setState({
        rightPhoneNumber: isRigthPhone
    })
 }
 getVerifyCode(e){
    e.preventDefault();
    if(this.state.rightPhoneNumber){
        this.setState({  computedTime:5 })
    let timer = setInterval(()=>{
        this.state.computedTime --;
        if(this.state.computedTime == 0){
                clearInterval(timer)  
        }
        this.setState({
            computedTime: this.state.computedTime
        })
    },1000)


    }
 }
 changePassWordType(){
    this.setState({
         showPassword : !this.state.showPassword ,
         isPassWord:!this.state.isPassWord
        
      })
 }

 async mobileLogin(){

       //用户名登录
       let _userInfo = await types.accountLogin(this.userAccount.value, this.passWord.value, this.codeNumber.value);
        //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!_userInfo.user_id) {
           alert('没有返回user_id')
            !this.state.loginWay &&  this.getCaptchaCode(); //刷新验证码
        }else{
            store.dispatch(actions.recordUserInfo(_userInfo)) //登录成功，保存用户信息
            sessionStorage.setItem('userInfo',JSON.stringify(_userInfo))

            this.props.history.go(-1);
            alert('登录成功')

        }
 }
 async getCaptchaCode(){
    let res = await types.getcaptchas();
    this.setState({ captchaCodeImg :res.code })
}
 componentWillMount(){
    this.getCaptchaCode();
 }
  render() {
    return (
      <div className="loginContainer">
          <Header headTitle={this.state.loginWay? "登录":"密码登录"} goBack={true}> 
              <div  className="change_login" onClick={this.changeLoginWay.bind(this)}>{this.state.loginWay? "密码登录":"短信登录"}</div> 
           </Header>
           <form className="loginForm" style={{display:this.state.loginWay?'block':'none'}} >
                <section className="input_container phone_number">
                    <input type="text" placeholder="账号密码随便输入" name="phone" maxLength ="11" onInput={this.changePhoneNumber.bind(this)}  ref={(phoneNumber) => this.phoneNumber = phoneNumber}  />
                    <button onClick={this.getVerifyCode.bind(this)} className={this.state.rightPhoneNumber? 'right_phone_number':''} style={{display:!this.state.computedTime?'block':'none'}} >获取验证码</button>
                    <button  onClick={(e)=>{ e.preventDefault() }} style={{display:this.state.computedTime?'block':'none'}} >已发送({this.state.computedTime}s)</button>
                </section>
                <section className="input_container">
                    <input type="text" placeholder="验证码" name="mobileCode" maxLength ="6"/> 
                </section>
            </form>
            {/*  */}
            <form className="loginForm" style={{display:!this.state.loginWay?'block':'none'}} >
            <section className="input_container">
                <input type="text" maxLength='11' placeholder="账号" ref={(userAccount)=>{ this.userAccount = userAccount  }}/>
            </section>
            <section className="input_container">
                <input type={this.state.isPassWord?'password':'text'} placeholder="密码"   ref={(passWord)=>{ this.passWord = passWord  }}/>
                {/* <input style={{display:this.state.showPassword?'block':'none'}}  type="text" placeholder="密码2"  ref={(passWord)=>{ this.passWord = passWord  }}/>
                */}
                <div  className={this.state.showPassword? 'change_to_text button_switch':'button_switch'}>
                    <div  className={this.state.showPassword? 'trans_to_right circel_button':'circel_button'}  onClick={this.changePassWordType.bind(this)}></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
            <section className="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxLength="4"  ref={(codeNumber)=>{ this.codeNumber = codeNumber  }}/ >
                <div className="img_change_img">
                    <img style={{display:this.state.captchaCodeImg?'block':'none'}} src={this.state.captchaCodeImg}/>
                    <div className="change_img" onClick={this.getCaptchaCode.bind(this)}>
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>            
            </form>
            <p className="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p className="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div className="login_container" onClick={this.mobileLogin.bind(this)}>登录</div>
        
      </div>
    )

  }
}

