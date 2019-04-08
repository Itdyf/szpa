$(function () {
    'use strict'
    var id, totalPage, newHTML, flag, dataStatus; //总共页数;
    var currentPage = 1; //当前页码
    var counter = 1; //计数器
    var main = {

        pullRefresh: function () {
            var _self = this;
            ++counter;
            $('.mui-pull-bottom-pocket.mui-block.mui-visibility').css('overflow', 'initial');
            $('.mui-icon').css('margin-top', '0.68rem');
            $('.mui-pull-caption').css('margin-top', '0.68rem');

            setTimeout(() => {

                main.reder('up');

                // 关闭雪花
                _self.endPullupToRefresh(false);

            }, 1500);

        },
        pullDownRefresh() {
            var _self = this;   
            $('.mui-pull-bottom-pocket.mui-block.mui-visibility').css('overflow', 'initial');
            $('.mui-pull-top-pocket').css('overflow', 'initial');
            $('.mui-pull-top-pocket').show();
            // mui('#refeshArea').pullRefresh().endPulldownToRefresh();
               setTimeout(() => {
                counter=1;
                main.reder('down');
                mui('#refeshArea').pullRefresh().endPulldownToRefresh();
               }, 1500);
                  
              
               
            
            
           
           

        },
        _event() {  

            
            $('.unListContent ul').on('tap', 'li .bottom', function () {
                console.log('jin;aoas')
                var _self = this;
                id = $(_self).find('input').val();

                dataStatus = $(_self).attr('data-status');
                flag = $(_self).attr('flag');

                if (dataStatus == '0') {
                    $(_self).find('img').attr('src', '../../images/area/upArrow.png');
                    $(_self).siblings('.unListContent ul li .center').slideDown();

                    $(_self).attr('data-status', '1');
                } else if (dataStatus == '1') {
                    $(_self).find('img').attr('src', '../../images/area/downArrow.png');
                    $(_self).attr('data-status', '0');
                    $(_self).siblings('.unListContent ul li .center').slideUp();

                }

                // 只允许调用一次
                // rootUrl + '/base/basezonerunit/list?base_zone_id=' + id
                // '../../JS/common/guanxi.json'
                if (flag == 'true') {

                    mui.ajax(rootUrl + '/base/basezonerunit/list?base_zone_id=' + id, {
                        headers: {
                            token: tokens
                        },
                        data: '',
                        type: "GET",
                        success: function (data) {
                            if (data.status == 200) {
                                var htmls = template('ContentTmp', data);
                                // $('.unListContent ul li .center').append(htmls);
                                $(_self).siblings('.center').append(htmls);
                                $(_self).attr('flag', 'false');
                                return flag;
                                // document.getElementById("containerBox").innerHTML = html;
                            }
                        }
                    })

                    return flag;

                }

            });
        },
        reder: function (statusRefersh) {

            // rootUrl + '/base/basezone/list?currentPage=' + counter + '&pageSize=' + 1
            //'../../JS/common/area.json'
            mui.ajax(rootUrl + '/base/basezone/list?currentPage=' + counter + '&pageSize=' + 1, {
                headers: {
                    token: tokens
                },
                dataType: 'json',
                data: '',
                type: 'get',
                success: function (data) {
                    currentPage = data.currentPage;
                    totalPage = data.totalPage;


                    // sessionStorage.setItem('base_place_id',base_place_id);
                    console.log(data);
                    if (data.status == '200') {
                        var _self = this;
                        var html = template('areaListTemp', data);
                        setTimeout(function () {
                            var base_place_id = $('#placeId').val();
                            console.log(base_place_id);
                            sessionStorage.setItem('base_place_id', base_place_id);
                        }, 0);
                        if (statusRefersh == 'up') {
                            $('#refeshArea .unListContent ul.mui-table-view.mui-table-view-chevron').append(html);
                        } else if (statusRefersh == 'down') {
                            // 清空页面
                            $('#refeshArea .unListContent ul.mui-table-view.mui-table-view-chevron').html('');
                            $('#refeshArea .unListContent ul.mui-table-view.mui-table-view-chevron').append(html);
                            mui('#refeshArea').pullRefresh().endPulldownToRefresh();


                        }


                        if (data.data.length == 0 || counter >= totalPage) {
                            $('.mui-pull-bottom-pocket').css('visibility', 'initial');
                            setTimeout(() => {
                                $('.mui-pull-bottom-pocket').css('visibility', 'hidden');
                            }, 3000);
                            mui('#refeshArea').pullRefresh().endPullupToRefresh(true);


                            //结束上拉刷新
                        } else {
                            mui('#refeshArea').pullRefresh().endPullupToRefresh(false);

                        }






                    } else {

                    }
                },
                error: function (err) {
                    console.log(err);
                }


            })







        },
        toReturn() {
            $('#refeshArea').on('tap', 'a', function () {
                window.location.href = '../../static/area/areaListDeail.html'
            })
        }





    }
    mui.init({
        pullRefresh: {
            container: '#refeshArea', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: main.pullRefresh, //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                auto: false //首次不要触发     
            },
            down: {
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                auto: false, //可选,默认false.首次加载自动上拉刷新一次
                callback: main.pullDownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    main._event();
    main.reder('up');
    main.toReturn(); //跳转到详情






})