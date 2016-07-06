
define(["avalon","jquery","swiper","area","JsUtil",'css!bootstrap', 'css!swiper.css','css!rainList.css'],function(avalon,$,swiper,area,JsUtil){
  var rain_list={
       options:{
         rainVm:{},
         xzqhVm:{}
       },
       /*
         从子组件获取行政区码
       参数addvcd：行政区码
       */
       xzqhSelected:function(addvcd){
                 var vm=rain_list.options.xzqhVm;//img_list.init({clid:"mytest"});
                 vm.datachange(addvcd);
               },
        /*
            初始化函数参数
            options--传人参数，例如:options.clid
        */
        init:function(options){
          rain_list.options=$.extend(rain_list.options,options);
          var vm=rain_list.rainVm(); 
              vm.load(options);
          return vm;
        },
       rainVm:function(){
            //rain_list.options = options;
            var xzqhVm = area.init({ clid: "cityx", xzqhSelect: rain_list.xzqhSelected });
            var vm = avalon.define({
              $id: rain_list.options.clid,
              lbimg: [],//存放轮播图片路径
              tite: [],//存放表格的表头
              inftab:[],
              countab:[],
              areatab:[],
              avgetab:[],
              smyeq:[],
              tabId:"xxtab",
              col:"",
              ylxx: [],//存放雨量信息的数据
              yltj: [],//存放雨量统计的数据
              qyzd: [],//存放区域最大的数据
              pjyl: [],//存放平均雨量的数据
              startime: "",//昨日8点时间
              endtime: "",//现在时间
              addvcdvm: "441500",//当前行政区划编码
              current: "",//当前页签
              yeqian: [],//存放叶签内容
              //butwtm:"",//时间段
              pa1: { addvcd: "441500", time: "[2016-04-11T08:00:00,2016-04-15T08:00:00]", type: "ylxx" },
              pa2: { addvcd: "441500", time: "[2016-04-10T08:00:00,2016-04-12T08:00:00]", type: "yltj" },
              pa3: { addvcd: "441500", time: "[2016-04-10T08:00:00,2016-04-12T08:00:00]", type: "qyzd" },
              pa4: { addvcd: "441500", time: "[2016-04-10T08:00:00,2016-04-12T08:00:00]", type: "pjyl" },
              pa5: { addvcd: "441500", time: "[2016-04-11T08:00:00,2016-04-15T08:00:00]", type: "lbimg" },
              optionvm: [],//数据源
              tplm: require.toUrl('area') + '.tpl',//调用行政区划组件
              xzqhlist: function () {
                // xzqhVm.init(require.toUrl('area') + '.json');  
                xzqhVm.init();
              },
              xzqhclick: function () {//点击行政区划后的函数调用
                xzqhVm.clickshen();

              },
              swiperAllFunc: function () {//初始化需调用的函数
                vm.swiperFun2();
                vm.swiperFun();
                vm.dis();
              },
              /*
              初始化数据函数参数
              参数options：各类雨量信息的数据源
              */
              load: function (options) {
                vm.optionvm = options;
                vm.inftab=options.inftab;
                vm.countab=options.countab;
                vm.areatab=options.areatab;
                vm.avgetab=options.avgetab;
                vm.smyeq=options.smyeq;
                vm.yeqian = options.yeqian;
               // vm.titlelist(options.dataurl);
                vm.current = "ylxx";
                vm.addvcdvm = vm.pa1.addvcd;
                vm.pa1.time=vm.time();
                vm.pa2.time=vm.time();
                vm.pa3.time=vm.time();
                vm.pa4.time=vm.time();
				
                //vm.pa5.time=vm.time();
                vm.pa5=options.lbpa;
                vm.getdata(options.ylxx, vm.pa1);
                vm.getdata(options.yltj, vm.pa2);
                vm.getdata(options.qyzd, vm.pa3);
                vm.getdata(options.pjyl, vm.pa4);
                vm.getdata(options.lbimg, vm.pa5);
              },
              star: function () {//页面加载时更具行政编码转换相应的省、市、县或区

                $.getJSON(require.toUrl('area') + '.json', function (result) {
                  var s = vm.addvcdvm;
                  var shencode = s.substring(0, 2);
                  var shicode = s.substring(2, 4);
                  var qucode = s.substring(4, 6);
                  var shen, shi, qu;
                  for (var i = 0; i < result.area.length; i++) {
                    if (result.area[i].code == shencode) {
                      shen = result.area[i].name;
                      for (var x = 0; x < result.area[i].child.length; x++) {
                        if (result.area[i].child[x].code == shicode) {
                          shi = result.area[i].child[x].name;
                          for (var z = 0; z < result.area[i].child[x].child.length; z++) {
                            if (result.area[i].child[x].child[z].code == qucode) {
                              qu = result.area[i].child[x].child[z].name;
                              break;
                            }
                          }
                          break;
                        }
                      }
                      break;
                    }
                  }
                  if (shen != null) {
                    $('#shen').val(shen);
                  }
                  else {
                   $('#shen').val("");
                  }
                  if (shi != null) {
                    $('#shi').val(shi);
                  }
                  else {
                   $('#shi').val("");
                  }
                  if (qu != null) {
                   $('#qu').val(qu);
                  }
                  else {
                    $('#qu').val("");
                  }
                });
              },

              /*
               初始化各个表头
               参数url:各个表的数据源
              */
              titlelist: function (url) {

                vm.ylxxtite = url.ylxxtite;
                vm.yltjtite = url.yltjtite;
                vm.qyzdtite = url.qyzdtite;
                vm.pjyltite = url.pjyltite;
              },
              /*
               初始化各个雨情表的数据
               参数url:各个雨情表的数据源
               参数params：获取数据传递的参数
             */
              getdata: function (url, params) {
                 $.getJSON(url, params, function (result) {
                    switch(params.type){
                      case "ylxx":
                              vm.ylxx = result.data;break;
                           // vm.ylxx2 = result.data;
                      case "yltj":vm.yltj = result.data;break;
                      case "qyzd":vm.qyzd = result.data;break;
                      case "pjyl": vm.pjyl = result.data;break;
                      case "lbimg":vm.lbimg = result.data;break;
                      default:break;
                    }
                });
              },
              time: function () {//获取昨日8点到现在的时间  
                var star="",end="",butw="";
                  var date = new Date();
                  var now=Date.parse(date);
                  var eight =Date.parse(new Date(Date.parse(date.format("yyyy-MM-dd 08:00:00"))));
                  var yes=__DataUtil.dateAdd(date,"d",-1).format("yyyy-MM-dd 08:mm:ss");
                  if((now-eight)>0)
                  {
                    star=date.format("yyyy-MM-dd 08:mm:ss");
                    end=date.format("yyyy-MM-dd HH:mm:ss");
                  }
                  else
                  {
                    star=yes;
                    end=date.format("yyyy-MM-dd 08:mm:ss");
                  }
                    
                    butw="["+star+","+end+"]";     
                   return butw;
              },
              /*
                 点击表中区域名称栏后的跳转
                 参数stcd:测站编号
                 参数stnm:测站名称
              */
              hre: function (stcd, stnm) {
                window.location.href = "rainChart.html?stcd=" + stcd + "&stnm=" + stnm;
              },
              /*
                选择行政区划后的获取相应数据
                参数addvcd：行政区码
              */
              datachange: function (addvcd) {//选择行政区划后的获取相应数据
                 var k = $("#sous").val();
                if (k == "") {
                  $("#sous").css({ "background-color": "#DAD5D5" });
                }
                else {
                  $("#sous").css({ "background-color": "white" });

                }
            
                 vm.addvcdvm = addvcd;
                vm.pa1.addvcd = vm.addvcdvm;
                vm.pa2.addvcd = vm.addvcdvm;
                vm.pa3.addvcd = vm.addvcdvm;
                vm.pa4.addvcd = vm.addvcdvm;
                vm.pa1.stnm = k;
                vm.getdata(vm.optionvm.ylxx, vm.pa1);
                vm.getdata(vm.optionvm.yltj, vm.pa2);
                vm.getdata(vm.optionvm.qyzd, vm.pa3);
                vm.getdata(vm.optionvm.pjyl, vm.pa4);
           
            
              },
              betweentm:function(){
                  var star="",end="",butw="";
                  var date = new Date();
                  var now=Date.parse(date);
                  var eight =Date.parse(new Date(Date.parse(date.format("yyyy-MM-dd 08:00:00"))));
                  var yes=__DataUtil.dateAdd(date,"d",-1).format("yyyy年MM月dd日 08时");
                  if((now-eight)>0)
                  {
                    star=date.format("yyyy年MM月dd日 08时");
                    end=date.format("yyyy年MM月dd日 HH时");
                  }
                  else
                  {
                    star=yes;
                    end=date.format("yyyy年MM月dd日 08时");
                  }
                   vm.startime = star;
                   vm.endtime = end;
                      
              },
              /*
              搜索框输入数据完成后点击回车，获取相应的数据
              参数id:搜索框的id
              参数e:键盘对象
              */
              souschange: function (id, e) {
                var e = e || window.event;
                if (e.keyCode == 13) {
                  var s = $('#' + id).val();
                  vm.pa1.stnm = s;
                  vm.pa1.addvcd = vm.addvcdvm;
                  vm.getdata(vm.optionvm.ylxx, vm.pa1);

                }
              },
              /*
                点击页签，实现相应的功能
                参数id：对应页签的id
              */
              hdskclick: function (id,cur,n) {
                vm.current =cur;
                var s = $('#' + id).html();
                var k = $("#sous").val();
                if (k == "") {
                  $("#sous").css({ "background-color": "#DAD5D5" });
                }
                else {
                  $("#sous").css({ "background-color": "white" });

                }
                switch(vm.current){
                   case "ylxx":
                        vm.tite = vm.inftab;
                        vm.disow();
                        vm.tabId="xxtab";
                        $("#tj").css({ "display": "none" });
                        $("#ss").css({ "display": "block" });break;
                   case "yltj":
                        $("#tj").css({ "display": "block" });
                        $("#ss").css({ "display": "none" });
                        vm.disow();
                        if(n==0)
                        {
                          id="yltj2";
                        }
                        switch(id){
                            case "yltj2":
                               vm.tite = vm.countab;
                               vm.tabId="tjtab";
                               vm.col=id;
                               vm.colsow();break;
                            case "qyzd":
                               vm.tite = vm.areatab;
                               vm.tabId="zdtab";
                               vm.col=id;
                               vm.colsow();break;
                            case "pjyl":
                               vm.tite = vm.avgetab;
                               vm.tabId="pjtab";
                               vm.col=id;
                               vm.colsow();break;
                         default:break;
                        } 
                    default:break;
                }

              },
              colsow:function(){
                 var arr=$("#smign").children("div");
                  switch(vm.col){
                    case "yltj2": 
                           for(var i=0;i<arr.length;i++)
                            {
                              if(arr[i].id==vm.col)
                              {
                                 $('#'+vm.col).css({ "background-color": "rgb(12, 138, 210)","color":"white"});
                              }
                              else{
                                 $("#"+arr[i].id).css({ "background-color":"white","color":"#009FFF"});
                               }  
                            }break;
                    case "qyzd":
                          for(var i=0;i<arr.length;i++)
                            {
                              if(arr[i].id==vm.col)
                              {
                                 $('#'+vm.col).css({ "background-color": "rgb(12, 138, 210)","color":"white"});
                              }
                              else{
                                 $("#"+arr[i].id).css({ "background-color":"white","color":"#009FFF"});
                               }  
                            }break;
                    case "pjyl":
                          for(var i=0;i<arr.length;i++)
                            {
                              if(arr[i].id==vm.col)
                              {
                                 $('#'+vm.col).css({ "background-color": "rgb(12, 138, 210)","color":"white"});
                              }
                              else{
                                 $("#"+arr[i].id).css({ "background-color":"white","color":"#009FFF"});
                               } 
                            }break;
                    default:break;
                  }

              },
              /*
                搜索框的背景颜色的控制
                参数id:搜索框的id
              */
              bgcolor: function (id) {
                $('#' + id).css({ "background-color": "white" });
              },
              disow:function(){
                  var arr=$("#sign").children("div");
                  for(var i=0;i<arr.length;i++)
                  {
                    if(arr[i].id==vm.current)
                    {
                       $('#'+vm.current).css({"border-bottom-color": "#3a9fe8","color": "#3c9ee9" });
                    }
                    else{
                       $("#"+arr[i].id).css({ "border-bottom-color": "#e6eef4","color": "#abacad"});
                     }  
                  }
              },
             dis:function () {//初始加载时页面风格的设置
                  vm.disow();  
                  vm.tabId="xxtab";
                  $("#tj").css({ "display": "none" });
                  vm.betweentm();
                  vm.tite = vm.inftab;
                  vm.star();
              },
              swiperFun: function () {//轮播图片功能的实现
                var mySwiper = new Swiper('.swiper-container', {
                  pagination: '.swiper-pagination',
                  nextButton: '.swiper-button-next',
                  prevButton: '.swiper-button-prev',
                  paginationClickable: true,
                  effect: 'fade',
                  spaceBetween: -1,
                  centeredSlides: true,
                  autoplay: 5000,
                  autoplayDisableOnInteraction: false
                });
              },
              swiperFun2: function () {//页签效果的呈现
                var swiper = new Swiper('.swiper-container1', {
                  pagination: '.swiper-pagination',
                  slidesPerView: 2,
                  paginationClickable: true,
                  spaceBetween: 0,
                  freeMode: true
                });
              }
            });
            rain_list.options.xzqhVm=vm;
            return vm;
   }
 }
 return rain_list;
});
