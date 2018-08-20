import React, { Component } from 'react';
import {  connect } from 'react-redux'
import { Link , browserHistory  } from 'react-router';
import ReactCSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup'
import {imgBaseUrl} from '../../config/env'
import '../../style/service.scss'
import Header from '../../common/head'
import * as types from '../../service/getData'
 export default class Service extends Component {
 constructor(props){
       super(props);
       this.state = {
             serviceData: null, //服务信息
             questionTitle: [], //问题标题
             questionDetail: [], //问题详情

    }
 }
//保存问题详情
toQuestionDetail(title, index){
   // this.SAVE_QUESTION({title, detail: this.questionDetail[index]});
     sessionStorage.setItem('questionDetailObj',JSON.stringify({title, detail: this.state.questionDetail[index]}))
     browserHistory.push('/service/questionDetail');
}

 //获取信息
 async initData(){
        let _serviceData = await types.getService();
        let _questionTitle = [], _questionDetail = [];
        this.setState({ serviceData : _serviceData  },()=>{
            Object.keys(this.state.serviceData).forEach(item => {
                let avoidRepeat = false;
                this.state.questionTitle.forEach((insertItem) => {
                    //防止重复的数据，后台返回的数据有些是重复的
                    if (insertItem == this.state.serviceData[item]) {
                        avoidRepeat = true;
                    }
                })
                //将标题和内容分别放进数组中
                if (item.indexOf('Caption') !== -1 && !avoidRepeat) {
                        _questionTitle.push(this.state.serviceData[item]);
                        this.setState({ questionTitle : _questionTitle  })
                }else if(!avoidRepeat){
                      _questionDetail.push(this.state.serviceData[item]);
                      this.setState({ questionDetail : _questionDetail  })
                    
                }
            })
       })
  }
  componentWillMount(){
      this.initData()
  }
  render() {
    return (
        <ReactCSSTransitionGroup transitionName="showlist" transitionAppear={true}   transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppearTimeout={300}>
     
      <div className="rating_page">
          <Header goBack={true}  headTitle="服务中心"> </Header>
          <section className="hot_questions" >
            <h4 className="qustion_header">热门问题</h4>
            <ul>
               {
                   this.state.questionTitle.map((item,index)=>{
                       return (
                            <li key={index} className="question_title" onClick={this.toQuestionDetail.bind(this,item,index)}>
                               <span>{item}</span>
                            </li>
                       )
                   })
               }
            </ul>
        </section>

        {/* 子路由 */}
        {
            this.props.children
        }
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}


