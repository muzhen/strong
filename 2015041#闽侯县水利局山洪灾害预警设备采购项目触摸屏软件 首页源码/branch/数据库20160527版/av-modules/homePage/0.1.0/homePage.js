
define(["avalon","jquery","swiper",'css!swiper.css','css!bootstrap.css','css!homePage.css'],function(avalon,$,swiper){
 var img_list={
       options:"",
      /*
      初始化函数参数
       options--传人参数，例如:options.clid
      */
       init:function(options){
            img_list.options=options;
            var vm=avalon.define({
                $id:options.clid,
                lbimg:[],//存放轮播图片
                jcfb:[],//存放所有菜单
                show:[],//存放需要呈现的菜单
                list:[],//存放叶签内容
        
        /*
        初始化数据函数参数
        options--传人参数，例如:轮播图片数据、实时监测、防汛发布数据
        */
                init:function(options){//页面加载时要初始化的数据，如：轮播图片、实时监测菜单
                     
                      $.getJSON(options.dataurl.lbimg,options.dataurl.lbpa,function(result){
                        //   for(var i=0;i<result.data.length;i++)//转换轮播图片路径
                        //   {
                        //     result.data[i].image_path='../.'+result.data[i].image_path;
                        //   }
                          vm.lbimg=result.data;
                      
                      });   
                     $.getJSON(options.dataurl.home,function(result){ 
                          var d=[],h=[];
                         /* for (var ti=0;ti<result.data.length;ti++) {//转换图片链接路径
                              result.data[ti].image_path = '../../' + result.data[ti].image_path;
                          }*/
                          d=result.data;
                          vm.jcfb=d;
                          vm.title_list();
                          var z=0;
                          for(var i=0;i<vm.jcfb.length;i++)//初次加载获取"实时监测"的菜单
                          {
                            if(vm.jcfb[i].menu_moudule=="实时监测")
                            {
                             h[z]=vm.jcfb[i];
                             z++;
                           }
                         }
                         vm.show=h;                              
                    }); 
                },
        
                /*
                  点击页签时显示相应的菜单并控制下方小三角图片的显示与隐藏
                  参数id:页签实时监测或防汛发布的id号
                  */
                onclick:function(id){
                  
                         var z=$('#'+id).children("h3");
                         var k=$('#'+id).children("h4");
                         var arr=$('#mode').find("h4");
                         for(var i=0;i<arr.length;i++)
                         {
                           arr[i].style.visibility="hidden";
                         }
                         k[0].style.visibility="visible";
                         
                         var s=z[0].innerText;
                         var h=[];
                         var z=0;
                         for(var i=0;i<vm.jcfb.length;i++)
                         {
                              if(vm.jcfb[i].menu_moudule==s)
                              {
                               h[z]=vm.jcfb[i];
                               z++;
                              }
                        }
                         vm.show=h;
                },
                tubiao:function(){//页面加载时控制页签下方的小三角图标的显示
                   $('#0').children("h4").css({"visibility":"visible"});

                },
                title_list:function(){//筛选获取所有的页签内容
                    var s=[];
                    for(var w=0;w<vm.jcfb.length;w++)
                    {
                       if(vm.jcfb[w].menu_moudule!=null)
                       {
                           if(s.indexOf(vm.jcfb[w].menu_moudule)==-1)
                           {
                                s.push(vm.jcfb[w].menu_moudule);
                           }
                        }
                   }
                    vm.list=s;
                 },
                swiperFun:function(){//实现图片轮播功能
                    var mySwiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        paginationClickable: true,
                        spaceBetween: -1,//控制图片之间的间隙
                        centeredSlides: true,
                        autoplay: 5000,//控制图片轮播的间隔时间
                        autoplayDisableOnInteraction: false
                    });
                },
                swiperFun2:function(){//实现页签显示的展示效果
                    var swiper = new Swiper('.swiper-container1', {
                        pagination: '.swiper-pagination',
                        slidesPerView: 2,
                        paginationClickable: true,
                        spaceBetween: 0,
                        freeMode: true
                     });
                  vm.tubiao();
                }
        });
       return vm;
     }
  }
    return img_list;
});
