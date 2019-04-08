$(function(){
    'use strict'
    var base_place_id=sessionStorage.getItem('base_place_id');
    console.log(base_place_id);
    var mainObject={
        parcel_number: undefined,
        name: undefined,
        code: undefined,
        income: undefined,
        listed_unit:undefined,
        judgeData(){
            if(mainObject.parcel_number==undefined){
                mui.toast('请您填写宗地号');
                return false;
            }
            if(mainObject.name==undefined){
                mui.toast('请您填写片区名称');
                return false;
            }
            if(mainObject.code==undefined){
                mui.toast('请您填写片区编码');
                return false;
            }
            if(mainObject.listed_unit==undefined){
                mui.toast('请您填写挂牌单位');
                return false;
            }
            return true;
            
        },
    
        //渲染开始
        render (){
            mui.ajax(rootUrl + '/base/baseplace/list?id=' +base_place_id, {
                headers: {
                    token: tokens
                },
                contentType: 'json',
                data: '',
                type: 'get',
                success: function (data) {
                    if(data.status==200){
                        console.log(data);
                        $('#competent_unit_responsibilities').val(data.data[0].ownership_unit_name);
                    }
                },
                error:function(){
                    console.log(error);
                }
        })

    }
    }
     $('#parcel_number').on('blur',function(){
        
        mainObject.parcel_number= $('#parcel_number').val();

     })
     $('#name').on('blur',function(){
        
        mainObject.name= $('#name').val();
     })
     $('#code').on('blur',function(){
        
        mainObject.code= $('#code').val();
     });
     $('#listed_unit').on('blur',function(){
        mainObject.listed_unit= $('#listed_unit').val();
     })

     $('.sumbit').on('click',function(){
            var describes=$('#remarkContent').val();
            console.log(describes);
            var dataObject={
                'parcel_number':mainObject.parcel_number,
                'name': mainObject.name,
                'code':  mainObject.code,
                'listed_unit':mainObject.listed_unit,
                'describes':describes,
                'status':0
            }
            mui.ajax(rootUrl+'/base/basezone/', {
                headers: {
                    token: tokens
                },
                contentType: "application/json",
                data: dataObject,
                dataType:'json',
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    if(data.status==200){
                        mui.toast('新建片区');
                        setTimeout(() => {
                            window.location.href='../../static/area/areaList.html'  
                        }, 1000);

                       
                    }




                 
                },
                error: function (err) {
                    console.log(err);
                }


            })
            if(mainObject.judgeData()){
           
            }
      
        
        

     })
     mainObject.render();
     

})