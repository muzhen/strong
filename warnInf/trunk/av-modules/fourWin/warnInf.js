﻿define(["avalon", "jquery",'css!warnInf.css'], function (avalon, $) {
    var warn = {
        options: {
            clid:"",
            data:"",
            vm:"",
            conte:{},
    },

        // 初始化数据
        init:function (options){
            warn.options=$.extend(warn.options,options);//传进来的参数和自己定义的参数
            var vm=warn.conte();//调vm模块
            warn.getdata(warn.options);//调用数据模块，获得数据
            warn.setINT();//调用刷新模块，初始数据
            return vm;
        },
        //vm模块
        conte:function(){
            var vm=avalon.define({
                $id:warn.options.clid,
                currentTime:"",//当前时间
                cloudSrc:"",//卫星云图
                typhoonSrc:"",//台风路径
                weatherSrc:"",//气象雷达
                cloudData:[],//雨量
                rainData:"",//雨量条形图
                rainText:"",//雨量下面的描述语句
                rainChart:[],//雨量等值面图
                realTime:"",//时间 和8点比较
                GetCurrentTime:"",//时间处理
                showTime:"",//显示时间
                getShowTime:""//后台时间
            });
            warn.options.conte=vm;

            return vm;
        },
        //数据模块,初始化图片数据
        getdata:function(options) {

            //雨量下面的数据列表 数据options.data
         //   http://192.168.110.233:9995/api/mobilev1/rain/grade/getrainavgcount?addvcd=350121&include_self=false&time=(2016-03-28T08:00:00,2016-03-29T08:00:00]&stat_type=个镇
            var par_a3= realTime();
            $.getJSON(options.data.a3, par_a3,function (result) {
                options.conte.cloudData = result.data;//获取的数据放在这里
                 console.log(options.conte.cloudData)
            });

            //雨量下面的描述语句
          //  http://192.168.110.233:9995/api/mobilev1/base/common/getdescripstat?key=today_led&addvcd=350121&time=(2016-03-28T08:00:00,2016-03-29T08:00:00]
            var par_a4= {
                key: par_a3.key,
                addvcd: par_a3.addvcd,
                time: par_a3.time
            };
            $.getJSON(options.data.a4 ,par_a4, function (result) {
                options.conte.rainText = result.data;//获取的数据放在这里
                console.log("描述语句"+options.conte.rainText.str)
            });

            //雨量条形图
            $.getJSON(options.data.a5, function (result) {
                options.conte.rainData = result.data;//获取的数据放在这里
            });

            //雨量等值面图
            $.get(options.data.a6, function (result) {
                //var result =  result.substring(5,52)
                var result = eval('(' + result + ')');
                options.conte.rainChart = result.url;//获取的数据放在这里
            });

            //卫星云图 数据
            $.get(options.data.a1, function (xml) {
                var xmll = $(xml).find("ROW");
                var path = "";
                path = $(xmll[0]).attr("FILEPATH");
                options.conte.cloudSrc = path;

            });

            //气象雷达 数据
            $.get(options.data.a2, function (xml) {
                var xmll = $(xml).find("ROW");
                var path = "";
                path = $(xmll[0]).attr("FILEPATH");
                options.conte.weatherSrc = path;
            });

            //首页显示时间
             options.conte.showTime =par_a3.indextime;

        },

        //1分钟刷新一次
        setINT:function (){
            setInterval(function () {
                    realTime();
                    warn.getdata(warn.options);
                },
                300000);
        }

};
    return warn;
});



//时间处理
function GetCurrentTime(isDateFat, AddDayCount, dateObj) {

    var myDate = new Date();
    if (dateObj) {
        myDate = dateObj;
    }
    myDate.setDate(myDate.getDate() + AddDayCount);
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1);
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var ss = myDate.getSeconds();
    var day = myDate.getDate();

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
    var currenttime = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + ss ;
    if (isDateFat) {
        currenttime = year + "年" + month + "月" + day + "日 ";
    }
    return currenttime;
}

//时间和8点比较
function realTime() {
   var  stime =  "";
    var  etime =  "";
    var  time =  "";
    var  addvcd = "350121";
    var  key_led = "";
    //雨量量级统计接口 的参数
    var stat_type = "个",
        include_self = false;

    var   currentTime = new Date();
   // var  currentTimeSecond = new Date().getSeconds();//用于拼接后台的时间
    var   currentTimeHours = new Date().getHours(),//用于和8点做比较
        formatCurrentTime = GetCurrentTime(false, 0, currentTime),//格式化时间,当前时间
        indextime = formatCurrentTime.substr(0,17);
        formatToday = GetCurrentTime(true, 0, currentTime),//格式化时间，今天
    formatYesterday = GetCurrentTime(true, -1, currentTime);//格式化时间，前一天
    if (currentTimeHours <= 8) {
        //8点属于昨天的
        key_led = "yesterday_led";
        stime = formatYesterday + " 08:00:00";
        etime = formatCurrentTime;
        time = "(" + stime + "," + etime + "]";
      //  alert("小于8点"+time);
    } else {
        //大于8点属于今天
        key_led = "today_led";
        stime = formatToday.replace("年", "-").replace("月", "-").replace("日", "T") + " 08:00:00";//016-05-20T  08:00:00

        etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T");
        time = "(" + stime + "," + etime + "]";
       console.log(time);

    }
    var obj={
        key:key_led,
        addvcd:addvcd,
        time:time,
        stat_type:stat_type,
        include_self:include_self,
        indextime: indextime //首页显示时间
    };

    return obj;
}


