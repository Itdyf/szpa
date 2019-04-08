
         'use strict'
        

//不同分辨率下设置不同的fontsize值
var _self = this;
var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
console.log(deviceWidth); //hack某些浏览器获取手机屏幕宽度
_self.width = 375; //设计稿宽度
_self.fontSize = 100; //以100字体为参照物
_self.actualWidth = function () {
        return deviceWidth;
};
document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + (_self.actualWidth() * _self.fontSize) / _self.width + "px !important");
// 全局token
var rootUrl = 'http://192.168.1.18:8888'
var tokens = '0641e4ae7cb5468eb015e6219a089b3f';

// 全局下拉刷新
var main = {
        pullupRefesh: function () {
                var _self = this
                _self.endPullupToRefresh(false);
        },
        parcelNumber:function(reg){

        },
        matrix(){
                
        },
        return(){
                history.go(-1);
        }







}
// var return=function(){
//         history.go(-1); 
// }


   

 
