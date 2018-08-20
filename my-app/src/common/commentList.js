 import React ,{ Link } from 'react';
 export default class CommentList extends React.Component {
   
  static defaultProps = {
    listData:[ {
      userName:'默认的',
      commentText:'默认的',
      flag:false
   }  ]
  }
  constructor(props) {
    super();
    this.state = {
       oIndex : 0
    }

  }
  handlerClick(i){
     this.props.deleteItem(i);
  }
  changeSelect(index){
    //  this.setState({
    //     oIndex:index
    //  })
  }
  componentWillReceiveProps(nextProps){
     alert('componentWillReceiveProps');
       console.log(nextProps)// 最新的props
       console.log(this.props) //原来的
  }
  componentWillUpdate(nextProps){
    alert('componentWillUpdate');
    console.log(nextProps) // 最新的props
    console.log(this.props) //原来的
  }
  componentDidUpdate(prevProps){
    alert('componentDidUpdate');
     console.log(prevProps)//原来的
     console.log(this.props)// 最新的props

  }
  render() {
    alert('render')

      let listItems = this.props.listData.map((item,index)=>{
      let  _class = 'item';
      _class = this.state.oIndex == index ? _class + ' active' : _class;
      return  (<li
              onClick={this.changeSelect.bind(this,index)}
              className={_class} id={`label_${index}`} key={index}> <i>{index}</i> - <span>{item.userName}</span> -  <span>{item.commentText}</span> --<span onClick={this.handlerClick.bind(this,index)}>删除</span> 
              </li> )

      })
    return (
      <ul>
        {listItems}
      </ul>      
      
    );
  }
}