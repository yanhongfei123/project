import React, { Component } from 'react';

import '../style/loading.scss'
export default class Loading extends Component {
 constructor(props){
       super(props);
       this.state = {
            positionY: 0,
            timer: null,
    }
 }

 componentDidMount(){
    this.timer = setInterval(() => {
       this.setState({
          positionY:++ this.state.positionY
       })
    }, 600)

 }
 componentDidUnMount(){
    clearInterval(this.timer);
 }


 render(){
   return (
    <div style={{display:this.props.showLoading?'block':'none'}} className="loading_container">
       <div className="load_img" style={{backgroundPositionY: -(this.state.positionY%7)*2.5 + 'rem'}}> </div>
    </div>
   )
 }
}
