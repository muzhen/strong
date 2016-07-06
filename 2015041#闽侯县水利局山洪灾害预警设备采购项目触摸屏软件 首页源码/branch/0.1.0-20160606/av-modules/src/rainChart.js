define(["avalon", "jquery", 'css!bootstrap.css', 'css!rainChart.css'], function (avalon, $, JsUtil) {
    var rainChart = {
        options: {
            clid: "",
            url: "",
            rainChartVm: {},
            as: {}
        },

        // 初始化数据
        init: function (options) {
            rainChart.options = $.extend(rainChart.options, options);//传进来的参数和自己定义的参数
            var vm = rainChart.rainChartVm();//调用rainChartVm模块
            rainChart.getdata(rainChart.options);//调用getdata 数据模块，获得数据
            // warn.setINT();//调用setINT刷新模块，初始数据
            return vm;
        },


        rainChartVm: function () {
            var vm = avalon.define({
                $id: rainChart.options.clid,
                showTime: "",//显示时间
                rainChart: "",//雨情 等值面图
                rainBar: [],//雨量 等值面图旁的条例图 
                imgShow: require.toUrl('rainChart') + '/img/sea.jpg'//雨情 等值面图显示用的
            });

            rainChart.options.rainChartVm = vm;
            return vm;

        },


        //getdata 数据模块,初始化rainChart数据
        getdata: function (options) {
            var par = realTime();
            //雨情文字 显示时间
            options.rainChartVm.showTime = par.showTime;

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
                url: options.data.rainChart,
                data: par_a3,
                success: function (result) {
                    var result = eval('(' + result + ')'); //result转为对象在处理
                    options.rainChartVm.rainChart = result.url;//获取的数据放在这里 

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                }

            });

            //雨量 等值面图旁的条例图
            $.getJSON(options.data.rainData, function (result) {
                options.rainChartVm.rainBar = result.data;
            });



        }

    }
    return rainChart;
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

        // console.log("大于8点,即9点, 前台显示时间：" + showTime); 
        //console.log("后台传送时间：" + time + "key:" + key_led); 
    }
    else if (currentTimeHours < 8) {
        //7点
        //昨天的
        key_led = "yesterday_led";
        stime = formatYesterday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
        etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
        time = "(" + stime + "," + etime + "]";

        sshowTime = formatYesterday.substr(8, 3) + "08时00分";
        eshowTime = formatCurrentTime.substr(8, 9);

        showTime = sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

        stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
        etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28


        // console.log("小于8点,即7点 ：" + showTime); 
        //console.log("后台传送时间：" + time + "key:" + key_led); 
    }
    else {
        //currentTimeHours = 8
        //由于首页显示到分 so 08点00分59秒前属于昨天的 
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

            //  console.log("大于8点01：" + showTime); 
            //console.log("后台传送时间：" + time + "key:" + key_led); 
        } else {
            //08:00到08:01之间的
            //昨天的
            key_led = "yesterday_led";
            stime = formatYesterday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
            etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
            time = "(" + stime + "," + etime + "]";

            sshowTime = formatYesterday.substr(8, 3) + "08时00分";
            eshowTime = formatCurrentTime.substr(8, 9);

            showTime = sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

            stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
            etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

            // console.log("8点00到8点01 ：" + showTime); 
            //	console.log("后台传送时间：" + time + "key:" + key_led); 
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

    return currenttime;
}

