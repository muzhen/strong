
define(["avalon","jquery","JsUtil","mobiscroll",'css!mobiscroll.css','css!bootstrap','css!search.css'],function(avalon,$,JsUtil,mobiscroll){
 var search={
      options:{
        clid:"",
        selecdata:"",
		butime:"",
        secVm:{}
      },
       /*初始化数据
        options：传入参数
      */
      init:function (options){
          search.options=$.extend(search.options,options);
          var vm=search.secVm();
		  if(search.options.selecdata!="")
		  {
			search.getdata(search.options);  
		  }
          var arr=search.options.butime.replace("[","").replace("]","").split(",");   
          vm.startm=arr[0].toDate().format("yyyy-MM-dd");
          vm.endtm=arr[1].toDate().format("yyyy-MM-dd");   		  
          return vm;
      },
      /*初始化数据
        options：传入参数
      */
      getdata:function(options){
         options.secVm.selecdata=options.selecdata;
      },
      secVm:function(){
            var vm=avalon.define({
                      $id:search.options.clid,
                      startm:null,//开始时间
                      endtm:null,//结束时间
					  estim:null,
					  yer1:null,
					  mon1:null,
					  dat1:null,
					  yer2:null,
					  mon2:null,
					  dat2:null,
                      selecdata:"",//下拉框选项
                      inputclick:function(){
                         $('#mobiDate').mobiscroll('show');//显示滚动的行政区划选择
                
                      },
                      ymdtm:function(){//点击搜索
                           var date1 = new Date();
						    //var date2=__DataUtil.dateAdd(date1,"d",30).format("yyyy-MM-dd HH:mm:ss");
						   vm.yer1=date1.format("yyyy");
						   vm.mon1=parseInt(date1.format("M"))-1;
						   vm.dat1=date1.format("d");
						   vm.yer2=__DataUtil.dateAdd(date1,"d",7).format("yyyy");
						   vm.mon2=parseInt(__DataUtil.dateAdd(date1,"d",7).format("M"))-1;
						   vm.dat2=__DataUtil.dateAdd(date1,"d",7).format("d");
                      },
                      datemiscroll:function(){//时间弹出功能
									vm.ymdtm();
                                $('#mobiDate').mobiscroll().range({
                                    theme: 'mobiscroll',
                                    lang: 'zh',
                                    display: 'modal',
                                    dateFormat: 'yyyy-mm-dd 08:00:00',
                                    defaultValue: [ new Date(vm.yer1,  vm.mon1, vm.dat1), new Date(vm.yer2,vm.mon2,vm.dat2) ]

                                });
                                $('#mobiDate').change(function(e){

                                    var arr=$(this).val().split(" - ");
                                     vm.startm=arr[0].toDate().format("yyyy-MM-dd");
                                     vm.endtm=arr[1].toDate().format("yyyy-MM-dd");
                                     $("#start").val(vm.startm);
                                     $("#end").val(vm.endtm);
                                });
								 $("#start").val(vm.startm);
                                 $("#end").val(vm.endtm);
								
                      }
                });
                search.options.secVm=vm;
                return vm;
            }
     }
    return search;
});
   
