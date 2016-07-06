define(["avalon", "jquery", "JsUtil", 'css!bootstrap.css', 'css!multipleDescription.css'], function (avalon, $, JsUtil) {
    var table = {
        options: {
            clid: "",
            url: "",
            tableVm: {}
        },

        // 初始化数据
        init: function (options) {
            table.options = $.extend(table.options, options);//传进来的参数和自己定义的参数
            var vm = table.tableVm();//调用tableVm模块
            table.getdata(table.options);//调用getdata 数据模块，获得数据
            // warn.setINT();//调用setINT刷新模块，初始数据
            return vm;
        },


        tableVm: function () {
            var vm = avalon.define({
                $id: table.options.clid,
                showTime: "",//显示时间
                rainTitle: [],//雨情 表头
                rainData: [],//雨情 数据
                rainText: "",//雨情 table下面的描述语句
                rainChart: "",//雨情 等值面图
                rainBar: [],//雨量 等值面图旁的条例图
				
				imgShow: require.toUrl('multipleDescription')+'/img/sea.jpg',//雨情 等值面图显示用的

                waterTitle: [],//水情 表头
                waterData: [],//水情  数据
                flag: "",

                reservoirTitle: [],//水情 表头 水库超汛限 reservoir
                reservoirData: [],//水情 数据 水库超汛限 reservoir
                reservoirFlag: "",

                weatherForecast: [],//天气预告

                //  table.options.tableVm.flagFn();

            });

            table.options.tableVm = vm;

            return vm;

        },
        //getdata 数据模块,初始化table数据
        getdata: function (options) {

            var par = realTime();
            //雨情文字 显示时间
            options.tableVm.showTime = par.showTime;

            //雨情下面的table
            $.getJSON(options.data.a1, par, function (result) {
                options.tableVm.rainData = result.data;//获取的数据放在这里
                options.tableVm.rainTitle = table.options.rainTitle;
                // console.log(options.tableVm.rainData)
            }); 

            //雨情 table下面的描述语句
            //  http://192.168.110.233:9995/api/mobilev1/base/common/getdescripstat?key=today_led&addvcd=350121&time=(2016-03-28T08:00:00,2016-03-29T08:00:00]
            var par_a2 = {
                key: par.key,
                addvcd: par.addvcd,
                time: par.time
            };
             $.getJSON(options.data.a2, par_a2, function (result) {
                options.tableVm.rainText = result.data;//获取的数据放在这里
              //   console.log("描述语句" + options.tableVm.rainText.str)
          });

           
	       //雨情 等值面图
            // http://192.168.110.233:9996/RainfallIsoline/RainIsolineDataProvider.ashx?start=2014-1-1%2008:00&end=2014-1-1%2008:00&Isoline=true&IsolineArea=true
            var par_a3 = {
                "start": par.stimeChart,
                "end": par.etimeChart,
                "Isoline": par.Isoline,
                "IsolineArea": par.IsolineArea
            }; 
           
			$.ajax({
			  dataType: "html",
			  url:  options.data.a3, 
			  data: par_a3,   
			  success:function (result) {  
				  var result = eval('(' + result + ')'); //result转为对象在处理
			          options.tableVm.rainChart = result.url;//获取的数据放在这里 
					 
				},   
			  error: function(XMLHttpRequest, textStatus, errorThrown) {  
				},
			});
			 
            //雨量 等值面图旁的条例图
            $.getJSON(options.data.a4, function (result) {
                options.tableVm.rainBar = result.data;//获取的数据放在这里
                //console.log("rainBar:"+options.tableVm.rainBar)
            });

            //水情 下面的table 河道超警戒 river
            $.getJSON(options.data.a5, function (result) {
                var waterNum = result.data.length;
                var num = 0;
                options.tableVm.waterData = result.data;//获取的数据放在这里
                options.tableVm.waterTitle = options.waterTitle;
				
                //计算flag数量
                for (var i = 0; i < waterNum; i++) { 
                    var flagnum = options.tableVm.waterData[i].flag_cjx; 
					var wrz = options.tableVm.waterData[i].wrz_fsltdz;
                    if (flagnum) {
                        num++;  
                    } else {
                        num; 
                    }; 
					
					if(!wrz){
						 options.tableVm.waterData[i].wrz_fsltdz= "-";//wrz_fsltdz的值设为“ - ”
					};
					options.tableVm.waterData[i].tm = options.tableVm.waterData[i].tm.substr(11, 5).replace(":", "时") + "分";//15时00分
                };
                options.tableVm.flag = num;

            });

            //水情 下面的table 水库超汛限 reservoir  rsvrevs 
            $.getJSON(options.data.a6, function (result) {
                var reservoirNum = result.data.length;
                var num = 0;
                options.tableVm.reservoirData = result.data;//获取的数据放在这里 数组
                // options.tableVm.reservoirData = result.data[0];//获取的数据放在这里 对象
                options.tableVm.reservoirTitle = options.reservoirTitle;

                for (var i = 0; i < reservoirNum; i++) {
                    var flagnum = options.tableVm.reservoirData[i].flag_cjx;
					var wrz = options.tableVm.reservoirData[i].wrz_fsltdz;
                    if (flagnum) {
                        num++;
                    } else {
                        num;
                    };
					if(!wrz){
						 options.tableVm.reservoirData[i].wrz_fsltdz= "-";//wrz_fsltdz的值设为“ - ”
					};
				    options.tableVm.reservoirData[i].tm = options.tableVm.reservoirData[i].tm.substr(11, 5).replace(":", "时") + "分";//15时00分
                }
                options.tableVm.reservoirFlag = num;

            });

            //天气预告
            $.getJSON(options.data.a7, function (result) {
                options.tableVm.weatherForecast = result.data[0].text;
                //  console.log( "天气预告" + options.tableVm.weatherForecast );
            })

        },


    }
    return table;
});


