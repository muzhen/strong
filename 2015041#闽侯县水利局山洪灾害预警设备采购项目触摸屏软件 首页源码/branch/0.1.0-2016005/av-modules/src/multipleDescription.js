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
            return vm;
        },
        tableVm: function () {
            var vm = avalon.define({
                $id: table.options.clid,
                showTime: "",//显示时间
                addData: [],
                formName:"",
                title:"",
                tableName:[],
                tipPoint:"",
                unit: "w",
                unitchangetxt:"",
                unitchange: function(a) {
                    vm.unitchangetxt = "改变后的数据："+ a
                },
                string: "xxx",
                leader: "xxxxxx",
                a:"10",
                b:"10",

            });
            table.options.tableVm = vm;

            return vm;

        },
        //getdata 数据模块,初始化table数据
        getdata: function (options) {

            var par = realTime();
            //雨情文字 显示时间
            options.tableVm.showTime = par.showTime;

            //table data
            $.getJSON(options.data.a1, par, function (result) {
                options.tableVm.addData = result.data;//获取的数据放在这里
            });

            //form name
            $.getJSON(options.data.a2,function (result) {

                options.tableVm.formName = result.data[2].formName;
                options.tableVm.title =  result.data[2].title;
                options.tableVm.tableName =  result.data[2].tableName;
                options.tableVm.tipPoint =  result.data[2].tipPoint;
                avalon.log( avalon.type(result));
            });


        }


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

