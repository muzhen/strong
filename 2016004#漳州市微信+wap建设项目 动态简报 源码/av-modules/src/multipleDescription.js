define(["avalon", "jquery", "JsUtil", 'css!bootstrap.css', 'css!multipleDescription.css'], function (avalon, $, JsUtil) {
    var table = {
        options: {
            clid: "",
            url: "",
            tableVm: {},
            as: {},
            raindatatext:{}

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
                rainTitle: [],//雨情
                rainData: [],
                rainText: "",//雨情 table下面的描述语句
                rainChart: "",//雨情 等值面图
                rainBar: [],//雨量 等值面图旁的条例图
                raindatas: {},
                raindatatext : {},
                xloading: require.toUrl('multipleDescription') + '/img/xloading.gif',// 加载效果
                waterTitle: [],//水情
                waterData: [],
                flag: "",
                reservoirTitle: [],//水情 表头 水库超汛限 reservoir
                reservoirData: [],//水情 数据 水库超汛限 reservoir
                reservoirFlag: "",
                num: "",
                typhoon:"",//风情》台风
                windTitle:[],//风情
                windData:[],
                weatherForecast: " "//天气预告
            });

            table.options.tableVm = vm;
            return vm;

        },
        //雨情数据处理
        //最大降雨出现在___,为___毫米. 全市降雨超过___毫米的雨量站有___个，分布是：站名（*县**乡）___毫米；站名（*县**乡）___毫米.
        specific:function(raindatas){
            var rainleveladdress = [];
            var rainlevelsum_val = [];
            var rainlevelname = [];// 站名
            var rainmaxval = 0;// 最大的雨量值
            var rainmaxname = "";// 最大的雨量值的名字

            var _id_lever={
                6:"250",
                5:"100",
                4:"50",
                3:"25",
                2:"10",
                1:"0"
            };
            var raindatalength = raindatas.length; //返回数据里等级 目前是7个,含无雨的一个
            for(var i = 0; i < raindatalength-1 ; i++){ //循环好内部data,取出最大的雨量值,最大降雨量出现的地区  //最大降雨出现在 南靖县 ,为 23 毫米
                var rainleng = raindatas[i].data.length;
                if(rainleng > 1){
                    rainmaxval  =  raindatas[i].data[0].sum_val;
                    rainmaxname  =  raindatas[i].data[0].area_name;
                    var ids =  raindatas[i]._id;

                    var rainlevel = _id_lever[ids];// 最大的雨量值 级别
                    var rainlevelnum = rainleng; // 最大的雨量值的名字 级别里的个数

                    for(var j=0; j< rainleng ; j++){
                        rainleveladdress[j] =  raindatas[i].data[j].address;
                        rainlevelsum_val[j] =  raindatas[i].data[j].sum_val;
                        rainlevelname[j] =  raindatas[i].data[j].name;
                    }
                    // console.log(ids);
                    break;
                }
            }

            var obj = {
                maxname: rainmaxname,//最大降雨量出现的地区
                maxval: rainmaxval,//最大降雨量
                rainlevel:rainlevel,//最大的雨量值 级别
                rainlevelnum:rainlevelnum,//  最大的雨量值的名字 级别里的个数
                rainlevelsum_val:rainlevelsum_val,
                rainleveladdress:rainleveladdress,
                rainlevelname:rainlevelname,
            };

            return obj;
        },
        //数据处理，图表和 全市共有___个县___个乡镇发生降雨
        as: function (raindatas) {
            var gradetotal = ["250以上","100至250","50至100","25至50","10至25","0至10"];//标题
            var townnumtotal = "";//每个级别的乡镇数
            var alltown = 0;//一共的乡镇数
            var name = "";
            var num = 0, obj = {}, townnumtotal = [], citynametotle = [] ;
            var allcity = 0;//县总数
            var raineval = 0;//每个县城最大的雨量值
            var rainname ="";//每个县城最大降雨量出现的地区
            var tempcityall = [];// 所以的县城名字（含重复的）
            var tempcitynum = [];// 每个级别的所有的县城名字（含重复的）
            var citynamelevelonly = [];// 每个级别的所有的县城名字（唯一的）
            var citynumonly = [];// 所以县城的名字（唯一的）
            var citynamelevelall= [];// 每个级别的唯一县城名字拼接起来
            var rainlevel = "";//最大的降雨级别
            var rainlevelnum = "";
            var raindatalength = raindatas.length; //返回数据里等级 目前是7个,含无雨的一个
            for (var i = 0; i < raindatalength-1 ; i++) {
                var raindataData = raindatas[i].data;//[0]无；[1]无；[2]无 ；[3]2县（南靖县、华安县） 3村 ；[4] 1县（南靖县） 2村 ;[5]1县（平和县） 2村   = 3县 7村
                var   k = 0;
                townnumtotal[i] = raindataData.length;//每个级别的乡镇数
                alltown +=  townnumtotal[i];//村总数

               //遍历每个级别的县城名字
                for (var j=0 ; j < raindataData.length; j++) {
                        var cityname = raindataData[j].area_name;//县城名字
                        if (cityname) { //无town_name 则不计算
                            tempcitynum[j] = cityname;
                        }
                }
                // tempcityall.push(tempcitynum)
              // tempcityall = tempcityall.concat(tempcitynum);
                //去重复
                for(var k in tempcitynum) //遍历每个级别的县城名字(含重复的)
                {
                    if (citynamelevelonly.indexOf(tempcitynum[k]) == -1)//检索的字符串值没有出现
                        citynamelevelonly.push(tempcitynum[k]);//存放每个级别  唯一 的县城的名字
                }
                citynametotle[i] = citynamelevelonly.length;//相应县数量(唯一的)


                citynamelevelall = citynamelevelall.concat(citynamelevelonly);//把每个级别的唯一县城名字拼接起来
                //为空,下个级别重新复值
                tempcitynum = [] ; citynamelevelonly = [] ;

            }

            //全市共有 3 个县
            for(var k in citynamelevelall) //遍历每个级别的县城名字（唯一的）
            {
                if (citynumonly.indexOf(citynamelevelall[k]) == -1)//检索的字符串值没有出现
                    citynumonly.push(citynamelevelall[k]);//  唯一 的县城的名字
            }
            allcity = citynumonly.length ;//县总数
            var obj = {
                gradetotal: gradetotal,//降雨级别
                alltown:alltown,//村总数
                townnumtotal: townnumtotal,//每个级别相应降雨的乡镇数量
                citynumtotal: citynametotle,//相应县数量(唯一的)
                num: num,//发生降雨的市县数量
                allcity:allcity,//县总数
            };

            return obj;

        },

        //getdata 数据模块,初始化table数据
        getdata: function (options) {
            var par = realTime();
            //雨情文字 显示时间
            options.tableVm.showTime = par.showTime;

            //雨情下面的table
            //http://61.154.79.86:8083/rain/interval?time=[2016-06-27T08:00:00,2016-06-28T12:00:00]&group_type=grade&rain_range=[0,9999]&filter=area[350600]
            var rain ={
                "time":par.time.replace("(", "["),
                "group_type":"grade",
                rain_range:"[0,9999]",
                filter:"area[350600]"
            };
            $.getJSON(options.data.rain,rain, function (result) {
                options.tableVm.rainData = result;
                options.tableVm.rainTitle = table.options.rainTitle;
                var raindatas = options.tableVm.rainData.$model;
                options.tableVm.raindatas = table.as(raindatas);
                options.tableVm.raindatatext = table.specific(raindatas);
                avalon.log(options.tableVm.raindatatext.$model);

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
                url: options.data.a3,
                data: par_a3,
                success: function (result) {
                    var result = eval('(' + result + ')'); //result转为对象在处理
                    options.tableVm.rainChart = result.url;//获取的数据放在这里
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                }
            });

            //雨量 等值面图旁的条例图
            $.getJSON(options.data.rainBar, function (result) {
                options.tableVm.rainBar = result.data;
            });

            //水情 》河道超警戒 river
            $.getJSON(options.data.river, function (result) {
                var waterNum = result.data.length;
                var num = 0;
                options.tableVm.waterData = result.data;
                options.tableVm.waterTitle = options.waterTitle;

                //计算flag数量
                for (var i = 0; i < waterNum; i++) {
                    var flagnum = options.tableVm.waterData[i].flag_cjx;//是否为超警戒/超汛限  是：1 否：0
                    var wrz = options.tableVm.waterData[i].wrz_fsltdz;//超警戒/超汛限
                    if (flagnum) {//有超警戒/超汛限
                        num++;
                        $(".river").css({
                            "display":"table"
                        })
                    } else {//无超警戒/超汛限
                        num;
                        $(".river").before(" <p>全市主要江河水位不超警戒，均在警戒水位以下.</p>");
                        break;
                    }
                   // if (!wrz) {
                   //  options.tableVm.waterData[i].wrz_fsltdz = "-";//wrz_fsltdz的值设为“ - ”
                 //  }
                    options.tableVm.waterData[i].tm = options.tableVm.waterData[i].tm.substr(11, 5).replace(":", "时") + "分";//15时00分
                }
                options.tableVm.flag = num;

            });

            //水情 》水库超汛限 rsvrevs
            $.getJSON(options.data.rsvrevs , function (result) {
                var reservoirNum = result.data.length;
                var num = 0;
                options.tableVm.reservoirData = result.data;//获取的数据放在这里 数组
                options.tableVm.reservoirTitle = options.reservoirTitle;

                for (var i = 0; i < reservoirNum; i++) {
                    var flagnum = options.tableVm.reservoirData[i].flag_cjx;//是否为超警戒/超汛限  是：1 否：0
                    var wrz = options.tableVm.reservoirData[i].wrz_fsltdz;//超警戒/超汛限
                    if (flagnum) {//有超警戒/超汛限
                        num++;
                        $(".rsvrevs").css({
                            "display":"table"
                        })
                    } else {//无超警戒/超汛限
                        num;
                        $(".rsvrevs").before(" <p>全市大中型水库不超汛限水位，均在汛限水位以下</p>");
                        break;
                    }
                   // if (!wrz) {
                  //      options.tableVm.reservoirData[i].wrz_fsltdz = "-";//wrz_fsltdz的值设为“ - ”
                  //  }
                  options.tableVm.reservoirData[i].tm = options.tableVm.reservoirData[i].tm.substr(11, 5).replace(":", "时") + "分";//15时00分
                }
                options.tableVm.reservoirFlag = num;

            });

            //天气预告
            $.get(options.data.weather, function (result) {
               options.tableVm.weatherForecast = result.data.contents;
            });

            //风情》台风
            $.get(options.data.typhoon, function (result) {
                $(".loading").css("display","none");
              var str = result.data.str;
                if(str){//有值
                    options.tableVm.typhoon = str;
                }else{//无值
                    options.tableVm.typhoon ="当前海面暂无台风编号"
                }
            });

            //风情》风力
            //http://61.154.79.86:8083/wind/instant?time=[2016-06-25T08:10:00,2016-06-26T09:10:00]&filter=area[350600]
            var winds = {
                // time : "[2016-06-25T08:10:00,2016-06-26T09:10:00]", 有数据
                 "time":par.time.replace("(", "["),
                "filter":"area[350600]"
            };
            $.get(options.data.wind,winds,function (result) {
                options.tableVm.windData = result[0]?result[0].data:[];//result[0].data;
                options.tableVm.windTitle = options.windTitle;
               var wind_dir =  options.tableVm.windData ;
                for(var i=0 ; i<wind_dir.length ; i++){
                    var wind_dirs =wind_dir[i].wind_dir;
                    switch(wind_dirs){
                        case "A" :
                            wind_dir[i].wind_dir = '北';
                            break;
                        case "B" :
                            wind_dir[i].wind_dir = '北东北';
                            break;
                        case "C":
                            wind_dir[i].wind_dir = '东北';
                            break;
                        case "D" :
                            wind_dir[i].wind_dir = '东东北';
                            break;
                        case "E" :
                            wind_dir[i].wind_dir = '东';
                            break;
                        case "F" :
                            wind_dir[i].wind_dir = '东东南';
                            break;
                        case "G" :
                            wind_dir[i].wind_dir = '东南';
                            break;
                        case "H" :
                            wind_dir[i].wind_dir = '南东南';
                            break;
                        case "I":
                            wind_dir[i].wind_dir = '南';
                            break;
                        case "J" :
                            wind_dir[i].wind_dir = '南西南';
                            break;
                        case "K" :
                            wind_dir[i].wind_dir = '西南';
                            break;
                        case "L" :
                            wind_dir[i].wind_dir = '西西南';
                            break;
                        case "M":
                            wind_dir[i].wind_dir = '西';
                            break;
                        case "N" :
                            wind_dir[i].wind_dir = '西西北';
                            break;
                        case "O" :
                            wind_dir[i].wind_dir = '西北';
                            break;
                        case "P" :
                            wind_dir[i].wind_dir = '北西北';
                            break;
                    }
                }

            });

        }

    }
    return table;
});