//时间和8点比较
function realTime() {
    var stime = "";
    var etime = "";
    var time = "";

    var showTime = "";
    var sshowTime = "";
    var eshowTime = "";

    var stimeChart = "";
    var etimeChart = "";

    var addvcd = "350121";
    var key_led = "";
    var currentTime = new Date();//Thu May 26 2016 08:14:54 GMT+0800
    var currentTimeHours = new Date().getHours();//用于和8点做比较
    var currentGetMinutes = new Date().getMinutes(),//用于和0做比较
        formatCurrentTime = GetCurrentTime(false, 0, currentTime),//格式化时间,当前时间 2016年05月27日08时15分36
        contrastTime = formatCurrentTime.substr(11, 9).replace("时", ":").replace("分", ":"),//08:15:36
        formatToday = GetCurrentTime(true, 0, currentTime),//格式化时间，今天
        formatYesterday = GetCurrentTime(true, -1, currentTime);//格式化时间，前一天

    if (currentTimeHours > 8) {
        //9点
        //大于8点属于今天
        key_led = "today_led";

        stime = formatToday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
        etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
        time = "(" + stime + "," + etime + "]";//后台传送时间 (2016-05-25T08:00:00,2016-05-25T14:54:34]

        sshowTime = formatToday.substr(8, 3) + "08时00分";
        eshowTime = formatCurrentTime.substr(8, 9);
        showTime = sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

        stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
        etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

      //  console.log("大于8点：" + showTime);
       // console.log("当前时间 ：" + formatCurrentTime);
    }
    else if (currentTimeHours < 8) {
        //7点
        //昨天的
        key_led = "yesterday_led";
        stime = formatToday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
        etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
        time = "(" + stime + "," + etime + "]";

        sshowTime = formatYesterday.substr(8, 3) + "08时00分";
        eshowTime = formatCurrentTime.substr(8, 9);

        showTime = sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

        stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
        etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

     //   console.log("8点00到8点01 ：" + showTime);
   //     console.log("当前时间 ：" + formatCurrentTime);
    }
    else {
        //currentTimeHours = 8
        //由于首页显示到分 so 08点00分59秒前属于昨天的
        console.log("现在时8:" + currentTimeHours);
        if (currentGetMinutes > 0) {
            //08：01之后的
            //今天
            key_led = "today_led";

            stime = formatToday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
            etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
            time = "(" + stime + "," + etime + "]";//后台传送时间 (2016-05-25T08:00:00,2016-05-25T14:54:34]

            sshowTime = formatToday.substr(8, 3) + "08时00分";
            eshowTime = formatCurrentTime.substr(8, 9);
            showTime = sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

            stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
            etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

         //   console.log("大于8点01：" + showTime);
       //     console.log("当前时间 ：" + formatCurrentTime);


        } else {
            //08:00到08:01之间的
            //昨天的
            key_led = "yesterday_led";
            stime = formatToday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
            etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
            time = "(" + stime + "," + etime + "]";

            sshowTime = formatYesterday.substr(8, 3) + "08时00分";
            eshowTime = formatCurrentTime.substr(8, 9);

            showTime = sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

            stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
            etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

           // console.log("8点00到8点01 ：" + showTime);
         //   console.log("当前时间 ：" + formatCurrentTime);
        }


    }
    var obj = {
        key: key_led,
        addvcd: addvcd,
        time: time,
        showTime: showTime,
        Isoline: true,
        IsolineArea: true,
        stimeChart: stimeChart,
        etimeChart: etimeChart
    };

    return obj;
};


//时间处理
function GetCurrentTime(isDateFat, AddDayCount, dateObj) {

    var myDate = new Date();
    if (dateObj) {
        myDate = dateObj;
    }
    myDate.setDate(myDate.getDate() + AddDayCount);
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = (myDate.getMonth() + 1);
    var hour = myDate.getHours();  //获取当前小时数(0-23)
    var min = myDate.getMinutes(); //获取当前分钟数(0-59)
    var ss = myDate.getSeconds();//获取当前秒数(0-59)
    var day = myDate.getDate();    //获取当前日(1-31)

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }

    var currenttime = year + "年" + month + "月" + day + "日" + hour + "时" + min + "分" + ss;
    if (isDateFat) {
        currenttime = year + "年" + month + "月" + day + "日";
    }
    //var currenttime =  day + "日" + hour + "时" + min + "分"  ;
    //if (isDateFat) {
    //    currenttime =  day + "日";
    //}
    return currenttime;
}

