$(function () {
    $('.mui-content .mui-table-view.mui-table-view-chevron .mui-table-view-cell.widthSelect').on('click', '.mui-navigate-right', function () {
        $(this).addClass('colorActive').find('img').addClass('muiActive').find('img').addClass('muiActive');
        $(this).parents('li.mui-collapse-content').siblings().find('img').removeClass('muiActive');
        $(this).parents('li.mui-collapse-content').siblings().find('a').removeClass('colorActive');
        var mask = mui.createMask(callback); //callback为用户点击蒙版时自动执行的回调；
        mask.show(); //显示遮罩
        // mask.close(); //关闭遮罩
        var _self = this;
        $('_self::after').css({
            'right': '.2rem',
            'position': 'absolute',
            'content': "''",
            'width': '.15rem',
            'height': '.15rem',
            'display': 'block',
            'background': "url('../../images/unit/pitch.png') no-repeat",
            'background-size': '100% 100%'
        })
    })
})