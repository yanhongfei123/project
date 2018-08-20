import React, { Component } from "react";
import { Link } from "react-router";
import store from '../../Redux/store'
import { connect } from 'react-redux'
import { musicData } from 'src/common/musicData.js'
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'

import   './musicList.scss'
import   '../footer/footer.scss'

import MusicPlay from '../play/play.jsx'
import Vfooter from '../footer/footer.jsx'
import * as types from '../../service/getData.js'
import  * as  actions from  '../../Redux/action'


class MusicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        musicData:musicData,
        count:0
    };
  }
  componentWillReceiveProps(){

  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentWillMount() {
    // store.dispatch(actions.initMusicData(musicData));  
  }
  componentDidMount() {
    // initFooterMusic
    console.log( this.props.musicData)
    store.dispatch(actions.initMusicData(musicData));
    this.toggleMusic(0);
    console.log( this.props.musicData)

  }
  add(){

    this.setState((prevState,props)=>({
       count:prevState.count + 1
    }))
    console.log(this.state.count)

  }
  toggleMusic(index) {
     store.dispatch(actions.initFooterMusic(musicData[index]));
     store.dispatch(actions.changeMusicStatu(true));

  }
  del() {}
  render() {
    let { musicData  , isShowIndex} = this.props;
    return (
      <div id="music-list">
          <div style={{display:isShowIndex? 'block':'none'}} className="music-list">
            {
              musicData.map((item, index) => (
                    <div  key={index} className="music-item">
                        <img src={item.musicImgSrc} className="music-img" />
                        <span  onClick={this.toggleMusic.bind(this, index)}    className="music-name">
                        {index + 1 + '.' + item.name}
                        </span>
                        <span onClick={this.del.bind(this, index)} className="del-icon" />
                    </div>
                ))
            }
            <div onClick={this.add.bind(this)} className="tips">没有更多歌曲了～</div>

            <Vfooter></Vfooter>

          </div>

          <MusicPlay isShow={ isShowIndex }></MusicPlay> 


      </div>

    );
  }
}
  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
      musicData:state.musicData,
      isShowIndex:state.isShowIndex
  })


 export default   connect( mapStateToProps)(MusicList)