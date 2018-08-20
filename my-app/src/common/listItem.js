import React, { Component } from 'react';
import { Link } from 'react-router';

export  default  class ListItem extends Component {
 constructor(props){
       super(props);
       this.state = {
        productCount:1
    }
 }

changeState(index,product_name){
     this.props.changeState(index,,'changeChecked',product_name)
}
handleChange(){

}
getProductCount(index , isChecked  , type){
    if(isChecked){
        if(type == 'add'){
            this.props.changeState(index,'add')

        }else if(type == 'reduce'){
            this.props.changeState(index,'reduce')
        }   
    }
}
  render() {
      
    return  (
        <li className='chooseProduct_item clear'>
        <div className={`chooseItem_left ellips left ${this.props.checked == true ? 'choosed':''}`} onClick={this.changeState.bind(this,this.props.index,this.props.product_name)}> {this.props.product_name}</div>
        <div className='chooseItem_right right'>
            <button disabled={this.props.count > 0 ? '':'disabled'} className={`${this.props.count > 0 ? 'reduce':'reduce_no'} button_style `} onClick={this.getProductCount.bind(this,this.props.index,this.props.checked,'add')}></button>
            <input type='text' className='product_num' maxLength='5' value={this.props.count} onChange={this.handleChange}/>
            <button className='add button_style' onClick={this.getProductCount.bind(this,this.props.index,this.props.checked,'reduce')}></button>
        </div>
      </li>
      )
  }
}

