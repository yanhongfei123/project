import React, { Component } from 'react';
import Slider from 'react-slick'

 export default class Slide extends Component {
 constructor(props){
       super(props);
 }

  render() {
   
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
       // autoplay:true,
        arrows:false, // 隐藏左右箭头
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <Slider {...settings}>
            { this.props.slides }
        </Slider>
      );

  }
}


