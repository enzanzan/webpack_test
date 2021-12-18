import axios from "axios";
import React, { Component } from "react";
import Img1 from "./img/1.gif";
import Style from "./less/public";
export default class App extends Component {
  render() {
    return (
      <div className={Style.special}>
        <h3>App组件</h3>
        <img src={Img1} />
        <span className={Style.one}>good</span>
      </div>
    );
  }
  componentDidMount() {
    //生命周期方法，会在render函数调用后自动被调用
    axios
      .get("/data") //浏览器因为同源策略，会默认禁止跨域访问
      .then((res) => {
        //res是响应对象，res.data返回的是json转完的js对象
        console.log(res.data);
      });
  }
}
