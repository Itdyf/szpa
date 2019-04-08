mui.init();
$(function(){
    'use strict'
    $('#OA_task_1').on('tap', '.mui-btn', function(event) {
        var elem = this;
        console.log('ffffffg')
        var li = elem.parentNode.parentNode;
        mui.confirm('确认删除该条记录？', '大亚湾', btnArray, function(e) {
            if (e.index == 0) {
                li.parentNode.removeChild(li);
            } else {
                setTimeout(function() {
                    $.swipeoutClose(li);
                }, 0);
            }
        });
    });
    var btnArray = ['确认', '取消'];
})