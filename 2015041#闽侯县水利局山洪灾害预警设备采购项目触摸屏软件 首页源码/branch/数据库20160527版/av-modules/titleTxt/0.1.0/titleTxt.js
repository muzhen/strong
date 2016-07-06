
define(["avalon","jquery","JsUtil",'css!bootstrap','css!titleTxt.css'],function(avalon,$,JsUtil){
   var txt={
       options:{
          clid:"",
          url:"",
          type:"",
		      pa:"",
          txtVm:{}
       },
        /*初始化数据
              options：传入参数
            */
       init:function(options){
           txt.options=$.extend(txt.options,options);
            var vm=txt.txtVm();
            txt.getdata(txt.options);       
             return vm;
       },
       /*初始化数据
              options：传入参数
            */
       getdata:function(options){
		    var z=txt.options.txtVm.getArgs().typeid;
			var pa=options.pa;
			if(options.type=="预警")
			{
				pa.warning_id=z;	
				
			}
			if(options.type=="资料")
			{
				pa.usednews_id=z;	
				
			}
		  if(options.type=="简报")
		  {
			//pa.briefing_id=z; 
			pa.usednews_id=z; 
			
		  }
			$.getJSON(options.url,pa,function(result){
				    var inf=result.data;
					inf[0].content_path=result.data[0].content_path;
					txt.options.txtVm.inf=inf;
					//$("#note").html(inf[0].contents);
                   // txt.options.txtVm.inf.release_time=txt.options.txtVm.inf.release_time.toDate().format("MM-dd hh:mm");
			    });
        
       },
       txtVm:function(){//定义Vm变量
             var vm=avalon.define({
                $id:txt.options.clid,
                inf:[],
				load:function(){//页面数据加载完后设置文本内容html()
					$("#note").html(vm.inf[0].contents);
				},
                getArgs:function(){//获取路径中的参数值
                     var args = new Object();
                     var query = location.search.substring(1);      //从?s=XXX&z=XXX中截取s=XXX&z=XXX
                     var pairs = query.split("&");                  // Break at ampersand
                     for(var i = 0; i < pairs.length; i++) {
                         var pos = pairs[i].indexOf('=');           // 获取=的位置
                         if (pos == -1) continue;                   // If not found, skip
                         var argname = pairs[i].substring(0,pos);  // 获取参数名
                         var value = pairs[i].substring(pos+1);     // 获取参数值
                         value = decodeURIComponent(value);         // Decode it, if needed
                         args[argname] = value;                     // 存入对于数组
                      }
                  return args;                                   // Return the object
                }
         });
         txt.options.txtVm=vm;
         return vm;
       }
   }
    return txt;
});
   