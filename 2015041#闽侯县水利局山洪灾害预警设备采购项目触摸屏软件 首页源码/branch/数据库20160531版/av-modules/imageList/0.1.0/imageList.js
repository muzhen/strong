
define(["avalon","jquery","swiper","JsUtil","search",'css!swiper.css','css!bootstrap.css','css!imageList.css'],function(avalon,$,Swiper,JsUtil,search){
   var imageList={
        options:{
            clid:"",
            urldata:"",
            lbimgdata:"",
            yeqian:"",
            paw:"",//参数
            secVm:{},//搜索组件变量
            listVm:{}
        },
         /*初始化数据
              options：传入参数
            */
        init:function(options){
             imageList.options=$.extend(imageList.options,options);
             var vm=imageList.listVm();
			 var y="y";
             if(options.urldata.type=="预警")
			   {
				    options.paw.time=vm.betweentm(-20,y);
			   }
			 if(options.urldata.type=="资料")
			   {
				   options.paw.time=vm.betweentm(-20,y);
			   }
			 if(options.urldata.type=="简报")
			   {
				   options.paw.time=vm.betweentm(-20,y);
			   }
			// avalon.log(options.paw.time);
			 imageList.getdata(imageList.options); 
             
             return vm;
        },
         /*初始化数据
              options：传入参数
            */
        getdata:function(options){

             $.getJSON(options.lbimgdata,options.lbpa,function (result) {//初始化轮播图片
                    imageList.options.listVm.lbimg=result.data;
             });
             $.getJSON(options.urldata.data,options.paw,function (result) {//初始化列表数据
                   // imageList.options.listVm.listinf=result.data;
                   if(options.urldata.type=="预警")
                   {
					    var secVm1=search.init({clid:"mySearCh",selecdata:"",butime:options.paw.time});	     
          				 imageList.options.secVm=secVm1;
                        options.listVm.midTitle="三防预警列表";
                        var arr=[],da=[];
                        da=result.data;
                        for(var i=0;i<da.length;i++)
                        {
                            var p={"typeid":"","image_path":"","title":"","release_time":"","bgcolor":"","sm_img":"","color":""};
                            p.typeid=da[i].warning_id;
                            p.image_path=""+da[i].image_path;
                            //p.image_path=da[i].image_path;
                            p.title=da[i].title;
                            p.release_time=da[i].release_time;
                            if(da[i].type=="防汛")
                            {
                                p.bgcolor="#d0edfe";
                                p.sm_img="../av-modules/imageList/0.1.0/static/img/fx.jpg";
                                //p.sm_img="../av-modules/src/static/img/fx.jpg";
                                p.color="#3a759a";
                            }
                            if(da[i].type=="防风")
                            {
                                p.bgcolor="#f5f0d8";
                                p.sm_img="../av-modules/imageList/0.1.0/static/img/tf.jpg";
                                //p.sm_img="../av-modules/src/static/img/tf.jpg";
                                p.color="#daa301";
                            }
                             if(da[i].type=="防旱")
                            {
                                p.bgcolor="#f3e7f8";
                                p.sm_img="../av-modules/imageList/0.1.0/static/img/gh.jpg";
                                //p.sm_img="../av-modules/src/static/img/gh.jpg";
                                p.color="#b085c5";
                            }
                            if(da[i].type=="防冻")
                            {
                                p.bgcolor="#cff9fc";
                                p.sm_img="../av-modules/imageList/0.1.0/static/img/dx.jpg";
                                //p.sm_img="../av-modules/src/static/img/dx.jpg";
                                p.color="#5dd7df";
                            }
                            arr.push(p);
                        }
                        imageList.options.listVm.listinf=arr;
                  }
                  if(options.urldata.type=="资料")
                  {
					  
                              imageList.options.listVm.yeqian=imageList.options.yeqian;     
          					  var secVm=search.init({clid:"mySearCh",selecdata:imageList.options.yeqian,butime:options.paw.time}); 
          					  imageList.options.secVm=secVm;
                          var arr1=[];
                           var da=result.data;
                          for(i=0;i<da.length;i++)
                          {
                              var p={"typeid":"","image_path":"","title":"","release_time":""};
                              p.typeid=da[i].usednews_id;
                              p.image_path=""+da[i].image_path;
                              //p.image_path=da[i].image_path;
                              p.title=da[i].title;
                              p.release_time=da[i].release_time.toDate().format("yy-MM-dd");
                              arr1.push(p);
                             
                          }
                          imageList.options.listVm.listinf=arr1;
                  }
                  if(options.urldata.type=="简报")
                  {
						var secVm1=search.init({clid:"mySearCh",selecdata:"",butime:options.paw.time});	     
          				 imageList.options.secVm=secVm1;
                         options.listVm.midTitle="汛情简报列表";
                          var arr1=[];
                           var da=result.data;
                          for(i=0;i<da.length;i++)
                          {
                              var p={"typeid":"","image_path":"","title":"","release_time":""};
                             //p.typeid=da[i].briefing_id;
							 p.typeid=da[i].usednews_id;
                             // p.image_path="../."+da[i].image_path;
                              p.image_path=da[i].image_path;
                              p.title=da[i].title;
                              p.release_time=da[i].release_time.toDate().format("yy-MM-dd");
                              arr1.push(p);
                             
                          }
                          imageList.options.listVm.listinf=arr1;
                  }

				       avalon.scan();
             });
             
        },
        listVm:function(){
                var vm=avalon.define({
                    $id:imageList.options.clid,
                    lbimg:[],//轮播图片
                    listinf:[],//列表数据
                    yeqian:[],//页签内容
                    midTitle:"",
                    tplsec:require.toUrl('search')+'.tpl',//调用搜索组件
                    funcSec:function(){
						  
          						imageList.options.secVm.datemiscroll();
          						//avalon.scan(document.body,imageList.options.listVm);
                    },
                    betweentm:function(n,da){
                          var star="",end="",butw="";
                          var date = new Date();
                          var yes=__DataUtil.dateAdd(date,da,n).format("yyyy-MM-dd 08:mm:ss");
                            end=date.format("yyyy-MM-dd HH:mm:ss");                           
                            star=yes;           
                            butw="["+star+","+end+"]";
                          return butw;                      
                      },
                    /*
                       点击列表跳转
                       id:点击列的数据id
                    */
                    hre:function(id){
                      if(imageList.options.urldata.type=="预警")
                      {

                          window.location.href ="warningTxt.html?typeid="+id;
                         //window.location.href ="../../../titleTxt/trunk/examples/warningTxt.html?typeid="+id;
                          
                      }
                      if(imageList.options.urldata.type=="资料")
                      {
                          window.location.href ="conmmonTxt.html?typeid="+id;
                         //window.location.href ="../../../titleTxt/trunk/examples/conmmonTxt.html?typeid="+id;
                      }
                      if(imageList.options.urldata.type=="简报")
                      {
                          window.location.href ="briefingTxt.html?typeid="+id;
                         //window.location.href ="../../../titleTxt/trunk/examples/conmmonTxt.html?typeid="+id;
                      }
                       
                    },
                    dis:function(){//页面初始化展示效果
                      if(imageList.options.urldata.type=="预警")
                      {
                          $("#dis2").css({"display":"none"});
                      }
                      if(imageList.options.urldata.type=="简报")
                      {
                          $("#dis2").css({"display":"none"});
                      }
                      if(imageList.options.urldata.type=="资料")
                      {
                          $("#dis1").css({"display":"none"});
                          //vm.conmclick("1"); 
						    var arr=$("#tite").children("div");
               
                           for(var i=0;i<arr.length;i++)
                           {
                                 var mytype=$(arr[i]).data('type');
                                 if(mytype=="1")
                                 {
                                     arr[i].style.borderBottom="3px solid orange";
                                 }
                                   else
                                 {
                                    arr[i].style.borderBottom="1px solid #BDCAD2";
                                 }
                           }
                      }

                    },
                    /*
                       点击页签加载数据
                       id:页签的id值
                    */
                    conmclick:function(type){
                             
                           var arr=$("#tite").children("div");
               
                           for(var i=0;i<arr.length;i++)
                           {
                                 var mytype=$(arr[i]).data('type');
                                 if(mytype==type)
                                 {
                                     arr[i].style.borderBottom="3px solid orange";
                                 }
                                   else
                                 {
                                    arr[i].style.borderBottom="1px solid #BDCAD2";
                                 }
                           }
                           var paw=imageList.options.paw;
                           paw.sign=type;
                           //$('#'+id).css({"border-bottom":"3px solid orange"});
                           $.getJSON(imageList.options.urldata.data,paw,function (result) {//初始化列表数据
                                      var arr1=[];
                                      var da=result.data;
                                      for(i=0;i<da.length;i++)
                                      {
                                          var p={"typeid":"","image_path":"","title":"","release_time":""};
                                          p.typeid=da[i].usednews_id;          
                                          //p.image_path="../../../"+da[i].image_path;
										                      p.image_path=da[i].image_path;
                                          p.title=da[i].title;
                                          p.release_time=da[i].release_time.toDate().format("yy-MM-dd");
                                          arr1.push(p);
                                      }
                                     vm.listinf=arr1;
                                });
                           
                         
                    },
                    imgclick:function(){//点击搜索图片

                           $("#light,#fade").css({"display":"block"});
						   if(imageList.options.urldata.type=="资料")
						   {
								  $("#datum,#setim").css({"display":"block"});
						   }
						   if(imageList.options.urldata.type=="简报")
						   {
								  $("#datum").css({"display":"none"});
								  $("#setim").css({"display":"block"});
						   }
						    if(imageList.options.urldata.type=="预警")
						   {
								  $("#typ").css({"display":"none"});
								  //$("#setim").css({"display":"block"});
						   }
						  
                    },
          			closeclick:function(){//点击关闭按钮
                                 $("#light,#fade").css({"display":"none"});
                    },
                    selectclick:function(){//点击搜索按钮
									var star=$("#start").val();
								   var end=$("#end").val();
                         if(imageList.options.urldata.type=="资料")
						   {
								   var opt=$("#selval").val();
								   var put=$("#put").val();
								 var bwentm="["+star+" 00:00:00,"+end+" 00:00:00]";
								 var paw={sign:"1",time:"[2016-04-08 00:00:00,2016-04-15 00:00:00]",title:"物资"};
								 paw.time=bwentm;
								 paw.title=put;
								 paw.sign=vm.pawsign(opt);
								 imageList.options.paw=paw;
								 vm.conmclick(paw.sign); 
						    }
						  if(imageList.options.urldata.type=="简报")
						  {
							  var paw={time:"[2016-04-08 00:00:00,2016-04-15 00:00:00]"};
							  var opt=$("#selval").val();
							  var put=$("#put").val();
							  var bwentm="["+star+" 00:00:00,"+end+" 00:00:00]";
							  paw.time=bwentm;
							  imageList.options.paw=paw;
							  imageList.getdata(imageList.options); 
						  }
						  if(imageList.options.urldata.type=="预警")
						  {
							  var paw={time:"[2016-04-08 00:00:00,2016-04-15 00:00:00]",title:"防风"};
							  var opt=$("#selval").val();
							  var put=$("#put").val();
							  var bwentm="["+star+" 00:00:00,"+end+" 00:00:00]";
							  paw.time=bwentm;
							  paw.title=put=$("#put").val();
							  imageList.options.paw=paw;
							  imageList.getdata(imageList.options); 
						  }
                             $("#light,#fade").css({"display":"none"});
                         
                      },
					 /*
                       通过选择类型获取对应的页签的type值
                       name:选择的类型
                    */
                    pawsign:function(name){
                      
                       for(var i=0;i<vm.yeqian.length;i++)
                       {
                           if(vm.yeqian[i].name==name)
                           {
                                return vm.yeqian[i].type;
                                break;
                           }
                       }
                    },
                    swiperFun:function(){//图片轮播效果
                        var mySwiper = new Swiper('.swiper-container', {
                                    pagination: '.swiper-pagination',
                                    nextButton: '.swiper-button-next',
                                    prevButton: '.swiper-button-prev',
                                    paginationClickable: true,
                                    spaceBetween: -1,
                                    centeredSlides: true,
                                    autoplay: 4000,
                                    autoplayDisableOnInteraction: false
                                });
                    },
                    swiperFun2:function(){//页签效果的呈现
                          var swiper = new Swiper('.swiper-container1', {
                              pagination: '.swiper-pagination',
                              slidesPerView: 4,
                              paginationClickable: true,
                              spaceBetween: 0,
                              freeMode: true
                          });
						  vm.dis();
                    }
                });
                imageList.options.listVm=vm;
				
                return vm;
         }
    
   }
   return imageList;
});
