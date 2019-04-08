$(function(){
    'use strict'
    $('.header').on('tap','ul li.return',function(){
        history.go(-1);
    })
})