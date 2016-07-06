define(["avalon", "jquery", "swiper", "JsUtil", "area",'css!bootstrap', 'css!swiper.css','css!waterList.css'], function (avalon, $, Swiper, JsUtil, area) {
  var water_list = {
        options: {
         waterVm:{},
         xzqhVm:{}
        },
         /*
         从子组件获取行政区码
         参数addvcd：行政区码
       */
        xzqhSelected:function(addvcd){//传人参数addvcd--行政区码
                 var vm=water_list.options.xzqhVm;//img_list.init({clid:"mytest"});
                 vm.datachange(addvcd);

        },
         /*
            初始化函数参数
            options--传人参数，例如:options.clid
        */
        init:function(options){
          water_list.options=$.extend(water_list.options,options);
          var vm=water_list.waterVm(); 
          vm.hedaotab=options.hedaotab;
          vm.load(options);
          return vm;
        },
        waterVm:function(){
              var xzqhVm = area.init({clid: "city",xzqhSelect:water_list.xzqhSelected});
              var vm = avalon.define({
                $id: water_list.options.clid,
                lbimg: [],//存放轮播图片路径
                tite: [],//存放表格的表头
                //tabId:"hd",//当前显示表的id
                //hedao: [],//存放河道的数据
                tabdata:[],
                count:"",
                Num:2,//页签的显示个数
                shuiku: [],//存放水库的数据
                hedaotab:[],//存放河道的字段信息
                //shuikutab:[],//存放水库的字段信息
               // arrtab:[],//存放所有表格的div
                alltable:[],//存放所有的表数据
                addvcdvm: "440000",//当前行政区划编码
                current: "all",//当前页签
               // pa1 :{addvcd: "441500", stnm:"", type: "hedao"},
                //pa2 : {addvcd: "441500", stnm: "", type: "shuiku"},
                pa3: {addvcd: "440000", title: "实时监测", type: "lbimg"},
                pa:{addvcd:"440000",stnm:"",collection_type:""},
                yeqian:[],//存放叶签内容
                potionvm: [],//数据源
                tplm: require.toUrl('area') + '.tpl',//调用行政区划组件
                xzqhlist: function () {
                  xzqhVm.init();
                },
                xzqhclick:function(){//点击行政区划后的函数调用
                  xzqhVm.clickshen();  
                },
                /*
                  初始化数据函数参数
                  参数options：各类水情信息的数据源
                  */
                load: function (options) {//初始化数据加载
                      vm.optionvm = options;
                      vm.current = "all";
                      vm.yeqian=options.yeqian;
                      if(vm.yeqian.length>=3)
                      {
                        vm.Num=3;
                      }
                      else{
                         vm.Num=vm.yeqian.length;
                      }
                      vm.alltable={"all1":"","river":"","rsvrevs":""};
                      
                      vm.addvcdvm=vm.pa.addvcd;
                      vm.getdata(vm.optionvm.dataurl,vm.pa,"all");
                      vm.pa.collection_type="river";
                      vm.getdata(vm.optionvm.dataurl,vm.pa,"river");
                      vm.pa.collection_type="rsvrevs";
                      vm.getdata(vm.optionvm.dataurl,vm.pa,"rsvrevs");
					  vm.pa3=options.lbpa;
                      vm.getdata(options.lbimg, vm.pa3,"lbimg");
                     // vm.chdata(vm.current);

                },
                star:function(){//页面加载时更具行政编码转换相应的省、市、县或区
                   $.getJSON(require.toUrl('area') + '.json',function(result){
                          var s=vm.addvcdvm;
                          var shencode=s.substring(0,2);
                          var shicode=s.substring(2,4);
                          var qucode=s.substring(4,6);
                          var shen,shi,qu;
                          for(var i=0;i<result.area.length;i++)
                          {
                             if(result.area[i].code==shencode)
                             {
                                 shen=result.area[i].name;
                                 for(var x=0;x<result.area[i].child.length;x++)
                                 {
                                     if(result.area[i].child[x].code==shicode)
                                     {
                                        shi=result.area[i].child[x].name;
                                        for(var z=0;z<result.area[i].child[x].child.length;z++)
                                        {
                                            if(result.area[i].child[x].child[z].code==qucode)
                                            {
                                              qu=result.area[i].child[x].child[z].name;
                                              break;
                                            }
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                          }
                          if(shen!=null)
                            { 
                               $('#shen').val(shen);
                             }
                            else{
                               $('#shen').val("");
                             }
                            if(shi!=null)
                             {
                               $('#shi').val(shi);
                             }
                            else{
                              $('#shi').val("");
                            }
                            if(qu!=null)
                            { 
                              $('#qu').val(qu);
                            }
                            else{
                              $('#qu').val("");
                            }
                        
                      });      
                },
                /*
                    搜索框的背景颜色的控制
                    参数id:搜索框的id
                  */
                bgcolor:function(id){//搜索框的背景颜色的控制
                 
                    $('#'+id).css({"background-color":"white"}); 
                },
                /*
                    选择行政区划后的获取相应数据
                    参数addvcd：行政区码
                  */
                datachange:function(addvcd){//选择行政区划后的获取相应数据
                      var k=$("#sous").val();
                      if(k=="")
                      {
                            $("#sous").css({"background-color":"#DAD5D5"});
                      }
                      else{
                        $("#sous").css({"background-color":"white"});
                      } 
                      vm.addvcdvm=addvcd;
                      vm.pa.addvcd = vm.addvcdvm;
                      vm.pa.stnm=k;
                      vm.pa.collection_type="";
                      vm.getdata(vm.optionvm.dataurl,vm.pa,"all");
                      vm.pa.collection_type="river";
                      vm.getdata(vm.optionvm.dataurl,vm.pa,"river");
                      vm.pa.collection_type="rsvrevs";
                      vm.getdata(vm.optionvm.dataurl,vm.pa,"rsvrevs");                         
                },
                 /*
                   搜索框输入数据完成后点击回车，获取相应的数据
                   参数id:搜索框的id
                   参数e:键盘对象
                 */
                souschange:function(id,e){//搜索框输入数据完成后点击回车，获取相应的数据
                    var sous=$('#'+id).val();
                    var e = e || window.event;
                    if (e.keyCode == 13) {                   
                          vm.pa.addvcd = vm.addvcdvm;
                               vm.pa.stnm=sous;
                               if(vm.current=="all")
                               {
                                 vm.pa.collection_type="";
                               }else{
                                vm.pa.collection_type=vm.current;
                               }
                               
                               vm.getdata(vm.optionvm.dataurl, vm.pa,vm.current);
                           
                    }
                },
               
                 /*
                  将各个表水势的数据转换成箭号图标
                  arr：各类水情列表数据
                  s: 水情类型 
                */
                 tubiao: function (arr) {//将各个表水势的数据转换成箭号图标

                     //if(s == "hedao") {
                        for (var m = 0; m < arr.length; m++) {
                             switch(arr[m].wptn)
                             {
                               case "4":
                                  arr[m].wptn = "glyphicon glyphicon-arrow-down";break;
                               case "5":
                                   arr[m].wptn = "glyphicon glyphicon-arrow-up";break;
                               case "6":
                                    arr[m].wptn = "glyphicon glyphicon-arrow-right";break;
                               default:break;
                             }
                          
                        }
                        return arr;

                  },
                  /*
                    点击页签，实现相应的功能
                    参数id：对应页签的id
                  */
                  hdskclick: function (id) {//点击页签，实现相应的功能
                    //  var s=$('#'+id).html();
                      var k=$("#sous").val();
                      if(k=="")
                      {
                          $("#sous").css({"background-color":"#DAD5D5"});
                      }
                      else{
                         $("#sous").val("");
                         $("#sous").css({"background-color":"white"});
                      }
                      vm.current=id;
                      vm.disow();
                  },
                  disow:function(){
                           var arr=$("#sign").children("div");
                          // var arrtab=$("#tabdis").children("div");
                           for(var i=0;i<arr.length;i++)
                           {
                              if(arr[i].id==vm.current)
                              {
                                 $('#'+vm.current).css({"border-bottom-color":"#3a9fe8","color":"#3c9ee9"});
                              }
                              else{
                                 $("#"+arr[i].id).css({"border-bottom-color":"#e6eef4","color":"#abacad"});
                               }  
                           }
                  },
                  dis: function () {//初始加载时页面风格的设置
                         vm.disow();
                         vm.tite=vm.optionvm.hedaotab;
                         vm.star();
                        
                       
                  },
                   /*
                    初始化各个水情表的数据
                    参数url:各个水情表的数据源
                    参数params：获取数据传递的参数
                  */
                  getdata: function (url, params,cur) {
                       $.getJSON(url, params, function (result) {
                             switch(cur){
                             
                                case "rsvrevs":
                                         vm.alltable.rsvrevs = vm.tubiao(result.data);
                                          break;
                                case "river":
                                         vm.alltable.river= vm.tubiao(result.data);                 
                                        break;
                                case "lbimg":
                                        vm.lbimg = result.data;
                                        break;
                                case "all":
                                        vm.alltable.all1=vm.tubiao(result.data);
                                        break;
                                default:break;

                             }
                            if(cur!="lbimg")
                            {
                             vm.chdata(vm.current);
                            }
                       });
                  },
                  /*
                      切换表格数据
                      参数cur：指定切换的表格
                  */
                  chdata:function(cur){
                       switch(cur){
                          case "rsvrevs":
                               vm.tabdata=vm.alltable.rsvrevs.$model;break;
                          case "river":
                               vm.tabdata=vm.alltable.river.$model;break;
                          case "all":
                               vm.tabdata=vm.alltable.all1.$model;break;
                          default:break;
                        }
                        if(vm.tabdata)
                        {
                         vm.count=vm.tabdata.length;
                       }
                  },
                  /*
                     点击表中区域名称栏后的跳转
                     参数stcd:测站编号
                     参数stnm:测站名称
                  */
                  hre: function (stcd, stnm,type) {//点击表中任意一栏后的跳转
                        switch(type){
                           case 1:
                              window.location.href = "riverChart.html?stcd=" + stcd + "&stnm=" + stnm;
                              break;
                           case 2:
                              window.location.href = "waterChart.html?stcd=" + stcd + "&stnm=" + stnm;
                              break;
                           default:break;
                        }
                    
                  },
                  swiperAllFunc:function(){//初始化需调用的函数
                              vm.swiperFun2();
                              vm.swiperFun();
                              vm.dis();
                              vm.$watch("current",function(data){
                                  vm.chdata(vm.current);
                              });
                              
                  },
                  swiperFun: function () {//轮播图片功能的实现
                    var mySwiper = new Swiper('.swiper-container', {
                          pagination: '.swiper-pagination',
                          nextButton: '.swiper-button-next',
                          prevButton: '.swiper-button-prev',
                          paginationClickable: true,
                          spaceBetween: -1,
                          effect : 'fade',
                          centeredSlides: true,
                          autoplay: 2000,
                          autoplayDisableOnInteraction: false
                        });

                  },
                  swiperFun2: function () {//页签效果的呈现
                    var swiper = new Swiper('.swiper-container1', {
                        pagination: '.swiper-pagination',
                        slidesPerView: vm.Num,
                        paginationClickable: true,
                        spaceBetween: 0,
                        freeMode: true
                      });
                 }
           });
           water_list.options.xzqhVm=vm;
           return vm;
        }
      }  
    return water_list;
});
