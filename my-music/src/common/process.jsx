import React, { Component } from 'react'
import store from '../Redux/store'
import { connect } from 'react-redux'
import  * as  actions from  '../Redux/action'
import '../page/footer/footer.scss'

 class ProgressBar extends Component {
 constructor(props){
     super(props);
     this.state = { 
        now:0,
        totalTime:0
    }
 }
componentDidMount(){ 
     /**
      * 请用事件绑定，不然 progress 组件调用2次，前一次的事件会被覆盖
      **/ 
    let audio = document.querySelector('audio');  
    audio.addEventListener('play',()=>{
        this.setState({  totalTime : Math.floor(audio.duration)   })  
        console.info('进入可播放状态,音频总长度:' + audio.duration);
    },false);

    audio.addEventListener('timeupdate',()=>{
        this.setState({  now : Math.floor(audio.currentTime)  }) ;
        if(audio.currentTime == audio.duration){       
           // 自动播放下一首
            this.nextMusic( this.props.currentMusicIndex + 1);
            // 同时修改redux里的currentMusicIndex
            store.dispatch(actions.setNextMusic( this.props.currentMusicIndex + 1))

        }
    },false)
    
}
nextMusic(index){
     let _index = index == this.props.musicData.length ? 0 : index;
      store.dispatch(actions.initFooterMusic(this.props.musicData[_index]));
      store.dispatch(actions.changeMusicStatu(true))
}
transformTime(seconds){
    let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? ('0' + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? ('0' + s) : s;
      return m + ':' + s;
}
touchStart(event){
    let audio = document.querySelector('audio');  
    let progressBar = this.refs.progressBar;
    let clientX = event.touches[0].clientX;
    let offsetX = progressBar.getBoundingClientRect().left;
    let percent =(clientX - offsetX)/progressBar.offsetWidth;
    audio.currentTime =parseInt(this.state.totalTime)*percent;
    this.setState({  now:audio.currentTime })
    audio.play();


}
render() { 
  return  <div className="progress">
        <span className="start">{this.transformTime(this.state.now)}</span> 
        <div  onTouchStart={this.touchStart.bind(this)}  ref="progressBar" className="progress-bar">
            <div className="now" ref="now" style={{width: (this.state.now / this.state.totalTime).toFixed(3)*100 + '%'}}></div>
        </div>
        <span className="end">{this.transformTime(this.state.totalTime)}</span>
    </div>
}

}

  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
    musicData:state.musicData,
    currentMusicIndex:state.currentMusicIndex,
  })

 export default   connect( mapStateToProps)(ProgressBar)