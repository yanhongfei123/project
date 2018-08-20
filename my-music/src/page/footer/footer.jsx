import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../../Redux/store'
import  * as  actions from  '../../Redux/action'
import './footer.scss'
import ProgressBar from '../../common/process.jsx'

 class Vfooter extends Component {
 constructor(props){
    super(props);
    this.state = {
        playIcon: 'play-icon',
        pauseIcon: 'pause-icon',
        now: 0,
        nativeAudio:null,
        totalTime: 0 ,
    }
 }
shouldComponentUpdate(nextProps, nextState) {  return  true }
componentWillUpdate(nextProps, nextState){ }
componentDidUpdate (prevProps,prevState){ }
componentWillMount(){ }
showPlay(){
  
}
toggleMusicStatu(){
  let audio      = this.refs.audio;
  let _isPlaying = this.props.isPlaying ;
  _isPlaying ? audio.pause() : audio.play();
  store.dispatch(actions.changeMusicStatu(!_isPlaying));

}
goPlay(){
    store.dispatch(actions.isShowIndex(false));
}

render() { 
    let { skinColor , isShowMiniMusic, audio ,isPlaying , isFetching } = this.props;
   return(
    <div  style={{backgroundColor: skinColor,display:isShowMiniMusic?'block':'none'}} className="footer">
       
       {/* <audio  autoPlay={isPlaying} src={audio.musicSrc} ref="audio" ></audio> */}


          <span onClick={this.goPlay.bind(this)}>去play</span>

      <div className="mini-music">
        <div className="music-img">
          <img onClick={this.showPlay.bind(this)} ref="img" src={audio.musicImgSrc}  />
        </div>
        <div className="music-name">     
          <p className="" onClick={this.showPlay.bind(this)}>{ audio.musicName }</p>     
          <ProgressBar  data="1"></ProgressBar>
        
        </div>
        <div className="music-control">
          <i onClick={this.toggleMusicStatu.bind(this)} className={isPlaying ? 'pause-icon' : 'play-icon'}></i>
        </div>
      </div>

    </div>
   )
}

}

  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
   // musicData:state.musicData,
    isFetching:state.isFetching,   
    isPlaying:state.isPlaying,  
    audio:state.audio,  
    skinColor:state.skinColor,
    isShowMiniMusic:state.isShowMiniMusic,
   // currentMusicIndex:state.currentMusicIndex,


  })


 export default   connect( mapStateToProps)(Vfooter)