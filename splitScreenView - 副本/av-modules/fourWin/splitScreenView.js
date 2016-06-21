define(["avalon", "jquery",'css!bootstrap.css','css!splitScreenView.css'], function (avalon, $) {
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
                    sector:"闽侯县水利局",//首页标题
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
                    showTime:"",//首页显示时间
                    getShowTime:""//后台时间
                });
                warn.options.conte=vm;

                return vm;
            },
            //数据模块,初始化图片数据
            getdata:function(options) {

                //雨量下面的数据列表 数据options.data
                // http://192.168.110.233:9995/api/mobilev1/rain/grade/getrainavgcount?addvcd=350121&include_self=false&time=(2016-03-28T08:00:00,2016-03-29T08:00:00]&stat_type=个镇
                var par_a3= realTime();
                $.getJSON(options.data.a3, par_a3,function (result) {
                    options.conte.cloudData = result.data;
                });

                //雨量下面的描述语句
                //http://192.168.110.233:9995/api/mobilev1/base/common/getdescripstat?key=today_led&addvcd=350121&time=(2016-03-28T08:00:00,2016-03-29T08:00:00]
                var par_a4= {
                    key: par_a3.key,
                    addvcd: par_a3.addvcd,
                    time: par_a3.time
                };
                $.getJSON(options.data.a4 ,par_a4, function (result) {
                    options.conte.rainText = result.data;
                });

                //雨量条形图
                $.getJSON(options.data.a5, function (result) {
                    options.conte.rainData = result.data;
                });

                //雨量等值面图
                //http://192.168.110.233:9995/RainfallIsoline/RainIsolineDataProvider.ashx?start=2014-1-1 08:00&end=2014-1-1 08:00&Isoline=true&IsolineArea=true
                var par_a6= {
                    start: par_a3.stimeChart,
                    end: par_a3.etimeChart,
                    Isoline: par_a3.Isoline,
                    IsolineArea: par_a3.IsolineArea
                };
                $.get(options.data.a6,par_a6, function (result) {
                    var result = eval('(' + result + ')');
                    options.conte.rainChart = result.url;
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
        //用于雨量等值面的
        var stimeChart = "";
        var etimeChart = "";
        var  addvcd = "350121";
        var  key_led = "";
        //雨量量级统计接口的参数
        var stat_type = "个",
            include_self = false;

        var   currentTime = new Date();
        var   currentTimeHours = new Date().getHours();//用于和8点做比较
        var currentGetMinutes = new Date().getMinutes(),//用于和0做比较
            formatCurrentTime = GetCurrentTime(false, 0, currentTime),//格式化时间,当前时间 2016年06月01日 16:04:08
            formatToday = GetCurrentTime(true, 0, currentTime),//格式化时间，今天
            formatYesterday = GetCurrentTime(true, -1, currentTime);//格式化时间，前一天


        if (currentTimeHours > 8) {
            //9点
            //大于8点属于今天
            key_led = "today_led";

            indextime = formatCurrentTime.substr(0,17);//前台显示时间

            stime = formatToday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
            etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T");//用于雨量下面的描述语句
            time = "(" + stime + "," + etime + "]";//后台传送时间 (2016-05-25T08:00:00,2016-05-25T14:54:34]

            stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
            etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28


        }
        else if (currentTimeHours < 8) {
            //7点
            //昨天的
            key_led = "yesterday_led";
            stime = formatYesterday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
            etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
            time = "(" + stime + "," + etime + "]";

            indextime = formatCurrentTime.substr(0,12);//前台显示时间

            stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
            etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

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

                indextime = formatCurrentTime;//前台显示时间

                stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
                etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28


            } else {
                //08:00到08:01之间的
                //昨天的
                key_led = "yesterday_led";
                stime = formatYesterday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
                etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
                time = "(" + stime + "," + etime + "]";

                indextime = formatCurrentTime;//前台显示时间

                stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
                etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28
            }


        }

        var obj={
            key:key_led,
            addvcd:addvcd,
            time:time,
            stat_type:stat_type,
            include_self:include_self,
            stimeChart:stimeChart,
            etimeChart:etimeChart,
            Isoline:true,
            IsolineArea:true,
            indextime: indextime
        };

        return obj;
    }


