define(["avalon", "jquery", "swiper","hammer","JsUtil",'css!bootstrap', 'css!swiper.css', 'css!imageView.css'], function (avalon, $, Swiper,Hammer) {
    var satellite_pic = {
        options:{
          clid:"",
          url:"",
          titleType:"",
          dataType:"",
          AllTitle:"",
          rowNum:"",
          colNum:"",
          pageNum:"",
          form:"",
          //par:"",
          picVm:{}
        },
         /*
        初始化函数参数
        options--传人参数，例如:options.clid
        */
        init:function(options){
             satellite_pic.options=$.extend(satellite_pic.options,options);
             var viewWid=$(document.body).width();
             satellite_pic.options.rowNum=2;
             if(viewWid<=450)
             {
                satellite_pic.options.colNum=4;
             }
             else if(viewWid>450&&viewWid<=770)
             {
                satellite_pic.options.colNum=7;
             }
             else{
               satellite_pic.options.colNum=10;
             }
             satellite_pic.options.pageNum=satellite_pic.options.colNum*satellite_pic.options.rowNum;
             var vm=satellite_pic.picVm(); 
             vm.pageNum=satellite_pic.options.pageNum;
             vm.AllTitle=satellite_pic.options.AllTitle;
             var wid=Math.floor(($(document.body).width()-satellite_pic.options.colNum*7*2)/satellite_pic.options.colNum);
             vm.wid=wid;
             if(vm.AllTitle.length>=3)
             {
               vm.TitleNum=3;
             }
             else{
               vm.TitleNum=vm.AllTitle.length;
             }
             satellite_pic.ytChange(satellite_pic.options.titleType);
                  
                return vm;
        },
         /*
          点击城市页签获取相应的数据源 
          参数type:城市类型
        */
        ytChange:function(type){
               var pa = {category: "cloud/fy2", time: "[2016-04-10T08:00:00,2016-04-12T08:00:00]"};
                pa.time=satellite_pic.options.picVm.betweentm();
               switch(type){
                  case "漳州云图": pa["category"]="cloud/fy2";break;
                  case "漳州雷达": pa["category"]="radar/汕尾";break;
                  default:break;
                            //category=cloud/fy2&time=[2016-04-10T08:00:00,2016-04-12T08:00:00]
               }
               //satellite_pic.options.par=pa;
               satellite_pic.getdata(satellite_pic.options, pa);
               satellite_pic.options.picVm.currentYT=type;
        },
        /*
          初始化数据
          参数options:存放图片的数据源
          参数params：获取数据传递的参数
        */
        getdata: function (options, params) {
             var url="";
             if(options.form==true)
             {
                url=options.url;
             }
             else{
                url=options.urltest;
             }
             var imgg=[];
             switch(satellite_pic.options.dataType){
                 case "xml":
                        var sult=[];
                       $.get(url,params,function(xml){
                               $(xml).find("ROW").each(function(i)
                                {
                                   var pal=[{"image_path":"","tm":""}];
                                   pal.image_path=$(this).attr("FILEPATH");
                                   pal.tm=$(this).attr("PRODUCTTIME");
                                   sult.push(pal);
                                });
                                satellite_pic.options.picVm.img = sult;
                                imgg=sult;
                                satellite_pic.arrpage(imgg);
                           });break;
                 case "json":
                         $.getJSON(url,params,function (result) {
                              satellite_pic.options.picVm.img = result;    
                              imgg=result;  
                              satellite_pic.arrpage(imgg);
                          });break;
                default:break;
             }
             /*if(satellite_pic.options.dataType=="xml")
             {  
                  var sult=[];
                 $.get(url,function(xml){
                    
                    $(xml).find("ROW").each(function(i)
                        {
                           var pal=[{"image_path":"","tm":""}];
                           pal.image_path=$(this).attr("FILEPATH");
                           pal.tm=$(this).attr("PRODUCTTIME");
                           sult.push(pal);
                        });
                        satellite_pic.options.picVm.img = sult;
                        imgg=sult;
                        satellite_pic.arrpage(imgg);
                    });
              }
              if(satellite_pic.options.dataType=="json")
              {
                  $.getJSON(url,function (result) {
                          satellite_pic.options.picVm.img = result;    
                          imgg=result;  
                          satellite_pic.arrpage(imgg);
                   });
              }*/
        },
         /*
          将图片化为pageNum张一组的二维数组
          参数imgg:未转化的一维数组图片数据
        */
        arrpage:function(imgg){
              var arr = [];
              var t, k = 0, f = 1;
              for (var w = 0; w < imgg.length; w++) {
                  imgg[w].tm =imgg[w].tm.toDate().format("hh:mm");
              }
              if (imgg.length % (satellite_pic.options.pageNum) == 0) {
                  t = parseInt(imgg.length / satellite_pic.options.pageNum);
              }
              else {
                  t = parseInt(imgg.length / satellite_pic.options.pageNum) + 1;
              }
              for (var d = 0; d < t; d++) {
                  f = (d + 1) * satellite_pic.options.pageNum;
                  arr[d] = [];
                  for (var x = 0; x < satellite_pic.options.pageNum; x++) {
                      for (; k < f; k++) {
                          if (imgg[k]) {
                              arr[d].push(imgg[k]);
                          }

                      }
                  }
              }
              satellite_pic.options.picVm.ig = arr;
        },
        picVm:function(){
             var vm = avalon.define({
                      $id: satellite_pic.options.clid,
                      currenti: 0,//当前轮播图片的id号
                      op: 0.3,//上一张/下一张按钮的透明度
                      ind: 0,//存放8张图片承载页的编号
                      dd: null,//定时器变量
                      AllTitle:"",//所有页签
                      currentYT:"广东",//当前城市页签
                      currentz: 1,//当前轮播图片的id号
                      TitleNum:1,//顶部页签的显示个数
                      pageNum:8,//一个承载页放图片的个数
                      wid:50,
                      toch:true,
                      starEnd: false,//控制定时器的开启和暂停
                      slide: true,//控制存放8张图片承载页的自动切换上一页或下一页
                      first: true,//控制存放8张图片承载页手动翻页时始终显示每页的第一张
                      swiper2: null,//存放8张图片承载页的变量
                      sp: "glyphicon glyphicon-play",//开始or暂停图标
                     // scc:"../av-modules/src/static/img/1.jpg",
                      scc:require.toUrl('imageView')+'/img/1.jpg',
                     // scc: "../av-modules/imageView/0.1.0/static/img/1.jpg",//动态变化图片的路径
                      img: [],//存放所有图片的路径
                      ig: [],//将图片化为8张一组的二维数组
                      el :"",//获取id=hit元素
                      transform:"",//存放图片缩放、拖拽位置的数据
                      initScale:1,//存放初始缩放的原值
                      mc:"",//同时给一个元素el(#hit)绑定多个事件
                      START_X:0,//拖拽图片的x坐标
                      START_Y:0,//拖拽图片的y坐标
                      trfa:false,//控制是否读取上次拖拽的x、y坐标
                      refletm:"",
					  betweentm:function(){
                          var star="",end="",butw="";
                          var date = new Date();
                          var yes=__DataUtil.dateAdd(date,"d",-3).format("yyyy-MM-ddTHH:mm:ss");
                            end=date.format("yyyy-MM-ddTHH:mm:ss");                           
                            star=yes;           
                            butw="["+star+","+end+"]";
                          return butw;                      
                      },
                      refresh:function(){//5分钟定时
                            vm.refletm= setInterval(function () {
                                    satellite_pic.ytChange(vm.currentYT);
                                    }, 300000);
                            vm.opa2();
                            if(vm.img.length!=0)
                            {
                                vm.scc=vm.img[0].image_path;
                            }
                           //vm.scc=vm.img[0].image_path;
                      },
                      bordersty:function(){//设置头部城市页签的边框
                     
                           var arr=$("#borsty").children("div");
                           for(var i=0;i<arr.length;i++)
                           {
                              if(i!=arr.length-1)
                              {
                                 arr[i].style.borderRightStyle="none";
                              }
                           }
						    vm.opa2();
							//vm.refresh();
                          // vm.starEnd= false;
                          //vm.currenti= 0;
                         /* if(vm.dd){
                            clearInterval(vm.dd);
                             vm.op = 1;
                            vm.sp = "glyphicon glyphicon-pause";
                          }
                          //vm.scc="../av-modules/src/static/img/1.jpg";
                         
                           vm.scc=vm.img[0].image_path;
                           */
               
                      },
                      retuclick:function(){//返回按钮
                          // window.location.href = "warnInf.html";
                      },
                      addrclick:function(type){
                              satellite_pic.ytChange(type);
                      },
                      clickstop: function () {//点击开始or暂停，实现定时器的开始和暂停
                         vm.starEnd = !vm.starEnd;
                         if (vm.starEnd) {  
                              
                             if(vm.currenti<=0)//在第一页第一个位置
                              {
                                vm.swiper2.slideTo(vm.swiper2.slides.length-1, 1000, false);
                                vm.currenti=vm.img.length-1;
                                 vm.slide = true;
                              }
                              vm.op = 0.3;
                              vm.sp = "glyphicon glyphicon-pause";
                              vm.dd = setInterval(function () {
                  
                                      vm.scc = vm.img[vm.currentz].image_path;
                                      
                                      if (vm.currenti >=0) {
                                          vm.toch=true;
                                          vm.swiper2.params.onlyExternal=true;
                                          vm.currentz = vm.currenti;
                                          vm.scc = vm.img[vm.currentz].image_path;
                                          vm.opa2();
                                          vm.opa1();
                                          vm.first = true;
                                          vm.ind = vm.swiper2.activeIndex;
                                          if (vm.currentz ==(vm.ind+1) * vm.pageNum) {
                                              vm.slide = true;
                                          }
                                          if(vm.currenti==0)
                                          {
                                            vm.slide = false;
                                          }
                                          vm.autoslide();
                                          avalon.log(vm.currenti);
                                          vm.currenti--;

                                          
                                      } 
                                      else{
                                          clearInterval(vm.dd);
                                          vm.starEnd = !vm.starEnd;
                                          vm.toch=false;
                                           vm.swiper2.params.onlyExternal=false;
                                          vm.op = 1;
                                          vm.sp = "glyphicon glyphicon-play";
                                          //vm.currenti = 0;
                                      }
                                 // }
                              }, 1000);
                            } else {
                                  clearInterval(vm.dd);
                                   vm.swiper2.params.onlyExternal=false;
                                 // vm.toch=false;
                                  vm.op = 1;
                                  vm.sp = "glyphicon glyphicon-play";
                                 }
                      },
                      autoslide: function () {//下方8张一组图片的承载页的自动切换到上一页或下一页
                          if (vm.slide) {
                              if ((vm.currentz+1) % vm.pageNum == 0 && vm.currentz != 0) {
                                  vm.swiper2.slidePrev();//mySwiper.slidePrev();
                              }
                              /*else {
                                  if (vm.currentz == 0) {
                                    vm.swiper2.slideTo(vm.swiper2.slides.length-1, 1000, false);
                                  }
                              }*/
                          }

                      },
                      clickleft: function () {//点击按钮，呈现上一张图片
                           if (vm.op == 1) {
                                  vm.currentz = vm.currentz - 1;
                                  if (vm.currentz >= 0) {
                                      vm.scc = vm.img[vm.currentz].image_path;
                                      vm.currenti = vm.currentz;
                                      vm.opa2();
                                      vm.opa1();
                                      vm.ind = vm.swiper2.activeIndex;
                                      if ((vm.currentz+1) % vm.pageNum == 0 && vm.currentz != 0) {
                                          vm.swiper2.slidePrev();
                                          vm.first = false;
                                      }
                                      
                                     /* if (vm.currentz >=vm.ind * vm.pageNum) {
                                          vm.ind = vm.swiper2.activeIndex;
                                          vm.slide = true;
                                      }*/
                                  }
                                  else {
                                      vm.currentz = 0;
                                      vm.currenti = 0;
                                  }
                          }
                      },
                      clickright: function () {//点击按钮，呈现下一张图片
                          if (vm.op == 1) {
                        
                              vm.currentz = vm.currentz + 1;
                              if (vm.currentz < vm.img.length) {
                                  vm.scc = vm.img[vm.currentz].image_path;
                                  vm.opa2();
                                  vm.opa1();
                                  vm.ind = vm.swiper2.activeIndex;
                                 /* if (vm.currentz > vm.ind * vm.pageNum + 1) {
                                      vm.slide = true;
                                  }*/
                                  if (vm.currentz==(vm.ind+1)*vm.pageNum && vm.currentz != vm.img.length-1) {
                                          vm.swiper2.slideNext();
                                          vm.first = false;
                                      }
                                 // vm.autoslide();
                                  vm.currenti = vm.currentz;
                              }
                              else {
                                  vm.currentz = vm.img.length - 1;
                                  vm.currenti = vm.img.length - 1;
                              }
                          }
                      },
                      
                      /*
                        点击下方8张一组的任意图片，实现上方图片变化
                        参数imgid：被点击的图片的id
                      */
                      clickImg: function (imgid) {
                          vm.currentz = imgid;
                          vm.scc = vm.img[vm.currentz].image_path;
                          vm.opa2();
                          vm.opa1();
                          vm.currenti = vm.currentz;
                      },
                      opa1: function () {//将下方8张一组的指定一张图片设置透明度、背景色、和字体颜色
                       
                          $('#'+vm.currentz).css({"opacity":1.0,"background-color":"#0066FF"});
                          var p=$('#'+vm.currentz).children("p");
                          p[0].style.color="white";
                          
                          
                      },
                      opa2: function () {//将下方8张一组的所有图片设置透明度、背景色、和字体颜色
                       
                       for (var q = 0; q < vm.img.length; q++){
                             $('#'+q).css({"opacity":0.3,"background-color":"white"});
                             var p=$('#'+q).children("p");
                             p[0].style.color="black";
                         
                        }

                     
                      },
                      swiperFun2: function () {//下方8张一组图片的承载页的效果函数
                          vm.swiper2 = new Swiper('.swiper-container1', {
                             // paginationClickable: true,
                              onlyExternal:false,
                              //simulateTouch :false,
                              //allowSwipeToNext : false,
                              //noSwipingClass : 'swiper-container1',
                       
                           });
                           if(vm.img.length!=0)
                            {
                                vm.scc=vm.img[0].image_path;
                            }
                      },

                      swiperFun: function () {//头部城市页签的显示效果
                          var swiper = new Swiper('.swiper-container', {
                              pagination: '.swiper-pagination',
                              slidesPerView: vm.TitleNum,
                              paginationClickable: true,
                              spaceBetween: 0,
                              freeMode: true
                          });
                      },
                      posistart:function(){//初始时绑定事件
                 
                      //vm.reqAnimationFrame(vm.reqFrame);
                     // vm.log = document.querySelector("#log");//获取id=log元素
                      vm.el = document.querySelector("#hit");//获取id=hit元素
                      vm.mc = new Hammer.Manager(vm.el);//同时给一个元素el(#hit)绑定多个事件
                      vm.mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
                      vm.mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(vm.mc.get('pan'));
                      vm.mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([vm.mc.get('pan'), vm.mc.get('rotate')]);
                       vm.mc.on("panstart panmove", vm.onPan);//拖动事件
                      vm.mc.on("pinchstart pinchmove", vm.onPinch);
                      vm.mc.on("hammer.input", function(ev) {
                       if(ev.isFinal) {
                             vm.START_X=vm.transform.translate.x;
                             vm.START_Y=vm.transform.translate.y;
                             vm.trfa=true;
                           }
                      });
                    },
                      resetElement:function(){//存放图片缩放、拖拽位置的数据
                           vm.el.className = 'animate';
                            vm.transform = {
                                translate: { x: vm.START_X, y: vm.START_Y },
                                scale: 1,
                                angle: 0,
                                rx: 0,
                                ry: 0,
                                rz: 0
                            };
                           /* if (vm.log.textContent.length > 2000) {
                                vm.log.textContent = vm.log.textContent.substring(0, 2000) + "...";
                            }*/
                      },
                      updateElementTransform:function(){//读取transform数据，显示效果
                          if(vm.transform.scale<1)
                          {
                            vm.transform.scale=1;
                          }
                          var value = [
                                   'translate3d(' + vm.transform.translate.x + 'px, ' + vm.transform.translate.y + 'px, 0)',
                                  'scale(' + vm.transform.scale + ', ' + vm.transform.scale + ')'
                                  
                                ];

                          value = value.join(" ");
                          vm.el.style.webkitTransform = value;
                          vm.el.style.mozTransform = value;
                          vm.el.style.transform = value;/**/
                          vm.limited();
                          //vm.ticking = false;
                      },
                      limited:function(){//设置拖拽图片边界
                          var starx=vm.el.offsetWidth*(vm.transform.scale-1)/2;//确定div左上角的x坐标
                          var stary=vm.el.offsetHeight*(vm.transform.scale-1)/2;//确定div左上角的y坐标
                          //avalon.log(daty+","+datx);
                          if(vm.transform.translate.x<-starx)
                          {
                             vm.transform.translate.x=-starx;
                             vm.updateElementTransform();
                            
                          }
                          if(vm.transform.translate.x>starx)
                          {
                             vm.transform.translate.x=starx;
                             vm.updateElementTransform();
                          }
                          if(vm.transform.translate.y>stary)
                          {
                             vm.transform.translate.y=stary;
                             vm.updateElementTransform();
                          }
                          if(vm.transform.translate.y<-stary)
                          {
                             vm.transform.translate.y=-stary;
                             vm.updateElementTransform();
                          }
                      
                      },
                      onPan:function(ev){//拖拽图片时触发
                         if(vm.trfa)
                         {
                            vm.transform.translate = {
                                x:vm.START_X,
                                y:vm.START_Y
                            };
                            vm.trfa=false;
                          }
                          else{
                             vm.transform.translate = {
                                x:vm.START_X+ev.deltaX,
                                y:vm.START_Y+ev.deltaY
                            };
                          }
                               vm.updateElementTransform();
                        
                      },
                      onPinch:function(ev){//缩放图片时触发
                          //alert(ev);
                           if(ev.type == 'pinchstart') {
                                vm.initScale = vm.transform.scale || 1;
                            }

                            vm.el.className = '';
                            vm.transform.scale = vm.initScale * ev.scale;
                            vm.updateElementTransform();
                      }
              });
            satellite_pic.options.picVm=vm;
            return vm;
        }
   }
   return satellite_pic;
});