//时间和8点比较
function realTime() {
    var stime = "", etime = "", time = "";
    var showTime = "", sshowTime = "", eshowTime = "";
    var stimeChart = "", etimeChart = "";
    var addvcd = "350121", key_led = "";
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

        sshowTime = formatToday.substr(8, 3) + "08时";
        eshowTime = formatCurrentTime.substr(8, 6);
        showTime = "从" + sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

        stimeChart = stime.replace("T", " ");//雨量 等值面图 2016-05-25 08:00:00
        etimeChart = etime.replace("T", " ");//雨量 等值面图 2016-05-25 15:16:28

         console.log("大于8点,即9点, 前台显示时间：" + showTime);
        console.log("后台传送时间：" + time + "key:" + key_led);;
    }
    else if (currentTimeHours < 8) {
        //7点
        //昨天的
        key_led = "yesterday_led";
        stime = formatYesterday.replace("年", "-").replace("月", "-").replace("日", "T") + "08:00:00";//2016-05-20T  08:00:00,用于雨量下面的描述语句
        etime = formatCurrentTime.replace("年", "-").replace("月", "-").replace("日", "T").replace("时", ":").replace("分", ":");//用于雨量下面的描述语句
        time = "(" + stime + "," + etime + "]";

        sshowTime = formatToday.substr(8, 3) + "08时";
        eshowTime = formatCurrentTime.substr(8, 6);

        showTime = "从" + sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

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

            sshowTime = formatToday.substr(8, 3) + "08时";
            eshowTime = formatCurrentTime.substr(8, 6);
            showTime = "从" + sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

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

            sshowTime = formatToday.substr(8, 3) + "08时";
            eshowTime = formatCurrentTime.substr(8, 6);

            showTime = "从" + sshowTime + "至" + eshowTime;//前台显示时间 25日8时0分至25日14时56分

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

