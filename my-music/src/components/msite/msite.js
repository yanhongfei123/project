import React, { Component } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { imgBaseUrl } from "../../config/env";
import store from "../../Redux/store";
import Header from "../../common/head";
import ShopList from "../../common/shopList";
import FooterGuide from "../../common/footer";
import Slide from "../../common/slide";
import Loading from "../../common/loading";
import * as actions from "../../Redux/action";
import * as types from "../../service/getData";

import "../../style/msite.scss";
import "../../style/shopList.scss";

class Msite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRepeatQuestFlag: true,
      geohash: "", // city页面传递过来的地址geohash
      msietTitle: "请选择地址...", // msiet页面头部标题
      foodTypes: [], // 食品分类列表
      shopListArr: [],
      showLoading: true,
      recordAddress: "",
      latitude: "",
      longitude: "",
      hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  }
  componentWillMount() {
    let _geohash = this.props.location.query.geohash;
    //保存geohash
    store.dispatch(actions.saveGeohash(_geohash));

    this.setState({ geohash: _geohash });
    this.getMsiteFoodTypes(); // 导航菜单

    this.getMsiteAdress(_geohash, res => {
      this.setState({
        msietTitle: res.name,
        //  recordAddress:res,
        hasGetData: true
      });
      store.dispatch(actions.recordAddress(res));
    });

    //获取位置信息
    //  store.dispatch(actions.fetchPosts('/v2/pois/', _geohash ,(json)=>{
    //     this.setState({
    //       msietTitle: json.name ,
    //       hasGetData :true
    //  });
    //  }))
  }
  componentWillReceiveProps() {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
    console.log(nextState);
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  componentDidMount() {}

  async getMsiteAdress(_geohash, callback) {
    let res = await types.msiteAdress(_geohash);
    callback && callback(res);
  }

  getMsiteFoodTypes() {
    //获取导航食品类型列表
    types.msiteFoodTypes(this.state.geohash).then(res => {
      let resLength = res.length;
      let resArr = [...res]; // 返回一个新的数组
      let foodArr = [];
      for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        foodArr[j] = resArr.splice(0, 8);
      }
      this.setState({ foodTypes: foodArr });
    });
  }

  // 解码url地址，求去restaurant_category_id值
  getCategoryId(url) {
    let urlData = decodeURIComponent(
      url.split("=")[1].replace("&target_name", "")
    );
    if (/restaurant_category_id/gi.test(urlData)) {
      return JSON.parse(urlData).restaurant_category_id.id;
    } else {
      return "";
    }
  }
  render(res) {
    let { userInfo } = this.props;
    let slideList = this.state.foodTypes.map((item, index) => {
      let slide = item.map((foodItem, index) => {
        return (
          <Link
            to={{
              pathname: "/food",
              query: {
                geohash: this.state.geohash,
                title: foodItem.title,
                restaurant_category_id: this.getCategoryId(foodItem.link)
              }
            }}
            key={foodItem.id}
            className="link_to_food"
          >
            <figure>
              <img src={this.state.imgBaseUrl + foodItem.image_url} />
              <figcaption>{foodItem.title}</figcaption>
            </figure>
          </Link>
        );
      });

      return (
        <div className="food_types_container" key={index}>
          {" "}
          {slide}{" "}
        </div>
      );
    });

    return (
      <div id="msite">
        <div>
          <Header goBack={true}>
            {/* <Link to={`/search/${this.state.geohash}`} className="link_search">搜索</Link> */}
            <Link to="/home" className="msite_title">
              <span className="title_text ellipsis">
                {this.state.msietTitle}
              </span>
            </Link>
            <Link to={userInfo ? "/profile" : "/login"} className="head_login">
              <span className="login_span">登录|注册</span>
            </Link>
          </Header>
          <nav className="msite_nav">
            {" "}
            <Slide slides={slideList}> </Slide>{" "}
          </nav>

          <div className="shop_list_container">
            <header className="shop_header">
              <span className="shop_header_title">附近商家</span>
            </header>

            <ShopList $route={this.props} geohash={this.state.geohash} />
          </div>

          {/* 把路由对象传到子组件里去 */}
          <FooterGuide $route={this.props} />
        </div>
      </div>
    );
  }
}
// Map Redux state to component props
const mapStateToProps = state => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps)(Msite);
