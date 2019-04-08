(function () {
        var lastPage; //总共页数
        var currPage = 1; //当前页码
        var counter = 1; //计数器

        function getList() {
            var result = "";

            $.ajax({
                url: rootUrl + '/base/basezone/list?currentPage=' + counter + '&pageSize=' + 1, //api
                type: 'get',
                headers: {
                    token: tokens
                },
                dataType: "json",
                timeout: 10000,
                data: {},
                error: function (data) {
                    console.log("error")
                },
                success: function (data) {
                    console.log(data);
                    currentPage = data.currentPage;
                    totalPage = data.totalPage;

                    if (data.status == '200') {
                        // var html = template('areaListTemp', data);
                        // document.getElementById("containerBox").innerHTML = html;

                        var temp = '';
                        var data = data;
                        console.log(data.data);
                        for (var i = 0; i < data.data.length; i++) {
                            temp += `<div class="container">
                                   <div class="top">
                                       <ul>
                                           <li class="name">
                                               <h4>
                                                    ${data.data[i].name}
                                               </h4>
    
                                           </li>
                                           <li class="tel">${data.data[i].parcel_number}</li>
                                           <li class="companyName">${data.data[i].region_name}</li>
                                           <li class="line"></li>
                                       </ul>
                                   </div>
                                   <div class="contentContainer">
                                   </div>
                                   <div class="bottom" data-status="0">
                                   <input type="hidden" value="${data.data[i].id}" >
                                       <ul class="clearfix">
                                           <li class="manager fl" id="manager">
                                               管理信息
                                           </li>
                                           <li class="">
                                              <img src="../../images/area/downArrow.png" alt="" class="fl">
                                           </li>
                                       </ul>
                                   </div>
                               </div>
                                   `
                        }


                        $('#containerBox').append(temp);

                        // 管理信息切换
                        // 调用片区和单位接口
                        $('.container .bottom').on('click', function () {
                            var _self = this
                            id = $(this).find('input').val();
                            console.log(id);
                            var flag = true;
                            let dataStatus = $(this).attr('data-status');
                            if (dataStatus == '0') {
                                $(_self).find('img').attr('src', '../../images/area/upArrow.png');
                                $(_self).attr('data-status', '1');
                                $(_self).siblings('.container .contentContainer').slideDown();


                            } else if (dataStatus == '1') {
                                $(_self).find('img').attr('src', '../../images/area/downArrow.png');
                                $(_self).attr('data-status', '0');
                                $(_self).siblings('.container .contentContainer').slideUp();
                            }
                            $.ajax({
                                url: rootUrl + '/base/basezonerunit/list?base_zone_id=' + id,

                                headers: {
                                    token: tokens
                                },
                                data: '',
                                type: "GET",
                                success: function (data) {
                                    console.log(data);
                                    if (data.status == 200) {
                                        var htmls = template('ContentTmp', data);
                                        $(_self).siblings('.contentContainer').html(htmls);



                                        // document.getElementById("containerBox").innerHTML = html;
                                    }
                                }
                            })







                        });






                    } else {

                    }
                },
            })

            //上拉加载
            mui.init({
                pullRefresh: {
                    container: '#pullrefresh', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                    up: {
                        height: 50, //可选.默认50.触发上拉加载拖动距离
                        auto: true, //可选,默认false.自动上拉加载一次
                        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                        contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                        callback: pullupRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                }
            });

            function pullupRefresh() {
                setTimeout(function () {
                    getList();
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh((++counter > lastPage));
                }, 1500)
            }
        })()