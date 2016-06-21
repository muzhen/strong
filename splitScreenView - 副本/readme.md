

水情方法如下：
[
init:function(options){//数据初始化
            $.getJSON(options.dataurl,function(result){
                
            }); 
        },
        xzquma:function(){//获取城市编号
             var s=document.getElementById("shen").value;
               s=s+document.getElementById("shi").value;
               s=s+document.getElementById("xian").value;
               vm.addvcd=s;
        },
        tubiao:function(arr){//转换水势图标
          
        },
         hdskclick:function(id){//点击河道or水库
        },
        dis:function(){//加载后样式
             document.getElementById("sk").style.display="none";     
             document.getElementById("shuiku").style.borderBottomColor="#e6eef4";
             document.getElementById(vm.current).style.borderBottomColor="#3a9fe8";
              document.getElementById("shuiku").style.color="#abacad";
             document.getElementById(vm.current).style.color="#3c9ee9";
         },
         keypre:function(id,e){//回车搜索
           var e = e || window.event; 
            if(e.keyCode == 13){ 
              var s=document.getElementById(id).value;
              //var p={type:"xx",date："",stnm:""};
            //getdata(p);  
            if(s!="")
            {
               vm.sous=s;
            }
            else{
                vm.sous=null;
               }
           }
         },
        swiperFun:function(){//轮播图片
            var mySwiper = new Swiper('.swiper-container', {
                      
                    });
        },
        swiperFun2:function(){//显示页签
           
          });
         }
    });
    vm.$watch("firstSelected", function (a) {//监听联动数据
               
            })
    vm.$watch("secondSelected", function (a) {//监听联动数据

            })
]
data.json文件
[
   
    "lbimg":[//轮播图片路径
        {
          "src": "../av-modules/src/static/img/1.jpg"
        },
        {
            "src": "../av-modules/src/static/img/2.jpg"
         },
         {
            "src": "../av-modules/src/static/img/3.jpg"
        }
    ],
      "hedao": [//河道信息
        {
            "stcd": "xxx",
            "bsnm": "漯河",
            "stnm": "焦坑(二)",
            "tm": "2016-04-07 08:00",
            "z": "7.50",
            "wptn": "4"
        }
      ],
      "shuiku":[//水库信息
       {
            "stcd": "xxx",
            "stnm": "青年",
            "tm": "2016-04-07 09:00",
            "rz": "10.00",
            "w": "10.22",
            "rwptn": "5"
        }
      ],
        "area"://行政区划
     [
        {
          "name":"福建省",
          "code":"3503",
          "child":[
                {
                  "name":"三明市",
                  "code":"05",
                  "child":[
                        {
                          "name":"梅列区",
                          "code":"035"
                        },
                        {
                          "name":"三元区",
                          "code":"036"
                        }
                     ]
                },
                {
                  "name":"泉州市",
                  "code":"08",
                  "child":[
                        {
                          "name":"丰泽区",
                          "code":"034"
                        },
                        {
                          "name":"洛江区",
                          "code":"535"
                        }
                       ]
                }
            ]
        }
                                                                                             
     ]
]
-------------------------------------------------------------------------------

