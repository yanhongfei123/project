import React, { Component } from 'react';
 import { Provider } from 'react-redux'
 import store from './Redux/store'
 import { connect } from 'react-redux'
 import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'
 import Vfooter from './page/footer/footer.jsx'

 
class App extends Component {
  componentDidMount(){
    console.log(this.props)//路由对象

} 
  render() {
    const { animateCls , isPlaying , audio } = this.props;

    return (
        <ReactCSSTransitionGroup
            transitionName={animateCls}
            transitionEnter={true}
            transitionLeave={true}
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}         
            transitionAppear={true}
            transitionAppearTimeout={0}
          >   
          <div key={this.props.location.pathname} className="App">
              <audio  autoPlay={isPlaying} src={audio.musicSrc} ref="audio" ></audio>
              {this.props.children} 
                  
          </div>
        </ReactCSSTransitionGroup>
 
    );
  }
}

  // Map Redux state to component props
  const mapStateToProps = (state)=> ({
     animateCls:state.animateCls,
     isPlaying:state.isPlaying,
     audio:state.audio
  })

 export default   connect( mapStateToProps)(App)
