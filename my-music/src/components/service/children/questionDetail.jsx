import React, { Component } from 'react';
import BScroll from 'better-scroll'
import ReactCSSTransitionGroup  from 'react-transition-group/CSSTransitionGroup'
import Header from '../../../common/head'
import '../../../style/questionDetail.scss'
 export default class QuestionDetail extends Component {
 constructor(props){
       super(props);
       this.state = {
        questionDetailObj:null,
    }
 }

  componentWillMount(){
    this.setState({
        questionDetailObj: JSON.parse(sessionStorage.getItem('questionDetailObj'))
    })
  }
  componentDidMount(){
    this.scroll =  new BScroll('#scroll_section', {  
          deceleration: 0.001,
          bounce: true,
          swipeTime: 1800,
          click: true,
      }); 
        this.scroll.on('scroll', (pos) => {
              console.log(pos.y)
        })
  }
  render() {
    return (
        <ReactCSSTransitionGroup transitionName="showlist1" transitionAppear={true}   transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppearTimeout={300}>   
      <div className="detail_page">
          <Header goBack={true}  headTitle={this.state.questionDetailObj.title}> </Header>
        <section id="scroll_section" className="scroll_container">
            <section className="markdown">
              <h2>{ this.state.questionDetailObj.detail }</h2>
            </section>
        </section>
    
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}


