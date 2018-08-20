import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
import store from '../../Redux/store'
import ProgressBar from '../../common/process.jsx'
import './play.scss'
import  * as  actions from  '../../Redux/action'
 class MusicPlay extends Component {
 constructor(props){
     super(props);
     this.state = { 
        isShowSkinColors: false,
        isShowMusicList: false
     }
 }

componentWillMount(){ }
componentDidMount(){ }
back(){
   this.props.history.go(-1);
   console.log(this.context)
 }
 showMusicList(){
     
 }
render() { 
    let { audio , skinColor } = this.props;
   return (
        <div style={{ display:!this.props.isShow?'block':'none' }}  className={this.props.isShow? 'play':'play show-play'}>
            <div style={{backgroundColor: skinColor}} className="header">
                <div className="back">
                    <div className="icon-back"><i onClick={this.back.bind(this)}></i></div>
                </div>
                <div onClick={this.showMusicList.bind(this)} className="title">
                    <div className="name">{audio.musicName}</div>
                    <ProgressBar></ProgressBar>
                </div>
                <div className="list">
                    <div className="icon-list"><i onClick={this.showMusicList.bind(this)}></i></div>
                </div>
            </div>
            
        </div>
    // </ReactCSSTransitionGroup>
   )
}
}

  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
    audio:state.audio,  
    skinColor:state.skinColor,
  })


 export default   connect( mapStateToProps)(MusicPlay)