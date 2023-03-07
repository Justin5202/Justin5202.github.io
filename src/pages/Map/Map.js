/**
 * Created by brickspert on 2016/12/25.
 */
/*地图页面*/
import React, { Component } from 'react'
import './Map.scss'
import { hashHistory } from 'react-router'

const hertImg = require('./images/hert.png')
const closeImg = require('./images/close.png')
export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    var infoWindow
    var map = new AMap.Map('map', {
      resizeEnable: true,
      // mapStyle: 'amap://styles/wine', //设置地图的显示样式
      features: ['bg', 'point', 'road', 'building'],
      center: [107.74, 29.32],
      zoom: 20
    })
    //在指定位置打开信息窗体
    function openInfo() {
      //构建信息窗体中显示的内容
      var info = []
      info.push(`<div>
        <h4 style="font-size: 22px;">我们的婚礼宴席地点</h4>
        <p style='font-size: 22px;'>时间: 2023年5月2日</p>
        <p style='font-size: 22px;'>地址: 重庆市武隆区南滨路国平时代天街底商(武隆区汉平美食城)</p>
        <p style="display: flex;
        justify-content: space-around;
        padding: 6px 0">
            <a
                style="display: inline-block;
                padding: 4px 6px;
                border: 0;
                font-size: 22px;
                background-color: #22B130;
                text-decoration: none;
                color: #fff;
                border-radius: 2px"
                href="https://uri.amap.com/marker?position=107.74,29.32&name=武隆区汉平美食城">高德导航</a>
            <a
                style="display: inline-block;
                padding: 4px 6px;
                border: 0;
                font-size: 22px;
                background-color: #109aff;
                text-decoration: none;
                color: #fff;
                border-radius: 2px"
                href="http://api.map.baidu.com/marker?location=107.74,29.32&title=所在位置名称&content=武隆区汉平美食城&output=html">百度导航</a>
        </p>
        </div>`)

      infoWindow = new AMap.InfoWindow({
        content: info.join('') //使用默认信息窗体框样式，显示信息内容
      })

      infoWindow.open(map, map.getCenter())
    }

    openInfo()
  }

  _goBack() {
    hashHistory.goBack(-1)
  }

  render() {
    return (
      <div className='full-page map-page'>
        <img src={closeImg} className='close' onClick={() => this._goBack()} />
        <div id='map' className='map'></div>
      </div>
    )
  }
}
