/**
 * Created by brickspert on 2016/12/22.
 */
/*桌面*/
import React, {Component} from 'react';
import './Desktop.scss';
import {hashHistory} from 'react-router';
import {autoPlay} from 'util/audioAutoPlay'

import Bless from '../../components/Bless/Bless';
import BgImg from '../../components/BgImg/BgImg';
import emitter from "../../components/Events/ev";

const bgImg = require('../../asset/images/photos/desktop-bg.jpg');
const iconImg = require('./images/icon.png');
const iconTop = require('./images/top.png');
const iconBot = require('./images/bottom.png');
const hand = require('./images/hand2.png');
const count1Img = require('./images/count-1.png');
const count2Img = require('./images/count-2.png');
const count3Img = require('./images/count-3.png');
const closeImg = require('./images/close.png');
const unlockMp3 = require('./audio/unlock.mp3');
import wxUtils from 'util/wxUtils'

/*底部热点区组件*/
class BottomHotSpot extends Component {
    /*
     * count 新消息数量 可选为 1,2,3
     * animateType 动画类型 可选 1，2
     * left 热点区离左边的距离 例如 12px
     * */
    _getCountImg(count) {
        switch (count) {
            case 1:
                return count1Img;
            case 2:
                return count2Img;
            case 3:
                return count3Img;
        }
    }

    _redirectToUrl(url) {
        if (url == '/map') {
            // 地图特殊处理，去掉引导手势
            sessionStorage.setItem('conductor_map', false);
        }
        hashHistory.push({
            pathname: url
        });
    }

    render() {
        const countImg = this._getCountImg(this.props.count);
        const redPointClassName = this.props.animateType ? `red-point  red-point-animate-${this.props.animateType}` : `red-point`;
        return (
            <div className="bottom-hot-spot" style={{left: this.props.left}}
                 onClick={() => this._redirectToUrl(this.props.toUrl)}>
                <img className={redPointClassName} src={countImg}/>
            </div>
        )
    };
}

/*头部热点区组件*/
class TopHotSpot extends Component {
    /*
     * topText 头部文字
     * middleText 中间文字
     * bottomText 下部文字
     * */
    render() {
        const topText = this.props.topText;
        const middleText = this.props.middleText;
        const bottomText = this.props.bottomText;
        return (
            <div className="top-hot-spot" style={{left: this.props.left}} onClick={() => this.props.click()}>
                {topText ?
                    <div className="top-text">{topText}</div>
                    :
                    ''
                }
                {middleText ?
                    <div className="middle-text">{middleText}</div>
                    :
                    ''
                }
                {bottomText ?
                    <div className="bottom-text">{bottomText}</div>
                    :
                    ''
                }
            </div>
        )
    };
}

export default class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoShow: false,
            blessShow: false,
            conductor_date: sessionStorage.getItem('conductor_date'),
            conductor_map: sessionStorage.getItem('conductor_map')
        }
        emitter.emit("callMusic", "play");
    }

    _openVideo() {
        emitter.emit("callMusic", "pause");
        this.setState({
            videoShow: true
        });
    }

    _closeVideo() {
        emitter.emit("callMusic", "play");
        this.setState({
            videoShow: false
        });
    }

    _openBless() {
        this.setState({
            blessShow: true
        });
    }

    _closeBless() {
        this.setState({
            blessShow: false
        });
    }

    _redirectToUrl(url) {
        if (url == '/integrated') {
            // 日期特殊处理，去掉引导手势
            sessionStorage.setItem('conductor_date', false);
        }
        hashHistory.push({
            pathname: url
        });
    }

    componentDidMount() {
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {    	
            if (window.screen.height + 88 == 812 && window.screen.width == 375){
                document.querySelectorAll('.bottom-hot-spot').forEach(element => {
                    element.style.height = '17%'
                })
                document.querySelectorAll('.top-hot-spot').forEach(element => {
                    element.style.height = '18%'
                })
                document.querySelector('.white-bottom').style.height = '15%'
            }
        }
        autoPlay('desktop-audio');
        wxUtils.disabledToolbar();
    }

    render() {
        return (
            <div className="full-page desktop-page">
                {/*背景照片*/}
                <BgImg src={bgImg} animate={true}/>
                <div className="bg">
                    <div className="white-bottom"></div>
                    <img src={iconTop} className="icon icon-top"/>
                    <img src={iconBot} className="icon icon-bot"/>
                    {console.log(sessionStorage.getItem('conductor_date'))}
                    {sessionStorage.getItem('conductor_date') == 'true' ?
                        <div><img src={hand} className="date-hand"/></div>
                        :
                        ''
                    }
                    {console.log(sessionStorage.getItem('conductor_map'))}
                    {sessionStorage.getItem('conductor_map') == 'true' ?
                        <div><img src={hand} className="map-hand"/></div>
                        :
                        ''
                    }
                    {/*上部热点区*/}
                    <TopHotSpot left="0%" topText={userType == 'boy' ? '5月' : '5月'}
                                middleText={userType == 'boy' ? '1日' : '1日'} bottomText={'日期'}
                                click={() => {
                                    this._redirectToUrl('/integrated');
                                }}/>
                    <TopHotSpot left="25%" bottomText={'视频'} click={() => this._openVideo()}/>
                    <TopHotSpot left="50%" bottomText={'相册'} click={() => this._redirectToUrl('/photos')}/>
                    <TopHotSpot left="75%" bottomText={'邀请'} click={() =>this._redirectToUrl('/invite')}/>
                    {/*下部热点区*/}
                    <BottomHotSpot count={2} left="0%" animateType={2} toUrl={'/dialing'}/>
                    <BottomHotSpot count={1} left="25%" animateType={2} toUrl={'/wechat'}/>
                    <BottomHotSpot count={3} left="50%" animateType={1} toUrl={'/photograph'}/>
                    <BottomHotSpot count={1} left="75%" toUrl={'/map'}/>
                </div>
                <audio className="hidden" autoPlay id="desktop-audio">
                    <source src={unlockMp3} type="audio/mpeg"/>
                </audio>

                {/*视频*/}
                {this.state.videoShow ?
                    <div className='video' onClick={() => this._closeVideo()}>
                        <img src={closeImg} className="close" onClick={() => this._closeVideo()}/>
                        <iframe src="https://www.bilibili.com/video/av79426740/"
                                onClick={(e) => e.preventDefault()}></iframe>
                    </div>
                    :
                    ''
                }
                {/*祝福*/}
                {this.state.blessShow ?
                    <Bless close={() => this._closeBless()}/>
                    : ''
                }
            </div>
        );
    }
}