import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'
import { Link } from 'react-router';
 import ListItem from './listItem';
export  default  class selectProduct extends Component {
 constructor(props){
       super(props);
       this.state = {
        list:[]
    }
 }

  componentWillMount(){
    fetch('http://cangdu.org/shopro/data/products').then(response => {
        if (response.ok) {
            response.json().then(json =>{

                 this.setState({
                     list : json.data.data.map((item,index)=> {
                        item.checked = false ;
                        return  item 
                     })
                 })
                
            })
        }
    }).catch(error => console.log(error))

}
changeList(_index,type,product_name){
 let _list =   this.state.list.map((item,index)=>{
     if(_index == index){
         switch(type){
             case 'changeChecked' :
                item.checked = !item.checked;
             break;
             case   'add':
                
             break;
             case 'reduce' :

             break;

         }
     }
    })

    this.setState({
        list: _list
    })
}

  render() {
      
    return  (
        <div> 
        <ul className="product_list_ul">
            {
                this.state.list.map((item, index) => {
                    return <ListItem  changeState={this.changeList.bind(this)} key={index} {...item} index={index}/>
                })
            }
        </ul>
    </div>
        
      )
  }
}

