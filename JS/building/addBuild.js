
mui.init();
$(function(){
    "use strict"
    // mui日期初始化
    var muiDate={
        muiInit:function(){
            var dtpicker = new mui.DtPicker({
                type: "date",//设置日历初始视图模式 
                beginDate: new Date(1980,  1,25),//设置开始日期 
                endDate: new Date(2025, 1, 25),//设置结束日期 
                // labels: ['Year', 'Mon', 'Day', 'Hour', 'min'],//设置默认标签区域提示语 
             
            })
            dtpicker.show(function(e) { 
                console.log(e); 
                console.log(e.value);
                $('#timeDate').addClass('marginRight');
                $('#timeDate').val(e.value);
                
            })
        
        }
    } 
     $('#timeDate').on('click',function(){
        muiDate.muiInit();
        console.log('1111')
        
    
    })
   
  
})
