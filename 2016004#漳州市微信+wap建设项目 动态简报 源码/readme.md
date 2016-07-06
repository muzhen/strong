


图片-菜单数据格式如下：
[
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
                      
                },
        
                /*
                  点击页签时显示相应的菜单并控制下方小三角图片的显示与隐藏
                  参数id:页签实时监测或防汛发布的id号
                  */
                onclick:function(id){
                  
                         
                },
                tubiao:function(){//页面加载时控制页签下方的小三角图标的显示
                   $('#0').children("h4").css({"visibility":"visible"});

                },
                title_list:function(){//筛选获取所有的页签内容
                    
                 },
                swiperFun:function(){//实现图片轮播功能
                    
                },
                swiperFun2:function(){//实现页签显示的展示效果
                   
                }
 
]
-------------------------------------------------------------------------------
json数据：
{"data":
     [
        {"image_path":"../av-modules/src/static/img/1.jpg"},
        {"image_path":"../av-modules/src/static/img/2.jpg"},
        {"image_path":"../av-modules/src/static/img/3.jpg"}
                                                                                                   
     ]
   }
