import React from 'react';
import { Link ,browserHistory } from 'react-router'
import '../style/footer.scss'
export default class FooterGuide extends React.Component {
  static defaultProps = {
     
  }
 constructor(props) {
   super(props);
   this.state = {
        $route:this.props.$route //路由对象
   }

 }
 componentWillMount(){
     console.log(this.props)

}
 pageChange(path){
    browserHistory.push(path)
 }
 render() {
   return (
        <div className="footer flex">
            <div   className={  this.state.$route.location.pathname.indexOf('msite') > -1 ? 'active footerNav flex1' :'footerNav flex1' }   onClick={this.pageChange.bind(this,{ pathname:'/msite',query:{ geohash:this.state.$route.location.query.geohash } })}>
                <i className="iconfont icon-shouye"></i>
                <span>外卖</span>
            </div>
            <div  className={this.state.$route.location.pathname.indexOf('search') > -1 ? 'active footerNav flex1' :'footerNav flex1'} onClick={this.pageChange.bind(this, {pathname:'/search/' + this.state.$route.location.query.geohash })}>
                <i className="iconfont icon-fenlei"></i>
                <span>搜索</span>
            </div>
            <div  className={this.state.$route.location.pathname.indexOf('nearby') > -1 ? 'active footerNav flex1' :'footerNav flex1'} onClick={this.pageChange.bind(this,'/nearby')}>
                <i className="iconfont icon-dingwei"></i>
                <span>订单</span>
            </div>
            <div  className={this.state.$route.location.pathname.indexOf('profile') > -1 ? 'active footerNav flex1' :'footerNav flex1'}  onClick={this.pageChange.bind(this,'/profile')}>
                <i className="iconfont icon-geren"></i>
                <span>我的</span>
            </div>
          
        </div>
   )
  
 }


}