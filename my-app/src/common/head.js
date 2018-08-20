import React from 'react';
import {
  browserHistory,
 } from 'react-router';
 import * as types from '../service/getData'
import '../style/head.scss'
export default class Header extends React.Component {
  static defaultProps = {
      goBack:false,
      headTitle:''
  }
 constructor(props) {
   super();
 }
 componentWillMount(){
     this.getUserInfo()
 }
 getUserInfo(){
       //获取用户信息
       types.getUser()
 }
 render() {
   return (
        <header id="head_top">
          <section style={{display:this.props.goBack?'block':'none'}} className="head_goback" onClick={()=>{ browserHistory.go(-1) }}>
            &lt;
          </section>
          <section className="title_head ellipsis" style={{display:this.props.headTitle?'block':'none'}}>
             <span className="title_text">{this.props.headTitle}</span>
         </section>

            {this.props.children}
        </header>
   )
  
 }

}